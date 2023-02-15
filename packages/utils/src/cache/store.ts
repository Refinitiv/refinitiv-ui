import { Client } from './controller.js';
import { Messenger,
  type Message,
  type HostRequest,
  type HostReplacement,
  type HostResponse,
  type HostReload,
  type ClientRequest,
  type ClientResponse,
  type ClientUnload
} from './messenger.js';
import { Host } from './host.js';
import { LocalStorage } from './storage.js';
import { STORE_SERVICE } from './utils/service-ids.js';

const pendingStorage = new LocalStorage(STORE_SERVICE);

export class Store {
  /**
   * Client instance
   */
  client: Client;

  /**
   * Host from the host controller
   */
  host: Host | undefined;

  /**
   * Messenger to send between host and clients
   */
  messenger: Messenger;

  /**
   * Promise list of client request
   */
  pending = new Map<string, Promise<string | null>>();

  /**
   * Resolve list of client request
   */
  resolvePool = new Map<string, CallableFunction>();

  /**
   * Resolving state when resolve null
   */
  resolving = new Map<string, string>();

  /**
   * State of requests waiting to process
   */
  backlogRequest = new Map<string, string>();

  /**
   * State of requests from client waiting to process
   */
  backlogRequestFromClient = new Map<string, string>();

  /**
   * Cache of response key
   */
  caches = new Map<string, string>();

  /**
   * Worker timeout for host
   */
  hostWorker: ReturnType<typeof setTimeout> | undefined;

  /**
   * Worker timeout for client
   */
  clientWorker: ReturnType<typeof setTimeout> | undefined;

  constructor () {
    // New client with host change callback
    this.client = new Client((host) => {
      if (!host) {
        return;
      }
      // Host changed from ourself to another
      if (this.host?.address === this.client.address && this.host?.address !== host.address) {
        this.hostReplacement(host.address);
      }
      this.host = host;
      // Process backlog when host change
      this.processBacklog();
    });

    this.messenger = new Messenger(this.client.address);
    this.listenMessage();
    this.handleBrowserUnload();
  }

  /**
   * Move client backlog request to new host
   * @param address new host address
   * @returns {void}
   */
  private hostReplacement (address: string): void {
    this.messenger.send(address, {
      action: 'host_replacement',
      items: this.backlogRequestFromClient
    });
    this.backlogRequestFromClient.clear();
  }

  /**
   * Handle client backlog request from previous host
   * @param data host replacement data
   * @returns {void}
   */
  private hostHandleReplacement (data: HostReplacement): void {
    data.items.forEach((sender, key) => this.backlogRequestFromClient.set(key, sender));
    if (this.host) {
      this.hostProcessBacklog();
    }
  }

  /**
   * Remove pending state when browser unload
   * @returns {void}
   */
  private handleBrowserUnload (): void {
    addEventListener('unload', () => {
      const keys = Array.from(this.resolving.keys());
      if (this.host?.address === this.client.address) {
        this.removePending(keys);
      }
      else if (this.host) {
        this.messenger.send(this.host.address, {
          action: 'client_unload',
          keys
        });
      }
    });
  }

  /**
   * Keep requests from client to backlog and process when host exist
   * @param sender client address
   * @param data client request data
   * @returns {void}
   */
  private hostHandleRequest (sender: string, data: ClientRequest): void {
    data.keys.forEach((key: string) => this.backlogRequestFromClient.set(key, sender));
    if (this.host) {
      if (this.client.isHost) {
        this.hostProcessBacklog();
      }
      else {
        this.hostReplacement(this.host.address);
      }
    }
  }

  /**
   * Cache response from client and broadcast the response to all client
   * @param data client response data
   * @returns {void}
   */
  private hostHandleResponse (data: ClientResponse): void {
    this.caches.set(data.key, data.value);
    this.broadCastResponse(data.key, data.value);
  }

