import { TimeoutTaskRunner } from '../async.js';
import { CacheMap } from './cache-map.js';
import { CacheLocalStorage } from './cache-localStorage';
import { CacheIndexedDBCache } from './cache-indexeddb';


// caches

/**
 * Stores data in a local cache that can be specified to be stored in localstorage or indexedDB.
 */

export class LocalCache {

  constructor () {
    // this.storage = storage;
    // void this.restore();
  }

  // use (storage: CacheStorage): void {
  // this.storage = storage1;
  // this.cache = caches.get(storage1)
  // if(!caches.get(storage1)) caches.set(storage1)
  // }

  /**
  * Storage to store data
  */
  public storage!: CacheIndexedDBCache;

  /**
   * Internal cache object
   */
  private cache: CacheMap | null | undefined;

  async use (storage: CacheIndexedDBCache) {
    this.storage = storage;
    return await this.restore();
  }

  /**
   * Restore all data from storage to cache databases
   * @returns {void}
   */
  async restore (): Promise<void> {
    this.cache = await this.storage.restoreItems(this.storage.storeName);
    // eslint-disable-next-line no-console
    console.log('after async restore', this.cache.get('https://cdn.refinitiv.net/public/libs/elf/assets/elf-theme-halo/resources/icons/tick.svg'));
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
    this.storage.set(this.storage.storeName, key, data);
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

}
