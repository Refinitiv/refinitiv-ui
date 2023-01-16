import { LocalStorage } from './storages/localstorage.js';
import { IndexedDBStorage } from './storages/indexeddb.js';
import type { CacheStorage } from './interfaces/CacheStorage';
import { Distribution, type DistributionState } from './distribution.js';
export interface DistributedCacheConfig {
  storage: 'localstorage' | 'indexeddb';
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
    this.distribution = new Distribution(name, this.storage);
    this.state = this.distribution.state;
    this.handleUnload();
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
      this.distribution.messageCache(key, cacheValue);
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
    return new Promise<string | null>(resolve => this.distribution.processRequest(key, resolve));
  }

  /**
   * Return state keys
   * @returns {string[]} localhostStorage keys that contains state name
   */
  protected getStateKeys (): string[] {
    return Object.keys(localStorage)
      .filter(key => [this.state.loading, this.state.unloaded]
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

  }

  /**
   * Clean up one item from temporary states
   * @param key item key
   * @returns {void}
   */
  private cleanItem (key: string): void {
    localStorage.removeItem(`${this.state.loading}-${key}`);
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
