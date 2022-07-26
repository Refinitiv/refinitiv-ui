import { TimeoutTaskRunner } from '../async.js';
import type { CacheItem, CacheStorage } from './types';

/**
 * Saves cache database in local storage
 * @param key key to save value
 * @param value Data to store
 * @returns {void}
 */
const save = (key: string, value: CacheItem): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  }
  catch (e) {
    const error = e as null | string | Error;
    const msg = typeof error === 'string' ? error : error ? error.message : 'unknown error';
    throw new Error(`Unable to store cache '${key}'.\n${msg}`);
  }
};

/**
 * Restores cache database from local storage
 * @param key key to retrieve value
 * @returns {unknown | null} data from the key
 */
const retrieve = (key: string):CacheItem | null => {
  try {
    return JSON.parse(localStorage.getItem(key) || '') as CacheItem;
  }
  catch (e) {
    return null;
  }
};


/**
 * Stores data in local storage for use across multiple sessions.
 */
export class CacheLocalStorage implements CacheStorage {
  /**
   * Task runner used to schedule save
   */
  private taskRunner = new TimeoutTaskRunner(1000);

  /**
   * Returns all values in localStorage
   * @returns {void}
   */
  async restoreItems (): Promise<Map<string, unknown>> {
    const items = new Map<string, unknown>();
    const keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
      items.set(keys[i], retrieve(String(keys[i])));
    }
    return Promise.resolve(items);
  }

  /**
   * Caches a value against a key to use until expired
   * @param key Cache key
   * @param value Data to store in cache
   * @returns {void}
   */
  async setItem (key: string, value: CacheItem): Promise<void> {
    return Promise.resolve(this.taskRunner.schedule(() => save(key, value)));
  }

  /**
   * Returns cache data value based on provided key
   * @param key Cache key
   * @returns String data or `null` if nothing is cached
   */
  async getItem (key: string): Promise<CacheItem | null> {
    return Promise.resolve(retrieve(key));
  }

  /**
   * Remove a value against a key in this storage
   * @param key Cache key to remove
   * @returns {void}
   */
  async removeItem (key: string): Promise<void> {
    return Promise.resolve(localStorage.removeItem(key));
  }

  /**
   * Clear all data in localStorage
   * @returns {void}
   */
  async clear (): Promise<void> {
    return Promise.resolve(localStorage.clear());
  }
}