  /**
   * Remove pending state when client closing when loading and anounce to all client
   * @param data client unload data
   * @returns {void}
   */
  private hostHandleUnload (data: ClientUnload): void {
    this.removePending(data.keys);
    this.messenger.send('*', {
      action: 'host_reload',
      keys: data.keys
    });
  }

  /**
   * Client resolve requests from host
   * @param data host request data
   * @returns {void}
   */
  private clientHandleRequest (data: HostRequest): void {
    data.keys.forEach(key => {
      this.resolve(key, null);
      this.resolving.set(key, `${Date.now()}`);
    });
  }

  /**
   * Client cache and resolve responses from host
   * @param data host response data
   * @returns {void}
   */
  private clientHandleResponse (data: HostResponse): void {
    data.items.forEach(item => {
      this.caches.set(item.key, item.value);
      this.resolve(item.key, item.value);
    });
  }

  /**
   * Client re-sent the requests anounce from host
   * if exist in resolve pool
   * @param data host reload data
   * @returns {void}
   */
  private clientHandleReload (data: HostReload): void {
    data.keys.forEach(key => {
      if (this.resolvePool.has(key)) {
        this.backlogRequest.set(key, `${Date.now()}`);
      }
    });
    this.clientProcessBacklog();
  }

  /**
   * Listening message from messenger
   * @returns {void}
   */
  private listenMessage (): void {
    this.messenger.onMessage = ({ sender, data }: Message) => {
      switch (data.action) {
        // host action
        case 'client_request':
          return this.hostHandleRequest(sender, data);
        case 'client_response':
          return this.hostHandleResponse(data);
        case 'client_unload':
          return this.hostHandleUnload(data);
        case 'host_replacement':
          return this.hostHandleReplacement(data);
        // client action
        case 'host_request':
          return this.clientHandleRequest(data);
        case 'host_response':
          return this.clientHandleResponse(data);
        case 'host_reload':
          return this.clientHandleReload(data);
        default:
          break;
      }
    };
  }

  /**
   * Remove pending state
   * @param keys remove pending state keys
   * @returns {void}
   */
  private removePending (keys: string | string[]) {
    if (Array.isArray(keys)) {
      keys.forEach(key => pendingStorage.removeItem(key));
    }
    else {
      pendingStorage.removeItem(keys);
    }
  }

  /**
   * Check pending state exist
   * @param key pending state key
   * @returns {boolean} true if pending state exist
   */
  private hasPending (key: string): boolean {
    return !!pendingStorage.getItem(key);
  }

  /**
   * Host process our backlog request
   * @returns {void}
   */
  private hostProcessSelfBacklog (): void {
    Array.from(this.backlogRequest.keys()).forEach(key => {
      if (!this.hasPending(key) && this.resolvePool.has(key)) {
        this.setPending(key);
        this.resolve(key, null);
        this.backlogRequest.delete(key);
        this.backlogRequestFromClient.delete(key);
      }
    });
  }

  /**
   * Host seperate request that already have cache from client backlog request
   * @returns {[caches, clientBacklog]} caches key and client backlog key
   */
  private hostSeperateRequestType (): [string[], Record<string, string[]>] {
    const caches: string[] = [];
    const clientBacklog: Record<string, string[]> = {};
    Array.from(this.backlogRequestFromClient.keys()).forEach(key => {
      if (this.caches.has(key)) {
        caches.push(key);
      }
      else if (!this.hasPending(key)) {
        const client = this.backlogRequestFromClient.get(key) || '';
        if (!clientBacklog[client]) {
          clientBacklog[client] = [];
        }
        clientBacklog[client].push(key);
      }
    });
    return [caches, clientBacklog];
  }

  /**
   * Host response caches to client
   * @param caches cache keys
   * @returns {void}
   */
  private hostProcessCacheRequest (caches: string[]) {
    if (caches.length > 0) {
      const items = caches.map(key => ({ key, value: this.caches.get(key) }));
      this.messenger.send('*', {
        action: 'host_response',
        items
      });
      caches.forEach(key => this.backlogRequestFromClient.delete(key));
    }
  }

