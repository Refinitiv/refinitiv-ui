import {
  ControlElement,
  css,
  CSSResultGroup,
  html,
  PropertyValues,
  TapEvent,
  TemplateResult
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/lib/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/lib/decorators/property.js';
import { query } from '@refinitiv-ui/core/lib/decorators/query.js';
import { VERSION } from '../version.js';
import { Translate, translate } from '@refinitiv-ui/translate';
import '@refinitiv-ui/phrasebook/lib/locale/en/pill.js';

import '../icon/index.js';

/**
 * Return the attribute that converted from the property
 * Prevent empty string that reflected to attribute
 * @private
 * @param value value from the property
 * @returns string converted to attribute
 */
const emptyStringToNull = function (value: string): string | null {
  return value || null;
};

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
 * @fires clear - Dispatched when click on cross button occurs
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
   * Aria indicating state of toggle pill
   * @ignore
   */
  @property({ type: String,
    reflect: true,
    attribute: 'aria-pressed',
    converter: { toAttribute: emptyStringToNull } // TODO: Remove after typescript update to allow nullable for ARIAMixin
  })
  public ariaPressed = '';

  /**
   * Used for translations
   */
  @translate({
    scope: 'ef-pill'
  })
  protected t!: Translate;

  @query('[part=close]') private closeElement?: HTMLElement | null;

  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.addEventListener('tap', this.onTapHandler);
    this.addEventListener('tapstart', this.onStartPress);
    this.addEventListener('tapend', this.onEndPress);
    this.addEventListener('mouseleave', this.onEndPress);
    this.addEventListener('keydown', this.onKeyDown);

  }

  /**
   * Updates the element
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected update (changedProperties: PropertyValues): void {
    if (changedProperties.has('toggles') || changedProperties.has('active')) {
      if (this.toggles) {
        this.ariaPressed = String(this.active);
      }
      else {
        this.removeAttribute('aria-pressed');
      }
    }

    super.update(changedProperties);
  }

  /**
   * Handles key down event
   * @param event Key down event object
   * @returns {void}
   */
  private onKeyDown (event: KeyboardEvent): void {
    if (event.key === 'Delete' && (this.clears && !this.readonly)) {
      this.dispatchEvent(new CustomEvent('clear'));
    }
  }

  private get closeTemplate (): TemplateResult | null {
    return this.clears && !this.readonly ? html`<ef-icon aria-label="${this.t('DELETE_PILL')}" part="close" icon="cross" @tap="${this.clear}"></ef-icon>` : null;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <div part="content">
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
    const element = this.closeElement;

    return !this.readonly && (!element || !event.composedPath().includes(element));
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
