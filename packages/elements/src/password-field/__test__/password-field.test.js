import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/password-field';
import '@refinitiv-ui/elemental-theme/light/ef-password-field';

describe('password-field/PasswordField', () => {
  it('Default DOM structure and properties are correct', async () => {
    const el = await fixture('<ef-password-field></ef-password-field>');
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('Can toggle password field', async () => {
    const el = await fixture('<ef-password-field></ef-password-field>');
    const eyeIconEl = el.shadowRoot.querySelector('[part~=icon]');
    eyeIconEl.click();
    await elementUpdated(el);
    expect(el).shadowDom.to.equalSnapshot();
    eyeIconEl.click();
    await elementUpdated(el);
    expect(el).shadowDom.to.equalSnapshot();
  });
});
