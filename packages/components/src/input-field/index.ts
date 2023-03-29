import { css, nothing, CSSResultGroup, html, TemplateResult, ControlElement } from '@refinitiv-ui/core';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { templateMap, TemplateMap } from '@refinitiv-ui/core/directives/template-map.js';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { ErrorChangedEvent, ValueChangedEvent } from '../events.js';

import '../sub-label/index.js';
import '../sub-text-field/index.js';
import '../sub-password-field/index.js';

const hasChanged = (value: unknown, oldValue: unknown): boolean => oldValue === undefined ? false : value !== oldValue;

@customElement('ui-input-field', { theme: false })
export class InputField extends ControlElement {
  static shadowRootOptions = { ...ControlElement.shadowRootOptions, delegatesFocus: true };

  /**
   * A `CSSResultGroup` that will be used to style the host,
   * slotted children and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        margin: var(--ds-space-x-small) 0;
      }
      :host [part=label] {
        margin: var(--ds-space-x-small) 0;
      }
      :host [part=hint] {
        margin: var(--ds-space-xx-small) 0;
      }
    `;
  }

  @property({ type: String })
  public type: 'text' | 'password' = 'text';

  @property({ type: String })
  public label = '';

  @property({ type: String })
  public hint = '';

  @property({ type: String, reflect: true })
  public icon: string | null = null;

  @property({ type: Boolean, reflect: true, attribute: 'icon-has-action' })
  public iconHasAction = false;

  @property({ type: Boolean, reflect: true })
  public error = false;

  @property({ type: Boolean, reflect: true })
  public warning = false;

  @property({ type: String, hasChanged })
  public pattern = '';

  @property({ type: Number, attribute: 'maxlength', reflect: true })
  public maxLength: number | null = null;

  @property({ type: Number, attribute: 'minlength', reflect: true, hasChanged })
  public minLength: number | null = null;

  private handleValueChanged (event: ValueChangedEvent): void {
    this.setValueAndNotify(event.detail.value);
  }

  private handleErrorChanged (event: ErrorChangedEvent): void {
    this.error = event.detail.value;
    this.notifyPropertyChange('error', this.error);
  }

  private handleIconClick (): void {
    if (this.iconHasAction && !this.disabled) {
      this.dispatchEvent(new CustomEvent('icon-click', { bubbles: false }));
    }
  }

  protected get decorateField (): TemplateMap {
    return {
      '.inputAriaLabel': this.label || null,
      // 'aria-describedby': this.hint ? 'hint' : null,
      'disabled': this.disabled,
      'readonly': this.readonly,
      'error': this.error || null,
      'warning': this.warning || null,
      'pattern': this.pattern || null,
      'value': this.value || null,
      'icon': this.icon || null,
      'icon-has-action': this.iconHasAction || null,
      'minlength': this.minLength || null,
      'maxlength': this.maxLength || null,
      '@icon-click': this.handleIconClick,
      '@value-changed': this.handleValueChanged,
      '@error-changed': this.handleErrorChanged
    };
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected get renderField (): TemplateResult {
    switch (this.type) {
      case 'password':
        return html`<ui-sub-password-field ${templateMap(this.decorateField)}></ui-sub-password-field>`;
      default:
        return html`<ui-sub-text-field ${templateMap(this.decorateField)}></ui-sub-text-field>`;
    }
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected get renderLabel (): TemplateResult | typeof nothing {
    return html`<ui-sub-label id="label" part="label" aria-hidden="true">${this.label}</ui-sub-label>`;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected get renderHint (): TemplateResult | typeof nothing {
    return html`<ui-sub-label error id="hint" part="hint">${this.hint}</ui-sub-label>`;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      ${this.label ? this.renderLabel : nothing}
      ${this.renderField}
      ${this.hint ? this.renderHint : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-input-field': InputField;
  }
}
