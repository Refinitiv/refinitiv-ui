import { sendMouse } from '@web/test-runner-commands';
import { useFakeTimers } from 'sinon';

import { elementUpdated, expect, nextFrame } from '@refinitiv-ui/test-helpers';

describe('ELF button bar with a duplicated button module', function () {
  let setupElf;
  let ImportedButton;
  let DuplicateButton;
  let host;
  let root;
  let scope;

  before(async function () {
    // A consumer bundle's second button module copy defines ef-button before button-bar's own copy.
    const clock = useFakeTimers({ toFake: ['setTimeout'] });
    try {
      ({ Button: DuplicateButton } = await import(
        new URL('../../../lib/button/index.js?duplicate', import.meta.url).href
      ));
      ({ setupElf } = await import('@refinitiv-ui/elements/compat'));
      ({ Button: ImportedButton } = await import('@refinitiv-ui/elements/button'));
      await import('@refinitiv-ui/elements/button-bar');
      await import('@refinitiv-ui/elements/button-bar/themes/halo/dark');
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
      <ef-button-bar managed>
        <ef-button toggles active>Day</ef-button>
        <ef-button toggles>Week</ef-button>
        <ef-button toggles>Month</ef-button>
      </ef-button-bar>`;
    await elementUpdated(root.querySelector('ef-button-bar'));
    await nextFrame();
  });

  afterEach(async function () {
    root.replaceChildren();
    await nextFrame();
    scope.dispose();
    host.remove();
  });

  it('treats elements from either module copy as the same element class', function () {
    const button = root.querySelector('ef-button');
    expect(customElements.get('ef-button')).to.equal(DuplicateButton);
    expect(DuplicateButton).to.not.equal(ImportedButton);
    expect(button instanceof ImportedButton).to.equal(true);
    expect(button instanceof DuplicateButton).to.equal(true);
    expect(root.querySelector('ef-button-bar') instanceof ImportedButton).to.equal(false);
    expect(document.createElement('div') instanceof ImportedButton).to.equal(false);
  });

  it('keeps one managed toggle active after a pointer press', async function () {
    const buttons = [...root.querySelectorAll('ef-button')];
    const { left, top, width, height } = buttons[2].getBoundingClientRect();
    await sendMouse({
      type: 'click',
      position: [Math.round(left + width / 2), Math.round(top + height / 2)]
    });
    await nextFrame();
    expect(buttons.map((button) => button.active)).to.deep.equal([false, false, true]);
  });
});
