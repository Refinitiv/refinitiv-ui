import { ControlElement, html, css } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';

@customElement('ds-sub-checkbox', { theme: false })
export class SubCheckbox extends ControlElement {
  @property({ type: Boolean })
  public checked = false;

  @property({ type: Boolean })
  public disabled = false;

  public static styles = css`
    :host {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 5px; /* change the value here to variable */
      width: var(--ds-checkbox-size);
      height: var(--ds-checkbox-size);
      color: var(--ds-primary-color);
      border: var(--ds-checkbox-border);
      border-radius: var(--ds-checkbox-radius);
    }
    :host(:focus-visible) {
      outline: var(--ds-checkbox-focus-border);
    }
    [disabled] {
      color: var(--ds-checkbox-disabled-color);
    }
    [type='checkbox'] {
      display: none;
    }
    svg {
      width: 100%;
      height: 100%;
    }
    [disabled] {
      border: var(--ds-checkbox-disabled-border);
    }
  `;

  public connectedCallback (): void {
    super.connectedCallback();
    this.addEventListener('click', () => {
      if (!this.disabled) {
        this.checked = !this.checked;
      }
    });
  }

  private renderTick () {
    return html`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" version="1.1" viewBox="0 0 490 490" xml:space="preserve">
      <polygon points="452.253,28.326 197.831,394.674 29.044,256.875 0,292.469 207.253,461.674 490,54.528 " />
    </svg>`;
  }

  protected render () {
    return html`
      <input id="checkbox" type="checkbox" ?checked=${this.checked} ?disabled=${this.disabled} />
      ${this.checked ? this.renderTick() : null}
    `;
  }
}
