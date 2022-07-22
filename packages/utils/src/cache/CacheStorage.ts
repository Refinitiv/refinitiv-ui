export interface CacheStorage {
  /**
   * Returns all values in this storage
   */
  restoreItems(): unknown;
  
  /**
   * Set a value against a key
   */
  setItem(key: string, value: unknown): void;
  /**
   * Returns the value in this storage that matched by the key.
   */
  getItem(key: string): unknown | null;

  /**
   * Remove a value against a key
   */
  removeItem(key: string): void;

  /**
   * Clear all values in this storage
   */
  clear(): void;
}
