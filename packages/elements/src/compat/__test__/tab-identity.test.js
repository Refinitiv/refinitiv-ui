import { sendMouse } from '@web/test-runner-commands';
import { useFakeTimers } from 'sinon';

import { elementUpdated, expect, nextFrame } from '@refinitiv-ui/test-helpers';

describe('ELF tab bar with a duplicated tab module', function () {
  let setupElf;
  let ImportedTab;
  let host;
  let root;
  let scope;

  before(async function () {
    // A consumer bundle's second tab module copy defines ef-tab before tab-bar's own copy.
    const clock = useFakeTimers({ toFake: ['setTimeout'] });
    try {
      await import(new URL('../../../lib/tab/index.js?duplicate', import.meta.url).href);
      ({ setupElf } = await import('@refinitiv-ui/elements/compat'));
      ({ Tab: ImportedTab } = await import('@refinitiv-ui/elements/tab'));
      await import('@refinitiv-ui/elements/tab-bar');
      await import('@refinitiv-ui/elements/tab-bar/themes/halo/dark');
    } finally {
      // Drop the expected async DuplicateElementError from the second definition.
      clock.restore();
    }
  });

  beforeEach(async function () {
    host = document.createElement('div');
    root = host.attachShadow({ mode: 'open' });
    document.body.append(host);
    scope = setupElf(root);
    root.innerHTML = `
      <ef-tab-bar>
        <ef-tab value="buy">Buy</ef-tab>
        <ef-tab value="sell">Sell</ef-tab>
        <ef-tab value="orders">All orders</ef-tab>
      </ef-tab-bar>`;
    await elementUpdated(root.querySelector('ef-tab-bar'));
    await nextFrame();
  });

  afterEach(async function () {
    root.replaceChildren();
    await nextFrame();
    scope.dispose();
    host.remove();
  });

  const state = () =>
    [...root.querySelectorAll('ef-tab')].map((tab) => [tab.active, tab.getAttribute('aria-selected')]);

  it('uses a registered tab class that differs from the imported one', function () {
    expect(customElements.get('ef-tab')).to.not.equal(ImportedTab);
  });

  it('selects the first tab initially', function () {
    expect(root.querySelector('ef-tab-bar').value).to.equal('buy');
    expect(state()).to.deep.equal([
      [true, 'true'],
      [false, 'false'],
      [false, 'false']
    ]);
  });

  it('highlights a tab pressed with the pointer', async function () {
    const tabBar = root.querySelector('ef-tab-bar');
    const { left, top, width, height } = root.querySelectorAll('ef-tab')[2].getBoundingClientRect();
    await sendMouse({
      type: 'click',
      position: [Math.round(left + width / 2), Math.round(top + height / 2)]
    });
    await elementUpdated(tabBar);
    expect(tabBar.value).to.equal('orders');
    expect(state()).to.deep.equal([
      [false, 'false'],
      [false, 'false'],
      [true, 'true']
    ]);
  });
});
