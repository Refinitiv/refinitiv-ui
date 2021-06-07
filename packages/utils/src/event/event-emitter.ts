/**
 * Default data map.
 * Returns unknown data types for all event names.
 * Data types can be cast in the listener if no specific data map is provided.
 */
interface DefaultDataMap {
  [key: string]: unknown;
}

/**
 * Event listener that returns a specific
 * data object to the callback.
 */
export interface EventEmitterListener<T> {
  (data: T): void;
}

/**
 * Enables event management on
 * other sub-classes.
 *
 * @example
 *
 * interface CustomEventData {
 *   foo: string;
 *   bar: number;
 * }
 *
 * interface OtherCustomEventData extends CustomEventData {
 *   baz: number[];
 * }
 *
 * interface EventDataMap {
 *   'custom-event': CustomEventData;
 *   'other-custom-event': OtherCustomEventData;
 * }
 *
 * class EmitterClass extends EventEmitter<EventDataMap> {
 *   test (): void {
 *     this.emit('custom-event', {
 *       foo: 'hello earth',
 *       bar: 1
 *     });
 *     this.emit('other-custom-event', {
 *       foo: 'hello mars',
 *       bar: 0.2,
 *       baz: [1, 2, 3]
 *     });
 *   }
 * }
 *
 * const ec = new EmitterClass();
 * ec.on('custom-event', (data) => console.log(data.foo));
 * ec.on('other-custom-event', (data) => console.log(data.baz));
 * ec.test();
 */
export class EventEmitter<T = DefaultDataMap> {

  /**
   * Collection of subscribed event handlers.
   */
  private events = new Map<keyof T, Function[]>();

  /**
   * Gets the event listeners for a specific event name.
   * @param name Name of the event
   * @returns Collection of active listeners
   */
  private getEventListeners<K extends keyof T> (name: K): Function[] {
    if (!this.events.has(name)) {
      this.events.set(name, []);
    }
    return this.events.get(name) as Function[];
  }

  /**
   * Emits an event
   * @param name Name of the event to emit
   * @param data Data that should be passed to the handlers.
   * @returns {void}
   */
  protected emit<K extends keyof T> (name: K, data: T[K]): void {
    for (const handler of this.getEventListeners(name)) {
      handler(data);
    }
  }

  /**
   * Subscribes to an event
   * @param name Name of the event to subscribe to
   * @param listener Event listener to use
   * @returns {void}
   */
  public on <K extends keyof T> (name: K, listener: EventEmitterListener<T[K]>): this {
    this.getEventListeners(name).push(listener);
    return this;
  }

  /**
   * Unsubscribes from an event
   * @param name Name of the event to unsubscribe from
   * @param listener Original event listener to remove
   * @returns {void}
   */
  public off <K extends keyof T> (name: K, listener: EventEmitterListener<T[K]>): boolean {
    const events = this.getEventListeners(name);
    const index = events.indexOf(listener);
    if (index !== -1) {
      events.splice(index, 1);
      return true;
    }
    return false;
  }

}
