import { elementUpdated, expect, fixture, nextFrame, isNear } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/overlay';
import '@refinitiv-ui/elemental-theme/light/ef-overlay';

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
    bottom: isNear(bottom, screenHeight, 1, true), /* this is to cover fractional pixels */
    left: left === 0,
    right: isNear(right, screenWidth, 1, true),
    centreH: isNear(left, (screenWidth - width) / 2, 1, true),
    centreV: isNear(top, (screenHeight - height) / 2, 1, true),
    debug: { // debug object used in tandem with debug()
      top,
      bottom,
      left,
      right,
      screenHeight,
      screenWidth
    }
  };
};

/**
 * use for unit test debugging
 * log position object returned by getPosition() if either of the position boolean is false
 * @param {'top' | 'bottom' | 'left' | 'right' | 'centerH' | 'centerV'} a position name returned by getPosition()
 * @param {'top' | 'bottom' | 'left' | 'right' | 'centerH' | 'centerV'} b position name returned by getPosition()
 * @param {*} _position returned object of getPosition()
 */
const debug = (a, b, _position) => {
    if (!_position[a] || !_position[b]) {
    const position = _position.debug;
    console.warn(`testing: ${a},${b}`);
    console.warn({position});
  }
}

const centerCenter = async el => {
  await nextFrame(4); // BrowserStack need quite a number of frames to complete rendering
  const position = getPosition(el);
  debug('centreV', 'centreH', position);
  expect(position.centreV, 'Overlay is not at center vertically').to.equal(true);
  expect(position.centreH, 'Overlay is not at center horizontally').to.equal(true);
};

const topLeft = async el => {
  await nextFrame(4); // BrowserStack need quite a number of frames to complete rendering
  const position = getPosition(el);
  debug('top', 'left', position);
  expect(position.top, 'Overlay is not at top').to.equal(true);
  expect(position.left, 'Overlay is not at left').to.equal(true);
};

const topCenter = async el => {
  await nextFrame(4); // BrowserStack need quite a number of frames to complete rendering
  const position = getPosition(el);
  debug('top', 'centreH', position);
  expect(position.top, 'Overlay is not at top').to.equal(true);
  expect(position.centreH, 'Overlay is not at center horizontally').to.equal(true);
};

const topRight = async el => {
  await nextFrame(4); // BrowserStack need quite a number of frames to complete rendering
  const position = getPosition(el);
  debug('top', 'right', position);
  expect(position.top, 'Overlay is not at top').to.equal(true);
  expect(position.right, 'Overlay is not at right').to.equal(true);
};

const leftCenter = async el => {
  await nextFrame(4); // BrowserStack need quite a number of frames to complete rendering
  const position = getPosition(el);
  debug('centreV', 'left', position);
  expect(position.centreV, 'Overlay is not at center vertically').to.equal(true);
  expect(position.left, 'Overlay is not at left').to.equal(true);
};

const rightCenter = async el => {
  await nextFrame(4); // BrowserStack need quite a number of frames to complete rendering
  const position = getPosition(el);
  debug('centreV', 'right', position);
  expect(position.centreV, 'Overlay is not at center vertically').to.equal(true);
  expect(position.right, 'Overlay is not at right').to.equal(true);
};

const bottomLeft = async el => {
  await nextFrame(4); // BrowserStack need quite a number of frames to complete rendering
  const position = getPosition(el);
  debug('bottom', 'left', position);
  expect(position.bottom, 'Overlay is not at bottom').to.equal(true);
  expect(position.left, 'Overlay is not at left').to.equal(true);
};

const bottomCenter = async el => {
  await nextFrame(4); // BrowserStack need quite a number of frames to complete rendering
  const position = getPosition(el);
  debug('bottom', 'centreH', position);
  expect(position.bottom, 'Overlay is not at bottom').to.equal(true);
  expect(position.centreH, 'Overlay is not at center horizontally').to.equal(true);
};

const bottomRight = async el => {
  await nextFrame(4); // BrowserStack need quite a number of frames to complete rendering
  const position = getPosition(el);
  debug('bottom', 'right', position);
  expect(position.bottom, 'Overlay is not at bottom').to.equal(true);
  expect(position.right, 'Overlay is not at right').to.equal(true);
};

const withHeightStyle = `style="width: ${width}px; height: ${height}px;"`;

describe('overlay/Position', () => {
  describe('Position Target Screen Test', () => {
    it('Default Screen Position Target', async () => {
      await centerCenter(await fixture(`<ef-overlay ${withHeightStyle} opened>Default Position</ef-overlay>`));
    });

    it('Invalid Screen Position Target', async () => {
      await centerCenter(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="invalid position">Invalid Position</ef-overlay>`));
    });

    it('Screen Position Target: center center', async () => {
      await centerCenter(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="center center">Center Center</ef-overlay>`));
    });

    it('Screen Position Target: center', async () => {
      await centerCenter(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="center">Center</ef-overlay>`));
    });

    it('Screen Position Target: top', async () => {
      await topCenter(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="top">Top</ef-overlay>`));
    });

    it('Screen Position Target: right', async () => {
      await rightCenter(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="right">Right</ef-overlay>`));
    });

    it('Screen Position Target: bottom', async () => {
      await bottomCenter(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="bottom">Bottom</ef-overlay>`));
    });

    it('Screen Position Target: left', async () => {
      await leftCenter(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="left">Left</ef-overlay>`));
    });

    it('Screen Position Target: top left', async () => {
      await topLeft(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="top left">Top Left</ef-overlay>`));
    });

    it('Screen Position Target: left top', async () => {
      await topLeft(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="left top">Left Top</ef-overlay>`));
    });

    it('Screen Position Target: top center', async () => {
      await topCenter(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="top center">Top Center</ef-overlay>`));
    });

    it('Screen Position Target: center top', async () => {
      await topCenter(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="center top">Center Top</ef-overlay>`));
    });

    it('Screen Position Target: top right', async () => {
      await topRight(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="top right">Top Right</ef-overlay>`));
    });

    it('Screen Position Target: right top', async () => {
      await topRight(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="right top">Right Top</ef-overlay>`));
    });

    it('Screen Position Target: bottom left', async () => {
      await bottomLeft(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="bottom left">Bottom Left</ef-overlay>`));
    });

    it('Screen Position Target: left bottom', async () => {
      await bottomLeft(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="left bottom">Left Bottom</ef-overlay>`));
    });

    it('Screen Position Target: bottom center', async () => {
      await bottomCenter(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="bottom center">Bottom Center</ef-overlay>`));
    });

    it('Screen Position Target: center bottom', async () => {
      await bottomCenter(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="center bottom">Center Bottom</ef-overlay>`));
    });

    it('Screen Position Target: bottom right', async () => {
      await bottomRight(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="bottom right">Bottom Right</ef-overlay>`));
    });

    it('Screen Position Target: right bottom', async () => {
      await bottomRight(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="right bottom">Right Bottom</ef-overlay>`));
    });

    it('Screen Position Target: center left', async () => {
      await leftCenter(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="center left">Center Left</ef-overlay>`));
    });

    it('Screen Position Target: left center', async () => {
      await leftCenter(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="left center">Left Center</ef-overlay>`));
    });

    it('Screen Position Target: center right', async () => {
      await rightCenter(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="center right">Center Right</ef-overlay>`));
    });

    it('Screen Position Target: right center', async () => {
      await rightCenter(await fixture(`<ef-overlay ${withHeightStyle} opened position-target="right center">Right Center</ef-overlay>`));
    });

    it('Screen Position Target: position can be changed', async () => {
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

  describe('Position Test', () => {
    it('Default Position', async () => {
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
