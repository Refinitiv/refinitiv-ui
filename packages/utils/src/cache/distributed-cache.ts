import { LocalStorage } from './storages/localstorage.js';
import { IndexedDBStorage } from './storages/indexeddb.js';
import { CacheMessenger, type Message } from './messenger.js';
import { CACHE_PREFIX, MESSENGER_LAST_MESSAGE_INTERVAL } from './constants.js';
import type { CacheStorage } from './interfaces/CacheStorage';
import { uuid } from '../uuid.js';

// TODO: This imports use for debugging and benchmarking, remove it when this class implement completed
import { Logger } from './helpers.js';
import { TimeoutTaskRunner } from '../async.js';
const logger = new Logger();
logger.timeStart(window.name);

export interface DistributedCacheConfig {
  storage: 'localstorage' | 'indexeddb';
}

type StorageNames = {
  requests: `${string}[requests]`,
  unloaded: `${string}[unloaded]`
};

type RequestItem = {
  id: string;
  leader?: string;
}

type Requests = {
  [key: string]: string
}

/**
 * Distribute cache across browsers windows, tabs, and iframes to reducing network requests
 */
export class DistributedCache {

  /**
   * Storage to store data
   */
  protected storage!: CacheStorage;

  /**
   * Requests cached from localStorage
   */
  protected requests: Requests = {};

  /**
   * List of promise needed be resolved by messaging
   */
  protected waiting = new Map<string, CallableFunction>();

  /**
   * Cache messenger for distribute cache
   */
  protected messenger: CacheMessenger;

  /**
   * Timer to check message is the last
   */
  protected lastMessageTimeout = new TimeoutTaskRunner(MESSENGER_LAST_MESSAGE_INTERVAL);

  /**
   * Names for manage all states temporary
   */
  protected storageNames: StorageNames;

  /**
   * Constructor
   * @param name cache name
   * @param config cache configuration
   */
  constructor (name: string, config?: DistributedCacheConfig) {

    if (typeof name !== 'string') {
      throw new TypeError('Expected name to be of type string');
    }
    if (name.length === 0) {
      throw new RangeError('Expected name to have a length');
    }

    switch (config?.storage) {
      case 'indexeddb':
        this.storage = new IndexedDBStorage(name);
        break;
      case 'localstorage':
      case null:
      case undefined:
        this.storage = new LocalStorage(name);
        break;
      default:
        throw new TypeError('Unknown storage type');
    }

    const cacheName = `[${CACHE_PREFIX}][${name}]`;

    this.storageNames = {
      requests: `${cacheName}[requests]`,
      unloaded: `${cacheName}[unloaded]`
    };

    this.messenger = new CacheMessenger(name);
    this.handleUnload();
    this.listen();
  }

  /**
   * Initialize listening events from messages and storage
   * @returns {void}
   */
  private listen (): void {
    // Listen storage event to clear everythings if remove requests state
    addEventListener('storage', ({ key, newValue }) => {
      // Leader election, use only first vote(event) for setting leader
      if (key?.startsWith(this.storageNames.requests) && newValue) {

        const request = JSON.parse(localStorage.getItem(key) || '') as RequestItem;
        // Set a new leader if does not exists
        if (!request.leader) {
          const itemKey = key.replace(`${this.storageNames.requests}-`, '');

          // Save Leader
          request.leader = 'true';
          localStorage.setItem(key, JSON.stringify(request));

          // Notify to leader
          this.messenger.notify(`leader-${itemKey}`, request.id);
        }
      }
    });

    this.messenger.onMessage = (message) => {

      // Cancel no new message timeout
      this.lastMessageTimeout.cancel();

      const { key, value } = message;
      if (key?.startsWith('leader-')) {
        this.handleLeaderMessage(message);
        return;
      }
      else {
        /**
         * Synchronize the item to active cache in storage by using data in the received message,
         * while the item writing to the browser storage by the sender
         */
        if (!this.storage.hasActive(key)) {
          Logger.log(`${window.name} %c Sync cache %c with received message %c ${key.split('/').pop() || ''} ${Date.now()}`, 'background: magenta; color: white', '', '');
          this.syncActiveCache(key, value);
        }

        this.handleFollowerMessage(message);
      }

      // Show end time
      this.lastMessageTimeout.schedule(() => logger.timeEnd(window.name));
    };
  }

  /**
   * Leader Action: load svg icon when receive a matched message
   * @param message messenger message
   * @returns {void}
   */
  private handleLeaderMessage ({ key, value }: Message): void {
    const itemKey = key.replace('leader-', '');
    // Check the request is belong to leader
    if (value && this.requests[itemKey] === value) {
      Logger.log(`${window.name} Leader ${key.split('/').pop() || ''} ${value}`);
      const resolve = this.waiting.get(itemKey);
      if (resolve) {
        Logger.log(`${window.name} %c Leader: Request icon %c ${key.split('/').pop() || ''} ${Date.now()}`, 'background: blue; color: white', '');
        resolve(null); // load svg if return null
      }
      else {
        Logger.log(`${window.name} not found to ${key.split('/').pop() || ''} resolve`, this.waiting.has(key));
      }
    }
  }

  private handleFollowerMessage ({ key, value }: Message): void {
    // Follower Action: Match a message with a waiting request and resolve it
    if (this.waiting.has(key)) {
      const resolve = this.waiting.get(key);
      if (resolve) {
        resolve(value);

        // Clean request state and waiting list
        delete this.requests[key];
        this.waiting.delete(key);

        // Close messenger when no more waiting item
        if (!this.waiting.size && !Object.keys(this.requests).length) {
          this.messenger.close();
        }
      }
      Logger.log(`${window.name} %c Received message %c icon ${key.split('/').pop() || ''} ${Date.now()}`, 'background: green; color: white', '');
    }
  }

