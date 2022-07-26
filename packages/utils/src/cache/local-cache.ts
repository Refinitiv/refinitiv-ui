import { CacheMap } from './cache-map.js';
import { CacheStorage } from './cache-storage.js';

/**
 * Stores data in a local cache that can be specified to be stored in localstorage or indexedDB.
 */
export class LocalCache {

  constructor (storage?: CacheStorage) {
    if (storage) {
      this.use(storage);
    }
  }

  public ready: Promise<boolean> | null = null;

  public restored = false;

  /**
  * Storage to store data
  */
  public storage!: CacheStorage;

  /**
   * Internal cache object
   */
  private cache: CacheMap | null | undefined;

  protected use (storage: CacheStorage) {
    this.storage = storage
    this.ready = this.restore();
  }

  /**
   * Restore all data from storage to cache databases
   * @returns {boolean} restore result
   */
  async restore (): Promise<boolean> {
    this.cache = await this.storage.restoreItems() as CacheMap;
    this.restored = true;
    return true;
  }

  /**
   * Caches a value against a key to use until expired
   * @param key Cache key
   * @param value Data to store in cache
   * @param [expires=432000] Cache expiry in seconds. Defaults to 5 days.
   * @returns {void}
   */
  async set (key: string, value: string, expires = 432000): Promise<void> {
    const modified = Date.now();
    const data = {
      value,
      modified,
      expires: modified + expires * 1000
    };
    this.cache?.set(key, data);
    this.storage.setItem(key, data);
  }

  /**
   * Returns cache data value based on provided key
   * @param key Cache key
   * @returns String data or `null` if nothing is cached
   */
  async get (key: string): Promise<string | null> {
    await this.ready;
    const item = this.cache?.get(key);
    if (item && item.expires > Date.now()) {
      return item.value;
    }
    return null;
  }

  /**
   * Remove cache data value based on provided key
   * @param key Cache key
   * @returns {void}
   */
  async remove (key: string): Promise<void> {
    this.cache?.delete(key);
    this.storage.removeItem(key);
  }

  /**
   * Clear all memory cache
   * @returns String data or `null` if nothing is cached
   */
  async clear (): Promise<void> {
    this.cache?.clear();
    this.storage.clear();
  }
}
