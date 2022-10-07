import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { CacheItem } from '../interfaces/CacheItem';
import type { CacheStorage } from '../interfaces/CacheStorage';
import { DatabasePrefix } from '../constants.js';

type DBName = `[${DatabasePrefix.DEFAULT}][${string}]`;

interface IndexedDBDatabase<T> extends DBSchema {
  [key: DBName]: {
    key: string;
    value: T;
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
export class IndexedDBStorage<T = CacheItem> implements CacheStorage<T> {
  /**
   * Database name.
   */
  protected dbName: DBName;

  /**
   * IDB's database instance
   */
  private db: IDBPDatabase<IndexedDBDatabase<T>> | undefined;

  /**
   * Database version
   */
  private readonly version = 1;

  /**
   * Internal cache object
   */
  protected cache = new Map<string, T>();

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
   * @param value item key
   * @returns {void}
   */
  public async set (key: string, value: T): Promise<void> {
    await this.ready;
    const item = { ...value, key };
    this.cache?.set(key, item);
    await this.db?.put(this.dbName, item, key);
  }

  /**
   * Set item to active cache without writting to storage
   * @param key item key
   * @param value item key
   * @returns {void}
   */
  public setActive (key: string, value: T): void {
    const item = { ...value, key };
    this.cache?.set(key, item);
  }

  /**
   * Check active cache has item
   * @param key item key
   * @returns true if found item in active cache
   */
  public hasActive (key: string): boolean {
    return this.cache?.has(key) || false;
  }

  /**
   * Returns an item from cache database using provided key
   * @param key item key
   * @returns CacheItem or `null` if nothing is cached
   */
  public async get (key: string): Promise<T | null> {
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
   * @param force overwrite item in active cache
   * @returns {void}
   */
  public async restore (force = false): Promise<void> {

    let cursor = await this.db?.transaction(this.dbName, 'readonly').store.openCursor();
    while (cursor) {
      /**
       * Need to merge restored items to exists active caches to prevent replace all
       */
      const active = this.hasActive(cursor.key);
      if (!active || active && force) {
        this.cache.set(cursor.key, cursor.value);
      }
      cursor = await cursor.continue();
    }
  }

  /**
   * Open connection to indexedDB.
   * @returns {void}
   */
  private open (): void {
    if (this.db) {
      return;
    }

    this.ready = new Promise<boolean>((resolve) => {
      void openDB<IndexedDBDatabase<T>>(this.dbName, this.version, {
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
      }).then((db) => {
        this.db = db;
        void this.getReady().then(() => resolve(true));
      });
    });
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
