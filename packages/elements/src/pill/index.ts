import {
  ControlElement,
  css,
  CSSResultGroup,
  html,
  PropertyValues,
  TapEvent,
  TemplateResult
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { registerOverflowTooltip } from '../tooltip/index.js';
import { isElementOverflown } from '@refinitiv-ui/utils/element.js';
import { createRef, ref, Ref } from '@refinitiv-ui/core/directives/ref.js';
import { VERSION } from '../version.js';
import type { Icon } from '../icon';

import '../icon/index.js';

/**
 * A small button style component
 * which is used to show one or multiple selected item.
 * It is rarely used in the UI but inside other components to visualize multiple item selection item.
 * @attr {string} value - Value of pill
 * @prop {string} [value=""] - Value of pill
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @fires clear - Fired when user tapped on cross button.
 */
@customElement('ef-pill', {
  alias: 'coral-pill'
})
export class Pill extends ControlElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * Element's role attribute for accessibility
   */
  protected readonly defaultRole: string | null = 'button';

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
      position: relative;
    }
    [part=content] {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    `;
  }

  /**
   * Set pill to clearable
   */
  @property({ type: Boolean, reflect: true })
  public clears = false;

  /**
   * Set pill to toggle mode
   */
  @property({ type: Boolean, reflect: true })
  public toggles = false;

  /**
   * Add to pill for active state
   */
  @property({ type: Boolean, reflect: true })
  public active = false;

  /**
   * Set property pressed true on tap start and false on tap end
   */
  @property({ type: Boolean, reflect: true })
  private pressed = false;

  /**
   * Reference to the close icon
   */
  private closeIconRef: Ref<Icon> = createRef();

  /**
   * Reference to the label element
   */
  private labelRef: Ref<HTMLDivElement> = createRef();

  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.addEventListener('tap', this.onTapHandler);
    this.addEventListener('tapstart', this.onStartPress);
    this.addEventListener('tapend', this.onEndPress);
    this.addEventListener('mouseleave', this.onEndPress);
    this.addEventListener('keydown', this.onKeyDown);

    registerOverflowTooltip(this, undefined, () => this.labelRef.value ? isElementOverflown(this.labelRef.value) : false);
  }

  /**
   * Compute property values that depend on other properties
   * and are used in the rest of the update process.
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected willUpdate (changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('toggles') || changedProperties.has('active')) {
      if (this.toggles) {
        this.setAttribute('aria-pressed', String(this.active));
      }
      else {
        this.removeAttribute('aria-pressed');
      }
    }
  }

  /**
   * Handles key down event
   * @param event Key down event object
   * @returns {void}
   */
  private onKeyDown (event: KeyboardEvent): void {
    if ((event.key === 'Delete' || event.key === 'Del') && (this.clears && !this.readonly)) {
      this.dispatchEvent(new CustomEvent('clear'));
    }
  }

  private get closeTemplate (): TemplateResult | null {
    return this.clears && !this.readonly ? html`<ef-icon
      ${ref(this.closeIconRef)}
      part="close"
      icon="cross"
      aria-hidden="true"
      @tap="${this.clear}"></ef-icon>` : null;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <div ${ref(this.labelRef)} part="content" role="none">
        <slot>...</slot>
      </div>
      ${this.closeTemplate}
    `;
  }

  /**
   * change state of `pressed` property to be true if there is no close icon or pill is pressed directly
   * @param event tapstart event
   * @returns {void}
   */
  private onStartPress (event: TapEvent): void {
    if (this.couldBePressed(event)) {
      this.pressed = true;
    }
  }

  /**
   * @param event tapstart
   * @returns true if element property pressed could be set
   */
  private couldBePressed (event: Event): boolean {
    const closeIconEl = this.closeIconRef.value;

    return !this.readonly && (!closeIconEl || !event.composedPath().includes(closeIconEl));
  }

  /**
   * change state of `pressed` property to be false if mouse leave pill or tap is end on pill
   * @returns {void}
   */
  private onEndPress (): void {
    if (this.pressed) {
      this.pressed = false;
    }
  }

  /**
   * handle when `clears` icon is tapped
   * @returns {void}
   */
  private onTapHandler (): void {
    if (this.toggles && !this.readonly) {
      this.active = !this.active;
    }
  }

  /**
   * @param event event from close button
   * @returns {void}
   */
  private clear (event: TapEvent): void {
    event.stopPropagation();

    /**
     * Fires when click on cross occurs.
     */
    this.dispatchEvent(new CustomEvent('clear'));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-pill': Pill;
  }
}
