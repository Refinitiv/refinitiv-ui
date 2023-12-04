import '@refinitiv-ui/elements/select';

import '@refinitiv-ui/elemental-theme/light/ef-select';
import { expect, fixture } from '@refinitiv-ui/test-helpers';

describe('select/Accessibility', function () {
  it('Should not be accessible without label', async function () {
    const el = await fixture('<ef-select></ef-select>');
    const select = el.shadowRoot.querySelector('[role=combobox]');
    await expect(select).not.to.be.accessible();
  });
  it('Should cascade label down when aria-label is used', async function () {
    const el = await fixture('<ef-select aria-label="Label"></ef-select>');
    const select = el.shadowRoot.querySelector('[role=combobox]');
    await expect(select).to.be.accessible();
  });
  it('Should cascade label down when aria-labelledby is used', async function () {
    const template = await fixture(`
        <div>
          <label id="label">Label</label>
          <ef-select aria-labelledby="label"></ef-select>
        </div>
      `);
    const el = template.querySelector('ef-select');
    const select = el.shadowRoot.querySelector('[role=combobox]');
    await expect(select).to.be.accessible();
  });
  it('Should capture label with `for` and cascade label down when label[for="id"] is used', async function () {
    const template = await fixture(`
        <div>
          <label for="select">Label</label>
          <ef-select id="select"></ef-select>
        </div>
      `);

    const el = template.querySelector('ef-select');
    const select = el.shadowRoot.querySelector('[role=combobox]');

    await expect(select).to.be.accessible();
  });
});
