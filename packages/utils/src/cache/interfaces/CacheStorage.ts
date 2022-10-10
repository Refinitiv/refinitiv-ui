import type { CacheItem } from './CacheItem.js';

/**
 * Structure for any local storage
 */
export interface CacheStorage<T = CacheItem> {

  /**
   * Restore all values into memory cache
   */
  restore(force?: boolean): Promise<void>;

  /**
   * Set a value against a key
   */
  set(key: string, value: T): Promise<void>;

  /**
   * Returns the value in this storage that matched by the key.
   */
  get(key: string): Promise<T | null>;

  /**
   * Set a value to memory cache
   */
  setActive(key: string, value: T): void;

  /**
   * Check a value is in memory cache
   */
  hasActive(key: string): boolean;

  /**
   * Remove a value against a key
   */
  remove(key: string): Promise<void>;

  /**
   * Clear all values in this storage
   */
  clear(): Promise<void>;
}
