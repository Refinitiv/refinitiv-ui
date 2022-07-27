import type { CacheMap, CacheStorage } from './types';

/**
 * Stores data in a local cache that can be specified to be stored in localstorage or indexedDB.
 */
export class LocalCache {

  /**
   * Cache ready to use
   */
  public ready: Promise<boolean> | null = null;

  /**
   * Storage to store data
   */
  public storage!: CacheStorage;

  /**
   * Internal cache object
   */
  private cache: CacheMap | null | undefined;

  constructor (storage: CacheStorage) {
    this.use(storage);
  }

  /**
   * Set storage to the local cache
   * @param storage cache storage
   * @returns {void}
   */
  protected use (storage: CacheStorage): void {
    this.storage = storage;
    this.ready = this.restore();
  }

  /**
   * Restore all data from storage to cache databases
   * @returns {boolean} restore result
   */
  async restore (): Promise<boolean> {
    this.cache = await this.storage.restoreItems() as CacheMap;
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
    await this.ready;
    const modified = Date.now();
    const data = {
      value,
      modified,
      expires: modified + expires * 1000
    };
    this.cache?.set(key, data);
    await this.storage.setItem(key, data);
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
      return Promise.resolve(item.value);
    }
    return Promise.resolve(null);
  }

  /**
   * Remove cache data value based on provided key
   * @param key Cache key
   * @returns {void}
   */
  async remove (key: string): Promise<void> {
    await this.ready;
    this.cache?.delete(key);
    await this.storage.removeItem(key);
  }

  /**
   * Clear all memory cache
   * @returns {void}
   */
  async clear (): Promise<void> {
    await this.ready;
    this.cache?.clear();
    await this.storage.clear();
  }
}
