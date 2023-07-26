// import element and theme
import '@refinitiv-ui/elements/search-field';

import '@refinitiv-ui/elemental-theme/light/ef-search-field';
import { expect, fixture, oneEvent } from '@refinitiv-ui/test-helpers';

describe('search-field/SearchField', function() {
  it('Default DOM structure and properties are correct', async function() {
    const el = await fixture('<ef-search-field></ef-search-field>');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('Can click on icon if it has icon-has-action', async function() {
    const el = await fixture('<ef-search-field icon-has-action></ef-search-field>');
    const iconEl = el.shadowRoot.querySelector('[part~=icon]');
    setTimeout(() => {
      iconEl.click();
    });
    const event = await oneEvent(el, 'icon-click');
    expect(event).is.instanceof(Event);
  });
});
