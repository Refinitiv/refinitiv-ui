/* eslint-disable no-console */
console.time(`${window.name} Completed`);
import { CoreCache } from './core-cache.js';
import { CacheMessenger } from './messenger.js';
import type { CacheConfig } from './core-cache.js';
import type { CacheItem } from './interfaces/CacheItem';

export interface DistributedCacheConfig extends CacheConfig {
  // ! Test Compare two solution to notify before or after write to cache that affect to performance
  notification?: 'before' | 'after'
}

/**
 * Distribute cache across browsers windows, tabs, and iframes to reducing network requests
 */
export class DistributedCache extends CoreCache {

  /**
   * Cache messenger for distribute cache
   */
  protected messenger: CacheMessenger;

  /**
   * Constructor
   * @param name cache name
   * @param config cache configuration
   */
  constructor (name: string, config?: DistributedCacheConfig) {
    super(name, config);
    this.messenger = new CacheMessenger(name);
    this.messenger.onMessage = (message) => {
      const { key, value } = message;
      /**
       * Synchronize the item to active cache in storage by using data in the received message,
       * while the item writing to the browser storage by the sender
       */
      if (!this.storage.hasActive(key)) {
        console.log(`${window.name} %c Sync cache %c with received message %c ${key.split('/').pop() || ''} ${Date.now()}`, 'background: magenta; color: white', '', '');
        this.setActiveCache(key, value);
      }
    };
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
      this.messenger.addRequest(key);
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
      this.messenger.notify(key, cacheValue);
    }

    await this.storage.set(key, data);

    if (notification === 'after') {
      this.messenger.notify(key, cacheValue);
    }
  }

  /**
   * Caches a value to active cache without writing to storage
   * @param key Cache key
   * @param value Data to store in cache
   * @param [expires=432000] Cache expiry in seconds. Defaults to 5 days.
   * @returns {void}
   */
  public setActiveCache (key: string, value: string | Promise<string | undefined>, expires = 432000): void {
    const modified = Date.now();
    const data = {
      value: value,
      modified: Date.now(),
      expires: modified + expires * 1000
    };

    this.storage.setActive(key, data);
  }

  /**
   * Returns cache data value based on provided key
   * @param key Cache key
   * @returns Promise string data or `null` if nothing is cached
   */
  public async get (key: string): Promise<string | null> {
    const iconName: string = key.split('/').pop() || '';
    const item = await this.storage.get(key) as CacheItem;

    if (item && item.expires > Date.now()) {
      return item.value;
    }

    // Check src is already requested
    if (!this.messenger.hasRequest(key)) {
      console.log(`${window.name} %c Request %c ${iconName} ${Date.now()}`, 'background: blue; color: white', '');
      return null;
    }
    else {
      return new Promise<string | null>(resolve => {
        // Add to waiting list
        console.log(`${window.name} %c Wait %c ${iconName} ${Date.now().toString()}`, 'background: orange; color: white', '');
        this.messenger.wait(key, resolve);
      });
    }
  }
}
