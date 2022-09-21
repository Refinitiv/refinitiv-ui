import { Logger } from './helpers.js';

export type Message = {
  id: number;
  key: string;
  value: string;
}

type MessageType = 'post' | 'received';

export type OnMessageCallback = (message: Message) => void;

type Requests = {
  [key: string]: 'true'
}

enum StorageType {
  Requests='requests',
  MessagePost='messagePost',
  MessageReceived='messageReceived',
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
      messagePost: `${messengerName}[messages-post]`,
      messageReceived: `${messengerName}[messages-received]`,
      requests: `${messengerName}[requests]`,
      unloaded: `${messengerName}[unloaded]`
    };

    this.clean();
    this.listen();
  }

  /**
   * Get resource request list
   */
  private get requestsStorage (): Requests {
    const requests = (JSON.parse(localStorage.getItem(this.storageNames.requests) as string) || {}) as Requests;
    // Synchronize requests state from localStorage to local variable for performance improvement
    Object.assign(this.requests, requests);
    return this.requests;
  }

  /**
   * Set resource request list
   * @param requests request list
   */
  private set requestsStorage (requests: Requests) {
    localStorage.setItem(this.storageNames.requests, JSON.stringify(requests));
  }

  /**
   * Initialize listening messages from BroadcastChannel
   * @returns {void}
   */
  private listen (): void {
    this.broadcastChannel.onmessage = (event: MessageEvent<Message>) => {

      // Run callback function
      if (this.onMessage instanceof Function) {
        this.onMessage(event.data);
      }

      const { data: { id: messageId, key, value } } = event;

      if (this.waiting.has(event.data.key)) {
        const resolve = this.waiting.get(key);
        if (resolve) {
          resolve(value);
        }
        Logger.log(`${window.name} %c Received message %c icon ${key.split('/').pop() || ''} MessageID: ${messageId} ${Date.now()}`, 'background: green; color: white', '');
      }

      // Check the last message
      this.increaseMessageCount('received');

      /**
       * Delay time to clear all states to make sure no new message while checking the last one.
       * Need to find the way to check latest message better than this
       */
      setTimeout(() => {
        /**
         * The `postMessage` can be `0` when other messenger run
         * destroy method in the same time
         */
        const postMessage = this.getMessageCount('post');
        if (messageId >= postMessage) {
          Logger.timeEnd(`${window.name} Completed`);
          Logger.log(`${window.name} Real completed time must remove 3000ms for delay`);
          this.destroy();
        }
      }, 3000);
    };
    Logger.log(`${window.name} %c Listened in Messenger %c ${Date.now().toString()}`, 'background: purple; color: white', '');

  }

  /**
   * Clean up by resets all requesting states
   * if found unload event that makes the current states is not correct
   * in case users interupt a browser by refresh page
   * @returns {void}
   */
  private clean (): void {
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
      if (localStorage.getItem(this.storageNames.requests) !== null) {
        localStorage.setItem(this.storageNames.unloaded, 'true');
      }
      return true;
    });

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
    localStorage.removeItem(this.storageNames.messagePost);
    localStorage.removeItem(this.storageNames.messageReceived);
    this.requests = {};
    this.waiting.clear();
  }

  /**
   * Increase message count
   * @param type message type
   * @returns {void}
   */
  private increaseMessageCount (type: MessageType): void {
    const key = type === 'post' ? 'messagePost' : 'messageReceived';
    const messageCount = localStorage.getItem(this.storageNames[key]) || 0;
    localStorage.setItem(this.storageNames[key], (Number(messageCount) + 1).toString());
  }

  private getMessageCount (type: MessageType) {
    const key = type === 'post' ? 'messagePost' : 'messageReceived';
    return Number(localStorage.getItem(this.storageNames[key])) || 0;
  }

  /**
   * Add the first item is start the request to the network
   * @param key item key
   * @return {void}
   */
  public addRequest (key: string): void {
    const requests = this.requestsStorage;
    if (!requests[key]) {
      requests[key] = 'true';
      this.requests[key] = 'true';
      this.requestsStorage = requests;
    }
  }

  /**
   * Check key is already started request
   * @param key resource name
   * @returns true if resource has stated request
   */
  public hasRequest (key: string): boolean {
    return this.requests[key] ? true : Boolean(this.requestsStorage[key]);
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
    const messageId = this.getMessageCount('post') + 1;
    this.broadcastChannel.postMessage({ id: messageId, key, value });
    Logger.log(`${window.name} %c Post message %c id: ${messageId} ${key.split('/').pop() || ''} ${Date.now()}`, 'background: yellow; color: black', '');
    this.increaseMessageCount('post');
  }
}
