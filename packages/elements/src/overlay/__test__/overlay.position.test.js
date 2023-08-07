import '@refinitiv-ui/elements/overlay';

import '@refinitiv-ui/elemental-theme/light/ef-overlay';
import { elementUpdated, expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';

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
    bottom: bottom - screenHeight < 1 /* this is to cover fractional pixels in IE */,
    left: left === 0,
    right: right - screenWidth < 1,
    centreH: left - screenWidth / 2 - width / 2 < 1,
    centreV: top - screenHeight / 2 - height / 2 < 1
  };
};

const centerCenter = async (el) => {
  await nextFrame();
  const position = getPosition(el);
  expect(position.centreV, 'Overlay is not at center vertically').to.equal(true);
  expect(position.centreH, 'Overlay is not at center horizontally').to.equal(true);
};

const topLeft = async (el) => {
  await nextFrame();
  const position = getPosition(el);
  expect(position.top, 'Overlay is not at top').to.equal(true);
  expect(position.left, 'Overlay is not at left').to.equal(true);
};

const topCenter = (el) => {
  const position = getPosition(el);
  expect(position.top, 'Overlay is not at top').to.equal(true);
  expect(position.centreH, 'Overlay is not at center horizontally').to.equal(true);
};

const topRight = async (el) => {
  await nextFrame();
  const position = getPosition(el);
  expect(position.top, 'Overlay is not at top').to.equal(true);
  expect(position.right, 'Overlay is not at right').to.equal(true);
};

const leftCenter = async (el) => {
  await nextFrame();
  const position = getPosition(el);
  expect(position.centreV, 'Overlay is not at center vertically').to.equal(true);
  expect(position.left, 'Overlay is not at left').to.equal(true);
};

const rightCenter = async (el) => {
  await nextFrame();
  const position = getPosition(el);
  expect(position.centreV, 'Overlay is not at center vertically').to.equal(true);
  expect(position.right, 'Overlay is not at right').to.equal(true);
};

const bottomLeft = async (el) => {
  await nextFrame();
  const position = getPosition(el);
  expect(position.bottom, 'Overlay is not at bottom').to.equal(true);
  expect(position.left, 'Overlay is not at left').to.equal(true);
};

const bottomCenter = async (el) => {
  await nextFrame();
  const position = getPosition(el);
  expect(position.bottom, 'Overlay is not at bottom').to.equal(true);
  expect(position.centreH, 'Overlay is not at center horizontally').to.equal(true);
};

const bottomRight = async (el) => {
  await nextFrame();
  const position = getPosition(el);
  expect(position.bottom, 'Overlay is not at bottom').to.equal(true);
  expect(position.right, 'Overlay is not at right').to.equal(true);
};

const withHeightStyle = `style="width: ${width}px; height: ${height}px;"`;

describe('overlay/Position', function () {
  describe('Position Target Screen Test', function () {
    it('Default Screen Position Target', async function () {
      await centerCenter(
        await fixture(`<ef-overlay ${withHeightStyle} opened>Default Position</ef-overlay>`)
      );
    });

    it('Invalid Screen Position Target', async function () {
      await centerCenter(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="invalid position">Invalid Position</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: center center', async function () {
      await centerCenter(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="center center">Center Center</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: center', async function () {
      await centerCenter(
        await fixture(`<ef-overlay ${withHeightStyle} opened position-target="center">Center</ef-overlay>`)
      );
    });

    it('Screen Position Target: top', async function () {
      await topCenter(
        await fixture(`<ef-overlay ${withHeightStyle} opened position-target="top">Top</ef-overlay>`)
      );
    });

    it('Screen Position Target: right', async function () {
      await rightCenter(
        await fixture(`<ef-overlay ${withHeightStyle} opened position-target="right">Right</ef-overlay>`)
      );
    });

    it('Screen Position Target: bottom', async function () {
      await bottomCenter(
        await fixture(`<ef-overlay ${withHeightStyle} opened position-target="bottom">Bottom</ef-overlay>`)
      );
    });

    it('Screen Position Target: left', async function () {
      await leftCenter(
        await fixture(`<ef-overlay ${withHeightStyle} opened position-target="left">Left</ef-overlay>`)
      );
    });

    it('Screen Position Target: top left', async function () {
      await topLeft(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="top left">Top Left</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: left top', async function () {
      await topLeft(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="left top">Left Top</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: top center', async function () {
      await topCenter(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="top center">Top Center</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: center top', async function () {
      await topCenter(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="center top">Center Top</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: top right', async function () {
      await topRight(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="top right">Top Right</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: right top', async function () {
      await topRight(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="right top">Right Top</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: bottom left', async function () {
      await bottomLeft(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="bottom left">Bottom Left</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: left bottom', async function () {
      await bottomLeft(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="left bottom">Left Bottom</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: bottom center', async function () {
      await bottomCenter(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="bottom center">Bottom Center</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: center bottom', async function () {
      await bottomCenter(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="center bottom">Center Bottom</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: bottom right', async function () {
      await bottomRight(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="bottom right">Bottom Right</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: right bottom', async function () {
      await bottomRight(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="right bottom">Right Bottom</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: center left', async function () {
      await leftCenter(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="center left">Center Left</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: left center', async function () {
      await leftCenter(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="left center">Left Center</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: center right', async function () {
      await rightCenter(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="center right">Center Right</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: right center', async function () {
      await rightCenter(
        await fixture(
          `<ef-overlay ${withHeightStyle} opened position-target="right center">Right Center</ef-overlay>`
        )
      );
    });

    it('Screen Position Target: position can be changed', async function () {
      const el = await fixture(`<ef-overlay ${withHeightStyle} opened>Changed Position</ef-overlay>`);
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

  describe('Position Test', function () {
    it('Default Position', async function () {
      const wrapper = await fixture(`<div>
      <button>Target</button>
      <ef-overlay>Overlay</ef-overlay>
    </div>`);

      const target = wrapper.querySelector('button');
      const overlay = wrapper.querySelector('ef-overlay');

      overlay.positionTarget = target;
      overlay.opened = true;
      await elementUpdated(overlay);
    });
  });
});
