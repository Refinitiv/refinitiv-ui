import { Host } from '../host.js';
import { CONTROLLER_SERVICE } from './service-ids.js';
import { LocalStorage } from '../storage.js';

const store = new LocalStorage(CONTROLLER_SERVICE);

export const getHost = (): Host | null => {
  const instances = [...store.list()];
  if (instances.length) {
    instances.sort((a, b) => a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0);
    const [address] = instances[0];
    return new Host(address);
  }
  return null;
};
