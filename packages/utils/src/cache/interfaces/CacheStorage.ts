/**
 * Structure for any local storage
 */
export interface CacheStorage {

  /**
   * Restore all values into memory cache
   */
  restore(): Promise<void>;

  /**
   * Set a value against a key
   */
  setItem(key: string, value: unknown): Promise<void>;

  /**
   * Returns the value in this storage that matched by the key.
   */
  getItem(key: string): Promise<unknown | null>;

  /**
   * Remove a value against a key
   */
  removeItem(key: string): Promise<void>;

  /**
   * Clear all values in this storage
   */
  clear(): Promise<void>;
}
