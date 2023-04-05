import { BasicElement, css, CSSResultGroup, html, TemplateResult } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import '../button/index.js';
import '../checkbox/index.js';
import '../select/index.js';
// import '../brand-logo/index.js';
import '../input-field/index.js';
import '../sub-footer/index.js';

@customElement('ui-pattern-sign-in', { theme: false })
export class PatternSignIn extends BasicElement {

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
          max-width: 340px;
          width: 100%;
        }
        ui-input-field {
          width: 100%;
        }
        ul {
          display: flex;
          flex-flow: row wrap;
          margin: 0;
          margin-left: -0.5em;
          margin-right: -0.5em;
          padding: 0;
        }
        li {
          flex: 1 0 160px;
          margin: 0.5em;
          list-style: none;
          padding: 0;
          margin: 0.5em;
        }
        ui-button {
          width: 100%;
        }
        a {
          outline-offset: 0;
          box-sizing: border-box;

          font: var(--link-md-emphasis-all);
          color: var(--link-content-primary);
          border: var(--width-fixed2) solid transparent;

          text-underline-offset: var(--width-fixed2);
          text-decoration-thickness: var(--width-fixed1);
        }
        a:focus-visible {
          color: var(--link-content-focused);
          border: var(--control-focused-ring-on-invert);
          outline: var(--control-focused-ring);

          text-decoration-thickness: var(--width-fixed2);
        }
        a:visited {
          color: var(--link-content-visited);
        }
        a:hover {
          color: var(--link-content-hover);
          text-decoration-thickness: var(--width-fixed2);
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
    <h1 style="font-size:0;margin:0;padding:0">Sign In</h1>
    <ui-select label="Language">
      <ui-option selected>English</ui-option>
    </ui-select>
    <p>
      <ui-brand-logo></ui-brand-logo>
      <img alt="Brand logo of Refinitiv Workspace" src="/resources/logo.workspace.svg"/>
    </p>
    <form method="dialog" @submit="${this.onSubmit}" aria-label="Sign-in">
      <p>
        <ui-input-field name="id" type="text" label="User ID"></ui-input-field>
      </p>
      <p>
        <ui-input-field name="password" type="password" label="Password"></ui-input-field>
      </p>
      <p>
        <a href="/account/reset-password">Forgotten your password?</a>
      </p>
      <p>
        <ui-checkbox checked>Sign me in automatically</ui-checkbox>
      </p>
      <ul>
        <li>
          <ui-button variant="primary">Sign In</ui-button>
        </li>
        <li>
          <ui-button type="button">Cancel</ui-button>
        </li>
      </ul>
    </form>
    <ui-sub-footer></ui-sub-footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-pattern-sign-in': PatternSignIn;
  }
}
