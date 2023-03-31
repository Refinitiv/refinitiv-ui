import { html, css, CSSResultGroup, TemplateResult, ControlElement } from '@refinitiv-ui/core';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { VERSION } from '../version.js';

/**
 * An option for select
 */
@customElement('ui-option', { theme: false })
export class Option extends ControlElement {
  protected readonly defaultRole = 'option';
  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * Indicates that the option is selected
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  /**
   * A `CSSResultGroup` that will be used to style the host,
   * slotted children and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        outline: none;
        position: relative;
        cursor: pointer;
        width: var(--code-only-field-width);
        height: var(--code-only-field-height);
        color: var(--control-content-default);
        border-bottom: var(--control-border-default);
        background-color: var(--control-bg-default);
        padding: var(--code-only-field-padding-vertical) var(--code-only-field-padding-horizontal);
      }
      :host(:hover) {
        color: var(--control-content-hover-on-invert);
        background-color: var(--control-bg-hover-on-invert);
      }
      :host([selected])::before {
        content: '';
        position: absolute;
        height: 100%;
        inset: 0;
        border-left: var(--code-only-option-border-selected);
      }
      :host([selected]:hover)::before {
        border-color: var(--control-bg-hover-on-invert);
      }
      :host(:focus-visible) {
        color: var(--control-content-focused);
        border: var(--control-border-focused);
        background-color: var(--control-bg-focused);
      }
      :host(:focus-visible)::before, :host(:hover:focus-visible)::before {
        content: '';
        pointer-events: none;
        position: absolute;
        display: block;
        z-index: 1;
        inset: -5px;
        border: var(--control-focused-ring);
      }
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult}  Render template
   */
  protected render (): TemplateResult {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-option': Option;
  }
}
