import { MESSAGE_SERVICE } from './utils/service-ids.js';

export type Message = {
  sender: string;
  data: HostRequest | HostResponse | HostReload | ClientRequest | ClientResponse | ClientUnload | HostReplacement;
  recipients: string;
}

export type HostRequest = {
  action: 'host_request',
  keys: string[];
}
export type HostReplacement = {
  action: 'host_replacement',
  items: Map<string, string>;
}

export type HostResponse = {
  action: 'host_response',
  items: { key: string, value: string }[];
}

export type HostReload = {
  action: 'host_reload',
  keys: string[];
}

export type ClientRequest = {
  action: 'client_request',
  keys: string[];
}

export type ClientResponse = {
  action: 'client_response',
  key: string;
  value: string;
}

export type ClientUnload = {
  action: 'client_unload',
  keys: string[];
}

export type OnMessageCallback = (message: Message) => void;

export class Messenger {
  private id: string;
  private broadcastChannel?: BroadcastChannel;
  public onMessage: OnMessageCallback | undefined = undefined;

  constructor (id: string) {
    this.id = id;
    this.open();
  }

  open (): void {
    this.broadcastChannel = new BroadcastChannel(MESSAGE_SERVICE);
    this.broadcastChannel.onmessage = (event: MessageEvent<Message>) => {
      if (this.onMessage instanceof Function) {
        if ([this.id, '*'].some(cond => event.data.recipients.includes(cond))) {
          this.onMessage(event.data);
        }
      }
    };
  }

  public close (): void {
    this.broadcastChannel?.close();
    this.broadcastChannel = undefined;
  }

  public send (to: string | string[], data: unknown): void {
    if (!this.broadcastChannel) {
      this.open();
    }
    this.broadcastChannel?.postMessage({
      recipients: Array.isArray(to) ? to : [to],
      sender: this.id,
      data
    });
  }
}
