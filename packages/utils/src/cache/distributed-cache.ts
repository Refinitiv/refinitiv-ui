import { LocalStorage } from './storages/localstorage.js';
import { IndexedDBStorage } from './storages/indexeddb.js';
import type { CacheStorage } from './interfaces/CacheStorage';
import { Store } from './store.js';
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

  store = new Store();

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
      this.store.set(key, cacheValue);
      // Set data to cache
      void this.storage.set(key, data);
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
    return this.store.get(key);
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
