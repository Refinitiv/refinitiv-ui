import {
  CSSResultGroup,
  ControlElement,
  PropertyValues,
  TapEvent,
  TemplateResult,
  css,
  html
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { Ref, createRef, ref } from '@refinitiv-ui/core/directives/ref.js';

import { isElementOverflown } from '@refinitiv-ui/utils/element.js';

import type { Icon } from '../icon';
import '../icon/index.js';
import { registerOverflowTooltip } from '../tooltip/index.js';
import '../autosuggest/index.js';
import '../text-field/index.js';
import { VERSION } from '../version.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import type { TextField } from '../text-field';
import type { Autosuggest } from '../autosuggest';

const data = [
  { label: 'Cornelius Martin' },
  { label: 'Memphis Hoover' },
  { label: 'Angela Lloyd' },
  { label: 'Emilee Gay' },
  { label: 'Selah Richardson' },
  { label: 'Christina Erickson' },
  { label: 'Elaina Welch' },
  { label: 'Houston Tran' },
  { label: 'Richard Peterson' },
  { label: 'Andrew Lin' },
  { label: 'Isabell Kaiser' },
  { label: 'Brent Glass' },
  { label: 'Martha Jones' },
  { label: 'Anton Mcclain' },
  { label: 'Jamir Martin' },
  { label: 'Kassandra Manning' },
  { label: 'Madisyn Mccormick' },
  { label: 'Anabel Savage' },
  { label: 'Tyler Phillips' },
  { label: 'Ronan Deleon' }
];

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
 * @fires clear - Fired when the user taps on clear button.
 */
@customElement('ef-pill')
export class Pill extends ControlElement {
  /**
   * Element version number
   * @returns version number
   */
  static override get version(): string {
    return VERSION;
  }


  @query('#input') private inputEl?: TextField | null;
  @query('#autosuggest') private autosuggestEl?: Autosuggest | null;
  /**
   * Element's role attribute for accessibility
   */
  protected override readonly defaultRole: string | null = 'button';

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static override get styles(): CSSResultGroup {
    return css`
      :host {
        display: inline-block;
        position: relative;
      }
      [part='content'] {
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
   * Set active state
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

  protected override firstUpdated(changedProperties: PropertyValues): void {
    if (this.autosuggestEl && this.inputEl) {
      this.autosuggestEl.attach = this.inputEl;
      this.autosuggestEl?.addEventListener('suggestions-fetch-requested', (event) => {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        const query = event.detail.query;
        // @ts-ignore
        const re = new RegExp(this.autosuggestEl.constructor.EscapeRegExp(query), 'i');
        // @ts-ignore
        this.autosuggestEl.suggestions = query ? data.filter((item) => re.test(item.label)) : [];
      });
    }

    super.firstUpdated(changedProperties);

    this.addEventListener('tap', this.onTapHandler);
    this.addEventListener('tapstart', this.onStartPress);
    this.addEventListener('tapend', this.onEndPress);
    this.addEventListener('mouseleave', this.onEndPress);
    this.addEventListener('keydown', this.onKeyDown);

    registerOverflowTooltip(this, undefined, () =>
      this.labelRef.value ? isElementOverflown(this.labelRef.value) : false
    );
  }

  /**
   * Compute property values that depend on other properties
   * and are used in the rest of the update process.
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('toggles') || changedProperties.has('active')) {
      if (this.toggles) {
        this.setAttribute('aria-pressed', String(this.active));
      } else {
        this.removeAttribute('aria-pressed');
      }
    }
  }

  /**
   * Handles key down event
   * @param event Key down event object
   * @returns {void}
   */
  private onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Delete' && this.clears && !this.readonly) {
      this.dispatchEvent(new CustomEvent('clear'));
    }
  }

  private get closeTemplate(): TemplateResult | null {
    return this.clears && !this.readonly
      ? html`<ef-icon
          ${ref(this.closeIconRef)}
          part="close"
          icon="cross"
          aria-hidden="true"
          @tap="${this.clear}"
        ></ef-icon>`
      : null;
  }



  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected override render(): TemplateResult {
    return html`
      <ef-text-field id="input"></ef-text-field>
      <ef-autosuggest id="autosuggest"></ef-autosuggest>
    `;
  }

  /**
   * change state of `pressed` property to be true if there is no close icon or pill is pressed directly
   * @param event tapstart event
   * @returns {void}
   */
  private onStartPress(event: TapEvent): void {
    if (this.couldBePressed(event)) {
      this.pressed = true;
    }
  }

  /**
   * @param event tapstart
   * @returns true if element property pressed could be set
   */
  private couldBePressed(event: Event): boolean {
    const closeIconEl = this.closeIconRef.value;

    return !this.readonly && (!closeIconEl || !event.composedPath().includes(closeIconEl));
  }

  /**
   * change state of `pressed` property to be false if mouse leave pill or tap is end on pill
   * @returns {void}
   */
  private onEndPress(): void {
    if (this.pressed) {
      this.pressed = false;
    }
  }

  /**
   * handle when `clears` icon is tapped
   * @returns {void}
   */
  private onTapHandler(): void {
    if (this.toggles && !this.readonly) {
      this.active = !this.active;
    }
  }

  /**
   * @param event event from close button
   * @returns {void}
   */
  private clear(event: TapEvent): void {
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
