import {
  BasicElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues,
  matches
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { VERSION } from '../version.js';
import { isSlotEmpty } from '@refinitiv-ui/utils/is-slot-empty.js';
import '../overlay/index.js';
import type { OverlayTransitionStyle as TooltipTransitionStyle, Overlay, OverlayPosition } from '../overlay';

import './elements/title-tooltip.js';
import { register, deregister } from './managers/tooltip-manager.js';
import {
  TooltipCondition,
  TooltipRenderer,
  TooltipPosition,
  TooltipPositionMap
} from './helpers/types.js';
import { tooltipRenderer } from './helpers/renderer.js';
import { register as registerOverflowTooltip } from './helpers/overflow-tooltip.js';

const TooltipPositionMap: TooltipPositionMap = {
  'auto': ['bottom-start', 'top-start'],
  'above': ['top-middle'],
  'right': ['right-middle'],
  'below': ['bottom-middle'],
  'left': ['left-middle']
};

/**
 * Tooltip displays extra information when the
 * user hovers the pointer over an item.
 */
@customElement('ef-tooltip', {
  alias: 'coral-tooltip'
})
class Tooltip extends BasicElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  private matchTarget: HTMLElement | null = null;
  private matchTargetRect: ClientRect | null = null;
  private showDelay = 300;
  private hideDelay = 150;
  private clicked = false;
  private timerTimeout?: number;
  private contentNodes?: (Node)[];

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: contents;
        position: absolute;
        max-width: 0;
        max-height: 0;
        min-width: 0;
        min-height: 0;
        flex: none;
        visibility: hidden;
      }
      [part=tooltip] {
        visibility: visible;
        overflow: visible;
      }
      [part=position-adjuster] {
        position: fixed;
        z-index: -1;
        top: 0;
        left: 0;
        visibility: hidden;
      }
    `;
  }

  /**
   * True if an element is an iframe
   * @param relatedTarget Element to check
   * @returns isIframe
   */
  private static isIframe (relatedTarget: HTMLElement | null): boolean {
    return relatedTarget !== null && relatedTarget.localName === 'iframe';
  }

  /**
   * Check if the match target has moved position
   * @param matchTargetRect Match target rect
   * @param lastMatchTarget Previous match target
   * @returns matches
   */
  private static elementHasMoved (matchTargetRect: ClientRect, lastMatchTarget: ClientRect | null): boolean {
    if (lastMatchTarget === null) {
      return true;
    }

    return lastMatchTarget.top !== matchTargetRect.top || lastMatchTarget.left !== matchTargetRect.left;
  }

  /**
  * CSS selector to match the tooltip
  */
  @property({ type: String })
  public selector = '';

  /**
  * Provide a function to test against the target.
  * Return `true` if the target matches
  * @type {TooltipCondition}
  */
  @property({ type: Function, attribute: false })
  public condition: TooltipCondition | undefined;

  /**
  * A renderer to define tooltip internal content.
  * Return undefined, `String`, `HTMLElement` or `DocumentFragment`.
  * If the content is not present, tooltip will not be displayed
  * @type {TooltipRenderer}
  */
  @property({ type: Function, attribute: false })
  public renderer: TooltipRenderer | undefined;

  /**
  * The position of the tooltip. Use the following values:
  * `auto` (default) - display based on mouse enter coordinates
  * `above` - display above the element
  * `right` - display to the right of the element
  * `below` - display beneath the element
  * `left` - display to the left of the element
  */
  @property({ type: String })
  public position: 'auto' | 'above' | 'right' | 'below' | 'left' = 'auto';

  /**
  * Set the transition style.
  * Value can be `fade`, `zoom`, `slide-down`, `slide-up`, `slide-right`,
  * `slide-left`, `slide-right-down`, `slide-right-up`, `slide-left-down`, `slide-left-up`, or null in case of no transition
  *  @type {TooltipTransitionStyle}
  */
  @property({ type: String, attribute: 'transition-style' })
  public transitionStyle: TooltipTransitionStyle | null = 'fade';

  /**
   * Get tooltip popup window
   * Used for testing and legacy
   */
  @query('[part=tooltip]')
  private tooltip!: Overlay;

  /**
   * Get position adjuster element.
   * Used to adjust offsets if transforms are used
   */
  @query('[part=position-adjuster]')
  private positionAdjusterEl!: HTMLElement;

  @query('#contentSlot')
  private contentSlot!: HTMLSlotElement;

  private _x = 0;
  /**
   * Set tooltip y coordinate
   * @param x X coordinate
   */
  private set x (x: number) {
    const oldX = this._x;
    if (oldX !== x) {
      this._x = x;
      this.requestUpdate('x', oldX);
    }
  }

  private _y = 0;
  /**
   * Set tooltip y coordinate
   * @param y Y coordinate
   */
  private set y (y: number) {
    const oldY = this._y;
    if (oldY !== y) {
      this._y = y;
      this.requestUpdate('y', oldY);
    }
  }

  private _positionTarget: HTMLElement | null = null;
  /**
   * Set tooltip position target
   * @param positionTarget Position target
   */
  private set positionTarget (positionTarget: HTMLElement | null) {
    const oldPositionTarget = this._positionTarget;
    if (positionTarget !== oldPositionTarget) {
      this._positionTarget = positionTarget;
      this.requestUpdate('positionTarget', oldPositionTarget);
    }
  }

  private _opened = false;
  /**
   * Run when opened attribute has changed. Map to popup window
   * @param opened True if popup should be opened
   * @returns {void}
   */
  private setOpened (opened: boolean): void {
    const oldOpened = this._opened;
    if (oldOpened !== opened) {
      this._opened = opened;
      this.requestUpdate('opened', oldOpened);
    }
  }

  public connectedCallback (): void {
    super.connectedCallback();
    register(this, {
      mousemove: this.reset,
      mousemoveThrottled: this.onMouseMove,
      click: this.onClick,
      mouseout: this.onMouseOut,
      mouseleave: this.resetTooltip,
      wheel: this.resetTooltip,
      keydown: this.resetTooltip,
      blur: this.resetTooltip
    });
  }

  public disconnectedCallback (): void {
    deregister(this);
    this.setOpened(false);

    this.reset();
    this.matchTarget = null;
    this.matchTargetRect = null;
    this.positionTarget = null;

    super.disconnectedCallback();
  }

  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.showDelay = parseInt(this.getComputedVariable('--show-delay', '300'), 10);
    this.hideDelay = parseInt(this.getComputedVariable('--hide-delay', '150'), 10);
  }

  /**
   * Clear all timers
   * @returns {void}
   */
  private reset = (): void => {
    window.clearTimeout(this.timerTimeout);
  };

  /**
   * Check whether an element matches by condition
   * If condition is not defined, checks by CSS selector
   * @param element Element to check
   * @param paths Event paths
   * @returns true if element matches
   */
  private isMatchElement (element: HTMLElement, paths: EventTarget[]): boolean {
    if (this.condition) {
      return this.condition(element, paths);
    }

    if (this.selector) {
      return matches(element, this.selector);
    }

    return false;
  }

  /**
   * Return true if the target matches condition. False otherwise
   * @param paths Target to match against
   * @returns matched element or null
   */
  private getMatchedElement (paths: EventTarget[]): HTMLElement | null {
    if (!this.condition && !this.selector) {
      return null;
    }

    const l = paths.length;

    for (let i = 0; i < l; i += 1) {
      const node = paths[i] as Node;

      if (node.nodeType !== Node.ELEMENT_NODE) {
        continue;
      }

      if (node === document.body || node === document.documentElement) {
        return null;
      }

      const element = node as HTMLElement;

      if (this.isMatchElement(element, paths)) {
        return element;
      }
    }

    return null;
  }

  /**
   * Check if the autosuggest has content
   * @returns {Boolean} content exists
   * @private
   */
  private hasSlotContent (): boolean {
    if (this.contentNodes) {
      /* show the slot. Default slotted content cannot work with tooltip or renderer */
      return false;
    }

    return isSlotEmpty(this.contentSlot);
  }

  /**
   * Get content off the target element
   * @param target Target to check against
   * @returns contentNode or null
   */
  private getContentNode (target: HTMLElement): Text | HTMLElement | DocumentFragment | null {
    let content: string| HTMLElement | DocumentFragment | null | undefined;

    if (typeof this.renderer === 'function') {
      content = this.renderer(target);
    }
    else {
      content = tooltipRenderer(target);
    }

    if (typeof content === 'string' && content) {
      return document.createTextNode(content);
    }

    if (content instanceof HTMLElement) {
      return content.cloneNode(true) as HTMLElement;
    }

    if (content instanceof DocumentFragment) {
      return content.cloneNode(true) as DocumentFragment;
    }

    return null;
  }

  /**
   * Render content based on render to tooltip
   * @param contentNode Content node to set
   * @returns {void}
   */
  private renderContentNode (contentNode: Text | HTMLElement | DocumentFragment): void {
    if (contentNode instanceof Text && this.textContent === contentNode.textContent) {
      return; /* Do not re-render the same text. Due to IE11 limitation we have to operate with text nodes */
    }

    if (this.contentNodes?.length) {
      this.contentNodes.forEach((node: Node) => {
        node.parentNode?.removeChild(node);
      });
    }

    if (contentNode instanceof DocumentFragment) {
      this.contentNodes = [...contentNode.childNodes];
    }
    else {
      this.contentNodes = [contentNode];
    }

    this.appendChild(contentNode);
  }

  /**
   * Hide tooltip
   * @returns {void}
   */
  private hideTooltip (): void {
    this.reset();
    this.matchTarget = null;
    this.matchTargetRect = null;
    this.positionTarget = null;
    this.setOpened(false);
  }

  /**
   * Reset tooltip
   * @returns {void}
   */
  private resetTooltip = (): void => {
    this.hideTooltip();
  };

  /**
   * Run when mouse is moving over the document
   * @param event Mouse move event
   * @param paths Event paths
   * @returns {void}
   */
  private onMouseMove = (event: MouseEvent, paths: EventTarget[]): void => {
    this.showTooltip(paths, event.clientX, event.clientY);
  };

  /**
   * Try to show the tooltip if it matches the target
   * @param paths The paths leading to target
   * @param x X mouse coordinate
   * @param y Y mouse coordinate
   * @returns {void}
   */
  private showTooltip (paths: EventTarget[], x: number, y: number): void {
    // composedPath is only available on the direct event
    this.timerTimeout = window.setTimeout(() => {
      const lastMatchTarget = this.matchTarget;
      const matchTarget = this.getMatchedElement(paths);
      this.matchTarget = matchTarget;

      if (!matchTarget) {
        this.setOpened(false);
        return;
      }

      const matchTargetRect = matchTarget.getBoundingClientRect();

      if (lastMatchTarget === matchTarget && !Tooltip.elementHasMoved(matchTargetRect, this.matchTargetRect)) {
        return;
      }

      this.matchTargetRect = matchTargetRect;
      this.clicked = false;

      // adjust tooltip x & y vs clientX and clientY
      const adjusterRect = this.positionAdjusterEl.getBoundingClientRect();
      x = adjusterRect.left >= 0 ? x - adjusterRect.left : x;
      y = adjusterRect.top >= 0 ? y - adjusterRect.top : y;

      if (this.hasSlotContent()) {
        this.showTooltipAtPosition(matchTarget, x, y);
        return;
      }

      const contentNode = this.getContentNode(matchTarget);
      if (contentNode) {
        this.renderContentNode(contentNode);
        this.showTooltipAtPosition(matchTarget, x, y);
        return;
      }

      this.setOpened(false);
    }, this.getTooltipShowDelay);
  }

  /**
   * Get the delay to show tooltip
   */
  private get getTooltipShowDelay (): number {
    return this.clicked ? Math.round(this.hideDelay / 2) : this.opened ? this.hideDelay : this.showDelay;
  }

  /**
   * Show the tooltip corresponding to the correct position
   * @param matchTarget Target to show the tooltip against
   * @param x X coordinate
   * @param y Y coordinate
   * @returns {void}
   */
  private showTooltipAtPosition (matchTarget: HTMLElement, x: number, y: number): void {
    switch (this.position) {
      case 'above':
      case 'right':
      case 'below':
      case 'left':
        this.x = 0;
        this.y = 0;
        this.positionTarget = matchTarget;
        break;
      default:
        this.positionTarget = null;
        this.x = x;
        this.y = y;
    }

    this.setOpened(true);
  }

  /**
   * Run when document click or contextmenu event happens
   * @returns {void}
   */
  private onClick = (): void => {
    this.clicked = true;
    this.hideTooltip();
  };

  /**
   * Run when document mouse out event happens
   * @returns {void}
   */
  private onMouseOut = ({ relatedTarget }: MouseEvent): void => {
    // document mouesemove, mouseleave and blur are not fired over iframe
    // therefore create a special case for iframe to hide the tooltip
    /* istanbul ignore next */
    if (Tooltip.isIframe(relatedTarget as HTMLElement)) {
      this.resetTooltip();
    }
  };

  /**
   * Get popup position based on tooltip position
   */
  private get tipPosition (): OverlayPosition[] {
    return TooltipPositionMap[this.position];
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @returns Render template
   */
  protected render (): TemplateResult {
    return html`<ef-overlay
      part="tooltip"
      .noCancelOnEscKey=${true}
      .noCancelOnOutsideClick=${true}
      .withShadow=${true}
      .noInteractionLock=${true}
      .noFocusManagement=${true}
      ?opened=${this._opened}
      .position=${this.tipPosition}
      .transitionStyle=${this.transitionStyle}
      .positionTarget=${this._positionTarget}
      .x=${this._x}
      .y=${this._y}><slot id="contentSlot"></slot></ef-overlay><div part="position-adjuster"></div>`;
  }

  /**
   * true if tooltip is opened, false otherwise
   * @returns opened
   */
  private get opened (): boolean {
    return this._opened;
  }
}

export * from './elements/tooltip-element.js';

export {
  registerOverflowTooltip,
  Tooltip,
  TooltipCondition,
  TooltipRenderer,
  TooltipPosition,
  TooltipTransitionStyle
};
