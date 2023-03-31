import {
  css,
  nothing,
  CSSResultGroup,
  FormFieldElement,
  html,
  PropertyValues,
  TemplateResult
} from '@refinitiv-ui/core';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { TemplateMap } from '@refinitiv-ui/core/directives/template-map.js';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import '../sub-icon/index.js';

@customElement('ui-sub-text-field', { theme: false })
export class SubTextField extends FormFieldElement {
  /**
   * A `CSSResultGroup` that will be used to style the host,
   * slotted children and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
        position: relative;
        vertical-align: middle;

        padding: var(--code-only-field-padding-vertical) var(--code-only-field-padding-horizontal);

        width: var(--code-only-field-width);
        height: var(--code-only-field-height);

        color: var(--control-content-default);
        border: var(--control-border-default);
        background-color: var(--control-bg-default);
      }
      :host(.focus-ring) {
        color: var(--control-content-focused);
        border: var(--control-border-focused);
        background-color: var(--control-bg-focused);
        outline: var(--control-focused-ring-on-invert);
      }
      :host(.focus-ring)::before, :host(.focus-ring:hover)::before {
        content: '';
        position: absolute;
        display: block;
        inset: -5px;
        pointer-events: none;
        border: var(--control-focused-ring);
      }
      :host(:not([readonly]):not(:focus):hover) {
        color: var(--control-content-hover);
        border: var(--control-border-hover);
        background-color: var(--control-bg-hover);
      }
      :host [part=input] {
        color: inherit;
        text-align: inherit;
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        appearance: none;
        text-overflow: ellipsis;
        background: none;
        border: none;

        font: var(--code-only-control-content-default);
      }
      :host [part=input]:focus {
        outline: none;
      }
      :host [part=input]::selection {
        color: var(--control-content-selected-on-invert);
        background-color: var(--control-bg-selected-focused);
      }
      :host([icon]) [part=icon]{
        display: flex;
        min-width: 1em;
        box-sizing: border-box;
        color: var(--control-content-decorative);
        font-size: var(--code-only-action-line-height-default);
      }
      :host([icon]) [part=input]{
        padding-left: var(--code-only-field-padding-horizontal);
      }
    `;
  }

  @property({ type: String, reflect: true })
  public icon: string | null = null;

  /**
   * Called once after the component is first rendered
   * @param changedProperties map of changed properties with old values
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.inputElement?.addEventListener('focus', () => {
      this.classList.add('focus-ring');
    });
    this.inputElement?.addEventListener('blur', () => {
      this.classList.remove('focus-ring');
    });
  }

  /**
   * Called when the element’s DOM has been updated and rendered
   * @param changedProperties Properties that has changed
   * @returns shouldUpdate
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (this.shouldSyncInputValue(changedProperties)) {
      this.syncInputValue(changedProperties);
    }
  }

  /**
   * Check if input value should be synchronised with component value
   * @param changedProperties Properties that has changed
   * @returns True if input should be synchronised
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected shouldSyncInputValue (changedProperties: PropertyValues): boolean {
    return this.inputValue !== this.value;
  }

  /**
   * Synchronise input value with value.
   * Override the method if value and input value are not the same
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected syncInputValue (changedProperties: PropertyValues): void {
    this.inputValue = this.value;
  }

  /**
   * Runs on input element `input` event
   * @param event `input` event
   * @returns {void}
   */
  protected override onInputInput (event: InputEvent): void {
    this.onPossibleValueChange(event);
  }

  /**
   * Runs on input element `change` event
   * @param event `change` event
   * @returns {void}
   */
  protected override onInputChange (event: InputEvent): void {
    this.onPossibleValueChange(event);
  }

  /**
   * Check if value is changed and fire event
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onPossibleValueChange (event: InputEvent): void {
    const value = this.inputElement?.value || '';
    this.setValueAndNotify(value);
  }

  /**
   * Renders icon element if property present
   * @returns {void}
   */
  protected renderIcon (): TemplateResult | typeof nothing {
    return this.icon ? html`<ui-sub-icon aria-hidden="true" part="icon" icon="${this.icon}"></ui-sub-icon>` : nothing;
  }

  protected get decorateInputMap (): TemplateMap {
    return {
      ...super.decorateInputMap,
      'type': 'text',
      'part': 'input'
    };
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      ${this.renderIcon()}
      ${super.render()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-sub-text-field': SubTextField;
  }
}
