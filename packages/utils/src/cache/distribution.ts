import { CACHE_PREFIX } from './constants.js';
import type { CacheStorage } from './interfaces/CacheStorage';
import { CacheMessenger, type Message } from './messenger.js';
import { Coordinator } from './coordinator.js';

export type DistributionState = {
  loading: `${string}[loading]`,
  unloaded: `${string}[unloaded]`
};

export class Distribution {

  protected lockRequests = new Map<string, boolean>();

  /**
   * Storage to store data
   */
  protected storage!: CacheStorage;

  /**
   * Cache messenger for distribute cache
   */
  protected requestMsg: CacheMessenger;

  /**
   * Cache messenger for distribute cache
   */
  protected cacheMsg: CacheMessenger;

  /**
   * Names for manage all states temporary
   */
  public state: DistributionState;

  private coordinator: Coordinator;

  /**
   * List of promise needed be resolved by messaging
   */
  protected resolvePool = new Map<string, CallableFunction>();

  constructor (name: string, storage: CacheStorage) {
    const stateName = `[${CACHE_PREFIX}][${name}]`;
    
    this.requestMsg = new CacheMessenger(`${name}-request`);
    this.cacheMsg = new CacheMessenger(`${name}-cache`);
    this.storage = storage;
    this.state = {
      loading: `${stateName}[loading]`,
      unloaded: `${stateName}[unloaded]`
    };
    this.listen();
    this.coordinator = new Coordinator(stateName);
  }
  private listen (): void {
    this.requestMsg.onMessage = (message: Message) => {
      const { key, value } = message;
      if (this.coordinator.isReceiver(key)) {
        const requester = key.split('|')[1];
        if (this.resolvePool.has(value) && !this.lockRequests.has(value)) {
          const resolve = this.resolvePool.get(value);
          if (resolve) {
            this.lockRequest(value);
            resolve(null);
          }
        }
        else if (!this.lockRequests.has(value)) {
          this.lockRequest(value);
          this.requestMsg.notify(`${requester}|${this.coordinator.id}`, value);
        }
      }
    };

    this.cacheMsg.onMessage = (message: Message) => {
      const { key, value } = message;
      if (!this.storage.hasActive(key)) {
        this.setActiveCache(key, value);
      }
      if (this.resolvePool.has(key)) {
        const resolve = this.resolvePool.get(key);
        if (resolve) {
          resolve(value);
          // Clean request state and waiting list from key
          this.resolvePool.delete(key);
          this.lockRequests.delete(key);
        }
      }
    };
  }

  public processRequest (key: string, resolve: CallableFunction): void {
    const loadingKey = `${this.state.loading}-${key}`;
    const isLoading = localStorage.getItem(loadingKey);
    if (this.coordinator.isHost() && !this.resolvePool.has(key) && !this.lockRequests.has(key)) {
      if (!isLoading) {
        localStorage.setItem(loadingKey, 'true');
        this.lockRequest(key);
        resolve(null);
      }
      else {
        this.resolvePool.set(key, resolve);
      }
    }
    else if (!this.resolvePool.has(key)) {
      this.resolvePool.set(key, resolve);
      if (!isLoading) {
        localStorage.setItem(loadingKey, 'true');
        this.requestMsg.notify(`${this.coordinator.getHost()}|${this.coordinator.id}`, key);
      }
    }
  }

  public messageCache (key: string, value: string): void {
    this.setActiveCache(key, value);
    this.resolvePool.delete(key);
    this.cacheMsg.notify(key, value);
  }

  /**
   * Caches a value to memory cache without writing to storage
   * @param key Cache key
   * @param value Data to store in cache
   * @param [expires=432000] Cache expiry in seconds. Defaults to 5 days.
   * @returns {void}
   */
  public setActiveCache (key: string, value: string, expires = 432000): void {
    const modified = Date.now();
    const data = {
      value: value,
      modified: Date.now(),
      expires: modified + expires * 1000
    };
    this.storage.setActive(key, data);
  }

  private lockRequest (key: string): void {
    this.lockRequests.set(key, true);
  }
}
