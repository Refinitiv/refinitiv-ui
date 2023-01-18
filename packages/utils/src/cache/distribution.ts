import { CACHE_PREFIX } from './constants.js';
import type { CacheStorage } from './interfaces/CacheStorage';
import { CacheMessenger, type Message } from './messenger.js';
import { Coordinator } from './coordinator.js';

export type DistributionState = {
  locked: `${string}[locked]`,
  unloaded: `${string}[unloaded]`
};

export class Distribution {

  /**
   * List of locked request to prevent duplicate request
   */
  protected lockedRequests = new Map<string, boolean>();

  /**
   * Storage to store data
   */
  protected storage!: CacheStorage;

  /**
   * Request messenger for distribute cache
   */
  protected requestMsgr: CacheMessenger;

  /**
   * Cache messenger for distribute cache
   */
  protected cacheMsgr: CacheMessenger;

  /**
   * Names for manage all states temporary
   */
  public state: DistributionState;

  /**
   * Find coordinator host
   */
  private coordinator: Coordinator;

  /**
   * List of promise needed be resolved by messaging
   */
  protected waiting = new Map<string, CallableFunction>();

  constructor (name: string, storage: CacheStorage) {
    const stateName = `[${CACHE_PREFIX}][${name}]`;
    this.requestMsgr = new CacheMessenger(`${name}-request`);
    this.cacheMsgr = new CacheMessenger(`${name}-cache`);
    this.storage = storage;
    this.state = {
      locked: `${stateName}[locked]`,
      unloaded: `${stateName}[unloaded]`
    };
    this.listen();
    this.coordinator = new Coordinator(stateName);
  }
  private listen (): void {
    this.requestMsgr.onMessage = (message: Message) => {
      const { key, value } = message;
      const [requestType, receiver, requester] = key.split('|');
      if (this.coordinator.isReceiver(receiver)) {
        if (requestType === 'RequestLeader' && !this.lockedRequests.has(value)) {
          if (this.waiting.has(value)) {
            const resolve = this.waiting.get(value);
            if (resolve) {
              resolve(null);
            }
          }
          else {
            this.requestMsgr.notify(`LeaderRequest|${requester}|${this.coordinator.id}`, value);
          }
        }
        else if (requestType === 'LeaderRequest') {
          if (this.isRequestOwner(value, receiver)) {
            const resolve = this.waiting.get(value);
            if (resolve) {
              resolve(null);
            }
          }
          else {
            this.requestMsgr.notify(`LeaderRequest|${localStorage.getItem(`${this.state.locked}-${value}`) || ''}|${this.coordinator.id}`, value);
          }
        }
        this.lockLocalRequest(value);
      }
    };

    this.cacheMsgr.onMessage = (message: Message) => {
      const { key, value } = message;
      if (!this.storage.hasActive(key)) {
        this.setActiveCache(key, value);
      }
      if (this.waiting.has(key)) {
        const resolve = this.waiting.get(key);
        if (resolve) {
          resolve(value);
          // Clean request state and waiting list from key
          this.waiting.delete(key);
          this.lockedRequests.delete(key);
          localStorage.removeItem(`${this.state.locked}-${key}`);
        }
      }
    };
  }

  public processRequest (key: string, resolve: CallableFunction): void {
    if (!this.waiting.has(key)) {
      this.waiting.set(key, resolve);
    }
    if (!this.isLockedRequests(key)) {
      this.lockRequest(key);
      const isHost = this.coordinator.isHost();
      if (isHost) {
        resolve(null);
        return;
      }
      this.requestMsgr.notify(`RequestLeader|${this.coordinator.getHost()}|${this.coordinator.id}`, key);
    }
  }

  public messageCache (key: string, value: string): void {
    this.setActiveCache(key, value);
    this.waiting.delete(key);
    this.cacheMsgr.notify(key, value);
  }

  public isRequestOwner (key: string, id: string): boolean {
    return localStorage.getItem(`${this.state.locked}-${key}`) === id;
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
    this.lockLocalRequest(key);
    localStorage.setItem(`${this.state.locked}-${key}`, this.coordinator.id);
  }
  private lockLocalRequest (key: string): void {
    this.lockedRequests.set(key, true);
  }

  private isLockedRequests (key: string): boolean {
    if (this.lockedRequests.has(key)) {
      return true;
    }
    else {
      return localStorage.getItem(`${this.state.locked}-${key}`) !== null;
    }
  }
}
