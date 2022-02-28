import {
  ResponsiveElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues,
  ElementSize
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../../version.js';
import { MicroTaskRunner, AnimationTaskRunner } from '@refinitiv-ui/utils/async.js';
import { isIE, isEdge } from '@refinitiv-ui/utils/browser.js';
import {
  TransitionStyle,
  PositionTarget,
  Position,
  Calculated,
  DEFAULT_ALIGN,
  DEFAULT_TARGET_STRATEGY,
  NullOrUndefined,
  SizingInfo,
  PositionStyle,
  PositionTargetStrategy,
  CalculatedPosition,
  SizingInfoRect,
  ViewAreaInfo
} from '../helpers/types.js';
import { valueOrZero, valueOrNull } from '../helpers/functions.js';
import { applyLock } from '../managers/interaction-lock-manager.js';
import { register as viewportRegister, deregister as viewportDeregister, getViewAreaInfo } from '../managers/viewport-manager.js';
import { register as zIndexRegister, deregister as zIndexDeregister, toFront } from '../managers/zindex-manager.js';
import { register as backdropRegister, deregister as backdropDeregister } from '../managers/backdrop-manager.js';
import { register as closeRegister, deregister as closeDeregister } from '../managers/close-manager.js';
import { register as focusableRegister, deregister as focusableDeregister } from '../managers/focus-manager.js';

export type {
  TransitionStyle,
  PositionTarget,
  Position,
  PositionTargetStrategy
};

/**
 * Possible states of the overlay
 */
enum OpenedState {
  CLOSED = 0, /* overlay is not visible on the screen */
  OPENING = 1, /* overlay is visible on the screen, but opening animation is still running */
  OPENED = 2, /* overlay is visible on the screen */
  CLOSING = 3 /* overlay is visible on the screen, but closing animation is still running */
}

/**
 * A helper function to set or remove attribute based on the value
 * @param overlay Overlay
 * @param name Attribute name
 * @param value If false or empty string attribute is removed
 * @returns {void}
 */
const toggleAttribute = (overlay: Overlay, name: string, value: string | boolean): void => {
  if (!value) {
    overlay.removeAttribute(name);
  }
  else {
    overlay.setAttribute(name, typeof value === 'string' ? value : '');
  }
};

/**
 * A helper function to filter initial state of boolean change
 * @param newVal New value
 * @param oldVal Old value
 * @returns hasChanged
 */
const hasBooleanChanged = (newVal: boolean, oldVal?: boolean): boolean => newVal !== !!oldVal;

/**
 * A helper function to filter initial state of number change
 * @param newVal New value
 * @param oldVal Old value
 * @returns hasChanged
 */
const hasNumberChanged = (newVal: number, oldVal?: number): boolean => oldVal === undefined ? false : newVal !== oldVal;

/**
 * When these properties change render is called
 */
const shouldUpdateProperties: string[] = ['withShadow', 'transparent', 'spacing', 'transitionStyle', 'fullScreen', 'zIndex'];

/**
 * When these properties change refit is called
 */
const shouldRefitProperties: string[] = ['position', 'x', 'y', 'positionTarget', 'horizontalOffset', 'verticalOffset', 'offset', 'fullScreen', 'noOverlap'];

/**
 * Element to help building modals, dialogs and other overlay content
 * @fires closed - Dispatched when overlay becomes invisible and close animation finishes
 * @fires opened - Dispatched when the overlay becomes visible and the open animation finishes
 * @fires refit - Dispatched when refit algorithm finishes calculations
 * @fires opened-changed - Dispatched when when open attribute changes internally. Prevent default to stop opening/closing pipeline
 */
@customElement('ef-overlay', {
  alias: 'coral-popup-panel'
})
export class Overlay extends ResponsiveElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  protected readonly defaultTabIndex = -1;

  private _fullyOpened = OpenedState.CLOSED;
  private static Template = html`<slot></slot>`;

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: inline-block;
        box-sizing: border-box;
        position: fixed;
        touch-action: manipulation;
        outline: none;
      }

      :host(:not([opened]):not([animation-ready])) {
        display: none !important;
      }

      :host(:not([first-resize-done])) {
        pointer-events: none !important; /* needs for Mobile to prevent tap while overlay is not yet on the screen */
        opacity: 0 !important; /* visibility does not work in IE11 */
      }

      :host(:not([animation-ready])) {
        animation: none  !important;
        transition: none !important;
        transform: none !important;
        top: 0;
        left: 0;
      }

      :host([transition-style]) {
        transition-timing-function: ease-out;
        animation-duration: 500ms;
      }

      :host([transition-style][animation-reverse]) {
        animation-direction: reverse;
      }

      @keyframes popup-scale {
        from { transform: scale(0, 0); }
        to { transform: scale(1, 1); }
      }

      @keyframes popup-scale-vertical {
        from { transform: scaleY(0); }
        to { transform: scaleY(1); }
      }

      @keyframes popup-scale-horizontal {
        from { transform: scaleX(0); }
        to { transform: scaleX(1); }
      }

      @keyframes popup-scale-fade {
        from { opacity: 0; }
        58% { opacity: 0.3; }
        to { opacity: 1; }
      }

      @keyframes popup-fade {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      /* set origins */
      :host([transition-style="slide-down"]),
      :host([transition-style="slide"][animation-position="bottom"]) {
        transform-origin: center top;
      }
      :host([transition-style="slide-up"]),
      :host([transition-style="slide"][animation-position="top"]) {
        transform-origin: center bottom;
      }
      :host([transition-style="slide-left"]),
      :host([transition-style="slide"][animation-position="left"]) {
        transform-origin: right center;
      }
      :host([transition-style="slide-right"]),
      :host([transition-style="slide"][animation-position="right"]) {
        transform-origin: left center;
      }
      :host([transition-style="slide-right-down"]) {
        transform-origin: left top;
      }
      :host([transition-style="slide-right-up"]) {
        transform-origin: left bottom;
      }
      :host([transition-style="slide-left-down"]) {
        transform-origin: right top;
      }
      :host([transition-style="slide-left-up"]) {
        transform-origin: right bottom;
      }

      /* set animation names */
      :host([transition-style="slide-right-down"]),
      :host([transition-style="slide-right-up"]),
      :host([transition-style="slide-left-down"]),
      :host([transition-style="slide-left-up"]),
      :host([transition-style="zoom"]) {
        animation-name: popup-scale, popup-scale-fade;
      }
      :host([transition-style="fade"]) {
        animation-name: popup-fade;
      }
      :host([transition-style="slide-down"]),
      :host([transition-style="slide"][animation-position="bottom"]),
      :host([transition-style="slide-up"]),
      :host([transition-style="slide"][animation-position="top"]) {
        animation-name: popup-scale-vertical, popup-scale-fade;
      }
      :host([transition-style="slide-left"]),
      :host([transition-style="slide"][animation-position="left"]),
      :host([transition-style="slide-right"]),
      :host([transition-style="slide"][animation-position="right"]) {
        animation-name: popup-scale-horizontal, popup-scale-fade;
      }

      /* shadow comes from theme */
      :host([transparent]) {
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
        box-shadow: none !important;
        background: none !important;
        border-color: transparent !important;
      }
    `;
  }

  /**
   * True if the overlay is currently displayed
   */
  @property({ type: Boolean, reflect: true, hasChanged: hasBooleanChanged })
  public opened = false;

  /**
   * True to add shadow
   */
  @property({ type: Boolean, reflect: true, attribute: 'with-shadow', hasChanged: hasBooleanChanged })
  public withShadow = false;

  /**
   * True to make overlay background transparent
   */
  @property({ type: Boolean, reflect: true, hasChanged: hasBooleanChanged })
  public transparent = false;

  /**
   * True to apply spacing for overlay content
   */
  @property({ type: Boolean, reflect: true, hasChanged: hasBooleanChanged })
  public spacing = false;

  /**
   * Set the transition style
   * @type {TransitionStyle|null|undefined}
   */
  @property({ type: String, reflect: true, attribute: 'transition-style' })
  public transitionStyle: TransitionStyle | NullOrUndefined;

  /**
   * Set a preferable z-index to override automatically calculated z-index
   * @type {number|null|undefined}
   */
  @property({ type: Number, attribute: 'z-index' })
  public zIndex: number | NullOrUndefined;

  /**
   * Set a specific x coordinate
   * @type {number|null|undefined}
   */
  @property({ type: Number, hasChanged: hasNumberChanged })
  public x: number | NullOrUndefined;

  /**
   * Set a specific y coordinate
   * @type {number|null|undefined}
   */
  @property({ type: Number, hasChanged: hasNumberChanged })
  public y: number | NullOrUndefined;

  /**
   * Set the position target as follows:
   * - HTMLElement if overlay is position next to the HTML element
   * - String containing `top`, `right`, `left`, `bottom`, `center` combinations to position against the screen.
   * For instance: `top left` - put the overlay at `top left` point of the screen; `bottom` - put overlay at `bottom center` point of the screen
   * @type {PositionTarget|null|undefined}
   */
  @property({ attribute: 'position-target' })
  public positionTarget: HTMLElement | PositionTarget | NullOrUndefined;

  /**
   * A pixel value that will be added to the position calculated on the horizontal axis.
   * The offset will be applied either to the `left` or `right` depending on the `positionTarget`
   */
  @property({ type: Number, attribute: 'horizontal-offset', hasChanged: hasNumberChanged })
  public horizontalOffset = 0;

  /**
   * A pixel value that will be added to the position calculated on the vertical axis.
   * The offset will be applied either to the `top` or `bottom` depending on the `positionTarget`
   */
  @property({ type: Number, attribute: 'vertical-offset', hasChanged: hasNumberChanged })
  public verticalOffset = 0;

  /**
   * A pixel value that will be added to the position calculated on the vertical or horizontal axis.
   * The offset is applied dynamically depending on the `positionTarget`
   */
  @property({ type: Number, hasChanged: hasNumberChanged })
  public offset = 0;

  /**
   * Set to true to disable canceling the overlay with the ESC key
   */
  @property({ type: Boolean, attribute: 'no-cancel-on-esc-key', hasChanged: hasBooleanChanged })
  public noCancelOnEscKey = false;

  /**
   * Set to true to disable canceling the overlay by clicking outside it
   */
  @property({ type: Boolean, attribute: 'no-cancel-on-outside-click', hasChanged: hasBooleanChanged })
  public noCancelOnOutsideClick = false;

  /**
   * Set to true to show overlay in full screen mode
   */
  @property({ type: Boolean, reflect: true, attribute: 'full-screen', hasChanged: hasBooleanChanged })
  public fullScreen = false;

  /**
   * True to not overlap positionTarget
   */
  @property({ type: Boolean, attribute: 'no-overlap', hasChanged: hasBooleanChanged })
  public noOverlap = false;

  /**
   * Stop preventing user interaction when overlay is visible
   */
  @property({ type: Boolean, attribute: 'no-interaction-lock', hasChanged: hasBooleanChanged })
  public noInteractionLock = false;

  /**
   * True to not apply focus management.
   * The overlay will not limit Tab behaviour or do auto-focusing
   */
  @property({ type: Boolean, attribute: 'no-focus-management', hasChanged: hasBooleanChanged })
  public noFocusManagement = false;

  /**
   * True to lock position target
   * Valid only if noInteractionLock is false (default)
   */
  @property({ type: Boolean, attribute: 'lock-position-target', hasChanged: hasBooleanChanged })
  public lockPositionTarget = false;

  /**
   * A list of elements, which are active when overlay is opened
   * Valid only if noInteractionLock is false (default)
   */
  @property({
    type: Array,
    attribute: false,
    hasChanged: (newVal: HTMLElement[], oldVal?: HTMLElement[]): boolean => {
      if (!oldVal || newVal.length !== oldVal.length) {
        return true;
      }
      return newVal.some(el => !oldVal.includes(el));
    }
  })
  public interactiveElements: HTMLElement[] = [];

  /**
   * True to show backdrop
   */
  @property({ type: Boolean, attribute: 'with-backdrop', hasChanged: hasBooleanChanged })
  public withBackdrop = false;

  /**
   * Set to true to disable autofocusing the overlay or open
   */
  @property({ type: Boolean, attribute: 'no-autofocus', hasChanged: hasBooleanChanged })
  public noAutofocus = false;

  /**
   * Used as a hook to support deprecation attributes from v3
   */
  private _position?: Position[];

  /**
   * Set position and align against the attach target.
   * Position may contain a single word or a comma separated list to set the priority.
   * Position is not applied if `attachTarget` is not HTML Element.
   * For instance: `[bottom-middle, top-middle]` - default position is bottom-middle, if cannot fit position top-middle;
   * or `[left, right]` - align is not set, set best position on the left or right
   *
   * Position can be: `top`, `right`, `bottom`, `left`, `center`
   * Align can be: `start`, `middle`, `end`
   *
   * @param value Position value
   */
  @property({
    type: Array,
    hasChanged (newVal: Position[], oldVal: Position[]) {
      return newVal && oldVal ? newVal.join('') === oldVal.join('') : newVal !== oldVal;
    },
    converter: {
      fromAttribute: (value: string): Position[] => {
        return value.toLocaleLowerCase()
          .replace(/ /g, '')
          .replace(/\|/g, ',')
          .split(',') as Position[];
      }
    }
  })
  public set position (value: Position[] | undefined) {
    const oldPosition = this._position;
    if (oldPosition !== value) {
      this._positionStrategy = undefined;
      this._position = value;
      this.requestUpdate('position', oldPosition);
    }
  }
  public get position (): Position[] | undefined {
    return this._position;
  }

  /**
   * Parsed position for re-use
   */
  private _positionStrategy: Array<string[]> | undefined;

  /**
   * Get parsed position strategy or the default strategy if none provided
   * @returns positionStrategy as a list of tuples containing position and align
   */
  private get positionStrategy (): Array<string[]> | undefined {
    if (this._positionStrategy) {
      return this._positionStrategy;
    }

    if (!this.position) {
      return undefined;
    }

    const positionList = [...this.position];
    const positionStrategy: Array<string[]> = this._positionStrategy = [];

    while (positionList.length) {
      const position = positionList.shift();
      if (!position) {
        continue;
      }
      const strategy: string[] = position.split('-');
      if (!strategy[1]) {
        const defaultAlign = DEFAULT_ALIGN.get(strategy[0]);
        if (!defaultAlign) {
          throw new Error(`ef-overlay: incorrect position provided: ${strategy[0]}`);
        }
        strategy.push(defaultAlign);
      }

      positionStrategy.push(strategy);
    }

    return positionStrategy;
  }

  /**
   * Get position target configuration based on positionTarget and fullScreen properties
   * Used for caching and calculations
   */
  public get positionTargetConfig (): PositionTargetStrategy {
    const {
      viewHeight,
      viewWidth,
      viewOffsetTop,
      viewOffsetLeft
    } = this.viewAreaInfo;

    let left;
    let top;

    if (this.fullScreen) { /* keep it for caching only to not break other algorithms */
      return {
        rect: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          height: viewHeight,
          width: viewWidth
        },
        position: [['center', 'middle']]
      };
    }

    if (this.positionTarget instanceof HTMLElement) {
      const positionTargetElRect = this.positionTarget.getBoundingClientRect();

      return {
        rect: {
          top: positionTargetElRect.top - viewOffsetTop,
          right: positionTargetElRect.right - viewOffsetLeft,
          bottom: positionTargetElRect.bottom - viewOffsetTop,
          left: positionTargetElRect.left - viewOffsetLeft,
          width: positionTargetElRect.width,
          height: positionTargetElRect.height
        },
        position: [...(this.positionStrategy || DEFAULT_TARGET_STRATEGY)]
      };
    }

    const x = this.x || 0;
    const y = this.y || 0;
    let positionTarget = `${typeof this.x === 'number' && this.x >= 0 ? 'left' : 'center'} ${typeof this.y === 'number' && this.y >= 0 ? 'top' : 'center'}`;

    if (typeof this.positionTarget === 'string') {
      positionTarget = this.positionTarget.trim() || positionTarget;
      const positionTargetList = positionTarget.split(' ').slice(0, 2);

      if (positionTargetList.length === 1) {
        positionTargetList.push('center');
      }

      positionTarget = positionTargetList.join(' ');
    }

    let defaultPosition;

    /* istanbul ignore next */
    switch (positionTarget) {
      case 'top left':
      case 'left top':
        left = x;
        top = y;
        defaultPosition = ['bottom', 'start'];
        break;
      case 'top center':
      case 'center top':
        left = viewWidth / 2 + x;
        top = y;
        defaultPosition = ['bottom', 'middle'];
        break;
      case 'top right':
      case 'right top':
        left = viewWidth - x;
        top = y;
        defaultPosition = ['bottom', 'end'];
        break;
      case 'center left':
      case 'left center':
        left = x;
        top = viewHeight / 2 + y;
        defaultPosition = ['right', 'middle'];
        break;
      case 'center right':
      case 'right center':
        left = viewWidth - x;
        top = viewHeight / 2 + y;
        defaultPosition = ['left', 'middle'];
        break;
      case 'bottom left':
      case 'left bottom':
        left = x;
        top = viewHeight - y;
        defaultPosition = ['top', 'start'];
        break;
      case 'bottom center':
      case 'center bottom':
        left = viewWidth / 2 + x;
        top = viewHeight - y;
        defaultPosition = ['top', 'middle'];
        break;
      case 'bottom right':
      case 'right bottom':
        left = viewWidth - x;
        top = viewHeight - y;
        defaultPosition = ['top', 'end'];
        break;
      case 'center center':
      default:
        left = viewWidth / 2 + x;
        top = viewHeight / 2 + y;
        defaultPosition = ['center', 'middle'];
    }

    return {
      rect: {
        top,
        bottom: top,
        left,
        right: left,
        height: 0,
        width: 0
      },
      position: [...(this.positionStrategy || [defaultPosition])]
    };
  }

  /**
   * Set focus boundary to restrict tabbing. Default's overlay itself.
   * If external focus is required, set to null
   */
  public focusBoundary: HTMLElement | ShadowRoot | null = this;

  /**
   * A hook to reset transition and transform when the overlay is opened.
   * This removes the complexity of calculating specific "transformed"
   * coordinates for descendant elements
   * @param animationReady True to set attribute
   */
  private set animationReady (animationReady: boolean) {
    toggleAttribute(this, 'animation-ready', animationReady);
  }

  /**
   * Run the animation reverse order when closing
   * @param animationReverse True to set attribute
   */
  private set animationReverse (animationReverse: boolean) {
    toggleAttribute(this, 'animation-reverse', animationReverse);
  }

  /**
   * Used with dynamic `slide` animation to detect correct animation position
   * @param animationPosition Set animation position
   */
  private set animationPosition (animationPosition: string) {
    toggleAttribute(this, 'animation-position', animationPosition);
  }

  private _firstResizeDone = false;
  /**
   * Used to set attribute after the initial callback has been fired
   * A function is here to sort IE11 flickering problem
   * @param firstResizeDone True if the initial resize has happened
   */
  private set firstResizeDone (firstResizeDone: boolean) {
    if (this._firstResizeDone !== firstResizeDone) {
      this._firstResizeDone = firstResizeDone;
      toggleAttribute(this, 'first-resize-done', firstResizeDone);
    }
  }
  private get firstResizeDone (): boolean {
    return this._firstResizeDone;
  }

  /**
   * Used internally to keep calculated positions
   */
  private calculated: Calculated = {};

  /**
   * All internal opened set events can be stoppable externally
   * Use this instead of setting opened directly
   * Protected method that can be used by managers or subclasses
   * @param opened True if opened
   * @returns {void}
   */
  protected setOpened (opened: boolean): void {
    if (this.opened !== opened) {
      if (this.notifyPropertyChange('opened', opened, true)) {
        this.opened = opened;
      }
    }
  }

  public disconnectedCallback (): void {
    this.removeMainRegisters();
    this.onFullyClosed();
    super.disconnectedCallback();
  }

  /**
   * Called when the element’s DOM has been updated and rendered
   * @param changedProperties Properties that has changed
   * @returns shouldUpdate
   */
  protected shouldUpdate (changedProperties: PropertyValues): boolean {
    const isOpened = this.opened;
    const isClosed = !this.opened;
    const opening = changedProperties.has('opened') && isOpened;
    const closing = changedProperties.has('opened') && isClosed;

    this.setRegisters(changedProperties);

    // Should update routing is calling render method. Not every attribute should result in render being called
    let shouldUpdate = opening || closing || !this.hasUpdated || changedProperties.size === 0;

    // Element may need to be updated if other attributes has been changed while the overlay is opened
    if (!shouldUpdate && isOpened) {
      if (shouldUpdateProperties.find(property => changedProperties.has(property))) {
        shouldUpdate = true;
      }
    }

    // refit is separate routine that calls refit method
    // note: refit is called by ResizeCallback as well
    // therefore we check the opened state
    if (opening || closing) {
      this.openedChange();
    }
    else if (this.opened) {
      // Explicitly call hard refit
      if (shouldRefitProperties.find(property => changedProperties.has(property))) {
        this.refit();
      }
    }

    return shouldUpdate;
  }

  private redrawThrottler = new AnimationTaskRunner();

  /**
   * Run when opened attribute changes.
   * The function must be throttled in animation task to give time an element to be rendered
   * @returns {void}
   */
  private openedChange (): void {
    if (!this.opened) {
      if (this._fullyOpened === OpenedState.OPENED) { /* cannot set to closing if the overlay has not been fully opened */
        this._fullyOpened = OpenedState.CLOSING;
      }

      this.removeMainRegisters();

      if (this.transitionStyle) {
        this.onOpenedChangedAnimation(); /* animation will fully close overlay on animation finish */
      }
      else {
        this.onFullyClosed();
      }
    }

    // These hacks are required in order to solve a problem when IE11 or Edge does not display
    // the component, even if all CSS properties are set correctly
    // The reason of such behaviour is unknown, but may be related to polyfills
    /* istanbul ignore next */
    if (isIE) {
      this.redrawThrottler.schedule(() => this.style.setProperty('clear', 'none'));
    }
    else if (isEdge) {
      this.redrawThrottler.schedule(() => this.updateVariable('--redraw', `${Date.now()}`));
    }

    /*
    https://github.com/juggle/resize-observer/issues/42

    This event ensures that ResizeObserver picks up resize events
    when overlay is deeply nested inside shadow root.
    TODO: remove this workaround once ResizeObserver handles shadow root scenario
    */
    window.dispatchEvent(new Event('animationiteration'));
  }

  /**
   * This function sets obligatory registers
   * and sets/removes optional registers
   * based on the fact whether the overlay is opened or not
   * or whether the register attribute has changed
   * @param changedProperties Changed properties
   * @returns {void}
   */
  private setRegisters (changedProperties: PropertyValues): void {
    const opened = this.opened;
    const opening = changedProperties.has('opened') && opened;

    /* !!! Obligatory managers cannot be removed here, as this function is synchronous and animations must be taken into account !!! */
    if (opening) {
      // must come first as used by other managers
      zIndexRegister(this);

      viewportRegister(this);

      closeRegister(this, () => {
        this.setOpened(false);
      });
    }

    const enablingFocusManagement = (opening && !this.noFocusManagement) || (opened && !!changedProperties.get('noFocusManagement'));
    const disablingFocusManagement = opened && changedProperties.get('noFocusManagement') === false;
    if (enablingFocusManagement) {
      focusableRegister(this);
    }
    else if (disablingFocusManagement) {
      focusableDeregister(this);
    }

    if (opening || changedProperties.has('noInteractionLock') || changedProperties.has('lockPositionTarget') || changedProperties.has('interactiveElements')) {
      applyLock();
    }

    const enablingBackdrop = (opening && this.withBackdrop) || (opened && changedProperties.get('withBackdrop') === false);
    const disablingBackdrop = opened && !!changedProperties.get('withBackdrop');
    if (enablingBackdrop) {
      backdropRegister(this);
    }
    else if (disablingBackdrop) {
      backdropDeregister(this);
    }
  }

  /**
   * This function is called in order to remove overlay from main registers
   * Registers must be removed in correct order, otherwise overlay might behave
   * unexpectedly. All other registers are removed inside onFullyClosed function
   * once animations are finished or on disconnectedCallback
   * @returns {void}
   */
  private removeMainRegisters (): void {
    zIndexDeregister(this);
    viewportDeregister(this);
    closeDeregister(this);
    focusableDeregister(this);
  }

  /**
   * Set and remove animation event listener
   * @returns {void}
   */
  private onOpenedChangedAnimation (): void {
    this.animationPosition = this.calculated.position || 'bottom';
    this.animationReverse = !this.opened;
    this.animationReady = true;

    this.removeEventListener('animationend', this.onOpenedChangedAnimationEvent);
    this.addEventListener('animationend', this.onOpenedChangedAnimationEvent, { once: true });
  }

  /**
   * Ensure that the opened flag gets removed when transition has finished
   * Ensure that transitioned hook is applied when opened
   * @returns {void}
   */
  private onOpenedChangedAnimationEvent = (): void => {
    this.animationReady = false;
    this.animationReverse = this.opened;

    if (!this.opened) {
      this.onFullyClosed();
    }
    else {
      this.onFullyOpened();
    }
  };

  /**
   * A helper method to fire opening events
   * @returns {void}
   */
  private onFullyOpened (): void {
    const fullyOpened = this._fullyOpened;
    this._fullyOpened = OpenedState.OPENED;

    if (fullyOpened === OpenedState.OPENING) {
      this.onOpened();
      this.dispatchEvent(new CustomEvent('opened'));
    }
  }

  /**
   * A helper method to deregister element from all listeners
   * once the overlay is fully closed
   * Note: some registries are remove immediately after close
   * @returns {void}
   */
  private onFullyClosed (): void {
    this.firstResizeDone = false;
    applyLock();
    this.resetSizingInfo();
    this.clearCached();
    backdropDeregister(this);

    const fullyOpened = this._fullyOpened;
    this._fullyOpened = OpenedState.CLOSED;

    if (fullyOpened === OpenedState.CLOSING) {
      this.onClosed();
      this.dispatchEvent(new CustomEvent('closed'));
    }
  }

  /**
   * Run when the overlay has opened, initial positioning is done,
   * managers are registered and opening transition has finished
   * @returns {void}
   */
  protected onOpened (): void {
    // opened routine
  }

  /**
   * Run when the overlay has closed, managers are de-registered
   * and closing transition has finished
   * @returns {void}
   */
  protected onClosed (): void {
    // closed routine
  }

  /**
   * Here to avoid redundant call to set styles and calculate position
   */
  private cachedProperties: { [key: string]: string | null } | undefined;

  /**
   * A helper method to set or remove style property if the value is different
   * @param property Property name
   * @param value Property value
   * @returns {void}
   */
  private setPropertyIf (property: string, value: string | null): void {
    const cached = this.cachedProperties || {};
    this.cachedProperties = cached;

    if (cached[property] === value) {
      return;
    }

    cached[property] = value;

    if (value !== null) {
      this.style.setProperty(property, value);
    }
    else {
      this.style.removeProperty(property);
    }
  }

  /**
   * Cache height and width.
   * Calculating offsetHeight and offsetWidth is expensive,
   * therefore try to use cached version
   * @returns {void}
   */
  private setResizeSizingInfo (): void {
    const {
      computed: {
        marginTop,
        marginRight,
        marginBottom,
        marginLeft
      }
    } = this.sizingInfo;

    const offsetHeight = this.offsetHeight;
    const offsetWidth = this.offsetWidth;

    this.resizeHeight = offsetHeight ? offsetHeight + valueOrZero(marginTop) + valueOrZero(marginBottom) : 0;
    this.resizeWidth = offsetWidth ? offsetWidth + valueOrZero(marginRight) + valueOrZero(marginLeft) : 0;
  }

  /**
   * Get overlay with and height information
   * Sizing is cached and may not reflect the current
   */
  private get sizingRect (): SizingInfoRect {
    return {
      width: this.resizeWidth,
      height: this.resizeHeight
    };
  }

  private _sizingInfo: SizingInfo | undefined; /* used to cache sizing information */

  /**
   * A helper getter to get sizing information for the overlay
   * @returns {Object} sizingInfo
   */
  private get sizingInfo (): SizingInfo {
    const computeStyle = window.getComputedStyle(this);

    if (!this._sizingInfo) {
      const style = this.style;

      // get minWidth and maxWidth
      this._sizingInfo = { /* cache any sizing info defined in styles, as we may operate on these values */
        computed: {
          minWidth: valueOrNull(computeStyle.minWidth),
          maxWidth: valueOrNull(computeStyle.maxWidth),
          minHeight: valueOrNull(computeStyle.minHeight),
          maxHeight: valueOrNull(computeStyle.maxHeight),
          marginLeft: valueOrNull(computeStyle.marginLeft),
          marginRight: valueOrNull(computeStyle.marginRight),
          marginTop: valueOrNull(computeStyle.marginTop),
          marginBottom: valueOrNull(computeStyle.marginBottom)
        },
        style: {
          minWidth: style.getPropertyValue('min-width'),
          maxWidth: style.getPropertyValue('max-width'),
          minHeight: style.getPropertyValue('min-height'),
          maxHeight: style.getPropertyValue('max-height')
        }
      };
    }

    return this._sizingInfo;
  }

  /**
   * Reset current sizing info to original values
   * @returns {void}
   */
  private resetSizingInfo (): void {
    if (this._sizingInfo) {
      const {
        style: {
          minWidth,
          maxWidth,
          minHeight,
          maxHeight
        }
      } = this.sizingInfo;

      this.setPropertyIf('min-width', minWidth);
      this.setPropertyIf('max-width', maxWidth);
      this.setPropertyIf('min-height', minHeight);
      this.setPropertyIf('max-height', maxHeight);
      this.setPropertyIf('top', null);
      this.setPropertyIf('left', null);
      this.setPropertyIf('right', null);
      this.setPropertyIf('bottom', null);

      this.setResizeSizingInfo();
    }
  }

  /**
   * Get information of view boundaries for the overlay
   */
  private get viewAreaInfo (): ViewAreaInfo {
    return getViewAreaInfo(this);
  }

  /**
   * Enforce the overlay to fit the viewArea
   * @param [viewHeight=this._viewAreaInfo.viewHeight] Height to limit to
   * @param [viewWidth=this._viewAreaInfo.viewWidth] Width to limit to
   * @returns {void}
   */
  private limitToViewArea (viewHeight?: number, viewWidth?: number): void {
    if (!viewHeight || !viewWidth) {
      const viewAreaInfo = this.viewAreaInfo;
      viewHeight = viewHeight || viewAreaInfo.viewHeight;
      viewWidth = viewWidth || viewAreaInfo.viewWidth;
    }
    const viewAreaHeight = viewHeight;
    const viewAreaWidth = viewWidth;

    const computed = this.sizingInfo.computed;

    // max-width & max-height do not include margins
    const maxWidth = viewAreaWidth - valueOrZero(computed.marginLeft) - valueOrZero(computed.marginRight);
    const maxHeight = viewAreaHeight - valueOrZero(computed.marginTop) - valueOrZero(computed.marginBottom);

    // rect might change when changing height and widths. Thus do two runs (which is not brilliant)
    const limit = (): boolean => {
      const {
        width,
        height
      } = this.sizingRect;
      let secondRun = false;

      if (computed.minWidth && computed.minWidth > maxWidth) { /* Adjust min-width to always fit */
        this.setPropertyIf('min-width', `${maxWidth}px`);
        secondRun = true;
      }

      if (width > viewAreaWidth) { /* Adjust max-width to always fit */
        this.setPropertyIf('max-width', `${maxWidth}px`);
        secondRun = true;
      }

      if (computed.minHeight && computed.minHeight > maxHeight) { /* Adjust min-height to always fit */
        this.setPropertyIf('min-height', `${maxHeight}px`);
        secondRun = true;
      }

      if (height > viewAreaHeight) { /* Adjust max-height to always fit */
        this.setPropertyIf('max-height', `${maxHeight}px`);
        secondRun = true;
      }

      return secondRun;
    };

    if (limit()) {
      this.setResizeSizingInfo(); /* each resize needs refreshing sizing info */
      limit();
      this.setResizeSizingInfo();
    }
  }

  /**
   * Set top, left, right, bottom to style tag taking into account offset.
   * If property is null or undefined, remove from style tag
   * @param style An object containing top, left, right and/or bottom
   * @returns {void}
   */
  private setPositionStyle (style: PositionStyle): void {
    const {
      top,
      left,
      right,
      bottom
    } = style;

    const {
      offsetTop,
      offsetLeft,
      offsetBottom,
      offsetRight
    } = this.viewAreaInfo;

    const set = (property: string, value: number | null | undefined, offset = 0): void => {
      this.setPropertyIf(property, typeof value === 'number' ? `${value + offset}px` : 'auto');
    };

    set('top', top, offsetTop);
    set('left', left, offsetLeft);
    set('right', right, offsetRight);
    set('bottom', bottom, offsetBottom);
  }

  /**
   * Used to cache sizing info for easy comparison
   */
  private refitString: string | undefined;
  /**
   * This function serves as a safeguard between resize observer and internal logic to prevent resize loop
   * fit setting. Never refits the overlay if previous sizes are the same as last fit size
   * @param clb Callback to run if cache has changed
   * @returns {void}
   */
  private refitIfChanged (clb: () => void): void {
    const getRefitString = (): string => {
      const positionTargetConfig = this.positionTargetConfig;
      const targetRect = positionTargetConfig.rect;
      const positionList = positionTargetConfig.position;

      const {
        viewHeight,
        viewWidth,
        offsetBottom,
        offsetTop,
        offsetRight,
        offsetLeft
      } = this.viewAreaInfo;

      return JSON.stringify({
        rect: {
          ...this.sizingRect
        },
        verticalOffset: this.verticalOffset,
        horizontalOffset: this.horizontalOffset,
        offset: this.offset,
        positionList,
        viewHeight,
        viewWidth,
        offsetBottom,
        offsetTop,
        offsetRight,
        offsetLeft,
        targetRect: {
          height: targetRect.height,
          width: targetRect.width,
          top: targetRect.top,
          bottom: targetRect.bottom,
          left: targetRect.left,
          right: targetRect.right
        }
      });
    };

    const {
      height,
      width
    } = this.sizingRect; /* need this for IE, as width and height is 0 on first render */

    if (this.refitString && this.refitString === getRefitString() || (!height || !width)) {
      return;
    }

    clb();

    this.setResizeSizingInfo();
    this.refitString = getRefitString();
  }

  /**
   * Immediately run fit method without throttling
   * Use carefully as calling this function multiple times has a performance impact
   * @returns {void}
   */
  private fitNonThrottled (): void {
    this.refitIfChanged(() => {
      this.fitPositionTarget();
      this.dispatchEvent(new CustomEvent('refit'));
    });
  }

  /**
   * Fit based on the position target
   * @returns {void}
   */
  private fitPositionTarget (): void {
    this.resetSizingInfo();

    if (this.fullScreen) { /* no need to calculate anything else in full screen mode */
      this.setPositionStyle({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      });

      return;
    }

    const Position = 0;
    const Alignment = 1;
    const positionTargetConfig = this.positionTargetConfig;
    const targetRect = positionTargetConfig.rect;
    const positionList = positionTargetConfig.position;
    const horizontalOffset = this.horizontalOffset;
    const verticalOffset = this.verticalOffset;
    const positionHorizontalOffset = horizontalOffset + this.offset; /* these offset are used with optional offset against the target */
    const positionVerticalOffset = verticalOffset + this.offset;

    this.limitToViewArea();

    const {
      viewHeight,
      viewWidth
    } = this.viewAreaInfo;

    const {
      width,
      height
    } = this.sizingRect;

    const calculatedPositionList: CalculatedPosition[] = [];

    const isOutsideView = targetRect.bottom < 0
      || targetRect.top > viewHeight
      || targetRect.right < 0
      || targetRect.left > viewWidth; /* position target is outside view */

    const canAlignPosition = (isVertical: boolean, align: string): PositionStyle & {canAlign: boolean} => {
      if (isVertical) {
        let left: number | undefined;
        let right: number | undefined;

        switch (align) {
          case 'start':
            left = targetRect.left + horizontalOffset;
            break;
          case 'end':
            left = targetRect.right - width - horizontalOffset;
            break;
          case 'middle':
          default:
            left = targetRect.left + targetRect.width / 2 - width / 2 + horizontalOffset;
            break;
        }

        const canAlign = left >= 0 && left + width <= viewWidth;
        if (!canAlign) {
          left = left < 0 ? 0 : undefined;
          right = left === undefined ? 0 : undefined;
        }

        return {
          canAlign,
          left,
          right
        };
      }

      let top: number | undefined;
      let bottom: number | undefined;

      switch (align) {
        case 'start':
          top = targetRect.top + verticalOffset;
          break;
        case 'middle':
          top = targetRect.top + targetRect.height / 2 - height / 2 + verticalOffset;
          break;
        case 'end':
        default:
          top = targetRect.bottom - height - verticalOffset;
          break;
        // no default
      }

      const canAlign = top >= 0 && top + height <= viewHeight;

      if (!canAlign) {
        top = top < 0 ? 0 : undefined;
        bottom = top === undefined ? 0 : undefined;
      }

      return {
        canAlign,
        top,
        bottom
      };
    };

    if (isOutsideView) {
      let position;
      let top;
      let bottom;
      let right;
      let left;

      const findAlignMatch = (isVertical: boolean, isBefore: boolean): string => {
        const positionListLocal = [...positionList];
        while (positionListLocal.length) {
          const strategy = positionListLocal.shift();
          if (!strategy) {
            continue;
          }

          const position = strategy[Position];
          const align = strategy[Alignment];

          if ((isVertical && isBefore && position === 'bottom')
            || (isVertical && !isBefore && position === 'top')
            || (!isVertical && isBefore && position === 'right')
            || (!isVertical && !isBefore && position === 'left')) {
            return align;
          }
        }

        // Just default aligns if valid position is not defined
        return [...positionList][0][Alignment];
      };

      // if target is outside view, it can always be positioned
      if (targetRect.bottom <= 0) {
        position = 'bottom';
        top = 0;
      }
      else if (targetRect.top >= viewHeight) {
        position = 'top';
        bottom = 0;
      }

      if (targetRect.right <= 0) {
        position = 'right';
        left = 0;
      }
      else if (targetRect.left >= viewWidth) {
        position = 'left';
        right = 0;
      }

      if (top === undefined && bottom === undefined) { /* position target is outside left or right */
        // always attach to the middle of the screen
        const align = findAlignMatch(false, targetRect.right <= 0);
        const alignPosition = canAlignPosition(false, align);
        top = alignPosition.top;
        bottom = alignPosition.bottom;
      }

      if (right === undefined && left === undefined) { /* position target is outside top or bottom */
        const align = findAlignMatch(true, targetRect.bottom <= 0);
        const alignPosition = canAlignPosition(true, align);
        left = alignPosition.left;
        right = alignPosition.right;
      }

      this.calculated.position = position;

      this.setPositionStyle({
        top,
        bottom,
        left,
        right
      });

      return;
    }

    while (positionList.length) {
      const strategy = positionList.shift();

      if (!strategy) {
        continue;
      }

      const position = strategy[Position];
      const align = strategy[Alignment];
      const isVertical = position === 'top' || position === 'bottom' || position === 'center';
      let canPosition = false;
      let top;
      let left;
      let right;
      let bottom;
      let area = -1;

      switch (position) {
        case 'bottom':
          top = targetRect.bottom + positionVerticalOffset;
          area = Math.min(viewWidth, width) * (viewHeight - targetRect.bottom);
          canPosition = top >= 0 && top + height <= viewHeight;
          break;
        case 'top':
          bottom = viewHeight - targetRect.top + positionVerticalOffset;
          area = Math.min(viewWidth, width) * targetRect.top;
          canPosition = bottom >= 0 && bottom + height <= viewHeight;
          break;
        case 'right':
          left = targetRect.right + positionHorizontalOffset;
          area = Math.min(viewHeight, height) * (viewWidth - targetRect.right);
          canPosition = left >= 0 && left + width <= viewWidth;
          break;
        case 'left':
          right = viewWidth - targetRect.left + positionHorizontalOffset;
          area = Math.min(viewHeight, height) * targetRect.left;
          canPosition = right >= 0 && right + width <= viewWidth;
          break;
        case 'center': /* noOverlap is not valid for center. Center can be always positioned */
          top = targetRect.top + targetRect.height / 2 - height / 2 + positionVerticalOffset;
          bottom = top + height > viewHeight ? 0 : undefined;
          top = top < 0 ? 0 : (bottom === undefined ? top : undefined);
          canPosition = true; /* no overlap does not make sense here */
          area = Infinity;
          break;
        // no default
      }

      const alignPosition = canAlignPosition(isVertical, align);
      const canAlign = alignPosition.canAlign;

      if (isVertical) {
        left = alignPosition.left;
        right = alignPosition.right;
      }
      else {
        top = alignPosition.top;
        bottom = alignPosition.bottom;
      }

      if (canAlign && canPosition) { /* no need to continue */
        this.calculated.position = position;
        this.setPositionStyle({
          top,
          left,
          bottom,
          right
        });
        return;
      }

      calculatedPositionList.push({
        position,
        align,
        canPosition,
        canAlign,
        top,
        left,
        right,
        bottom,
        isVertical,
        area
      });
    }

    // position always takes priority over align
    for (let i = 0; i < calculatedPositionList.length; i += 1) {
      const {
        canPosition,
        top,
        left,
        position,
        right,
        bottom
      } = calculatedPositionList[i];

      if (canPosition) {
        this.calculated.position = position;
        this.setPositionStyle({
          top,
          left,
          right,
          bottom
        });

        return;
      }
    }

    // find position with the most available screen real estate
    calculatedPositionList.sort((pos1, pos2): number => pos2.area - pos1.area);

    // no-overlap is different
    // if cannot fit within the position-align, find the best space to position
    // and restrict within min-height and max-height
    if (this.noOverlap) {
      const {
        position
      } = calculatedPositionList[0];

      switch (position) {
        case 'bottom':
          this.limitToViewArea(viewHeight - targetRect.bottom - positionVerticalOffset);
          break;
        case 'top':
          this.limitToViewArea(targetRect.top - positionVerticalOffset);
          break;
        case 'right':
          this.limitToViewArea(undefined, viewWidth - targetRect.right - positionHorizontalOffset);
          break;
        case 'left':
          this.limitToViewArea(undefined, targetRect.left - positionHorizontalOffset);
          break;
        // no default
      }
    }

    // cannot set position. In this case just take the first calculated position and try to
    // position and align with the best match
    const {
      isVertical,
      top,
      position,
      left,
      right,
      bottom
    } = calculatedPositionList[0];

    const getNewPosition = (): PositionStyle => {
      if (isVertical) {
        return position === 'bottom' ? {
          bottom: 0, /* position bottom-up */
          top: null
        } : {
          bottom: null,
          top: 0 /* position up-bottom */
        };
      }

      return position === 'right' ? {
        right: 0, /* position right-left */
        left: null
      } : {
        right: null,
        left: 0 /* position left-right */
      };
    };

    this.calculated.position = position;
    this.setPositionStyle(Object.assign({
      top,
      left,
      right,
      bottom
    }, getNewPosition()));
  }

  /**
   * Clear all cached values.
   * Run when external changes occur to styles to re-calculate position.
   * @returns {void}
   */
  public clearCached (): void {
    this.refitString = undefined;
    this._sizingInfo = undefined;
    this.cachedProperties = undefined;
  }

  private fitThrottler = new MicroTaskRunner();

  /**
   * Fit the overlay panel
   * @returns {void}
   */
  public fit (): void {
    this.fitThrottler.schedule(() => {
      if (!this.opened) {
        return;
      }

      this.fitNonThrottled();
    });
  }

  /**
   * Clear all cached values and fit the overlay.
   * Use this function if any of `maxWidth`, `maxHeight`, `minWidth`, `minHeight`, `height` or `width` changed
   * @returns {void}
   */
  public refit (): void {
    this.resetSizingInfo();
    this.clearCached();

    if (this.opened) {
      this.fit();
    }
  }

  private resizeHeight = 0; /* stored overlay height */
  private resizeWidth = 0; /* stored overlay width */
  private resizedThrottler = new MicroTaskRunner(); /* resize throttler to prevent resize observer loop */

  /**
   * Element resize callback
   * @param size dimension details
   * @returns {void}
   * @private
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public resizedCallback (size: ElementSize): void {
    this.resizedThrottler.schedule(() => {
      if (!this.opened && this._fullyOpened === OpenedState.CLOSED) {
        // Do nothing on last resized callback
        return;
      }
      this.setResizeSizingInfo();
      this.fitNonThrottled();

      if (this.opened && this.firstResizeDone === false) {
        this.firstResizeDone = true;
        if (this._fullyOpened === OpenedState.CLOSED) { /* cannot set to opening if the overlay has not been fully closed */
          this._fullyOpened = OpenedState.OPENING;
        }

        if (this.transitionStyle) { /* this must come last when all register actions are completed */
          this.onOpenedChangedAnimation();
        }
        else {
          this.onFullyOpened();
        }
      }
    });
  }

  /**
   * Move overlay to front of other overlays
   * @returns {void}
   */
  public toFront (): void {
    toFront(this);
    applyLock();
  }

  /**
   * Returns true if the overlay is opened and animation is not running.
   * Returns false if overlay is closed and animation is not running
   * @readonly
   */
  public get fullyOpened (): boolean {
    return this._fullyOpened === OpenedState.OPENED;
  }

  /**
   * Returns true if overlay is doing opening or closing transition
   * @readonly
   */
  public get transitioning (): boolean {
    return this._fullyOpened === OpenedState.OPENING || this._fullyOpened === OpenedState.CLOSING;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    /**
     * Use JavaScript expressions to include property values in
     * the element template.
     */
    return Overlay.Template;
  }
}
