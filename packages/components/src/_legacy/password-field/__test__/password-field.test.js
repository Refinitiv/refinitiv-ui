import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/password-field';
import '@refinitiv-ui/elemental-theme/light/ef-password-field';

describe('password-field/PasswordField', () => {
  it('Default DOM structure and properties are correct', async () => {
    const el = await fixture('<ef-password-field></ef-password-field>');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('Can toggle password field', async () => {
    const el = await fixture('<ef-password-field></ef-password-field>');
    const eyeIconEl = el.shadowRoot.querySelector('[part=icon]');
    const inputEl = el.shadowRoot.querySelector('[part=input]');

    expect(inputEl.getAttribute('type')).to.equal('password', 'Input type should set to "password" by default');
    expect(eyeIconEl.getAttribute('aria-label')).to.equal('Show password', 'aria-label of icon should set to "Show password" by default');

    eyeIconEl.click();
    await elementUpdated(el);
    expect(inputEl.getAttribute('type')).to.equal('text', 'Input type should set to "text" after click show password');
    expect(eyeIconEl.getAttribute('aria-label')).to.equal('Hide password', 'aria-label of icon should set to "Hide password" after click show password');

    eyeIconEl.click();
    await elementUpdated(el);
    expect(inputEl.getAttribute('type')).to.equal('password', 'Input type should back to "Password" after click hide password');
    expect(eyeIconEl.getAttribute('aria-label')).to.equal('Show password', 'aria-label of icon should back to "Show password" after click hide password');
  });
});
