import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { CacheItem } from './cache-item';

interface DBInfo {
  dbName: string;
  version: number;
  storeName: never;
}

type IconDBValueMap = Map<string, IconDBValue>;
interface IconDBValue {
  value: string;
  key: string;
  expires: number;
  modified: number;
}
interface IconDB extends DBSchema {
  [key: string]: {
    key: string;
    value: IconDBValue;
  }
}


/**
 * a
 */
export class CacheIndexedDBStorage {
  /**
   * a
   */
  private db: IDBPDatabase<IconDB> | undefined;

  /**
   * a
   */
  public dbName: string;

  /**
   * a
   */
  private version: number;

  /**
   * a
   */
  public storeName: never;

  constructor (info: DBInfo) {
    const { dbName, version, storeName } = info;
    this.dbName = dbName;
    this.version = version;
    this.storeName = storeName;
  }

  private async open (): Promise<void> {
    this.db = await openDB<IconDB>(this.dbName, this.version, {
      upgrade: (db) => {
        db.createObjectStore(this.storeName as unknown as never);
      }
    });
  }

  /**
   * R
   * @param store Store name
   * @returns {void}
   */
  async restoreItems (store: string): Promise<IconDBValueMap> {
    await this.open();
    const items = await this.db?.getAll(store as unknown as never) || [];
    const cacheItems = new Map();
    for (const item of items) {
      cacheItems.set(item.key, item);
    }
    console.log(cacheItems);

    return cacheItems;
  }

  /**
   * C
   * @param store a
   * @param key a
   * @param value a
   * @returns {void}
   */
  set (store: string, key: string, value: CacheItem): void {
    const item = { ...value, key };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    void this.db?.put(store as unknown as never, item, key);
  }

  /**
   * R
   * @param store a
   * @param key a
   * @returns S
   */
  async get (store: string, key: string): Promise<IconDBValue | null> {
    return await this.db?.get(store as unknown as never, key) || null;
  }

}
