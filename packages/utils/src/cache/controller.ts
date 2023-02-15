import { Host } from './host.js';
import { getHost } from './utils/getHost.js';
import { CONTROLLER_SERVICE } from './utils/service-ids.js';
import { sortkey, uuid } from './utils/uuid.js';
import { TimeoutTaskRunner } from '../async.js';
import { LocalStorage } from './storage.js';

type HostCallback = (host: Host | null) => void;

const bc = new BroadcastChannel(CONTROLLER_SERVICE);

const clients = new Set<HostController>();
const map = new WeakMap<Client, HostController>();
const storage = new LocalStorage(CONTROLLER_SERVICE);

const hostChange = (): void => {
  for (const client of clients) {
    client.hostChange();
  }
};

const registerClients = (): void => {
  for (const client of clients) {
    client.register();
  }
};

const unregisterClients = (): void => {
  for (const client of clients) {
    client.unregister();
  }
};

window.addEventListener('unload', () => unregisterClients());
bc.addEventListener('message', () => hostChange());
document.addEventListener(
  'visibilitychange',
  () => document.hidden ? unregisterClients() : registerClients()
);

class HostController {

  /**
   * Controller address
   */
  address = uuid();

  /**
   * Cache of the current host
   */
  current: Host | null = null;

  /**
   * Callback to execute when the host changes
   */
  callback: HostCallback;

  /**
   * Timeout task runner used for debouncing updates
   */
  #runner = new TimeoutTaskRunner(50);

  constructor (callback: HostCallback) {
    this.callback = callback;
    clients.add(this);
    this.register();
  }

  /**
   * Checks to see if instance is current host
   */
  get isHost (): boolean {
    return this.address === this.current?.address;
  }

  /**
   * Register as an available host
   * @returns {void}
   */
  public register (): void {
    if (!document.hidden) {
      storage.setItem(this.address, sortkey());
    }
    this.requestUpdate();
  }

  /**
   * Unregister as an available host
   * @returns {void}
   */
  public unregister (): void {
    storage.removeItem(this.address);
    this.isHost && this.reassign();
  }

  /**
   * Disconnects the client
   * @returns {void}
   */
  public disconnect () {
    this.unregister();
    clients.delete(this);
  }

  /**
   * Handler for when the host changes
   * @returns {void}
   */
  public hostChange () {
    this.reset();
  }

  protected reset () {
    this.current = null;
    this.requestUpdate();
  }

  /**
   * Sends out a notification to reassign a new host
   * @returns {void}
   */
  protected reassign (): void {
    if (this.isHost) {
      bc.postMessage(0);
      this.hostChange();
    }
  }

  /**
   * Requests a updates
   * @returns {void}
   */
  requestUpdate (): void {
    this.#runner.schedule(() => this.updateHost());
  }

  /**
   * Updates the current host
   * and fires a callback if the host has changed
   * @returns {void}
   */
  protected updateHost (): void {
    const next = getHost();
    if (this.current?.address !== next?.address) {
      this.current = next;
      this.isHost && bc.postMessage(0);
      this.callback && this.callback(next);
    }
  }
}

export class Client {
  /**
   * Address of the client
   */
  address: string;
  constructor (callback: HostCallback) {
    const controller = new HostController(callback);
    this.address = controller.address;
    map.set(this, controller);
  }
  /**
   * Checks to see if instance is current host
   */
  get isHost (): boolean {
    const controller = map.get(this) as Client;
    return controller.isHost;
  }
  /**
   * Disconnects the client
   * @returns {void}
   */
  public disconnect ():void {
    const controller = map.get(this) as Client;
    return controller.disconnect();
  }
}
