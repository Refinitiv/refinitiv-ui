import { IndexedDBStorage } from './storages/indexeddb.js';
import { LocalStorage } from './storages/localstorage.js';
import type { CacheStorage } from './interfaces/CacheStorage';

export interface LocalCacheConfig {
  storage: 'localstorage' | 'indexeddb';
}

/**
 * Cache utility that simplifies, unifies and enhances native browser storage.
 */
export abstract class LocalCache {
  /**
   * Storage to store data
   */
  protected storage!: CacheStorage;

  constructor (name: string, config?: LocalCacheConfig) {

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
  }

  /**
   * Caches a value against a key to use until expired
   * @param key Cache key
   * @param value Data to store in cache
   * @param [expires=432000] Cache expiry in seconds. Defaults to 5 days.
   * @returns {void}
   */
  public async set (key: string, value: string | Promise<string>, expires = 432000): Promise<void> {

    let cacheValue: string;
    if (value instanceof Promise) {
      cacheValue = await value;
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

    await this.storage.set(key, data);
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

    return null;
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
