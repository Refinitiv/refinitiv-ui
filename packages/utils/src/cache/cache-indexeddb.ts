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

const isFirefox = () => (/firefox/i).test(navigator.userAgent);

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

    if (!isFirefox()) {
      const databases = await window.indexedDB.databases();
      const found = databases.find(database => database.name === this.dbName);
      if (found && this.version < (found.version || 0)) {
        throw this.errorMessage(`Your version (${this.version}) is less than the existing version (${String(found.version)}).`);
      }
    }
    this.db = await openDB<IndexedDBDatabase>(this.dbName, this.version, {
      upgrade: (database) => {
        if (database.objectStoreNames.contains(this.storeName)) {
          database.deleteObjectStore(this.storeName);
        }
        database.createObjectStore(this.storeName);
      },
      blocked: () => {
        throw this.errorMessage(`blocked event called. The connection is blocked by other connection or your version (${this.version}) isn't matched.`);
      },
      blocking: () => {
        // eslint-disable-next-line no-console
        console.warn(`versionchange event called. The version of this ${this.dbName} database has changed.`);
      },
      terminated: () => {
        throw this.errorMessage('close event called. The connection is unexpectedly closed.');
      }
    });

    if (!this.db.objectStoreNames.contains(this.storeName)) { // must disconnect if the store doesn't contain
      this.db.close();
      throw this.errorMessage(`${String(this.storeName)} store doesn\'t exist in indexedDB. Please upgrade or delete the ${this.dbName} database.`);
    }
  }

  /**
   * Returns Error message when unable to connect indexedDB
   * @param message {String}
   * @returns Error message
   */
  private errorMessage (message: string): Error {
    return new Error(`Unable to connect to indexedDB.\nDatabase name:'${this.dbName}'.\nDatabase Version: ${this.version}\nStore name: ${String(this.storeName)}\n ${message}`);
  }
}
