import { css, nothing, CSSResultGroup, html, TemplateResult, ControlElement } from '@refinitiv-ui/core';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { templateMap, TemplateMap } from '@refinitiv-ui/core/directives/template-map.js';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { ValueChangedEvent } from '../events.js';

import '../sub-label/index.js';
import '../sub-text-field/index.js';
import '../sub-password-field/index.js';

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
        display: inline-flex;
        flex-direction: column;
      }
      :host [part=label] {
        margin: var(--space-010) 0;
      }
    `;
  }

  @property({ type: String })
  public type: 'text' | 'password' = 'text';

  @property({ type: String })
  public label = '';

  @property({ type: String, reflect: true })
  public icon: string | null = null;

  private handleValueChanged (event: ValueChangedEvent): void {
    this.setValueAndNotify(event.detail.value);
  }

  protected get decorateField (): TemplateMap {
    return {
      'aria-labelledby': this.label ? 'label' : null,
      'disabled': this.disabled,
      'readonly': this.readonly,
      'value': this.value || null,
      'icon': this.icon || null,
      '@value-changed': this.handleValueChanged
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
    return html`<ui-sub-label id="label" part="label">${this.label}</ui-sub-label>`;
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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-input-field': InputField;
  }
}
