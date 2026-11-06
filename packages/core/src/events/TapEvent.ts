type Positions = {
  pageX: number;
  pageY: number;
  screenX: number;
  screenY: number;
  clientX: number;
  clientY: number;
};
type MetaKeys = { altKey: boolean; ctrlKey: boolean; metaKey: boolean; shiftKey: boolean };

// Define tap events for global scope
declare global {
  interface GlobalEventHandlersEventMap {
    /**
     * @event tap
     * Simulates consistent click/tap events across pointer/touch devices
     */
    tap: TapEvent;
    /**
     * @event tapstart
     * Simulates consistent mousedown/touchstart events across pointer/touch devices
     */
    tapstart: TapEvent;
    /**
     * @event tapend
     * Simulates consistent mouseup/touchend events across pointer/touch devices
     */
    tapend: TapEvent;
  }
}

let positions: Positions;
let metaKeys: MetaKeys | undefined;

const MAIN_BUTTON = 0;

/**
 * Simulates consistent click/tap events across pointer/touch devices
 */
export class TapEvent extends Event {
  public pageX = 0;
  public pageY = 0;
  public screenX = 0;
  public screenY = 0;
  public clientX = 0;
  public clientY = 0;
  public altKey = false;
  public ctrlKey = false;
  public metaKey = false;
  public shiftKey = false;

  constructor(type: string, eventInitDict?: EventInit) {
    super(type, eventInitDict);
    if (positions) {
      this.pageX = positions.pageX;
      this.pageY = positions.pageY;
      this.screenX = positions.screenX;
      this.screenY = positions.screenY;
      this.clientX = positions.clientX;
      this.clientY = positions.clientY;
    }
    if (metaKeys) {
      this.altKey = metaKeys.altKey;
      this.ctrlKey = metaKeys.ctrlKey;
      this.metaKey = metaKeys.metaKey;
      this.shiftKey = metaKeys.shiftKey;
    }
  }
}

/**
 * Check if a passed target should have button-like behaviour (aka role="button")
 * @param target Target to check
 * @returns true if target has button behaviour
 */
const isButtonBehaviour = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement &&
  target.matches('[role=button]') &&
  !target.matches('button,a,input[type=button],input[type=submit]');

/**
 * Check if `enter` key is pressed
 * @param event Keyboard event
 * @returns true is `enter` key
 */
const isEnterKey = (event: KeyboardEvent) => event.key === 'Enter';

/**
 * Check if `space` key is pressed
 * @param event Keyboard event
 * @returns true is `space` key
 */
const isSpaceKey = (event: KeyboardEvent) => event.key === ' ';

/**
 * Get top most event target for the composed path
 * @param event Event
 * @returns composed event target
 */
const topPathTarget = (event: Event): EventTarget => [...event.composedPath()][0];

/**
 * Start ELF input handling inside an app root without changing page controls.
 * The returned cleanup also cancels interaction-completion listeners.
 * @param root App input boundary
 * @returns Listener cleanup
 */
