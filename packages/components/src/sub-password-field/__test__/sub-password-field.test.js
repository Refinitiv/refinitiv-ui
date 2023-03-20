import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/sub-password-field';

describe('ds-sub-password-field/PasswordField', () => {
  it('Default DOM structure and properties are correct', async () => {
    const el = await fixture('<ds-sub-password-field></ds-sub-password-field>');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('Can toggle password field', async () => {
    const el = await fixture('<ds-sub-password-field></ds-sub-password-field>');
    const eyeIconEl = el.shadowRoot.querySelector('[part~=icon]');
    eyeIconEl.click();
    await elementUpdated(el);
    await expect(el).shadowDom.to.equalSnapshot();
  });
});
