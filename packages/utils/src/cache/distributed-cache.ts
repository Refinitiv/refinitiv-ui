/* eslint-disable no-console */
console.time(`${window.name} Completed`);
import { CacheCore } from './cache-core.js';
import { CacheMessenger } from './messenger.js';
import type { CacheConfig } from './cache-core.js';
import type { CacheItem } from './interfaces/CacheItem';

export interface DistributedCacheConfig extends CacheConfig {
  // ! Test Compare two solution to notify before or after write to cache that affect to performance
  notification?: 'before' | 'after'
}

/**
 * Distribute cache across browsers windows, tabs, and iframes to reducing network requests
 */
export class DistributedCache extends CacheCore {

  protected messenger?: CacheMessenger;

  constructor (name: string, config?: DistributedCacheConfig) {
    super(name, config);
    this.messenger = new CacheMessenger(name);
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
}
