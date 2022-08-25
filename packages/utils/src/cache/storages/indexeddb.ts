import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { CacheMap } from '../types';
import type { CacheItem } from '../interfaces/CacheItem';
import type { CacheStorage } from '../interfaces/CacheStorage';
import { StoragePrefix } from '../constants.js';
import { getItemKey } from '../helpers.js';

interface IndexedDBDatabase extends DBSchema {
  [key: StoreName]: {
    key: string;
    value: CacheItem;
  }
}

/**
 * Literal type for dynamic store name casting to idb
 */
type StoreName = `[${StoragePrefix.DEFAULT}][${string}]`;

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
export class IndexedDBStorage implements CacheStorage {
  /**
   * Database name.
   */
  protected dbName: StoreName;

  /**
   * IDB's database instance
   */
  private db: IDBPDatabase<IndexedDBDatabase> | undefined;

  /**
   * Database version
   */
  private version = 1;

  /**
   * Internal cache object
   */
  protected cache: CacheMap | null | undefined;

  /**
   * Flag to check if cache database is ready to use
   */
  protected ready: Promise<boolean> | null = null;

  /**
   * Constructor
   * @param name database name
   */
  constructor (name: string) {
    this.dbName = `[${StoragePrefix.DEFAULT}][${name}]`;
    void this.open();
  }

  /**
   * Set item against a key
   * @param key item key
   * @param value item value
   * @returns {void}
   */
  public async set (key: string, value: CacheItem): Promise<void> {
    await this.ready;
    const itemKey = getItemKey(this.dbName, key);
    const item = { ...value, itemKey };
    this.cache?.set(itemKey, item);
    await this.db?.put(this.dbName, item, itemKey);
  }

  /**
   * Returns an item from cache database using provided key
   * @param key item key
   * @returns CacheItem or `null` if nothing is cached
   */
  public async get (key: string): Promise<CacheItem | null> {
    await this.ready;
    const itemKey = getItemKey(this.dbName, key);
    return this.cache?.get(itemKey) || null;
  }

  /**
   * Removes an item from cache database using provided key
   * @param key item key
   * @returns {void}
   */
  public async remove (key: string): Promise<void> {
    await this.ready;
    const itemKey = getItemKey(this.dbName, key);
    this.cache?.delete(itemKey);
    await this.db?.delete(this.dbName, itemKey);
  }

  /**
   * Clears all items in this storage
   * @returns {void}
   */
  public async clear (): Promise<void> {
    await this.ready;
    this.cache?.clear();
    await this.db?.clear(this.dbName);
  }

  /**
   * Restores all values into memory cache
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
