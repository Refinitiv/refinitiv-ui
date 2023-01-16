import { uuid } from '../uuid.js';

export class Coordinator {

  private hostKey;
  private host: string | null | undefined;
  public id;

  constructor (stateName: string) {
    this.hostKey = `${stateName}[coordinator]`;
    const id = uuid();
    this.id = id;
    // Save ourself as Host
    localStorage.setItem(this.hostKey, this.id);
  }

  public isReceiver (key: string): boolean {
    return key?.startsWith(this.id);
  }
  public isHost (): boolean {
    return this.getHost() === this.id;
  }
  public getHost (): string {
    if (this.host) {
      return this.host;
    }
    const host = localStorage.getItem(this.hostKey);
    if (host) {
      this.host = host;
      return host;
    }
    return '';
  }
}
