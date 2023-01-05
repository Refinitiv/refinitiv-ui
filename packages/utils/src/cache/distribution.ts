import { CacheMessenger } from './messenger.js';
import { CACHE_PREFIX } from './constants.js';

export type DistributionState = {
  request: `${string}[request]`,
  leader: `${string}[leader]`,
  unloaded: `${string}[unloaded]`
};

export class Distribution {

  /**
   * Cache messenger for distribute cache
   */
  protected messenger: CacheMessenger;

  /**
   * Names for manage all states temporary
   */
  public state: DistributionState;

  /**
   * Request coodinator is exist to working with
   */
  public coordinator = false;

  constructor (name: string, messenger: CacheMessenger) {
    const stateName = `[${CACHE_PREFIX}][${name}]`;
    this.messenger = messenger;
    this.state = {
      request: `${stateName}[request]`,
      leader: `${stateName}[leader]`,
      unloaded: `${stateName}[unloaded]`
    };
    this.listenLocalStorage();
    // Send message to resonance across messengers
    this.messenger.notify('coordinator', 'true');
  }
  private listenLocalStorage (): void {
    // Listen storage event for leader election
    window.addEventListener('storage', ({ key, newValue }) => {
      // Handle request event
      if (key?.startsWith(this.state.request) && newValue) {
        const itemKey = key.replace(`${this.state.request}-`, '');
        const leaderKey = `${this.state.leader}-${itemKey}`;
        // Set a new leader if does not exists
        if (!localStorage.getItem(leaderKey)) {
          // Save Leader
          localStorage.setItem(leaderKey, newValue);
          // Notify election results to leader
          this.messenger.notify(`${this.state.leader}-${itemKey}`, newValue);
        }
      }
    });
  }

  public handleDistribution (key: string) {
    // Set coordinator true when found the response message
    if (!this.coordinator && key === 'coordinator') {
      this.coordinator = true;
      // Resonance across messengers
      this.messenger.notify('coordinator', 'true');
      return true;
    }
    return false;
  }
}
