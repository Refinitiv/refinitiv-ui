import { elementUpdated, expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/sub-overlay';

const width = 100;
const height = 100;

const getPosition = (el) => {
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;
  const elRect = el.getBoundingClientRect();

  const top = elRect.top;
  const bottom = elRect.bottom;
  const left = elRect.left;
  const right = elRect.right;

  return {
    top: top === 0,
    bottom: bottom - screenHeight < 1, /* this is to cover fractional pixels */
    left: left === 0,
    right: right - screenWidth < 1,
    centreH: left - screenWidth / 2 - width / 2 < 1,
    centreV: top - screenHeight / 2 - height / 2 < 1
  };
};

const centerCenter = async el => {
  await nextFrame();
  const position = getPosition(el);
  expect(position.centreV, 'Overlay is not at center vertically').to.equal(true);
  expect(position.centreH, 'Overlay is not at center horizontally').to.equal(true);
};

const topLeft = async el => {
  await nextFrame();
  const position = getPosition(el);
  expect(position.top, 'Overlay is not at top').to.equal(true);
  expect(position.left, 'Overlay is not at left').to.equal(true);
};

const topCenter = async el => {
  const position = getPosition(el);
  expect(position.top, 'Overlay is not at top').to.equal(true);
  expect(position.centreH, 'Overlay is not at center horizontally').to.equal(true);
};

const topRight = async el => {
  await nextFrame();
  const position = getPosition(el);
  expect(position.top, 'Overlay is not at top').to.equal(true);
  expect(position.right, 'Overlay is not at right').to.equal(true);
};

const leftCenter = async el => {
  await nextFrame();
  const position = getPosition(el);
  expect(position.centreV, 'Overlay is not at center vertically').to.equal(true);
  expect(position.left, 'Overlay is not at left').to.equal(true);
};

const rightCenter = async el => {
  await nextFrame();
  const position = getPosition(el);
  expect(position.centreV, 'Overlay is not at center vertically').to.equal(true);
  expect(position.right, 'Overlay is not at right').to.equal(true);
};

const bottomLeft = async el => {
  await nextFrame();
  const position = getPosition(el);
  expect(position.bottom, 'Overlay is not at bottom').to.equal(true);
  expect(position.left, 'Overlay is not at left').to.equal(true);
};

const bottomCenter = async el => {
  await nextFrame();
  const position = getPosition(el);
  expect(position.bottom, 'Overlay is not at bottom').to.equal(true);
  expect(position.centreH, 'Overlay is not at center horizontally').to.equal(true);
};

const bottomRight = async el => {
  await nextFrame();
  const position = getPosition(el);
  expect(position.bottom, 'Overlay is not at bottom').to.equal(true);
  expect(position.right, 'Overlay is not at right').to.equal(true);
};

const withHeightStyle = `style="width: ${width}px; height: ${height}px;"`;

describe('overlay/Position', () => {
  describe('Position Target Screen Test', () => {
    it('Default Screen Position Target', async () => {
      await centerCenter(await fixture(`<ds-sub-overlay ${withHeightStyle} opened>Default Position</ds-sub-overlay>`));
    });

    it('Invalid Screen Position Target', async () => {
      await centerCenter(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="invalid position">Invalid Position</ds-sub-overlay>`));
    });

    it('Screen Position Target: center center', async () => {
      await centerCenter(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="center center">Center Center</ds-sub-overlay>`));
    });

    it('Screen Position Target: center', async () => {
      await centerCenter(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="center">Center</ds-sub-overlay>`));
    });

    it('Screen Position Target: top', async () => {
      await topCenter(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="top">Top</ds-sub-overlay>`));
    });

    it('Screen Position Target: right', async () => {
      await rightCenter(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="right">Right</ds-sub-overlay>`));
    });

    it('Screen Position Target: bottom', async () => {
      await bottomCenter(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="bottom">Bottom</ds-sub-overlay>`));
    });

    it('Screen Position Target: left', async () => {
      await leftCenter(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="left">Left</ds-sub-overlay>`));
    });

    it('Screen Position Target: top left', async () => {
      await topLeft(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="top left">Top Left</ds-sub-overlay>`));
    });

    it('Screen Position Target: left top', async () => {
      await topLeft(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="left top">Left Top</ds-sub-overlay>`));
    });

    it('Screen Position Target: top center', async () => {
      await topCenter(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="top center">Top Center</ds-sub-overlay>`));
    });

    it('Screen Position Target: center top', async () => {
      await topCenter(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="center top">Center Top</ds-sub-overlay>`));
    });

    it('Screen Position Target: top right', async () => {
      await topRight(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="top right">Top Right</ds-sub-overlay>`));
    });

    it('Screen Position Target: right top', async () => {
      await topRight(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="right top">Right Top</ds-sub-overlay>`));
    });

    it('Screen Position Target: bottom left', async () => {
      await bottomLeft(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="bottom left">Bottom Left</ds-sub-overlay>`));
    });

    it('Screen Position Target: left bottom', async () => {
      await bottomLeft(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="left bottom">Left Bottom</ds-sub-overlay>`));
    });

    it('Screen Position Target: bottom center', async () => {
      await bottomCenter(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="bottom center">Bottom Center</ds-sub-overlay>`));
    });

    it('Screen Position Target: center bottom', async () => {
      await bottomCenter(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="center bottom">Center Bottom</ds-sub-overlay>`));
    });

    it('Screen Position Target: bottom right', async () => {
      await bottomRight(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="bottom right">Bottom Right</ds-sub-overlay>`));
    });

    it('Screen Position Target: right bottom', async () => {
      await bottomRight(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="right bottom">Right Bottom</ds-sub-overlay>`));
    });

    it('Screen Position Target: center left', async () => {
      await leftCenter(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="center left">Center Left</ds-sub-overlay>`));
    });

    it('Screen Position Target: left center', async () => {
      await leftCenter(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="left center">Left Center</ds-sub-overlay>`));
    });

    it('Screen Position Target: center right', async () => {
      await rightCenter(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="center right">Center Right</ds-sub-overlay>`));
    });

    it('Screen Position Target: right center', async () => {
      await rightCenter(await fixture(`<ds-sub-overlay ${withHeightStyle} opened position-target="right center">Right Center</ds-sub-overlay>`));
    });

    it('Screen Position Target: position can be changed', async () => {
      const el = await fixture(`<ds-sub-overlay ${withHeightStyle} opened>Changed Position</ds-sub-overlay>`);
      await centerCenter(el);
      let rect = el.getBoundingClientRect();
      expect(rect.width, 'dynamic position 0: width must not change').to.equal(100);
      expect(rect.width, 'dynamic position 0: height must not change').to.equal(100);

      el.positionTarget = 'top right';
      await elementUpdated(el);
      await topRight(el);
      rect = el.getBoundingClientRect();
      expect(rect.width, 'dynamic position 1: width must not change').to.equal(100);
      expect(rect.width, 'dynamic position 1: height must not change').to.equal(100);

      el.positionTarget = 'bottom left';
      await elementUpdated(el);
      await bottomLeft(el);
      rect = el.getBoundingClientRect();
      expect(rect.width, 'dynamic position 2: width must not change').to.equal(100);
      expect(rect.width, 'dynamic position 2: height must not change').to.equal(100);
    });
  });

  describe('Position Test', () => {
    it('Default Position', async () => {
      const wrapper = await fixture(`<div>
      <button>Target</button>
      <ds-sub-overlay>Overlay</ds-sub-overlay>
    </div>`);

      const target = wrapper.querySelector('button');
      const overlay = wrapper.querySelector('ds-sub-overlay');

      overlay.positionTarget = target;
      overlay.opened = true;
      await elementUpdated(overlay);
    });

  });
});
