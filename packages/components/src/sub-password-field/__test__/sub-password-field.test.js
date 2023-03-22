import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/sub-password-field';

describe('ui-sub-password-field/PasswordField', () => {
  it('Default DOM structure and properties are correct', async () => {
    const el = await fixture('<ui-sub-password-field></ui-sub-password-field>');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('Can toggle password field', async () => {
    const el = await fixture('<ui-sub-password-field></ui-sub-password-field>');
    const eyeIconEl = el.shadowRoot.querySelector('[part~=icon]');
    eyeIconEl.click();
    await elementUpdated(el);
    await expect(el).shadowDom.to.equalSnapshot();
  });
});
