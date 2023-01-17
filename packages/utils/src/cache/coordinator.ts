import { uuid } from '../uuid.js';
import { CacheMessenger, type Message } from './messenger.js';

export class Coordinator {

  private hostKey;

  private host: string | undefined;

  public id;

  protected messenger: CacheMessenger;


  constructor (stateName: string) {
    this.hostKey = `${stateName}[coordinator]`;
    const id = uuid();
    this.id = id;
    this.messenger = new CacheMessenger(`${stateName}-host`);
    this.listen();

    const host = localStorage.getItem(this.hostKey);
    if (host) {
      this.messenger.notify('ping_to_host', host);
    }
    else {
      // Set ourself as Host
      localStorage.setItem(this.hostKey, this.id);
      this.host = this.id;
      this.messenger.notify('host_response', this.id);
    }
  }

  private listen (): void {
    this.messenger.onMessage = (message: Message) => {
      const { key, value } = message;
      if (key === 'ping_to_host' && value === this.id) {
        this.messenger.notify('host_response', this.id);
      }
      else if (key === 'host_response') {
        if (this.host && this.host !== value) {
          const host = localStorage.getItem(this.hostKey);
          if (host && host !== this.id) {
            this.host = host;
          }
          else {
            this.messenger.notify('host_response', this.id);
          }
        }
        else if (!this.host) {
          this.host = value;
        }
      }
    };
  }

  public isReceiver (key: string): boolean {
    return key?.startsWith(this.id);
  }
  public isHost (): boolean {
    return this.getHost() === this.id;
  }
  public getHost (): string {
    if (this.host !== this.id) {
      this.messenger.close();
    }
    if (this.host) {
      return this.host;
    }
    localStorage.setItem(this.hostKey, this.id);
    this.host = this.id;
    return this.host;
  }
}
