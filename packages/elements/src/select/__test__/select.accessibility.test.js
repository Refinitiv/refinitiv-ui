import { fixture, expect } from '@refinitiv-ui/test-helpers';
import { getOptions, getData } from './utils';

import '@refinitiv-ui/elements/select';
import '@refinitiv-ui/elemental-theme/light/ef-select';


describe('select/Accessibility', () => {
  it('should be accessible when slotted content is used', async () => {
    const el = await fixture(`<ef-select aria-label="Label">${getOptions()}</ef-select>`);
    expect(el).to.be.accessible();
  });
  it('should be accessible when data is used', async () => {
    const el = await fixture(`<ef-select aria-label="Label"></ef-select>`);
    el.data = getData();
    expect(el).to.be.accessible();
  });
});
