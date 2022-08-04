import type { CacheMap, CacheStorage } from './types';

const errorMessage = (storage: CacheStorage) => `API is fail. Unable to use the ${storage.constructor.name} storage`;

/**
 * Stores data in a local cache that can be specified to be stored in localstorage or indexedDB.
 */
export class LocalCache {

  /**
   * Cache ready to use
   */
  protected ready: Promise<boolean> | null = null;

  /**
   * Storage to store data
   */
  protected storage!: CacheStorage;

  /**
   * Internal cache object
   */
  protected cache: CacheMap | null | undefined;

  constructor (storage: CacheStorage) {
    this.use(storage);
  }

  /**
   * Set storage to the local cache
   * @param storage cache storage
   * @returns {void}
   */
  protected use (storage: CacheStorage): void {
    this.storage = storage;
    this.ready = this.restore();
  }

  /**
   * Restore all data from storage to cache databases
   * @returns Promise boolean
   */
  public async restore (): Promise<boolean> {
    try {
      this.cache = await this.storage.restoreItems() as CacheMap;
      return true;
    }
    catch (e) { // Keep it work. Even if can't connect to storage
      this.cache = new Map();
      // eslint-disable-next-line no-console
      console.error(e);
      return false;
    }
  }

  /**
   * Wrapper to use the storage api to handle error if the storage isn't ready
   * @param callback callback if storage is ready
   * @param errorMessage message if storage isn't ready
   * @returns Promise void
   */
  private async usingStorageAPI (callback: () => Promise<void>, errorMessage?: string):Promise<void> {
    if (await this.ready) {
      await callback();
    }
    else {
      // eslint-disable-next-line no-console
      console.warn(errorMessage);
    }
  }

  /**
   * Caches a value against a key to use until expired
   * @param key Cache key
   * @param value Data to store in cache
   * @param [expires=432000] Cache expiry in seconds. Defaults to 5 days.
   * @returns Promise void
   */
  public async set (key: string, value: string, expires = 432000): Promise<void> {
    const modified = Date.now();
    const data = {
      value,
      modified,
      expires: modified + expires * 1000
    };
    this.cache?.set(key, data);
    await this.usingStorageAPI(async () => await this.storage.setItem(key, data), errorMessage(this.storage));
  }

  /**
   * Returns cache data value based on provided key
   * @param key Cache key
   * @returns Promise string data or `null` if nothing is cached
   */
  public async get (key: string): Promise<string | null> {
    await this.ready;

    const item = this.cache?.get(key);
    if (item && item.expires > Date.now()) {
      return Promise.resolve(item.value);
    }
    return Promise.resolve(null);
  }

  /**
   * Remove cache data value based on provided key
   * @param key Cache key
   * @returns Promise void
   */
  public async remove (key: string): Promise<void> {
    this.cache?.delete(key);
    await this.usingStorageAPI(async () => await this.storage.removeItem(key), errorMessage(this.storage));
  }

  /**
   * Clear all memory cache
   * @returns Promise void
   */
  public async clear (): Promise<void> {
    this.cache?.clear();
    await this.usingStorageAPI(async () => await this.storage.clear(), errorMessage(this.storage));
  }
}