  /**
   * Clean up by resetting all requesting states,
   * if found unload event that makes the current states is not correct
   * in case users interupt a browser by refresh page
   * @returns {void}
   */
  private handleUnload (): void {
    // Listen this event to detect user try to refresh page
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
      if (localStorage.getItem(this.storageNames.requests) !== null) {
        localStorage.setItem(this.storageNames.unloaded, 'true');
      }
      return true;
    });

    // After user refresh (unload), all state should be cleaned by delete state from previous round
    if (localStorage.getItem(this.storageNames.unloaded) === 'true') {
      localStorage.removeItem(this.storageNames.unloaded);
      this.clean();
    }
  }

  /**
   * Caches a value against a key to use until expired
   * @param key Cache key
   * @param value Data to store in cache
   * @param [expires=432000] Cache expiry in seconds. Defaults to 5 days.
   * @returns {void}
   */
  public async set (key: string, value: string | Promise<string | undefined>, expires = 432000): Promise<void> {
    let cacheValue: string | undefined;
    if (value instanceof Promise) {
      cacheValue = await value;
    }
    else {
      cacheValue = value;
    }

    if (cacheValue) {
      const modified = Date.now();
      const data = {
        value: cacheValue,
        modified,
        expires: modified + expires * 1000
      };

      this.messenger.notify(key, cacheValue);
      Logger.log(`${window.name} %c Start writing to cache %c ${key.split('/').pop() || ''} ${Date.now()}`, 'background: red; color: white', '');
      void this.storage.set(key, data).then(() => {
        // Clean up temporary requested state
        this.cleanItem(key);
      });
    }
    else {
      // eslint-disable-next-line no-console
      console.warn(`Cannot set empty value to cache for key ${key}`);
    }
  }

  /**
   * Returns cache data value based on provided key
   * @param key Cache key
   * @returns Promise string data or `null` if nothing is cached
   */
  public async get (key: string): Promise<string | null> {
    const iconName: string = key.split('/').pop() || '';
    const item = await this.storage.get(key);

    if (item && item.expires > Date.now()) {
      Logger.log(`${window.name} %c Found Cache %c ${iconName} ${Date.now()}`, 'background: lightgreen; color: white', '');
      return item.value;
    }

    // Check item requesting state
    if (!this.hasRequest(key)) {
      this.addRequest(key);
    }

    Logger.log(`${window.name} %c Wait %c ${iconName} ${Date.now().toString()}`, 'background: orange; color: white', '');
    // Add to waiting list by create promise waiting for resolve
    return new Promise<string | null>(resolve => {
      this.wait(key, resolve);
    });
  }

  /**
   * Caches a value to memory cache without writing to storage
   * @param key Cache key
   * @param value Data to store in cache
   * @param [expires=432000] Cache expiry in seconds. Defaults to 5 days.
   * @returns {void}
   */
  protected syncActiveCache (key: string, value: string, expires = 432000): void {
    const modified = Date.now();
    const data = {
      value: value,
      modified: Date.now(),
      expires: modified + expires * 1000
    };

    this.storage.setActive(key, data);
  }

  /**
   * Add the started request to the state that is used in checking a duplicated request across other messengers
   * @param key item key
   * @return {void}
   */
  protected addRequest (key: string): void {
    const id = uuid();
    Logger.log(`${window.name} %c Leader: Candidate %c ${key?.split('/').pop() || ''} uuid: ${id} ${Date.now()}`, 'background: blue; color: white', '');
    this.requests[key] = id;
    localStorage.setItem(`${this.storageNames.requests}-${key}`, JSON.stringify({ id: id }));
  }

  /**
   * Check key is already started request across messengers
   * @param key resource name
   * @returns true if resource has started request
   */
  protected hasRequest (key: string): boolean {
    let result = false;

    // Checking from caching states first, if not found then check on localStorage
    if (key in this.requests) {
      result = true;
    }
    else {
      result = localStorage.getItem(`${this.storageNames.requests}-${key}`) !== null;
      if (result) {
        this.requests[key] = 'waiting'; // cache a request state for reduce checking on localStorage
      }
    }
    return result;
  }

  /**
   * Add an item to the waiting list
   * @param key item key
   * @param value callback function
   * @returns {void}
   */
  protected wait (key: string, value: CallableFunction): void {
    this.waiting.set(key, value);
  }


  /**
   * Clean up all temporary states
   * @returns {void}
   */
  private clean (): void {
    localStorage.removeItem(this.storageNames.requests);
    this.requests = {};
    this.waiting.clear();
  }

  /**
   * Clean up one item from temporary states
   * @param key item key
   * @returns {void}
   */
  private cleanItem (key: string): void {
    // localStorage.removeItem(this.storageNames.requests);
    localStorage.removeItem(`${this.storageNames.requests}-${key}`);
    delete this.requests[key];
    this.waiting.delete(key);

    if (!this.waiting.size && !Object.keys(this.requests).length) {
      this.messenger.close();
    }
  }

  /**
   * Remove cache data value based on provided key
   * @param key Cache key
   * @returns {void}
   */
  public async remove (key: string): Promise<void> {
    await this.storage.remove(key);
  }

  /**
   * Clear all memory cache
   * @returns {void}
   */
  public async clear (): Promise<void> {
    await this.storage.clear();
  }
}
