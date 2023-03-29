import { css, nothing, CSSResultGroup, html, TemplateResult, ControlElement } from '@refinitiv-ui/core';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { OpenedChangedEvent, ValueChangedEvent } from '../events.js';

import '../sub-select/index.js';
import '../sub-label/index.js';
import { SubSelect } from '../sub-select/index.js';

@customElement('ui-select', { theme: false })
export class Select extends ControlElement {
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
    `;
  }

  @query('[part=select]')
  private subSelectElement: SubSelect | undefined;

  @property({ type: String })
  public label = '';

  /**
   * Toggles the opened state of the list
   */
  @property({ type: Boolean, reflect: true })
  public opened = false;

  /**
   * Value of the element
   * @param value Element value
   * @default -
   */
  @property({ type: String, attribute: false })
  public set value (value: string) {
    const oldValue = this.value;
    // TODO
    if (oldValue !== value && this.subSelectElement) {
      this.subSelectElement.value = value;
    }
    this.requestUpdate('value', oldValue);
  }
  public get value (): string {
    return this.subSelectElement ? this.subSelectElement.value : '';
  }

  private handleValueChanged (event: ValueChangedEvent): void {
    this.setValueAndNotify(event.detail.value);
  }

  private handleOpenedChanged (event: OpenedChangedEvent): void {
    this.opened = event.detail.value;
    this.notifyPropertyChange('opened', this.opened);
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected get renderLabel (): TemplateResult | typeof nothing {
    return this.label ? html`<ui-sub-label id="label" part="label">${this.label}</ui-sub-label>` : nothing;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      ${this.renderLabel}
      <ui-sub-select
        part="select"
        aria-labelledby=${this.label ? 'label' : null}
        .value=${this.value}
        ?opened=${this.opened} 
        @value-changed=${this.handleValueChanged}
        @open-changed=${this.handleOpenedChanged}
      >
        <slot></slot>
      </ui-sub-select>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-select': Select;
  }
}