/* eslint-disable no-console */
console.time('Completed');
import type { CacheItem } from './interfaces/CacheItem';
import type { CacheStorage } from './interfaces/CacheStorage';
import { IndexedDBStorage } from './storages/indexeddb.js';
import { LocalStorage } from './storages/localstorage.js';

export type LocalCacheConfig = {
  storage: 'localstorage' | 'indexeddb';
};

// #region Reduce Network Requesting

type LocalCacheMessage = {
  id: number;
  key: string;
  value: string;
}

type LocalCacheRequests = {
  [key: string]: 'requesting'
}

type LocalCacheMessageType = 'sent' | 'received';

const messageCached = new Map();
const waitingList = new Map();

const REQUEST_MESSAGE_SENT = 'ef-svg-loader-request-messages-sent';
const REQUEST_MESSAGE_RECEIVED = 'ef-svg-loader-request-messages-received';
const REQUEST_ITEMS_STATE_NAME = 'ef-svg-loader-requests';
const REQUEST_ITEMS_UNLOADED = 'ef-svg-loader-requests-unloaded';

const getRequestedItems = (): LocalCacheRequests => {
  return (JSON.parse(sessionStorage.getItem(REQUEST_ITEMS_STATE_NAME) as string) || {}) as LocalCacheRequests;
};

const saveRequestedItems = (requests: LocalCacheRequests) => {
  sessionStorage.setItem(REQUEST_ITEMS_STATE_NAME, JSON.stringify(requests));
};

const increaseMessageCount = (type: LocalCacheMessageType) => {
  let key = '';
  if (type === 'sent') {
    key = REQUEST_MESSAGE_SENT;
  }
  else if (type === 'received') {
    key = REQUEST_MESSAGE_RECEIVED;
  }

  const messageCount = sessionStorage.getItem(key) || 0;
  sessionStorage.setItem(key, (Number(messageCount) + 1).toString());
};

const resetMessageCount = (type: LocalCacheMessageType) => {
  let key = '';
  if (type === 'sent') {
    key = REQUEST_MESSAGE_SENT;
  }
  else if (type === 'received') {
    key = REQUEST_MESSAGE_RECEIVED;
  }
  sessionStorage.setItem(key, '0');
};

const getMessageCount = (type: LocalCacheMessageType) => {
  let key = '';
  if (type === 'sent') {
    key = REQUEST_MESSAGE_SENT;
  }
  else if (type === 'received') {
    key = REQUEST_MESSAGE_RECEIVED;
  }

  return Number(sessionStorage.getItem(key) || 0);
};

const destroyStates = () => {
  sessionStorage.removeItem(REQUEST_ITEMS_STATE_NAME);
  sessionStorage.removeItem(REQUEST_MESSAGE_SENT);
  sessionStorage.removeItem(REQUEST_MESSAGE_RECEIVED);
  messageCached.clear();
  waitingList.clear();
};

/**
 * Cleanup by resets all request states
 * if found unload event which means the current states is not correct
 * because user interupt the cache messaging while requesting
 * @returns {void}
 */
const cleanupRequestedItems = () => {
  if (sessionStorage.getItem(REQUEST_ITEMS_UNLOADED) === 'true') {
    destroyStates();
    sessionStorage.removeItem(REQUEST_ITEMS_UNLOADED);
    resetMessageCount('received');
    resetMessageCount('sent');
  }
};

cleanupRequestedItems();

addEventListener('beforeunload', (event) => {
  event.preventDefault();
  if (sessionStorage.getItem(REQUEST_ITEMS_STATE_NAME) !== null) {
    sessionStorage.setItem(REQUEST_ITEMS_UNLOADED, 'true');
  }
  return true;
});

// #endregion


/**
 * Cache utility that simplifies, unifies and enhances native browser storage.
 */
export class LocalCache {
  /**
   * Storage to store data
   */
  protected storage!: CacheStorage;

  private broadcastChannel = new BroadcastChannel('ef-svg-loader');

