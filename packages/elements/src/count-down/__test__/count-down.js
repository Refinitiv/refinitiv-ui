// import element and theme
import '@refinitiv-ui/elements/counter';
import '@refinitiv-ui/elemental-theme/light/ef-counter';

import { expect, fixture, html } from '@refinitiv-ui/test-helpers';

describe('counter/Counter', () => {
  it('Should have correct default Shadow DOM structure', async () => {
    const el = await fixture(html`<ef-count-down></ef-count-down>`);
    expect(el).shadowDom.to.equalSnapshot();
  });
});
