
import { BasicElement, html } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';

import '@refinitiv-ui/elements/radio-button';
import '@refinitiv-ui/elemental-theme/light/ef-radio-button';

export class RadioWrapper extends BasicElement {
  render () {
    return html`<div>
    <ef-radio-button name="group" id="btn1" checked>1</ef-radio-button>
    <ef-radio-button name="group" id="btn2">2</ef-radio-button>
    </div>`;
  }
}
customElement('radio-wrapper', { theme: false })(RadioWrapper);