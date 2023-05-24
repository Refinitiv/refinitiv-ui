import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { CacheMap } from '../interfaces/CacheMap';
import type { CacheItem } from '../interfaces/CacheItem';
import type { CacheStorage } from '../interfaces/CacheStorage';
import { DatabasePrefix } from '../constants.js';

type DBName = `[${DatabasePrefix.DEFAULT}][${string}]`;

interface IndexedDBDatabase extends DBSchema {
  [key: DBName]: {
    key: string;
    value: CacheItem;
  }
}


/**
 * Returns Error message when unable to connect indexedDB
 * @param message error message
 * @param dbName database name
 * @returns Error message
 */
const errorMessage = (message: string, dbName: string): Error => {
  return new Error(`Unable to connect to indexedDB.\nAttempt connect database is name: ${dbName}. store: ${dbName}\n ${message}`);
};

/**
 * Stores data in indexedDB for use across multiple sessions.
 */
export class IndexedDBStorage implements CacheStorage {
  /**
   * Database name.
   */
  protected dbName: DBName;

  /**
   * IDB's database instance
   */
  private db: IDBPDatabase<IndexedDBDatabase> | undefined;

  /**
   * Database version
   */
  private readonly version = 1;

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
    this.dbName = `[${DatabasePrefix.DEFAULT}][${name}]`;
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
    const item = { ...value, key };
    this.cache?.set(key, item);
    await this.db?.put(this.dbName, item, key);
  }

  /**
   * Returns an item from cache database using provided key
   * @param key item key
   * @returns CacheItem or `null` if nothing is cached
   */
  public async get (key: string): Promise<CacheItem | null> {
    await this.ready;
    return this.cache?.get(key) || null;
  }

  /**
   * Removes an item from cache database using provided key
   * @param key item key
   * @returns {void}
   */
  public async remove (key: string): Promise<void> {
    await this.ready;
    this.cache?.delete(key);
    await this.db?.delete(this.dbName, key);
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
   * @returns {void}
   */
  public async restore (): Promise<void> {
    const cache: CacheMap = new Map();
    let cursor = await this.db?.transaction(this.dbName, 'readonly').store.openCursor();
    while (cursor) {
      cache.set(cursor.key, cursor.value);
      cursor = await cursor.continue();
    }
    this.cache = cache;
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
