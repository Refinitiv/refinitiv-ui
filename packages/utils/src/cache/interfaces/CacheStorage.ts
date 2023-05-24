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
  set(key: string, value: unknown): Promise<void>;

  /**
   * Returns the value in this storage that matched by the key.
   */
  get(key: string): Promise<unknown | null>;

  /**
   * Remove a value against a key
   */
  remove(key: string): Promise<void>;

  /**
   * Clear all values in this storage
   */
  clear(): Promise<void>;
}
