/* eslint-disable no-console */
type Message = {
  id: number;
  key: string;
  value: string;
}

type MessageType = 'post' | 'received';

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
   * Messages cache
   */
  private messages = new Map();

  /**
   * List of promise needed be resolved by messaging
   */
  private waiting = new Map();

  /**
   * Channel to send message
   */
  private broadcastChannel: BroadcastChannel;

  /**
   * Names for manage all states temporary
   */
  private storageNames: StorageNames;

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
  private get requests (): Requests {
    return (JSON.parse(localStorage.getItem(this.storageNames.requests) as string) || {}) as Requests;
  }

  /**
   * Set resource request list
   * @param requests request list
   */
  private set requests (requests: Requests) {
    localStorage.setItem(this.storageNames.requests, JSON.stringify(requests));
  }

  /**
   * Initialize listening messages from BroadcastChannel
   * @returns {void}
   */
  private listen (): void {
    this.broadcastChannel.onmessage = (event: MessageEvent<Message>) => {
      const { data: { id: messageId, key, value } } = event;

      // Cache all messsages in case this message faster than value registered to waiting list
      if (!this.messages.has(key)) {
        this.messages.set(key, value);
      }

      if (this.waiting.has(event.data.key)) {
        const resolve = this.waiting.get(key) as CallableFunction;
        resolve(value);
        console.log(`${window.name} %c Receive message %c icon ${key.split('/').pop() || ''} MessageID: ${messageId}`, 'background: green; color: white', '');
      }

      // Check the last message
      this.increaseMessageCount('received');

      /**
       * Delay time to clear all states to make sure no new message while checking the last one.
       * Need to find the way to check latest message better than this
       */
      setTimeout(() => {
        const postMessage = this.getMessageCount('post');
        if (messageId === postMessage) {
          console.timeEnd(`${window.name} Completed`);
          this.destroy();
        }
      }, 3000);
    };
    console.log(`${window.name} %c Listened %c ${Date.now().toString()}`, 'background: purple; color: white', '');

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
    this.messages.clear();
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
    localStorage.setItem(key, (Number(messageCount) + 1).toString());
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
    const requests = this.requests;
    if (!requests[key]) {
      requests[key] = 'true';
      this.requests = requests;
    }
  }

  /**
   * Check key is already started request
   * @param key resource name
   * @returns true if resource has stated request
   */
  public hasRequest (key: string): boolean {
    return Boolean(this.requests[key]);
  }

  /**
   * Get message from cache
   * @param key resource name
   * @returns cache message
   */
  public getMessage (key: string): string {
    return this.messages.get(key) as string;
  }

  /**
   * Check resource is in message cache
   * @param key resource name
   * @returns true if resource is in message cache
   */
  public hasMessage (key: string): boolean {
    return this.messages.has(key);
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
    // Use Broadcast Channel send message
    const messageId = this.getMessageCount('post') + 1;
    this.broadcastChannel.postMessage({ id: messageId, key, value });
    console.log(`${window.name} %c Post message %c id: ${messageId} ${key.split('/').pop() || ''}`, 'background: blue; color: white', '');
    this.increaseMessageCount('post');
  }
}
