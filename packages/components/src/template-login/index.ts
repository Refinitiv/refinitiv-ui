import { BasicElement, css, CSSResultGroup, html, TemplateResult } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import '../button/index.js';
// import '../brand-logo/index.js';
import '../input-field/index.js';
import '../sub-footer/index.js';

@customElement('dst-login', { theme: false })
export class LoginTemplate extends BasicElement {

  /**
   * A `CSSResultGroup` that will be used to style the host,
   * slotted children and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
        :host {
          display: block;
          padding: 2em;
          background: var(--base-bg-primary);
        }
      `;
  }

  protected onSubmit (event: SubmitEvent) {
    const data = new FormData(event.target as HTMLFormElement);
    const detail: Record<string, FormDataEntryValue> = {};
    for (const [key, value] of data) {
      detail[key] = value;
    }
    const submitEvent = new CustomEvent('submit', {
      detail,
      bubbles: false
    });
    this.dispatchEvent(submitEvent);
    if (submitEvent.defaultPrevented) {
      event.preventDefault();
    }
  }

  public render (): TemplateResult {
    return html`
    <form method="dialog" @submit="${this.onSubmit}">
      <h1 hidden>Sign In</h1>
      <p>
        <ui-brand-logo></ui-brand-logo>
      </p>
      <p>
        <ui-input-field name="id" type="text" label="User ID" role="textbox"></ui-input-field>
      </p>
      <p>
        <ui-input-field name="password" type="password" label="Password"></ui-input-field>
      </p>
      <p>
        <button>Button</button>
        <ui-button>Sign In</ui-button>
        <ui-button type="reset">Reset</ui-button>
      </p>
    </form>
    <ui-sub-footer></ui-sub-footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dst-login': LoginTemplate;
  }
}