  constructor (name: string, config?: LocalCacheConfig) {
    if (typeof name !== 'string') {
      throw new TypeError('Expected name to be of type string');
    }
    if (name.length === 0) {
      throw new RangeError('Expected name to have a length');
    }
    const options = Object.assign({}, config);
    switch (options.storage) {
      case 'indexeddb':
        this.storage = new IndexedDBStorage(name);
        break;
      case 'localstorage':
      case undefined:
        this.storage = new LocalStorage(name);
        break;
      default:
        throw new TypeError('Unknown storage type');
    }

    this.initCacheMessenger();
  }

  private initCacheMessenger (): void {
    this.broadcastChannel.onmessage = (event: MessageEvent<LocalCacheMessage>) => {
      const { data: { id: messageId, key, value } } = event;

      // Cache all messsages in case this message faster than value registered to waiting list
      if (!messageCached.has(key)) {
        messageCached.set(key, value);
      }

      if (waitingList.size >= 1 && waitingList.has(event.data.key)) {
        const resolve = waitingList.get(key) as CallableFunction;
        resolve(value);
        console.log(`${window.name} %c Receive message %c icon ${key.split('/').pop() || ''} MessageID: ${messageId}`, 'background: green; color: white', '');
      }

      // Check the last message
      increaseMessageCount('received');

      /**
       * Delay time to clear all states to make sure no new message while checking the last one.
       * Need to find the way to check latest message better than this
       */
      setTimeout(() => {
        const sentMessage = getMessageCount('sent');
        if (messageId === sentMessage) {
          console.timeEnd('Completed');
          destroyStates();
        }
      }, 1000);
    };
  }

  /**
   * Caches a value against a key to use until expired
   * @param key Cache key
   * @param value Data to store in cache
   * @param [expires=432000] Cache expiry in seconds. Defaults to 5 days.
   * @returns {void}
   */
  public async set (key: string, value: string, expires = 432000): Promise<void> {
    const modified = Date.now();
    const data = {
      value,
      modified,
      expires: modified + expires * 1000
    };
    await this.storage.set(key, data);
  }

  /**
   * Returns cache data value based on provided key
   * @param key Cache key
   * @returns Promise string data or `null` if nothing is cached
   */
  public async get (key: string): Promise<string | null> {
    const item = await this.storage.get(key) as CacheItem;
    if (item && item.expires > Date.now()) {
      return Promise.resolve(item.value);
    }
    else {
      // Response icon
      return new Promise<string | null>(resolve => {
        const iconName: string = key.split('/').pop() || '';
        const requests = getRequestedItems();
        // Check src is already requested
        if (!requests[key]) {
          console.log(`${window.name} %c Request %c ${iconName}`, 'background: blue; color: white', '');
          requests[key] = 'requesting';
          saveRequestedItems(requests);

          // TODO: It might not good to return null here it intend to the loader create the request, but cache stage above already registered as requesting
          return resolve(null);
        }
        else if (messageCached.size >= 1 && messageCached.has(key)) {
          /**
           * Check the messageCached before add to wating list
           * to prevent the case send message before add listener
           */
          resolve(messageCached.get(key) as string);
          console.log(`${window.name} %c Get from Message Cache %c ${iconName}`, 'background: pink; color: white', '');
        }
        else {
          // Add to waiting list
          console.log(`${window.name} %c Wait %c ${iconName}`, 'background: orange; color: white', '');
          waitingList.set(key, resolve);
        }
      });
    }
  }

  /**
   * Remove cache data value based on provided key
   * @param key Cache key
   * @returns {void}
   */
  public async remove (key: string): Promise<void> {
    await this.storage.remove(key);
  }

  /**
   * Clear all memory cache
   * @returns {void}
   */
  public async clear (): Promise<void> {
    await this.storage.clear();
  }

  public notify (key: string, value: string): void {
    // Use Broadcast Channel send message
    const messageId = getMessageCount('sent') + 1;
    this.broadcastChannel.postMessage({ id: messageId, key, value });
    console.log(`${window.name} %c Sent message %c id: ${messageId} ${value.split('/').pop() || ''}`, 'background: blue; color: white', '');
    increaseMessageCount('sent');
  }
}
