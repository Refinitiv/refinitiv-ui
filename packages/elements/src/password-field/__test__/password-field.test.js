// import element and theme
import '@refinitiv-ui/elements/password-field';

import '@refinitiv-ui/elemental-theme/light/ef-password-field';
import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

const getTextContent = (el) => {
  return el.textContent?.trim() || '';
};

describe('password-field/PasswordField', function () {
  it('Default DOM structure and properties are correct', async function () {
    const el = await fixture('<ef-password-field></ef-password-field>');
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('Can toggle password field', async function () {
    const el = await fixture('<ef-password-field></ef-password-field>');
    const eyeIconEl = el.shadowRoot.querySelector('[part=icon]');
    const inputEl = el.shadowRoot.querySelector('[part=input]');
    const liveRegionEl = el.shadowRoot.querySelector('[part=live-region]');

    const visibleMessage = 'Show password on, password is visible';
    const hiddenMessage = 'Show password off, password is hidden';

    expect(inputEl.getAttribute('type')).to.equal(
      'password',
      'Input type should set to "password" by default'
    );
    expect(eyeIconEl.getAttribute('aria-pressed')).to.equal(
      'false',
      'aria-pressed of icon should set to "false" by default'
    );
    expect(getTextContent(liveRegionEl)).to.equal(
      '',
      'text content of live region should be empty by default'
    );

    eyeIconEl.focus();
    await elementUpdated(el);
    expect(getTextContent(liveRegionEl)).to.equal(
      hiddenMessage,
      `text content of live region should be "${hiddenMessage}" after focusing on show password`
    );

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
    expect(getTextContent(liveRegionEl)).to.equal(
      visibleMessage,
      `text content of live region should be "${visibleMessage}" after toggling show password`
    );

    eyeIconEl.blur();
    await elementUpdated(el);
    expect(getTextContent(liveRegionEl)).to.equal(
      '',
      'text content of live region should be empty after blurring out of show password'
    );

    eyeIconEl.focus();
    await elementUpdated(el);
    expect(getTextContent(liveRegionEl)).to.equal(
      visibleMessage,
      `text content of live region should be "${visibleMessage}" after toggling show password`
    );

    eyeIconEl.click();
    await elementUpdated(el);
    expect(inputEl.getAttribute('type')).to.equal(
      'password',
      'Input type should back to "Password" after click hide password'
    );
    expect(eyeIconEl.getAttribute('aria-pressed')).to.equal(
      'false',
      'aria-pressed of icon should be "false" after toggling show password for the second time'
    );
    expect(getTextContent(liveRegionEl)).to.equal(
      hiddenMessage,
      `aria-label of icon should back to "${hiddenMessage}" after toggling show password for the second time`
    );
  });
});
