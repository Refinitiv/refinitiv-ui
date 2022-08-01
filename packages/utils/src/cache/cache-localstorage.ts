import type { CacheItem, CacheMap, CacheStorage } from './types';

/**
 * Stores data in `localStorage` for use across multiple sessions.
 */
export class CacheLocalStorage implements CacheStorage {

  /**
   * Prefix for all keys
   */
  protected prefixKey = 'local-cache';

  /**
   * Constructor
   * @param prefixKey prefix key for all item
   */
  constructor (prefixKey?: string) {
    if (prefixKey) {
      this.prefixKey = prefixKey;
    }
  }

  /**
   * Set a item against a key to this storage
   * @param key Cache key
   * @param value Data to store in cache
   * @returns Promise void
   */
  public async setItem (key: string, value: CacheItem): Promise<void> {
    const itemKey = [this.prefixKey, key].join('-');
    return Promise.resolve(localStorage.setItem(itemKey, JSON.stringify(value)));
  }

  /**
   * Returns a item in this storage that matched by the key.
   * @param key Cache key
   * @returns Promise string data or `null` if nothing is cached
   */
  public async getItem (key: string): Promise<CacheItem | null> {
    const itemKey = [this.prefixKey, key].join('-');
    return Promise.resolve(this.retrieve(itemKey));
  }

  /**
   * Remove a item against a key to this storage
   * @param key Cache key to remove
   * @returns Promise void
   */
  public async removeItem (key: string): Promise<void> {
    const itemKey = [this.prefixKey, key].join('-');
    return Promise.resolve(localStorage.removeItem(itemKey));
  }

  /**
   * Clear all items in localStorage
   * @returns Promise void
   */
  public async clear (): Promise<void> {
    const prefixKey = this.prefixKey !== '' ? this.prefixKey + '-' : '';
    const keys = Object.keys(localStorage);

    keys.filter(key => key.startsWith(prefixKey))
      .forEach(key => {
        localStorage.removeItem(key);
      });

    return Promise.resolve();
  }

  /**
   * Returns all items in localStorage
   * @returns Promise CacheMap items
   */
  public async restoreItems (): Promise<CacheMap> {
    const prefixKey = this.prefixKey !== '' ? this.prefixKey + '-' : '';
    const regex = new RegExp(`^${prefixKey}`);

    const items = new Map() as CacheMap;
    const keys = Object.keys(localStorage).filter(key => key.startsWith(prefixKey));

    for (let i = 0; i < keys.length; i++) {
      const item = this.retrieve(keys[i]);
      if (item) {
        items.set(keys[i].replace(regex, ''), item);
      }
    }
    return Promise.resolve(items);
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
