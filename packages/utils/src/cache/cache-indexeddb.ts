import { CacheStorage } from './CacheStorage.js';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { CacheItem, DBValue, DBValueMap } from './cache-item';

interface DBInfo {
  dbName: string;
  version: number;
  storeName: never;
}

interface IconDB extends DBSchema {
  [key: string]: {
    key: string;
    value: DBValue;
  }
}


/**
 * Stores data in indexedDB for use across multiple sessions.
 */
export class CacheIndexedDBStorage implements CacheStorage {

  /**
   * A connection to a indexedDB database, use for open transaction or idb api
   */
  private db: IDBPDatabase<IconDB> | undefined;

  /**
   * Database name
   */
  public dbName: string;

  /**
   * Database Version.
   */
  private version: number;

  /**
   * Store name
   */
  public storeName: never;

  constructor (info: DBInfo) {
    const { dbName, version, storeName } = info;
    this.dbName = dbName;
    this.version = version;
    this.storeName = storeName;
  }

  /**
   * Open connection to indexedDB.
   * @returns {void}
   */
  private async open (): Promise<void> {
    this.db = await openDB<IconDB>(this.dbName, this.version, {
      upgrade: (db) => { // Call when no database or found new version
        db.createObjectStore(this.storeName as unknown as never);
      }
    });
  }

  /**
   * Returns all value in this storage
   * @param store Store name
   * @returns {void}
   */
  async restoreItems (): Promise<DBValueMap> {
    await this.open();
    const cacheItems = new Map<string, DBValue>();
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
  setItem (key: string, value: CacheItem): void {
    const item = { ...value, key };
    void this.db?.put(this.storeName, item, key);
  }

  /**
   * Returns the value in this storage that matched by the key.
   * @param key Row key
   * @returns {DBValue | null} value in the row
   */
  async getItem (key: string): Promise<DBValue | null> {
    return await this.db?.get(this.storeName, key) || null;
  }

  /**
   * Remove a value against a key to this storage
   * @param key Row key
   * @returns {void}
   */
  removeItem (key: string): void {
    void this.db?.delete(this.storeName, key);
  }

  /**
   * Clear all values in this storage
   * @returns {void}
   */
  clear (): void {
    void this.db?.clear(this.storeName);
  }
}
