import {
  ControlElement,
  css,
  CSSResult,
  customElement,
  html,
  property,
  PropertyValues,
  query,
  TemplateResult
} from '@refinitiv-ui/core';

import '../icon';

/**
 * A small button style component
 * which is used to show one or multiple selected item.
 * It is rarely used in the UI but inside other components to visualize multiple item selection item.
 * @attr {string} value - Value of pill
 * @prop {string} value - Value of pill
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 */
@customElement('ef-pill')
export class Pill extends ControlElement {
  constructor () {
    super();
    /** @ignore */
    this.onTapHandler = this.onTapHandler.bind(this);
    /** @ignore */
    this.onStartPress = this.onStartPress.bind(this);
    /** @ignore */
    this.onEndPress = this.onEndPress.bind(this);
  }


  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResult {
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

  @query('[part=close]') private closeElement?: HTMLElement | null;

  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.addEventListener('tap', this.onTapHandler);
    this.addEventListener('tapstart', this.onStartPress);
    this.addEventListener('tapend', this.onEndPress);
    this.addEventListener('mouseleave', this.onEndPress);

  }

  private get closeTemplate (): TemplateResult | null {
    return this.clears && !this.readonly ? html`<ef-icon part="close" icon="cross" @tap="${this.clear}"></ef-icon>` : null;
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
  private onStartPress (event: Event): void {
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
  private clear (event: MouseEvent): void {
    event.stopPropagation();
    /**
     * Fires when click on cross occurs. `detail.value` provides value of pill if defined. `detail.active` provides current selected state.
     * @param detail.value - value stored on the pill, not set if undefined
     * @param detail.active - current selected state, always present
     */
    this.dispatchEvent(new CustomEvent('clear', {
      detail: {
        value: this.value,
        active: this.active
      }
    }));
  }
}
