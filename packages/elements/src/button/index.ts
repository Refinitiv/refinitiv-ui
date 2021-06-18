import {
  ControlElement,
  css,
  CSSResult,
  customElement,
  html,
  property,
  PropertyValues,
  TemplateResult,
  query
} from '@refinitiv-ui/core';

import '../icon';
import { registerOverflowTooltip } from '../tooltip';

/**
 * Use button for actions in forms, dialogs,
 * and more with support for different states and styles.
 * @attr {boolean} disabled - Set state to disabled
 * @prop {boolean} [disabled=false] - Set state to disabled
 */
@customElement('ef-button', {
  alias: 'coral-button'
})
export class Button extends ControlElement {
  public static get styles (): CSSResult | CSSResult[] {
    return css`
      :host(:not(:hover)) #hover-icon,
      :host(:hover) [part=icon]:not(#hover-icon) {
        display: none;
      }
    `;
  }

  /**
   * Customises text alignment when specified alongside `icon` property
   * Value can be `before` or `after`
   */
  @property({ type: String, reflect: true }) textpos: 'before' | 'after' = 'after';

  /**
   * Removes background when specified alongside `icon` property
   */
  @property({ type: Boolean, reflect: true }) transparent = false;

  /**
   * Specify icon to display in button. Value can be icon name
   */
  @property({ type: String, reflect: true }) icon: string | null = null;

  /**
   * Specify icon to display when hovering. Value can be icon name
   */
  @property({ type: String, reflect: true, attribute: 'hover-icon' }) hoverIcon: string | null = null;

  /**
   * Set state to call-to-action
   */
  @property({ type: Boolean, reflect: true }) cta = false;

  /**
   * it's a property attribute for the style of toggle
   */
  @property({ type: Boolean, reflect: true }) toggles = false;

  /**
   * it's a property attribute using toggles for a style of host
   */
  @property({ type: Boolean, reflect: true }) active = false;

  /**
   * Use by theme to detect when no content inside button
   */
  private empty = false;

  /**
   * Get native label element from shadow roots
   */
  @query('[part="label"]')
  private labelElement!: HTMLSpanElement;

  /**
   * the lifecycle method called when properties changed first time
   *
   * @param changedProperties properties it's the Map object which has the updated properties
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.addEventHandlers();
    this.emptyComputed();
    registerOverflowTooltip(this.labelElement, () => this.textContent);
  }

  /**
   * @returns the method renders this element
   */
  protected render (): TemplateResult {
    return html`
        ${this.iconAndHoverIconTemplates}
        <span part="label">
          <slot @slotchange="${this.onDefaultSlotChangeHandler}"></slot>
        </span>
    `;
  }

  /**
   * the method acts to handle the slotchange event of default slot
   * @returns {void}
   */
  private onDefaultSlotChangeHandler = (): void => {
    this.emptyComputed();
  };

  /**
   * the method adds click and tap event handlers for switching active
   *
   * @returns {void}
   */
  private addEventHandlers (): void {
    this.addEventListener('tap', this.toggleActive);
    this.addEventListener('tapstart', this.setPressed);
    this.addEventListener('tapend', this.unsetPressed);
    this.addEventListener('keyup', this.onKeyUpHandler);
  }

  /**
   * handle keydown event
   * @param event the keyboard event
   * @returns {void}
   */
  private onKeyUpHandler = (event: KeyboardEvent): void => {
    if (this.isReturnOrSpaceKey(event.key)) {
      this.click();
    }
  };

  /**
   * check key names
   * @param key the keyboard key
   * @returns true if space or enter pressed
   */
  private isReturnOrSpaceKey (key: string): boolean {
    return key === ' '
      || key === 'Spacebar'
      || key === 'Enter'
      || key === 'Return';
  }

  /**
   * it's a method for handling active property
   * when the toggles property exists
   *
   * @returns {void}
   */
  private toggleActive = (): void => {
    if (this.toggles) {
      this.active = !this.active;
      /**
       * Fired on changing `active` property state by taping on button when property `toggles` is true.
       * Provides new state of `active` property in detail.value field
       */
      this.dispatchEvent(new CustomEvent('active-changed', {
        detail: { value: this.active }
      }));
    }
  };

  /**
   * set pressed attribute
   * @returns {void}
   */
  private setPressed = (): void => {
    this.setAttribute('pressed', '');
  };

  /**
   * remove pressed attribute
   * @returns {void}
   */
  private unsetPressed = (): void => {
    this.removeAttribute('pressed');
  };

  /**
   * the method computes the empty property based on the textContent
   *
   * @returns {void}
   */
  private emptyComputed (): void {
    this.empty = this.textContent ? this.textContent.length === 0 : true;
    this.switchEmptyAttribute();
  }

  /**
   * set or remove attribute "empty" based on slot present
   *
   * @returns {void}
   */
  private switchEmptyAttribute (): void {
    if (this.empty) {
      this.setAttribute('empty', '');
    }
    else {
      this.removeAttribute('empty');
    }
  }

  /**
   * this getter returns the ef-icon if the icon property exists
   *
   * @returns icon template or null
   */
  private get iconTemplate (): TemplateResult | null {
    return this.icon
      ? html`<ef-icon part="icon" icon="${this.icon}" id="icon"></ef-icon>`
      : null;
  }

  /**
   * the getter returns the ef-icon if the hoverIcon or icon property exists
   *
   * @returns hover icon template or null
   */
  private get hoverIconTemplate (): TemplateResult | null {
    const hoverIcon = this.hoverIcon || this.icon;
    return hoverIcon
      ? html`<ef-icon part="icon" icon="${hoverIcon}" id="hover-icon"></ef-icon>`
      : null;
  }

  /**
   * the getter return two templates of icons
   *
   * @returns part of template
   */
  private get iconAndHoverIconTemplates (): TemplateResult {
    return html`
      ${this.iconTemplate}
      ${this.hoverIconTemplate}
    `;
  }
}
