import { sendKeys, sendMouse, setViewport } from '@web/test-runner-commands';

import { setupElf } from '@refinitiv-ui/elements/compat';
import '@refinitiv-ui/elements/dialog';
import '@refinitiv-ui/elements/dialog/themes/halo/dark';
import '@refinitiv-ui/elements/overlay';
import '@refinitiv-ui/elements/overlay/themes/halo/dark';

import { elementUpdated, expect, nextFrame, oneEvent } from '@refinitiv-ui/test-helpers';

// The Shell's right-hand app panel creates a containing block for fixed descendants.
const PANEL = { left: 400, top: 40, width: 500, height: 520 };

const waitForOpened = async (overlay) => {
  await elementUpdated(overlay);
  await nextFrame(4);
};

const centerOf = (element) => {
  const { left, top, width, height } = element.getBoundingClientRect();
  return { x: Math.round(left + width / 2), y: Math.round(top + height / 2) };
};

describe('ELF overlays in a split Shell panel', function () {
  let host;
  let root;
  let scope;

  before(async function () {
    await setViewport({ width: 1000, height: 600 });
  });

  beforeEach(function () {
    host = document.createElement('div');
    host.style.cssText = `position: fixed; left: ${PANEL.left}px; top: ${PANEL.top}px; width: ${PANEL.width}px; height: ${PANEL.height}px; transform: translateZ(0);`;
    root = host.attachShadow({ mode: 'open' });
    document.body.append(host);
    scope = setupElf(root);
  });

  afterEach(async function () {
    root.querySelectorAll('ef-overlay, ef-dialog').forEach((overlay) => {
      overlay.opened = false;
    });
    await nextFrame(2);
    root.replaceChildren();
    await nextFrame();
    scope.dispose();
    host.remove();
  });

  const openDropdown = async (targetStyle = 'left: 20px; top: 20px;') => {
    const scroller = document.createElement('div');
    scroller.style.cssText = 'position: absolute; inset: 0; overflow: auto;';
    const target = document.createElement('div');
    target.style.cssText = `position: absolute; ${targetStyle} width: 344px; height: 24px;`;
    const spacer = document.createElement('div');
    spacer.style.cssText = 'height: 2000px;';
    scroller.append(target, spacer);
    const overlay = document.createElement('ef-overlay');
    overlay.positionTarget = target;
    overlay.style.minWidth = '344px';
    overlay.noCancelOnOutsideClick = true;
    overlay.textContent = 'Dropdown';
    root.append(scroller, overlay);
    overlay.opened = true;
    await waitForOpened(overlay);
    return { overlay, scroller, target };
  };

  it('aligns a dropdown with its input and keeps the input width', async function () {
    const { overlay, target } = await openDropdown();
    const targetRect = target.getBoundingClientRect();
    const overlayRect = overlay.getBoundingClientRect();
    expect(Math.round(overlayRect.left)).to.equal(Math.round(targetRect.left));
    expect(Math.round(overlayRect.width)).to.be.at.least(344);
    expect(Math.round(overlayRect.top)).to.be.at.least(Math.round(targetRect.bottom));
  });

  it('keeps a dropdown inside the panel when its input reaches the panel edge', async function () {
    const { overlay } = await openDropdown('right: 0; top: 20px;');
    const overlayRect = overlay.getBoundingClientRect();
    expect(Math.round(overlayRect.left)).to.be.at.least(PANEL.left);
    expect(Math.round(overlayRect.right)).to.be.at.most(PANEL.left + PANEL.width);
    expect(Math.round(overlayRect.width)).to.be.at.least(344);
  });

  it('follows its input after scrolling inside the app', async function () {
    const { overlay, scroller, target } = await openDropdown();
    scroller.scrollTop = 10;
    await nextFrame(4);
    expect(Math.round(overlay.getBoundingClientRect().top)).to.equal(
      Math.round(target.getBoundingClientRect().bottom)
    );
  });

  it('refits after a splitter makes the panel narrower', async function () {
    const { overlay } = await openDropdown('right: 0; top: 20px;');
    host.style.left = `${PANEL.left + 100}px`;
    host.style.width = `${PANEL.width - 100}px`;
    await nextFrame(6);
    const overlayRect = overlay.getBoundingClientRect();
    expect(Math.round(overlayRect.left)).to.be.at.least(PANEL.left + 100);
    expect(Math.round(overlayRect.right)).to.be.at.most(PANEL.left + PANEL.width);
    expect(Math.round(overlayRect.width)).to.be.at.least(344);
  });

  describe('Review dialog', function () {
    let dialog;

    beforeEach(async function () {
      dialog = document.createElement('ef-dialog');
      dialog.header = 'Review order';
      dialog.textContent = 'Buy 100 LSEG.L at market';
      root.append(dialog);
      dialog.opened = true;
      await waitForOpened(dialog);
    });

    it('keeps a usable size centered in the panel with an aligned backdrop', function () {
      const rect = dialog.getBoundingClientRect();
      expect(rect.width).to.be.greaterThan(300);
      expect(Math.abs(rect.left + rect.width / 2 - (PANEL.left + PANEL.width / 2))).to.be.below(2);
      expect(Math.abs(rect.top + rect.height / 2 - (PANEL.top + PANEL.height / 2))).to.be.below(2);
      const backdrop = root.querySelector('ef-overlay-backdrop').getBoundingClientRect();
      expect([backdrop.left, backdrop.top, backdrop.width, backdrop.height]).to.deep.equal([
        PANEL.left,
        PANEL.top,
        PANEL.width,
        PANEL.height
      ]);
    });

    it('stays centered after the panel is resized', async function () {
      host.style.width = `${PANEL.width + 100}px`;
      await nextFrame(6);
      const rect = dialog.getBoundingClientRect();
      expect(Math.abs(rect.left + rect.width / 2 - (PANEL.left + (PANEL.width + 100) / 2))).to.be.below(2);
    });

    it('confirms with a pointer press on OK', async function () {
      const ok = dialog.shadowRoot.querySelector('[part=default-button][cta]');
      const confirmed = oneEvent(dialog, 'confirm');
      await sendMouse({ type: 'click', position: Object.values(centerOf(ok)) });
      await confirmed;
      expect(dialog.opened).to.equal(false);
    });

    it('cancels with a pointer press on Cancel', async function () {
      const cancel = dialog.shadowRoot.querySelector('[part=default-button]:not([cta])');
      const cancelled = oneEvent(dialog, 'cancel');
      await sendMouse({ type: 'click', position: Object.values(centerOf(cancel)) });
      await cancelled;
      expect(dialog.opened).to.equal(false);
    });

    it('cancels with Escape', async function () {
      dialog.focus();
      const cancelled = oneEvent(dialog, 'cancel');
      await sendKeys({ press: 'Escape' });
      await cancelled;
      expect(dialog.opened).to.equal(false);
    });
  });
});
