import { TimeoutTaskRunner } from '../async.js';
import { CacheMap } from './cache-map.js';

/**
 * Log of known top-level cache keys
 */
const keys = new Set<string>();

/**
 * Saves cache database in local storage
 * @param key Cache ley
 * @param cache Cache database
 * @returns {void}
 */
const save = (key: string, cache: CacheMap): void => {
  try {
    localStorage.setItem(key, JSON.stringify([...cache]));
  }
  catch (e) {
    const error = e as null | string | Error;
    const msg = typeof error === 'string' ? error : error ? error.message : 'unknown error';
    throw new Error(`Unable to store cache '${key}'.\n${msg}`);
  }
};

/**
 * Restores cache database from local storage
 * @param key Cache key
 * @returns Cache database
 */
const restore = (key: string): CacheMap => {
  let cache: CacheMap;
  try {
    const data = localStorage.getItem(key) || '[]';
    cache = new Map(JSON.parse(data) as []);
  }
  catch (e) {
    cache = new Map();
  }
  return cache;
};

/**
 * Stores data in local storage for use across multiple sessions.
 */

export class LocalCache {

  constructor (key: string) {
    if (!key || typeof key !== 'string') {
      throw new Error('Invalid cache key. Key must be a string and have a length.');
    }
    if (keys.has(key)) {
      throw new RangeError(`Cache key '${key}' has already been used.`);
    }
    keys.add(key);
    this.key = `ef-local-cache-${key}`;
    this.cache = restore(this.key);
  }

  /**
   * Cache key used for local storage instance
   */
  private key!: string;

  /**
   * Internal cache object
   */
  private cache: CacheMap;

  /**
   * Task runner used to schedule save
   */
  private taskRunner = new TimeoutTaskRunner(1000);

  /**
   * Reusable task for saving database to local storage
   * @returns {void}
   */
  private saveTask = () => save(this.key, this.cache);

  /**
   * Caches a value against a key to use until expired
   * @param key Cache key
   * @param value Data to store in cache
   * @param [expires=432000] Cache expiry in seconds. Defaults to 5 days.
   * @returns {void}
   */
  set (key: string, value: string, expires = 432000): void {
    const modified = Date.now();
    this.cache.set(key, {
      value,
      modified,
      expires: modified + expires * 1000
    });
    this.taskRunner.schedule(this.saveTask);
  }

  /**
   * Returns cache data value based on provided key
   * @param key Cache key
   * @returns String data or `null` if nothing is cached
   */
  get (key: string): string | null {
    const item = this.cache.get(key);
    if (item && item.expires > Date.now()) {
      return item.value;
    }
    return null;
  }

}
