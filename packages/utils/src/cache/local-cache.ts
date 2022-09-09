/* eslint-disable no-console */
console.time(`${window.name} Completed`);
import type { CacheItem } from './interfaces/CacheItem';
import type { CacheStorage } from './interfaces/CacheStorage';
import { IndexedDBStorage } from './storages/indexeddb.js';
import { LocalStorage } from './storages/localstorage.js';
import { CacheMessenger } from './messenger.js';

export type LocalCacheConfig = {
  storage: 'localstorage' | 'indexeddb';
  distribution?: boolean
};

/**
 * Cache utility that simplifies, unifies and enhances native browser storage.
 */
export class LocalCache {
  /**
   * Storage to store data
   */
  protected storage!: CacheStorage;

  protected messenger?: CacheMessenger;

  constructor (name: string, config?: LocalCacheConfig) {

    if (typeof name !== 'string') {
      throw new TypeError('Expected name to be of type string');
    }
    if (name.length === 0) {
      throw new RangeError('Expected name to have a length');
    }

    if (config?.distribution) {
      this.messenger = new CacheMessenger(name);
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
   * @param notification notify new cache message via BroadCast Channel API
   * @returns {void}
   */
  public async set (key: string, value: string | Promise<string | undefined>, expires = 432000, notification: 'before' | 'after' = 'before'): Promise<void> {

    let cacheValue: string;
    if (value instanceof Promise) {
      this.messenger?.addRequest(key);
      cacheValue = await value.then(item => item || '');
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

    if (notification === 'before') {
      this.messenger?.notify(key, cacheValue);
    }

    await this.storage.set(key, data);

    if (notification === 'after') {
      this.messenger?.notify(key, cacheValue);
    }
  }

  /**
   * Returns cache data value based on provided key
   * @param key Cache key
   * @returns Promise string data or `null` if nothing is cached
   */
  public async get (key: string): Promise<string | null> {
    const iconName: string = key.split('/').pop() || '';
    const item = await this.storage.get(key) as CacheItem;

    // if (key.includes('3d')) {
    //   console.log('3d data', item, iconName, key);
    // }

    if (item && item.expires > Date.now()) {
      // console.log(window.name, 'use cache', iconName, item.value);
      return item.value;
    }

    // Check src is already requested
    if (!this.messenger || !this.messenger.hasRequest(key)) {
      console.log(`${window.name} %c Request %c ${iconName} ${Date.now()}`, 'background: blue; color: white', '');
      return null;
    }
    else if (this.messenger.hasMessage(key)) {
      console.log(`${window.name} %c Get from Messages Cache %c ${iconName}`, 'background: pink; color: white', '');
      /**
       * Check data in messageCached before add to wating list
       * to prevent the case send message before init the listener
       */
      return this.messenger.getMessage(key);
    }
    else {
      const messenger = this.messenger;
      return new Promise<string | null>(resolve => {
        // Add to waiting list
        console.log(`${window.name} %c Wait %c ${iconName} ${Date.now().toString()}`, 'background: orange; color: white', '');
        messenger.wait(key, resolve);
      });
    }
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
