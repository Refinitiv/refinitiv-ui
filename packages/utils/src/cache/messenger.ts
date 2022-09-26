import { MESSENGER_PREFIX } from './constants.js';
import { Logger } from './helpers.js';

export type Message = {
  id: number;
  key: string;
  value: string;
}

export type OnMessageCallback = (message: Message) => void;

export type OnCompleteCallback = () => void;

enum StorageType {
  MessagePosts='messagePosts',
}

type StorageNames = {
  [name in StorageType]: string
};

/**
 * Cache messenger manage post/receive to others cache messenger
 */
export class CacheMessenger {

  /**
   * Channel to send message
   */
  protected broadcastChannel: BroadcastChannel;

  /**
   * Total messages post state, shared across others messenger
   */
  protected totalPost = 0;

  /**
   * Names for manage all states temporary
   */
  private storageNames: StorageNames;

  /**
   * Messaging callback
   */
  public onMessage: OnMessageCallback | undefined = undefined;

  /**
   * Constructor
   * @param name messenger name
   */
  constructor (name: string) {
    const messengerName = `[${MESSENGER_PREFIX}][${name}]`;
    this.broadcastChannel = new BroadcastChannel(messengerName);
    this.storageNames = {
      messagePosts: `${messengerName}[message-posts]`
    };
    this.listen();
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
    };
    Logger.log(`${window.name} %c Listened in Messenger %c ${Date.now().toString()}`, 'background: purple; color: white', '');
  }

  /**
   * Clean up all temporary states
   * @returns {void}
   */
  public clean (): void {
    localStorage.removeItem(this.storageNames.messagePosts);
    this.totalPost = 0;
  }

  /**
   * Increase total message posts
   * @returns {void}
   */
  private increaseTotalPost (): number {
    let messageCount = localStorage.getItem(this.storageNames.messagePosts) || 0;
    messageCount = Number(messageCount) + 1;
    localStorage.setItem(this.storageNames.messagePosts, messageCount.toString());
    return messageCount;
  }

  /**
   * Distribute cache
   * @param key item key
   * @param value data to send via message
   * @returns {void}
   */
  public notify (key: string, value: string): void {
    this.totalPost = this.increaseTotalPost();
    this.broadcastChannel.postMessage({ id: this.totalPost, key, value });
    Logger.log(`${window.name} %c Post message %c id: ${ this.totalPost } ${key.split('/').pop() || ''} ${Date.now()}`, 'background: yellow; color: black', '');
  }

  /**
   * Check has more message incoming
   * @param messageId message id for check
   * @returns true if has more message
   */
  public hasMoreMessage (messageId: number): boolean {
    return messageId < this.totalPost;
  }
}
