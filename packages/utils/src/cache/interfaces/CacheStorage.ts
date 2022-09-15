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
   * Set a value to active cache
   */
  setActive(key: string, value: unknown): Promise<void>;

  /**
   * Check a value is in active cache
   */
  hasActive(key: string): Promise<boolean>;

  /**
   * Remove a value against a key
   */
  remove(key: string): Promise<void>;

  /**
   * Clear all values in this storage
   */
  clear(): Promise<void>;
}
