// import element and theme
import '@refinitiv-ui/elements/password-field';

import '@refinitiv-ui/elemental-theme/light/ef-password-field';
import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

describe('password-field/PasswordField', function () {
  it('Default DOM structure and properties are correct', async function () {
    const el = await fixture('<ef-password-field></ef-password-field>');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('Can toggle password field', async function () {
    const el = await fixture('<ef-password-field></ef-password-field>');
    const eyeIconEl = el.shadowRoot.querySelector('[part=icon]');
    const inputEl = el.shadowRoot.querySelector('[part=input]');
    const liveRegionEl = el.shadowRoot.querySelector('[part=live-region]');

    expect(inputEl.getAttribute('type')).to.equal(
      'password',
      'Input type should set to "password" by default'
    );

    expect(eyeIconEl.getAttribute('aria-pressed')).to.equal(
      'false',
      'aria-pressed of icon should set to "false" by default'
    );
    // add focus test here before toggle?
    // expect(liveRegionEl.textContent).to.equal(
    //   'Show password',
    //   'aria-label of icon should set to "Show password" by default'
    // );

    eyeIconEl.click();
    await elementUpdated(el);
    expect(inputEl.getAttribute('type')).to.equal(
      'text',
      'Input type should set to "text" after click show password'
    );

    expect(eyeIconEl.getAttribute('aria-pressed')).to.equal(
      'true',
      'aria-pressed of icon should set to "true" after toggling show password'
    );

    const visibleMessage = 'Show password on, password is visible';
    expect(liveRegionEl.textContent).to.equal(
      visibleMessage,
      `text content of live region should set to "${visibleMessage}" after toggling show password`
    );

    eyeIconEl.click();
    await elementUpdated(el);
    expect(inputEl.getAttribute('type')).to.equal(
      'password',
      'Input type should back to "Password" after click hide password'
    );

    expect(eyeIconEl.getAttribute('aria-pressed')).to.equal(
      'false',
      'aria-pressed of icon should set to "false" after 2nd toggling show password'
    );

    const hiddenMessage = 'Show password off, password is hidden';
    expect(liveRegionEl.textContent).to.equal(
      hiddenMessage,
      `aria-label of icon should back to "${hiddenMessage}" after 2nd toggling show password`
    );
  });
});

// test focus and aria-lve update!
