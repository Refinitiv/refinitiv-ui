import type { CacheItem } from '../interfaces/CacheItem';
import type { CacheStorage } from '../interfaces/CacheStorage';
import { DatabasePrefix } from '../constants.js';

/**
 * Returns a string used for the key
 * @param prefix prefix from default
 * @param cacheKey user input key
 * @returns string key for item
 */
const getItemKey = (prefix: string, cacheKey: string): string => `${prefix}[${cacheKey}]`;

/**
 * Stores data in `localStorage` for use across multiple sessions.
 */
export class LocalStorage<T = CacheItem> implements CacheStorage<T> {

  /**
   * Database name.
   */
  protected dbName = '';

  /**
   * Internal cache object
   */
  protected cache = new Map<string, T>();

  /**
   * Constructor
   * @param name name of the data store
   */
  constructor (name: string) {
    this.dbName = `[${DatabasePrefix.DEFAULT}][${name}]`;
    void this.getReady();
  }

  /**
   * Prepare memory cache variable and restore all data from databases storage
   * @returns Promise boolean
   */
  private async getReady (): Promise<void> {
    try {
      await this.restore();
    }
    catch (e) { // Keep it work. Even if can't connect to storage
      this.cache = new Map();
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  /**
   * Set a item against a key to this storage
   * @param key Cache key
   * @param value Data to store in cache
   * @returns {void}
   */
  public async set (key: string, value: T): Promise<void> {
    const itemKey = getItemKey(this.dbName, key);
    this.cache?.set(itemKey, value);

    try {
      localStorage.setItem(itemKey, JSON.stringify(value));
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.error(`Couldn't store at key: ${itemKey}.`, e);
    }
    return Promise.resolve();
  }

  /**
   * Set item to active cache without writting to storage
   * @param key item key
   * @param value item key
   * @returns {void}
   */
  public setActive (key: string, value: T): void {
    const item = { ...value, key };
    this.cache?.set(key, item);
  }

  /**
   * Check active cache has item
   * @param key item key
   * @returns true if found item in active cache
   */
  public hasActive (key: string): boolean {
    return this.cache?.has(key) || false;
  }

  /**
   * Returns an item from cache database using provided key
   * @param key Cache key
   * @returns CacheItem or `null` if nothing is cached
   */
  public async get (key: string): Promise<T | null> {
    const itemKey = getItemKey(this.dbName, key);
    return Promise.resolve(this.cache?.get(itemKey) || null);
  }

  /**
   * Removes an item from cache database using provided key
   * @param key Cache key to remove
   * @returns {void}
   */
  public async remove (key: string): Promise<void> {
    const itemKey = getItemKey(this.dbName, key);
    return Promise.resolve(localStorage.removeItem(itemKey));
  }

  /**
   * Clears all items in localStorage
   * @returns {void}
   */
  public async clear (): Promise<void> {
    const keys = Object.keys(localStorage);

    keys.filter(key => key.startsWith(this.dbName))
      .forEach(key => {
        localStorage.removeItem(key);
      });

    return Promise.resolve();
  }

  /**
   * Restores all values into memory cache
   * @param force overwrite item in active cache
   * @returns {void}
   */
  public async restore (force = false): Promise<void> {
    const keys = Object.keys(localStorage).filter(key => key.startsWith(this.dbName));

    for (let i = 0; i < keys.length; i += 1) {
      const item = this.retrieve(keys[i]);
      if (item) {
        /**
         * Need to merge restored items to exists active caches to prevent replace all
         */
        const active = this.hasActive(keys[i]);
        if (!active || active && force) {
          this.cache.set(keys[i], item);
        }
      }
    }
    return Promise.resolve();
  }

  /**
   * Retrieves cache item from localStorage
   * @param key key to retrieve value
   * @returns data from the key
   */
  private retrieve (key: string): T | null {
    try {
      return JSON.parse(localStorage.getItem(key) || '') as T;
    }
    catch (e) {
      return null;
    }
  }
}
