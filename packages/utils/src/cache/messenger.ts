import { Logger } from './helpers.js';

export type Message = {
  id: number;
  key: string;
  value: string;
}

export type OnMessageCallback = (message: Message) => void;

type Requests = {
  [key: string]: 'true'
}

enum StorageType {
  Requests='requests',
  MessagePosts='messagePosts',
  Unloaded='unloaded'
}

type StorageNames = {
  [name in StorageType]: string
};

const CHANNEL_PREFIX = 'ef';

/**
 * Cache messenger manage post/receive to others cache messenger
 */
export class CacheMessenger {

  /**
   * Requests cached from localStorage
   */
  private requests: Requests = {};

  /**
   * List of promise needed be resolved by messaging
   */
  private waiting = new Map<string, CallableFunction>();

  /**
   * Channel to send message
   */
  private broadcastChannel: BroadcastChannel;

  /**
   * Total messages post state, shared across others messenger
   */
  private totalPost = 0;

  /**
   * Names for manage all states temporary
   */
  private storageNames: StorageNames;

  /**
   * Messaging callback
   */
  public onMessage: OnMessageCallback | undefined = undefined;

  constructor (name: string) {
    const messengerName = `[${CHANNEL_PREFIX}][${name}]`;
    this.broadcastChannel = new BroadcastChannel(messengerName);
    this.storageNames = {
      messagePosts: `${messengerName}[message-posts]`,
      requests: `${messengerName}[requests]`,
      unloaded: `${messengerName}[unloaded]`
    };

    this.clean();
    this.listen();
  }

  /**
   * Get resource request list, sync the new requests to cache
   */
  private get requestsStore (): Requests {
    const requests = (JSON.parse(localStorage.getItem(this.storageNames.requests) as string) || {}) as Requests;
    // Synchronize new requests state to local variable for performance improvement
    Object.assign(this.requests, requests);
    return this.requests;
  }

  /**
   * Set resource request list
   * @param requests request list
   */
  private set requestsStore (requests: Requests) {
    localStorage.setItem(this.storageNames.requests, JSON.stringify(requests));
  }

  /**
   * Initialize listening events from messages and storage
   * @returns {void}
   */
  private listen (): void {
    // Listen storage event for update total message posts to property
    addEventListener('storage', ({ key, newValue }) => {
      if (key === this.storageNames.messagePosts && Number(newValue) > this.totalPost) {
        this.totalPost = Number(newValue);
      }
    });

    // Listen message from others messenger
    this.broadcastChannel.onmessage = (event: MessageEvent<Message>) => {
      // Run callback function
      if (this.onMessage instanceof Function) {
        this.onMessage(event.data);
      }

      const { data: { id: messageId, key, value } } = event;

      // Match a message with a waiting request and resolve it
      if (this.waiting.has(event.data.key)) {
        const resolve = this.waiting.get(key);
        if (resolve) {
          resolve(value);
        }
        Logger.log(`${window.name} %c Received message %c icon ${key.split('/').pop() || ''} MessageID: ${messageId} ${Date.now()}`, 'background: green; color: white', '');
      }

      /**
       * Detect the `last message` by using a gap between message,
       * If no new message post within the time limit It will clear all states.
       * Need to find the way to check latest message better than this
       */
      setTimeout(() => {
        /**
         * The `postMessage` can be `0` when other messenger run following code in the same time
         */
        if (messageId >= this.totalPost) {
          Logger.timeEnd(`${window.name} Completed`);
          Logger.log(`${window.name} Real completed time must remove 3000ms for delay`);
          this.destroy();
        }
      }, 3000);
    };
    Logger.log(`${window.name} %c Listened in Messenger %c ${Date.now().toString()}`, 'background: purple; color: white', '');
  }

  /**
   * Clean up by resets all requesting states,
   * if found unload event that makes the current states is not correct
   * in case users interupt a browser by refresh page
   * @returns {void}
   */
  private clean (): void {
    // Listen this event to detect user try to refresh page
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
      if (localStorage.getItem(this.storageNames.requests) !== null) {
        localStorage.setItem(this.storageNames.unloaded, 'true');
      }
      return true;
    });

    // After user refresh, all state should be cleaned by delete state from previous round
    if (localStorage.getItem(this.storageNames.unloaded) === 'true') {
      localStorage.removeItem(this.storageNames.unloaded);
      this.destroy();
    }
  }

  /**
   * Destroy all temporary states
   * @returns {void}
   */
  private destroy (): void {
    localStorage.removeItem(this.storageNames.requests);
    localStorage.removeItem(this.storageNames.messagePosts);
    this.totalPost = 0;
    this.requests = {};
    this.waiting.clear();
  }

  /**
   * Increase total message posts
   * @returns {void}
   */
  private increaseTotalPost (): void {
    const messageCount = localStorage.getItem(this.storageNames.messagePosts) || 0;
    localStorage.setItem(this.storageNames.messagePosts, (Number(messageCount) + 1).toString());
  }

  /**
   * Add the started request to state that used in the checking a duplicated request across others messengers
   * @param key item key
   * @return {void}
   */
  public addRequest (key: string): void {
    const requests = this.requestsStore;
    if (!requests[key]) {
      requests[key] = 'true';
      this.requests[key] = 'true';
      this.requestsStore = requests;
    }
  }

  /**
   * Check key is already started request across messengers
   * @param key resource name
   * @returns true if resource has started request
   */
  public hasRequest (key: string): boolean {
    return this.requests[key] ? true : Boolean(this.requestsStore[key]);
  }

  /**
   * Add item to waiting list
   * @param key item key
   * @param value callback function
   * @returns {void}
   */
  public wait (key: string, value: CallableFunction): void {
    this.waiting.set(key, value);
  }

  /**
   * Distribute cache
   * @param key item key
   * @param value data to send via message
   * @returns {void}
   */
  public notify (key: string, value: string): void {
    this.increaseTotalPost();
    this.totalPost++;
    this.broadcastChannel.postMessage({ id: this.totalPost, key, value });
    Logger.log(`${window.name} %c Post message %c id: ${ this.totalPost } ${key.split('/').pop() || ''} ${Date.now()}`, 'background: yellow; color: black', '');
  }
}
