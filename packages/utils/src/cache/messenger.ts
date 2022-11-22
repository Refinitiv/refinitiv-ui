import { MESSENGER_PREFIX } from './constants.js';
import { Logger } from './helpers.js';

export type Message = {
  id: number;
  key: string;
  value: string;
}

export type OnMessageCallback = (message: Message) => void;
export type OnCompleteCallback = () => void;

/**
 * Cache messenger manage post/receive to others cache messenger
 */
export class CacheMessenger {

  /**
   * Channel to send message
   */
  protected broadcastChannel?: BroadcastChannel;

  /**
   * Messaging callback
   */
  public onMessage: OnMessageCallback | undefined = undefined;

  /**
   * Channel name for broadcasting
   */
  protected channel = '';

  /**
   * Constructor
   * @param name messenger name
   */
  constructor (name: string) {
    this.channel = `[${MESSENGER_PREFIX}][${name}]`;
    this.open();
  }

  /**
   * Open connection and listening to events from messages and storage
   * @returns {void}
   */
  public open (): void {
    this.broadcastChannel = new BroadcastChannel(this.channel);
    // Listen message from others messenger
    this.broadcastChannel.onmessage = (event: MessageEvent<Message>) => {
      // Run callback function
      if (this.onMessage instanceof Function) {
        this.onMessage(event.data);
      }
    };
    Logger.log(`${window.name} %c Listen Messenger %c ${Date.now().toString()}`, 'background: purple; color: white', '');
  }

  /**
   * Close listening
   * @returns {void}
   */
  public close (): void {
    this.broadcastChannel?.close();
    this.broadcastChannel = undefined;
    Logger.log(`${window.name} %c Closed Messenger %c ${Date.now().toString()}`, 'background: purple; color: white', '');
  }

  /**
   * Distribute message
   * @param key item key
   * @param value data to send via message
   * @returns {void}
   */
  public notify (key: string, value: string): void {
    if (!this.broadcastChannel) {
      this.open();
    }

    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({ key, value });
      Logger.log(`${window.name} %c Post message %c key: ${key.split('/').pop() || ''} ${Date.now()}`, 'background: yellow; color: black', '');
    }
    else {
      throw new Error('Cache Messenger: BroadcastChannel not found');
    }
  }
}
