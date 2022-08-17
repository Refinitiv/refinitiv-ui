import type { CacheItem, CacheStorage, LocalCacheConfig } from './types';
import { CacheIndexedDBStorage } from './cache-indexeddb.js';
import { CacheLocalStorage } from './cache-localstorage.js';

/**
 * Stores data in a local cache that can be specified to be stored in localstorage or indexedDB.
 */
export class LocalCache {
  /**
   * Storage to store data
   */
  protected storage!: CacheStorage;

  constructor (name: string, config: LocalCacheConfig) {
    if (config.storage.toLowerCase() === 'indexeddb') {
      this.storage = new CacheIndexedDBStorage(name);
    }
    if (config.storage.toLowerCase() === 'localstorage') {
      this.storage = new CacheLocalStorage(name);
    }
  }

  /**
   * Caches a value against a key to use until expired
   * @param key Cache key
   * @param value Data to store in cache
   * @param [expires=432000] Cache expiry in seconds. Defaults to 5 days.
   * @returns Promise void
   */
  public async set (key: string, value: string, expires = 432000): Promise<void> {
    const modified = Date.now();
    const data = {
      value,
      modified,
      expires: modified + expires * 1000
    };
    await this.storage.setItem(key, data);
  }

  /**
   * Returns cache data value based on provided key
   * @param key Cache key
   * @returns Promise string data or `null` if nothing is cached
   */
  public async get (key: string): Promise<unknown | null> {
    const item = await this.storage.getItem(key) as CacheItem;
    if (item && item.expires > Date.now()) {
      return Promise.resolve(item.value);
    }
    return Promise.resolve(null);
  }

  /**
   * Remove cache data value based on provided key
   * @param key Cache key
   * @returns Promise void
   */
  public async remove (key: string): Promise<void> {
    await this.storage.removeItem(key);
  }

  /**
   * Clear all memory cache
   * @returns Promise void
   */
  public async clear (): Promise<void> {
    await this.storage.clear();
  }
}