export const applyTapEvents = (root: ShadowRoot): (() => void) => {
  const listeners = new AbortController();
  let completionListeners: AbortController | undefined;
  const appEventPath = (event: Event): EventTarget[] => {
    const path = event.composedPath();
    return path.slice(0, path.indexOf(root) + 1);
  };
  const listen = <EventName extends keyof HTMLElementEventMap>(
    eventName: EventName,
    listener: (event: HTMLElementEventMap[EventName]) => void,
    capture: boolean
  ): void => {
    root.addEventListener(eventName, listener as EventListener, {
      capture,
      signal: listeners.signal
    });
  };
  /**
   * The starting touch point.
   * This is the most recent `touchstart`.
   */
  let startTouch: Touch | null;

  /**
   * The current touch identifier.
   * This is used to keep track of the current touch point,
   * when multiple touches are discovered.
   */
  let currentTouch = -1;

  /**
   * The last tap event target.
   * This is used to filter out duplicate tap events,
   * when a natural click event is fired.
   */
  let lastTapTarget: EventTarget | null;

  /**
   * The last key down event target on `role=button`.
   * This is used to ensure that keydown and keyup events run on the same target
   */
  let buttonLastKeydownTarget: EventTarget | null;

  /**
   * Stored event path from `mousestart` event.
   * Used to match correct tap target.
   */
  let mouseEventPath: EventTarget[] = [];

  /**
   * Stored event path from `touchstart` event.
   * Used to match correct tap target.
   */
  let touchEventPath: EventTarget[] = [];

  const resetInteraction = (): void => {
    completionListeners?.abort();
    completionListeners = undefined;
    mouseEventPath = [];
    touchEventPath = [];
    buttonLastKeydownTarget = null;
    lastTapTarget = null;
    currentTouch = -1;
  };

  const watchCompletion = (): void => {
    completionListeners?.abort();
    completionListeners = new AbortController();
    const options = { capture: true, signal: completionListeners.signal };
    const document = root.ownerDocument;
    document.addEventListener(
      'mouseup',
      (event) => {
        if (!event.composedPath().includes(root)) {
          const pressedTarget = mouseEventPath[0];
          if (pressedTarget) {
            dispatchTapOnTarget('tapend', pressedTarget, event);
          }
          resetInteraction();
        }
      },
      options
    );
    document.addEventListener(
      'keyup',
      (event) => {
        if (!event.composedPath().includes(root)) {
          resetInteraction();
        }
      },
      options
    );
    document.addEventListener(
      'touchend',
      (event) => {
        if (!event.composedPath().includes(root)) {
          const pressedTarget = touchEventPath[0];
          const touch = event.changedTouches[0];
          if (pressedTarget && touch) {
            dispatchTapOnTarget('tapend', pressedTarget, touch);
          }
          resetInteraction();
        }
      },
      options
    );
    document.addEventListener('touchcancel', resetInteraction, options);
    document.addEventListener('pointercancel', resetInteraction, options);
    root.ownerDocument.defaultView?.addEventListener('blur', resetInteraction, options);
  };

  /**
   * Dispatches a tap event on the current tap target
   * @param type event type
   * @param target event target
   * @param info event information
   * @returns {void}
   */
  const dispatchTapOnTarget = (type: string, target: EventTarget, info: MouseEvent | Touch): void => {
    const { pageX, pageY, screenX, screenY, clientX, clientY } = info;
    positions = { pageX, pageY, screenX, screenY, clientX, clientY };

    if (info instanceof MouseEvent) {
      const { altKey, ctrlKey, shiftKey, metaKey } = info;
      metaKeys = { altKey, ctrlKey, shiftKey, metaKey };
    } else {
      metaKeys = undefined;
    }

    const tapEvent = new TapEvent(type, {
      bubbles: true,
      composed: true,
      cancelable: true
    });

    target.dispatchEvent(tapEvent);

    if (tapEvent.defaultPrevented && info instanceof Event && info.composedPath().includes(root)) {
      info.preventDefault();
    }
  };

  /**
   * Listen to `mousedown` events on the target.
   * Use this to fire tapstart events, unless one
   * has already been triggered from a touch event.
   */
  listen(
    'mousedown',
    (event) => {
      if (event.button !== MAIN_BUTTON) {
        return;
      }

      if (!lastTapTarget && event.target && currentTouch === -1) {
        watchCompletion();
        mouseEventPath = appEventPath(event);

        const tapTarget = mouseEventPath[0];

        if (tapTarget) {
          dispatchTapOnTarget('tapstart', tapTarget, event);
        }
      }
    },
    true
  );

  /**
   * Listen to `mouseup` events on the target.
   * Use this to fire tap and tapend events, unless one
   * has already been triggered from a touch event.
   */
  listen(
    'mouseup',
    (event) => {
      if (event.button !== MAIN_BUTTON) {
        return;
      }
      completionListeners?.abort();

      if (lastTapTarget) {
        /**
         * Tap events have been dispatched,
         * so rest and return.
         */
        lastTapTarget = null;
        return;
      }

      const path = appEventPath(event);

      const tapEndTarget = path[0];

      if (tapEndTarget) {
        dispatchTapOnTarget('tapend', tapEndTarget, event);
      }

      if (mouseEventPath.length < path.length) {
        path.splice(0, path.length - mouseEventPath.length);
      } else if (mouseEventPath.length > path.length) {
        mouseEventPath.splice(0, mouseEventPath.length - path.length);
      }

      /**
       * find closest shared NODE_ELEMENT for branches of mousedown and mouseup composedPaths to fire `tap` event
       */
      for (let i = 0; i < mouseEventPath.length - 1; i += 1) {
        if (mouseEventPath[i] === path[i] && (path[i] as Node).nodeType === Node.ELEMENT_NODE) {
          const tapTarget = mouseEventPath[i];
          dispatchTapOnTarget('tap', tapTarget, event);
          break;
        }
      }
      mouseEventPath = [];
    },
    true
  );

  /**
   * Listen to `touchstart` events
   * to get the initial touch information.
   * Also fires a tapstart event.
   */
  listen(
    'touchstart',
    (event) => {
      watchCompletion();
      startTouch = event.changedTouches[0];
      currentTouch = startTouch.identifier;
      touchEventPath = appEventPath(event);

      const tapTarget = touchEventPath[0];

      if (tapTarget) {
        dispatchTapOnTarget('tapstart', tapTarget, startTouch);
      }
    },
    true
  );

  /**
   * Listen to `touchmove` events and cancel any tap event.
   * A `touchmove` event is only fired after threshold has been reached.
   * This keeps it consistent with standard `click` events on touch devices.
   */
  listen(
    'touchmove',
    () => {
      currentTouch = -1;
    },
    true
  );

  /**
   * Listen to `touchend` events.
   * Fire tapend event and check whether
   * a tap event can also be fired.
   */
  listen(
    'touchend',
    (event) => {
      try {
        const touch = event.changedTouches[0];
        const path = appEventPath(event);

        if (touchEventPath.length < path.length) {
          path.splice(0, path.length - touchEventPath.length);
        }

        const tapTarget = path[0];

        if (tapTarget) {
          dispatchTapOnTarget('tapend', tapTarget, touch);
        }

        if (tapTarget && touch.identifier === currentTouch) {
          lastTapTarget = tapTarget;
          dispatchTapOnTarget('tap', tapTarget, touch);
        }
      } finally {
        currentTouch = -1;
        completionListeners?.abort();
      }
    },
    true
  );

  /**
   * Listen to `click` events on the target.
   * Use this to fire tap events, if `enter` or `space` key was pressed
   */
  listen(
    'click',
    (event: MouseEvent | PointerEvent) => {
      // check for events triggered by enter or space key
      // https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
      if (event.detail === 0) {
        const tapTarget = topPathTarget(event);

        dispatchTapOnTarget('tap', tapTarget, event);
      }
    },
    true
  );

  /**
   * Listen to `keydown` event on the target
   * Use this to fire tap event, if `enter` is pressed and prevent default if `space` is pressed.
   */
  listen(
    'keydown',
    (event: KeyboardEvent) => {
      const target = topPathTarget(event);
      const enterKey = isEnterKey(event);
      buttonLastKeydownTarget = null;

      if (event.defaultPrevented || !(enterKey || isSpaceKey(event)) || !isButtonBehaviour(target)) {
        return;
      }

      buttonLastKeydownTarget = target;
      watchCompletion();

      if (enterKey) {
        (target as HTMLElement).click();
      }

      event.preventDefault();
    },
    true
  );

  /**
   * Listen to `keyup` event on the target
   * Use this to fire tap event, if `space` is pressed.
   */
  listen(
    'keyup',
    (event: KeyboardEvent) => {
      const target = topPathTarget(event);

      if (buttonLastKeydownTarget === target && !event.defaultPrevented && isSpaceKey(event)) {
        (target as HTMLElement).click();
      }

      buttonLastKeydownTarget = null;
      completionListeners?.abort();
    },
    true
  );

  return () => {
    resetInteraction();
    listeners.abort();
  };
};
