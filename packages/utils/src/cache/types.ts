/**
 * Cache storage item
 */
export interface CacheItem {
  value: string;
  expires: number;
  modified: number;
}

/**
 * Cache database/map
 */
export type CacheMap = Map<string, CacheItem>;

export interface CacheStorage {
  /**
   * Returns all values in this storage
   */
  restoreItems(): Promise<unknown>;

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

export type LocalCacheConfig = {
  storage: string;
};
