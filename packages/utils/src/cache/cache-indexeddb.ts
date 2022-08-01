import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type {
  CacheStorage,
  CacheItem,
  CacheMap,
  CacheIndexedDBStorageConfig
} from './types';

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

  /**
   * Constructor
   * @param info Storage config
   */
  constructor (info: CacheIndexedDBStorageConfig) {
    const { dbName, version, storeName } = info;
    this.dbName = dbName;
    this.version = version;
    this.storeName = storeName as never;
  }

  /**
   * Set a item against a key to this storage
   * @param key item key
   * @param value item value
   * @returns {void}
   */
  public async setItem (key: string, value: CacheItem): Promise<void> {
    !this.db && await this.open();
    const item = { ...value, key };
    await this.db?.put(this.storeName, item, key);
  }

  /**
   * Returns a item in this storage that matched by the key.
   * @param key item key
   * @returns cache item or null
   */
  public async getItem (key: string): Promise<CacheItem | null> {
    !this.db && await this.open();
    return await this.db?.get(this.storeName, key) || null;
  }

  /**
   * Remove a item against a key to this storage
   * @param key item key
   * @returns {void}
   */
  public async removeItem (key: string): Promise<void> {
    !this.db && await this.open();
    await this.db?.delete(this.storeName, key);
  }

  /**
   * Clear all item in this storage
   * @returns {void}
   */
  public async clear (): Promise<void> {
    !this.db && await this.open();
    await this.db?.clear(this.storeName);
  }

  /**
   * Returns all items in this storage
   * @param store Store name
   * @returns items map
   */
  public async restoreItems (): Promise<CacheMap> {
    !this.db && await this.open();
    const cacheItems = new Map() as CacheMap;
    let cursor = await this.db?.transaction(this.storeName, 'readonly').store.openCursor();
    while (cursor) {
      cacheItems.set(cursor.key, cursor.value);
      cursor = await cursor.continue();
    }
    return cacheItems;
  }

  /**
   * Open connection to indexedDB.
   * @returns {void}
   */
  private async open (): Promise<void> {
    if (this.db) {
      return;
    }

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
   * Returns Error message when unable to connect indexedDB
   * @returns Error message
   */
  private get failConnectMessage (): Error {
    return new Error(`Unable to connect to indexedDB.\n Name:'${this.dbName}'.\nVersion: ${this.version}\Store: ${String(this.storeName)}`);
  }
}
