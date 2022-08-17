import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type {
  CacheStorage,
  CacheItem,
  CacheMap
} from './types';
import { prefix } from './constant.js';

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
   * Prefix for all keys, database name, and store name
   */
  protected prefixKey = '';

  /**
   * A connection to a indexedDB database, use for open transaction or idb api
   */
  private db: IDBPDatabase<IndexedDBDatabase> | undefined;

  /**
   * Database Version.
   */
  private version = 1;

  /**
   * Internal cache object
   */
  protected cache: CacheMap | null | undefined;

  /**
   * Cache ready to use
   */
  protected ready: Promise<boolean> | null = null;

  /**
   * Constructor
   * @param name for database name and store name
   */
  constructor (name: string) {
    this.prefixKey = prefix + (name || '');
    void this.open();
  }

  /**
   * Set a item against a key to this storage
   * @param key item key
   * @param value item value
   * @returns {void}
   */
  public async setItem (key: string, value: CacheItem): Promise<void> {
    await this.ready;
    const item = { ...value, key };
    this.cache?.set(key, item);
    await this.db?.put(this.prefixKey as never, item, key);
  }

  /**
   * Returns a item in this storage that matched by the key.
   * @param key item key
   * @returns cache item or null
   */
  public async getItem (key: string): Promise<CacheItem | null> {
    await this.ready;
    return this.cache?.get(key) || null;
  }

  /**
   * Remove a item against a key to this storage
   * @param key item key
   * @returns {void}
   */
  public async removeItem (key: string): Promise<void> {
    await this.ready;
    this.cache?.delete(key);
    await this.db?.delete(this.prefixKey as never, key);
  }

  /**
   * Clear all item in this storage
   * @returns {void}
   */
  public async clear (): Promise<void> {
    await this.ready;
    this.cache?.clear();
    await this.db?.clear(this.prefixKey as never);
  }

  /**
   * Returns all items in this storage
   * @param store Store name
   * @returns items map
   */
  public async restoreItems (): Promise<CacheMap> {
    const cacheItems = new Map() as CacheMap;
    let cursor = await this.db?.transaction(this.prefixKey as never, 'readonly').store.openCursor();
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

    this.db = await openDB<IndexedDBDatabase>(this.prefixKey, this.version, {
      upgrade: (database) => {
        if (database.objectStoreNames.contains(this.prefixKey as never)) {
          database.deleteObjectStore(this.prefixKey as never);
        }
        database.createObjectStore(this.prefixKey as never);
      },
      blocked: () => {
        throw this.errorMessage(`blocked event called. The connection is blocked by other connection or your version (${this.version}) isn't matched.`);
      },
      blocking: () => {
        // eslint-disable-next-line no-console
        console.warn(`versionchange event called. The version of this ${this.prefixKey} database has changed.`);
      },
      terminated: () => {
        throw this.errorMessage('close event called. The connection is unexpectedly closed.');
      }
    });

    this.ready = this.getReady();
  }


  /**
   * Prepare memory cache variable and restore all data from databases storage
   * @returns Promise boolean
   */
  private async getReady (): Promise<boolean> {
    try {
      this.cache = await this.restoreItems();
      return true;
    }
    catch (e) { // Keep it work. Even if can't connect to storage
      this.cache = new Map();
      return false;
    }
  }

  /**
   * Returns Error message when unable to connect indexedDB
   * @param message {String}
   * @returns Error message
   */
  private errorMessage (message: string): Error {
    return new Error(`Unable to connect to indexedDB.\nDatabase name:'${this.prefixKey}'.\nDatabase Version: ${this.version}\nStore name: ${this.prefixKey}\n ${message}`);
  }
}