  /**
   * Host send request to client to resolve request
   * @param backlog client request backlog
   * @returns {void}
   */
  private hostProcessClientBacklog (backlog: Record<string, string[]>) {
    for (const [client, keys] of Object.entries(backlog)) {
      keys.forEach(key => this.setPending(key));
      this.messenger.send(client, {
        action: 'host_request',
        keys
      });
      keys.forEach(key => this.backlogRequestFromClient.delete(key));
    }
  }

  /**
   * Host process backlog from host side and client side
   * @returns {void}
   */
  private hostProcessBacklog (): void {
    if (this.hostWorker) {
      return;
    }
    this.hostWorker = setTimeout(() => {
      this.hostWorker = undefined;
      this.hostProcessSelfBacklog();
      const [caches, clientBacklog] = this.hostSeperateRequestType();
      this.hostProcessCacheRequest(caches);
      this.hostProcessClientBacklog(clientBacklog);
    }, 50);
  }

  /**
   * Host set key pending state
   * @param key key to set pending state
   * @returns {void}
   */
  private setPending (key: string) {
    pendingStorage.setItem(key, `${Date.now()}`);
    this.resolving.set(key, `${Date.now()}`);
  }

  /**
   * Host broadcast response to all client and remove pending state
   * @param key request key
   * @param value response value
   * @returns {void}
   */
  private broadCastResponse (key: string, value: string): void {
    this.messenger.send('*', {
      action: 'host_response',
      items: [{ key, value }]
    });
    this.removePending(key);
    this.resolve(key, value);
  }

  /**
   * Set cache and send message to another
   * @param key cache key
   * @param value cache value
   * @returns {void}
   */
  public set (key: string, value: string): void {
    this.caches.set(key, value);
    if (this.client.isHost) {
      this.broadCastResponse(key, value);
    }
    else if (this.host) {
      this.messenger.send(this.host.address, {
        action: 'client_response',
        key,
        value
      });
    }
  }

  /**
   * Get cache from key
   * @param key cache key
   * @returns {Promise<string | null>} return cache value or null
   */
  public async get (key: string): Promise<string | null> {
    if (this.caches.has(key)) {
      return this.caches.get(key) || '';
    }
    if (!this.pending.has(key)) {
      this.createPendingPromise(key);
    }
    return await this.pending.get(key) || null;
  }

  /**
   * Create pending backlog request and resolve pool for request key
   * @param key request key
   * @returns {void}
   */
  private createPendingPromise (key: string): void {
    this.pending.set(key, new Promise((resolve => {
      this.resolvePool.set(key, resolve);
      this.backlogRequest.set(key, `${Date.now()}`);
      this.processBacklog();
    })));
  }

  /**
   * Process backlog when host exist
   * @returns {void}
   */
  private processBacklog (): void {
    if (this.host) {
      if (this.client.isHost) {
        this.hostProcessBacklog();
      }
      else {
        this.clientProcessBacklog();
      }
    }
  }

  /**
   * Client process backlog request and send to host
   * @returns {void}
   */
  private clientProcessBacklog (): void {
    if (this.clientWorker) {
      return;
    }
    this.clientWorker = setTimeout(() => {
      this.clientWorker = undefined;
      const keys = Array.from(this.backlogRequest.keys());
      if (keys.length > 0 && this.host) {
        this.messenger.send(this.host.address, {
          action: 'client_request',
          keys: keys
        });
      }
    }, 10);
  }

  /**
   * Resolve promise from resolve pool
   * @param key resolve key
   * @param value resolve value
   * @returns {void}
   */
  private resolve (key: string, value: string | null): void {
    const resolve = this.resolvePool.get(key);
    if (resolve) {
      resolve(value);
      if (value) {
        this.clearItem(key);
      }
    }
  }

  /**
   * Clear item key
   * @param key item key
   * @returns {void}
   */
  private clearItem (key: string): void {
    this.resolvePool.delete(key);
    this.pending.delete(key);
    this.backlogRequest.delete(key);
    this.resolving.delete(key);
  }
}
