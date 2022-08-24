import type { CacheItem } from './interfaces/CacheItem';
import type { CacheStorage } from './interfaces/CacheStorage';
import { IndexedDBStorage } from './storages/indexeddb.js';
import { LocalStorage } from './storages/localstorage.js';

export type LocalCacheConfig = {
  storage: 'localstorage' | 'indexeddb';
};

/**
 * Stores data in a local cache that can be specified to be stored in localstorage or indexedDB.
 */
export class LocalCache {
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
    const options = Object.assign({}, config);
    switch (options.storage) {
      case 'indexeddb':
        this.storage = new IndexedDBStorage(name);
        break;
      case 'localstorage':
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
   * @returns Promise void
   */
  public async set (key: string, value: string, expires = 432000): Promise<void> {
    const modified = Date.now();
    const data = {
      value,
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
    const item = await this.storage.get(key) as CacheItem;
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
    await this.storage.remove(key);
  }

  /**
   * Clear all memory cache
   * @returns Promise void
   */
  public async clear (): Promise<void> {
    await this.storage.clear();
  }
}
