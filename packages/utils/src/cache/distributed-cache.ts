import { Logger } from './helpers.js';
import { CoreCache } from './core-cache.js';
import { CacheMessenger } from './messenger.js';
import type { CacheConfig } from './core-cache.js';
import type { CacheItem } from './interfaces/CacheItem';
import { TimeoutTaskRunner } from '../async.js';

Logger.time(`${window.name} Completed`);

enum StorageType {
  Requests='requests',
  Unloaded='unloaded'
}

type StorageNames = {
  [name in StorageType]: string
};

const CHANNEL_PREFIX = 'ef';

type Requests = {
  [key: string]: 'true'
}

/**
 * Distribute cache across browsers windows, tabs, and iframes to reducing network requests
 */
export class DistributedCache extends CoreCache {

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
  protected noMessageTimeout = new TimeoutTaskRunner(3000);

  /**
   * Names for manage all states temporary
   */
  protected storageNames: StorageNames;

  /**
   * Get resource request list, sync the new requests to cache
   */
  protected get requestsState (): Requests {
    const requests = (JSON.parse(localStorage.getItem(this.storageNames.requests) as string) || {}) as Requests;
    // Synchronize new requests state to local variable for performance improvement
    Object.assign(this.requests, requests);
    return this.requests;
  }

  /**
   * Set resource request list
   * @param requests request list
   */
  protected set requestsState (requests: Requests) {
    localStorage.setItem(this.storageNames.requests, JSON.stringify(requests));
  }

  /**
   * Constructor
   * @param name cache name
   * @param config cache configuration
   */
  constructor (name: string, config?: CacheConfig) {
    super(name, config);

    const messengerName = `[${CHANNEL_PREFIX}][${name}]`;

    this.storageNames = {
      requests: `${messengerName}[requests]`,
      unloaded: `${messengerName}[unloaded]`
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
      if (key === this.storageNames.requests && newValue === null) {
        this.clean();
      }
    });

    this.messenger.onMessage = ({ key, value, id }) => {
      // Cancel no new message timeout
      this.noMessageTimeout.cancel();

      /**
       * Synchronize the item to active cache in storage by using data in the received message,
       * while the item writing to the browser storage by the sender
       */
      if (!this.storage.hasActive(key)) {
        Logger.log(`${window.name} %c Sync cache %c with received message %c ${key.split('/').pop() || ''} ${Date.now()}`, 'background: magenta; color: white', '', '');
        this.syncActive(key, value);
      }

      // Match a message with a waiting request and resolve it
      if (this.waiting.has(key)) {
        const resolve = this.waiting.get(key);
        if (resolve) {
          resolve(value);
        }
        Logger.log(`${window.name} %c Received message %c icon ${key.split('/').pop() || ''} MessageID: ${id} ${Date.now()}`, 'background: green; color: white', '');
      }

      /**
       * Detect the `last message` by using a gap between message,
       * If no new message post within the time limit It will clear all states.
       * Need to find the way to check latest message better than this
       */

      this.noMessageTimeout.schedule(() => {
        if (!this.messenger.hasMoreMessage(id)) {
          this.clean();
        }
      });
    };
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
    let cacheValue: string;
    if (value instanceof Promise) {
      this.addRequest(key);
      cacheValue = await value.then(item => item || '');
    }
    else {
      cacheValue = value;
    }

    const modified = Date.now();
    const data = {
      value: cacheValue,
      modified,
      expires: modified + expires * 1000
    };

    this.messenger.notify(key, cacheValue);
    await this.storage.set(key, data);
  }

  /**
   * Returns cache data value based on provided key
   * @param key Cache key
   * @returns Promise string data or `null` if nothing is cached
   */
  public async get (key: string): Promise<string | null> {
    const iconName: string = key.split('/').pop() || '';
    const item = await this.storage.get(key) as CacheItem;

    if (item && item.expires > Date.now()) {
      Logger.log(`${window.name} %c Found Cache %c ${iconName} ${Date.now()}`, 'background: lightgreen; color: white', '');
      return item.value;
    }

    // Check key is already started a request
    if (!this.hasRequest(key)) {
      Logger.log(`${window.name} %c Request %c ${iconName} ${Date.now()}`, 'background: blue; color: white', '');
      return null;
    }
    else {
      Logger.log(`${window.name} %c Wait %c ${iconName} ${Date.now().toString()}`, 'background: orange; color: white', '');
      // Add to waiting list by create promise waiting for resolve
      return new Promise<string | null>(resolve => {
        this.wait(key, resolve);
      });
    }
  }

  /**
   * Caches a value to active cache without writing to storage
   * @param key Cache key
   * @param value Data to store in cache
   * @param [expires=432000] Cache expiry in seconds. Defaults to 5 days.
   * @returns {void}
   */
  protected syncActive (key: string, value: string, expires = 432000): void {
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
    const requests = this.requestsState;
    if (!requests[key]) {
      requests[key] = 'true';
      this.requests[key] = 'true';
      this.requestsState = requests;
    }
  }

  /**
   * Check key is already started request across messengers
   * @param key resource name
   * @returns true if resource has started request
   */
  protected hasRequest (key: string): boolean {
    return this.requests[key] ? true : Boolean(this.requestsState[key]);
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
    this.messenger.clean();
  }
}
