import { TimeoutTaskRunner } from '../async.js';
import { CacheStorage } from './CacheStorage';

/**
 * Saves cache database in local storage
 * @param key Key ley
 * @param value Data to store
 * @returns {void}
 */
const save = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  }
  catch (e) {
    const error = e as null | string | Error;
    const msg = typeof error === 'string' ? error : error ? error.message : 'unknown error';
    throw new Error(`Unable to store cache '${key}'.\n${msg}`);
  }
};

const get = (key: string):unknown | null => {
  try {
    return JSON.parse(localStorage.getItem(key) || '') as unknown;
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
  restoreItems (): Map<string, unknown> {
    const items = new Map<string, unknown>();
    const keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
      items.set(keys[i], get(String(keys[i])));
    }
    return items;
  }

  /**
   * Caches a value against a key to use until expired
   * @param key Cache key
   * @param value Data to store in cache
   * @returns {void}
   */
  setItem (key: string, value: unknown): void {
    this.taskRunner.schedule(() => save(key, value));
  }

  /**
   * Returns cache data value based on provided key
   * @param key Cache key
   * @returns String data or `null` if nothing is cached
   */
  getItem (key: string): unknown | null {
    return get(key);
  }

  /**
   * Remove a value against a key in this storage
   * @param key Cache key to remove
   * @returns {void}
   */
  removeItem (key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clear all data in localStorage
   * @returns {void}
   */
  clear (): void {
    localStorage.clear();
  }
}
