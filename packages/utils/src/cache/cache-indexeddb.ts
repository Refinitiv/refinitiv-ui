import { openDB, DBSchema, IDBPDatabase } from 'idb';
import type { CacheStorage, CacheItem, CacheMap, CacheIndexedDBStorageConfig } from './types';

interface IndexedDBDatabase extends DBSchema {
  [key: string]: {
    key: string;
    value: CacheItem;
  }
}

/**
 * Stores data in indexedDB for use across multiple sessions.
 */
export class CacheIndexedDBStorage implements CacheStorage {

  /**
   * A connection to a indexedDB database, use for open transaction or idb api
   */
  public db: IDBPDatabase<IndexedDBDatabase> | undefined;

  /**
   * Database name
   */
  public dbName: string;

  /**
   * Database Version.
   */
  public version: number;

  /**
   * Store name
   */
  public storeName: never;

  constructor (info: CacheIndexedDBStorageConfig) {
    const { dbName, version, storeName } = info;
    this.dbName = dbName;
    this.version = version;
    this.storeName = storeName as never;
  }

  /**
   * Returns Error message when unable to connect indexedDB
   * @returns Error message
   */
  private get failConnectMessage (): Error {
    return new Error(`Unable to connect to indexedDB.\n Name:'${this.dbName}'.\nVersion: ${this.version}\Store: ${String(this.storeName)}`);
  }

  /**
   * Open connection to indexedDB.
   * @returns {void}
   */
  private async open (): Promise<void> {
    this.db = await openDB<IndexedDBDatabase>(this.dbName, this.version, {
      upgrade: (db) => { // Call when no database or found new version
        db.createObjectStore(this.storeName);
      },
      blocked: () => {
        throw this.failConnectMessage;
      },
      blocking: () => {
        throw this.failConnectMessage;
      },
      terminated: () => {
        throw this.failConnectMessage;
      }
    });
  }

  /**
   * Returns all value in this storage
   * @param store Store name
   * @returns {void}
   */
  async restoreItems (): Promise<CacheMap> {
    await this.open();
    const cacheItems = new Map() as CacheMap;
    let cursor = await this.db?.transaction(this.storeName, 'readonly').store.openCursor();
    while (cursor) {
      cacheItems.set(cursor.key, cursor.value);
      cursor = await cursor.continue();
    }
    return cacheItems;
  }

  /**
   * Set a value against a key to this storage
   * @param key a
   * @param value a
   * @returns {void}
   */
  async setItem (key: string, value: CacheItem): Promise<void> {
    const item = { ...value, key };
    await this.db?.put(this.storeName, item, key);
  }

  /**
   * Returns the value in this storage that matched by the key.
   * @param key Row key
   * @returns {CacheItem | null} value in the row
   */
  async getItem (key: string): Promise<CacheItem | null> {
    return await this.db?.get(this.storeName, key) || null;
  }

  /**
   * Remove a value against a key to this storage
   * @param key Row key
   * @returns {void}
   */
  async removeItem (key: string): Promise<void> {
    await this.db?.delete(this.storeName, key);
  }

  /**
   * Clear all values in this storage
   * @returns {void}
   */
  async clear (): Promise<void> {
    await this.db?.clear(this.storeName);
  }
}
