import { TimeoutTaskRunner } from '../async.js';
import { CacheMap } from './cache-map.js';
import { CacheLocalStorage } from './cache-localStorage';
import { CacheIndexedDBStorage } from './cache-indexeddb';

// caches

/**
 * Stores data in a local cache that can be specified to be stored in localstorage or indexedDB.
 */

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export class LocalCache {

  constructor (storage?: CacheIndexedDBStorage) {
    if (storage) {
      this.use(storage);
    }
  }

  public ready: Promise<boolean> | null = null;

  public restored = false;

  /**
  * Storage to store data
  */
  public storage!: CacheIndexedDBStorage;

  /**
   * Internal cache object
   */
  private cache: CacheMap | null | undefined;

  use (storage: CacheIndexedDBStorage) {
    this.storage = storage;

    // await delay(3000);
    this.ready = this.restore();
  }

  /**
   * Restore all data from storage to cache databases
   * @returns {boolean} restore result
   */
  async restore (): Promise<boolean> {
    // await delay(5000);
    // console.log('Delay 5 seconds');

    this.cache = await this.storage.restoreItems(this.storage.storeName);
    // eslint-disable-next-line no-console
    console.log('restored');
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
