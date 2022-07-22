/**
 * Cache storage item
 */
export interface CacheItem {
  value: string;
  expires: number;
  modified: number;
}

/**
 * Value in each row
 */
export interface DBValue extends CacheItem {
  key: string
}

/**
 * All value in store into Map
 */
export type DBValueMap = Map<string, DBValue>;
