import type { CacheMap } from '../types';
import type { CacheItem } from '../interfaces/CacheItem';
import type { CacheStorage } from '../interfaces/CacheStorage';
import { StoragePrefix } from '../constants.js';
import { getItemKey } from '../helpers.js';

/**
 * Stores data in `localStorage` for use across multiple sessions.
 */
export class LocalStorage implements CacheStorage {

  /**
   * Database for this class. Prefix for key of all items.
   */
  protected dbName = '';

  /**
   * Internal cache object
   */
  protected cache: CacheMap | null | undefined;

  /**
   * Constructor
   * @param name prefix key for all item
   */
  constructor (name: string) {
    this.dbName = `[${StoragePrefix.DEFAULT}][${name}]`;
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
   * @returns Promise void
   */
  public async set (key: string, value: CacheItem): Promise<void> {
    const itemKey = getItemKey(this.dbName, key);
    this.cache?.set(itemKey, value);
    return Promise.resolve(localStorage.setItem(itemKey, JSON.stringify(value)));
  }

  /**
   * Returns a item in this storage that matched by the key.
   * @param key Cache key
   * @returns Promise string data or `null` if nothing is cached
   */
  public async get (key: string): Promise<CacheItem | null> {
    const itemKey = getItemKey(this.dbName, key);
    return Promise.resolve(this.cache?.get(itemKey) || null);
  }

  /**
   * Remove a item against a key to this storage
   * @param key Cache key to remove
   * @returns Promise void
   */
  public async remove (key: string): Promise<void> {
    const itemKey = getItemKey(this.dbName, key);
    return Promise.resolve(localStorage.removeItem(itemKey));
  }

  /**
   * Clear all items in localStorage
   * @returns Promise void
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
   * Restore all values into memory cache
   * @returns Promise void
   */
  public async restore (): Promise<void> {
    const items = new Map<string, CacheItem>();
    const keys = Object.keys(localStorage).filter(key => key.startsWith(this.dbName));

    for (let i = 0; i < keys.length; i += 1) {
      const item = this.retrieve(keys[i]);
      if (item) {
        items.set(keys[i], item);
      }
    }
    this.cache = items;
    return Promise.resolve();
  }

  /**
   * Retrieve cache item from localStorage
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
