import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { CacheMap } from '../types';
import type { CacheItem } from '../interfaces/CacheItem';
import type { CacheStorage } from '../interfaces/CacheStorage';
import { StoragePrefix } from '../constants.js';

interface IndexedDBDatabase extends DBSchema {
  [key: StoreName]: {
    key: string;
    value: CacheItem;
  }
}

/**
 * Literal type for dynamic store name casting to idb
 */
type StoreName = `${StoragePrefix.PREFIX}${string}`;

/**
 * Returns Error message when unable to connect indexedDB
 * Database and Store are same name. Version is 1. So don't try to log a real database config.
 * @param message error message
 * @param dbName database name
 * @returns Error message
 */
const errorMessage = (message: string, dbName: string): Error => {
  return new Error(`Unable to connect to indexedDB.\nAttempt connect database is name: ${dbName}. version: 1. store: ${dbName}\n ${message}`);
};

/**
 * Stores data in indexedDB for use across multiple sessions.
 */
export class CacheIndexedDBStorage implements CacheStorage {
  /**
   * Prefix for database name, and store name
   * to avoid database to clash with other storages.
   */
  protected dbName: StoreName;

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
    this.dbName = `${StoragePrefix.PREFIX}${(name || '')}`;
    void this.open();
  }

  /**
   * Set a item against a key to this storage
   * @param key item key
   * @param value item value
   * @returns {void}
   */
  public async set (key: string, value: CacheItem): Promise<void> {
    await this.ready;
    const item = { ...value, key };
    this.cache?.set(key, item);
    await this.db?.put(this.dbName, item, key);
  }

  /**
   * Returns a item in this storage that matched by the key.
   * @param key item key
   * @returns cache item or null
   */
  public async get (key: string): Promise<CacheItem | null> {
    await this.ready;
    return this.cache?.get(key) || null;
  }

  /**
   * Remove a item against a key to this storage
   * @param key item key
   * @returns {void}
   */
  public async remove (key: string): Promise<void> {
    await this.ready;
    this.cache?.delete(key);
    await this.db?.delete(this.dbName, key);
  }

  /**
   * Clear all items in this storage
   * @returns {void}
   */
  public async clear (): Promise<void> {
    await this.ready;
    this.cache?.clear();
    await this.db?.clear(this.dbName);
  }

  /**
   * Restore all values into memory cache
   * @returns Promise void
   */
  public async restore (): Promise<void> {
    const cacheItems = new Map() as CacheMap;
    let cursor = await this.db?.transaction(this.dbName, 'readonly').store.openCursor();
    while (cursor) {
      cacheItems.set(cursor.key, cursor.value);
      cursor = await cursor.continue();
    }
    this.cache = cacheItems;
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
      upgrade: (database) => {
        if (database.objectStoreNames.contains(this.dbName)) {
          database.deleteObjectStore(this.dbName);
        }
        database.createObjectStore(this.dbName);
      },
      blocked: () => {
        throw errorMessage(`blocked event called. The connection is blocked by other connection or your version (${this.version}) isn't matched.`, this.dbName);
      },
      blocking: () => {
        // eslint-disable-next-line no-console
        console.warn(`versionchange event called. The version of this ${String(this.dbName)} database has changed.`);
      },
      terminated: () => {
        throw errorMessage('close event called. The connection is unexpectedly closed.', this.dbName);
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
      await this.restore();
      return true;
    }
    catch (e) { // Keep it work. Even if can't connect to storage
      this.cache = new Map();
      return false;
    }
  }
}
