import { LocalStorage } from './storages/localstorage.js';
import { IndexedDBStorage } from './storages/indexeddb.js';
import { CacheMessenger, type Message } from './messenger.js';
import type { CacheStorage } from './interfaces/CacheStorage';
import { uuid } from '../uuid.js';
import { Distribution, type DistributionState } from './distribution.js';
export interface DistributedCacheConfig {
  storage: 'localstorage' | 'indexeddb';
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
   * Names for manage all states temporary
   */
  protected state: DistributionState;

  /**
   * Names for manage all states temporary
   */
  protected distribution: Distribution;

  /**
   * Constructor
   * @param name cache name
   * @param config cache configuration
   */
  constructor (name: string, config?: DistributedCacheConfig) {
    if (typeof name !== 'string') {
      throw new TypeError('Expected name to be of type string');
    }
    else if (name.length === 0) {
      throw new RangeError('Expected name to have a length');
    }

    if (config?.storage === 'indexeddb') {
      this.storage = new IndexedDBStorage(name);
    }
    else if (!config?.storage || config?.storage === 'localstorage') {
      this.storage = new LocalStorage(name);
    }
    else {
      throw new TypeError('Unknown storage type');
    }
    this.messenger = new CacheMessenger(name);
    this.distribution = new Distribution(name, this.messenger);
    this.listenMessenger();
    this.state = this.distribution.state;
    this.handleUnload();
  }

  /**
   * Initialize listening events from messenger and storage
   * @returns {void}
   */
  private listenMessenger (): void {
    // Listen messenger message
    this.messenger.onMessage = (message) => {
      const { key, value } = message;
      // Handle distribution message
      this.distribution.handleDistribution();
      if (key === 'coordinator') {
        return;
      }
      // Handle leader message
      if (key?.startsWith(this.state.leader)) {
        this.handleLeaderMessage(message);
      }
      else {
        // Set message value to active cache
        if (!this.storage.hasActive(key)) {
          this.setActiveCache(key, value);
        }
        this.handleFollowerMessage(message);
      }
    };
  }

  /**
   * Leader Action: load when receive a matched message
   * @param message messenger message
   * @returns {void}
   */
  private handleLeaderMessage ({ key, value }: Message): void {
    const itemKey = key.replace(`${this.state.leader}-`, '');
    // Check the request is belong to itself
    if (value && this.requests[itemKey] === value) {
      const resolve = this.waiting.get(itemKey);
      if (resolve) {
        // Resolve null to load as a leader
        resolve(null);
      }
    }
  }

  /**
   * Follower Action: resolve value when receive a matched message
   * @param message messenger message
   * @returns {void}
   */
  private handleFollowerMessage ({ key, value }: Message): void {
    // Check the message is matched to waiting list
    if (this.waiting.has(key)) {
      const resolve = this.waiting.get(key);
      if (resolve) {
        resolve(value);
        // Clean request state and waiting list from key
        delete this.requests[key];
        this.waiting.delete(key);
      }
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
      if (this.getStateKeys().length !== 0) {
        localStorage.setItem(this.state.unloaded, 'true');
      }
      return true;
    });

    // After user refresh (unload), all state should be cleaned by delete state from previous round
    if (localStorage.getItem(this.state.unloaded) === 'true') {
      localStorage.removeItem(this.state.unloaded);
      this.clean();
    }
  }

  /**
   * Caches a value against a key to use until expired
   * @param key Cache key
   * @param value Data promise to store in cache
   * @param [expires=432000] Cache expiry in seconds. Defaults to 5 days.
   * @returns {void}
   */
  public async set (key: string, value: Promise<string | undefined>, expires = 432000): Promise<void> {
    const cacheValue: string | undefined = await value;
    if (cacheValue) {
      const modified = Date.now();
      const data = {
        value: cacheValue,
        modified,
        expires: modified + expires * 1000
      };
      // Notify data to follower
      this.messenger.notify(key, cacheValue);
      // Set data to cache
      await this.storage.set(key, data);
      // Clean up temporary state
      this.cleanItem(key);
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
    const item = await this.storage.get(key);
    if (item && item.expires > Date.now()) {
      return item.value;
    }
    const hasRequest = this.hasRequest(key);
    // Add to request list if not exist
    if (!hasRequest) {
      this.addRequest(key);
    }
    // Return null to load it self when do not have coordinator
    if (!hasRequest && !this.distribution.coordinator) {
      return null;
    }
    // Return promise and wait to resolve in waiting list
    return new Promise<string | null>(resolve => this.addWaiting(key, resolve));
  }

  /**
   * Caches a value to memory cache without writing to storage
   * @param key Cache key
   * @param value Data to store in cache
   * @param [expires=432000] Cache expiry in seconds. Defaults to 5 days.
   * @returns {void}
   */
  protected setActiveCache (key: string, value: string, expires = 432000): void {
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
    this.requests[key] = id;
    localStorage.setItem(`${this.state.request}-${key}`, id);
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
      return true;
    }
    else {
      result = localStorage.getItem(`${this.state.request}-${key}`) !== null;
      if (result) {
        // Cache a request state for reduce checking on localStorage
        this.requests[key] = 'waiting';
      }
      return result;
    }
  }

  /**
   * Add an item to the waiting list
   * @param key item key
   * @param value callback function
   * @returns {void}
   */
  protected addWaiting (key: string, value: CallableFunction): void {
    this.waiting.set(key, value);
  }

  /**
   * Return state keys
   * @returns {string[]} localhostStorage keys that contains state name
   */
  protected getStateKeys (): string[] {
    return Object.keys(localStorage)
      .filter(key => [this.state.leader, this.state.request, this.state.unloaded]
        .some(prefix => key.startsWith(prefix)));
  }

  /**
   * Clean up all temporary states
   * @returns {void}
   */
  private clean (): void {
    this.getStateKeys().forEach(key => {
      localStorage.removeItem(key);
    });

    this.requests = {};
    this.waiting.clear();
  }

  /**
   * Clean up one item from temporary states
   * @param key item key
   * @returns {void}
   */
  private cleanItem (key: string): void {
    localStorage.removeItem(`${this.state.request}-${key}`);
    localStorage.removeItem(`${this.state.leader}-${key}`);
    delete this.requests[key];
    this.waiting.delete(key);
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
