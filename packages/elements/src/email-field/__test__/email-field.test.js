import { fixture, expect } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/email-field';
import '@refinitiv-ui/elemental-theme/light/ef-email-field';

describe('email-field/EmailField', () => {
  it('Default DOM structure and properties are correct', async () => {
    const el = await fixture('<ef-email-field></ef-email-field>');
    expect(el.multiple).to.equal(false, 'multiple');
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('DOM structure and properties are correct', async () => {
    const el = await fixture('<ef-email-field multiple></ef-email-field>');
    expect(el.multiple).to.equal(true, 'multiple');
    expect(el).shadowDom.to.equalSnapshot();
  });
});
