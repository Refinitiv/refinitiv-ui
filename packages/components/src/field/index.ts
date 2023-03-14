import { css, nothing, CSSResultGroup, html, TemplateResult, ControlElement } from '@refinitiv-ui/core';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';

import '../sub-label/index.js';
import '../sub-text-field/index.js';
import '../sub-password-field/index.js';
import { ErrorChangedEvent, ValueChangedEvent } from '../events.js';

const hasChanged = (value: unknown, oldValue: unknown): boolean => oldValue === undefined ? false : value !== oldValue;

@customElement('ds-field', { theme: false })
export class Field extends ControlElement {
  protected defaultRole: string | null = 'group';

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
        margin: 8px 0; // TODO:
      }
      :host [part=label] {
        margin: 8px 0; // TODO:
      }
      :host [part=error-message] {
        margin: 4px 0; // TODO:
      }
    `;
  }

  @property({ type: String })
  public type: 'text' | 'password' = 'text';

  @property({ type: String })
  public label = '';

  @property({ type: String })
  public errorMessage = '';

  /**
   * Specify icon to display in input. Value can be icon name
   */
  @property({ type: String, reflect: true })
  public icon: string | null = null;

  /**
   * Specify when icon need to be clickable
   */
  @property({ type: Boolean, reflect: true, attribute: 'icon-has-action' })
  public iconHasAction = false;

  /**
   * Set state to error
   */
  @property({ type: Boolean, reflect: true })
  public error = false;

  /**
   * Set state to warning
   */
  @property({ type: Boolean, reflect: true })
  public warning = false;

  /**
   * Set regular expression for input validation
   */
  @property({ type: String, hasChanged })
  public pattern = '';

  /**
   * Set character max limit
   */
  @property({ type: Number, attribute: 'maxlength', reflect: true })
  public maxLength: number | null = null;

  /**
   * Set character min limit
   */
  @property({ type: Number, attribute: 'minlength', reflect: true, hasChanged })
  public minLength: number | null = null;

  private handleValueChanged (event: ValueChangedEvent): void {
    this.setValueAndNotify(event.detail.value);
  }

  private handleErrorChanged (event: ErrorChangedEvent): void {
    this.error = event.detail.value;
    this.notifyPropertyChange('error', this.error);
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected get renderField (): TemplateResult {
    switch (this.type) {
      case 'text':
        return html`
        <ds-sub-text-field
          aria-labelledby=${this.label ? 'label' : nothing}
          aria-describedby=${this.errorMessage ? 'error-label' : nothing}

          .disabled=${this.disabled}
          .readonly=${this.readonly}
          ?error=${this.error}
          ?warning=${this.warning}

          pattern=${this.pattern ? this.pattern : nothing}
          minlength=${this.minLength !== null ? this.minLength : nothing}
          maxlength=${this.maxLength !== null ? this.maxLength : nothing}

          @value-changed=${this.handleValueChanged}
          @error-changed=${this.handleErrorChanged}
        >
        </ds-sub-text-field>`;
      case 'password':
        return html`
        <ds-sub-password-field
          aria-labelledby=${this.label ? 'label' : nothing}
          aria-describedby=${this.errorMessage ? 'error-label' : nothing}

          .disabled=${this.disabled}
          .readonly=${this.readonly}
          ?error=${this.error}
          ?warning=${this.warning}

          pattern=${this.pattern ? this.pattern : nothing}
          minlength=${this.minLength !== null ? this.minLength : nothing}
          maxlength=${this.maxLength !== null ? this.maxLength : nothing}

          @value-changed=${this.handleValueChanged}
          @error-changed=${this.handleErrorChanged}
        >
        </ds-sub-password-field>
        `;
      default:
        return html``;
    }
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected get renderLabel (): TemplateResult | typeof nothing {
    return html`<ds-sub-label id="label" part="label">${this.label}</ds-sub-label>`;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected get renderErrorMessage (): TemplateResult | typeof nothing {
    return html`<ds-sub-label error id="error-label" part="error-message">${this.errorMessage}</ds-sub-label>`;
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
      ${this.errorMessage ? this.renderErrorMessage : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-field': Field;
  }
}
