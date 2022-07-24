import { CacheMap } from './cache-map.js';
import { CacheStorage } from './CacheStorage.js';
import { CacheIndexedDBStorage } from './cache-indexeddb';
import { CacheLocalStorage } from './cache-localstorage.js';

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
    this.storage = storage;
    if (this.storage instanceof CacheLocalStorage) {
      this.storage = storage as CacheLocalStorage;
    }
    if (this.storage instanceof CacheIndexedDBStorage) {
      this.storage = storage as CacheIndexedDBStorage;
    }
    this.ready = this.restore();
  }

  /**
   * Restore all data from storage to cache databases
   * @returns {boolean} restore result
   */
  async restore (): Promise<boolean> {
    if (this.storage instanceof CacheLocalStorage) {
      this.cache = this.storage.restoreItems() as CacheMap;
    }
    if (this.storage instanceof CacheIndexedDBStorage) {
      this.cache = await (this.storage).restoreItems();
    }
    
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
  set (key: string, value: string, expires = 432000): void {
    const modified = Date.now();
    const data = {
      value,
      modified,
      expires: modified + expires * 1000
    };
    this.cache?.set(key, data);
    // TODO: any better type guard?
    (this.storage as CacheIndexedDBStorage).setItem(key, data);
  }

  /**
   * Returns cache data value based on provided key
   * @param key Cache key
   * @returns String data or `null` if nothing is cached
   */
  get (key: string): string | null {
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
  remove (key: string): void {
    this.cache?.delete(key);
    // TODO: any better type guard?
    (this.storage as CacheIndexedDBStorage).removeItem(key);
  }

  /**
   * Clear all memory cache
   * @param key Cache key
   * @returns String data or `null` if nothing is cached
   */
  clear (): void {
    this.cache?.clear();
    // TODO: any better type guard?
    (this.storage as CacheIndexedDBStorage).clear();
  }
}
