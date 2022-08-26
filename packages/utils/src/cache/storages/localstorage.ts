import type { CacheMap } from '../interfaces/CacheMap';
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
export class LocalStorage implements CacheStorage {

  /**
   * Database name.
   */
  protected dbName = '';

  /**
   * Internal cache object
   */
  protected cache: CacheMap | null | undefined;

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
  public async set (key: string, value: CacheItem): Promise<void> {
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
   * Returns an item from cache database using provided key
   * @param key Cache key
   * @returns CacheItem or `null` if nothing is cached
   */
  public async get (key: string): Promise<CacheItem | null> {
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
   * @returns {void}
   */
  public async restore (): Promise<void> {
    const cache: CacheMap = new Map();
    const keys = Object.keys(localStorage).filter(key => key.startsWith(this.dbName));

    for (let i = 0; i < keys.length; i += 1) {
      const item = this.retrieve(keys[i]);
      if (item) {
        cache.set(keys[i], item);
      }
    }
    this.cache = cache;
    return Promise.resolve();
  }

  /**
   * Retrieves cache item from localStorage
   * @param key key to retrieve value
   * @returns data from the key
   */
  private retrieve (key: string): CacheItem | null {
    try {
      return JSON.parse(localStorage.getItem(key) || '') as CacheItem;
    }
    catch (e) {
      return null;
    }
  }
}
