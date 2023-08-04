import { createSandbox } from 'sinon';

import { expect, fixture, isNear, nextFrame, replaceWhitespace } from '../lib/test-helpers.js';

describe('TestHelpersTest', function () {
  beforeEach(async function () {
    await fixture('<div></div>');
  });

  describe('Test nextFrame helper', function () {
    let sandbox;

    before(function () {
      sandbox = createSandbox();
    });

    beforeEach(function () {
      sandbox.spy(window, 'requestAnimationFrame');
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('Calling nextFrame without param', async function () {
      await nextFrame();
      expect(window.requestAnimationFrame.calledOnce).to.equal(
        true,
        'requestAnimationFrame should be called once'
      );
    });
    it('Calling nextFrame with 1 as param', async function () {
      await nextFrame(1);
      expect(window.requestAnimationFrame.calledOnce).to.equal(
        true,
        'requestAnimationFrame should be called once'
      );
    });
    it('Calling nextFrame with 2 as param', async function () {
      await nextFrame(2);
      expect(window.requestAnimationFrame.calledTwice).to.equal(
        true,
        'requestAnimationFrame should be called twice'
      );
    });
  });

  describe('Test isNear helper', function () {
    it('Calling isNear with numbers & distance', function () {
      expect(isNear(10, 10, 0)).to.equal(true, 'isNear at boundary distance of 0 should be true');
      expect(isNear(10, 10.1, 0)).to.equal(false, 'isNear beyond boundary distance of 0 should be false');
      expect(isNear(10, 14.9, 5)).to.equal(
        true,
        'isNear within boundary distance greater than 0 should be true'
      );
      expect(isNear(10, 15, 5)).to.equal(true, 'isNear at boundary distance greater than 0 should be true');
      expect(isNear(10, 15.1, 5)).to.equal(
        false,
        'isNear beyond boundary distance greater than 0 should be true'
      );
    });

    it('Calling isNear with numbers, distance & inclusive as true', function () {
      expect(isNear(10, 10, 0, true)).to.equal(true, 'isNear at boundary distance of 0 should be true');
      expect(isNear(10, 10.1, 0, true)).to.equal(
        false,
        'isNear beyond boundary distance of 0 should be false'
      );
      expect(isNear(10, 14.9, 5, true)).to.equal(
        true,
        'isNear within boundary distance greater than 0 should be true'
      );
      expect(isNear(10, 15, 5, true)).to.equal(
        true,
        'isNear at boundary distance greater than 0 should be true'
      );
      expect(isNear(10, 15.1, 5, true)).to.equal(
        false,
        'isNear beyond boundary distance greater than 0 should be true'
      );
    });

    it('Calling isNear with numbers, distance & inclusive as false', function () {
      expect(isNear(10, 10, 0, false)).to.equal(true, 'isNear at boundary distance of 0 should be true');
      expect(isNear(10, 10.1, 0, false)).to.equal(
        false,
        'isNear beyond boundary distance of 0 should be false'
      );
      expect(isNear(10, 14.9, 5, false)).to.equal(
        true,
        'isNear within boundary distance greater than 0 should be true'
      );
      expect(isNear(10, 15, 5, false)).to.equal(
        false,
        'isNear at boundary distance greater than 0 should be true'
      );
      expect(isNear(10, 15.1, 5, false)).to.equal(
        false,
        'isNear beyond boundary distance greater than 0 should be true'
      );
    });
  });

  describe('Test Method helper', function () {
    it('Replace spacial whitespace to normal whitespace correctly', function () {
      // Remove whitespace character U+202F from Chrome 111 and U+00A0 from Safari
      const specialWhitespace = '  ';
      expect(replaceWhitespace(specialWhitespace)).to.equal('  ', 'Remove whitespace should work correctly');
    });
  });

  describe('test ResizeObserver loop handler', function () {
    it('Convert resize-observer errors to warnings', function () {
      const message = 'ResizeObserver loop completed with undelivered notifications';
      window.dispatchEvent(
        new ErrorEvent('error', {
          message,
          error: new Error(message)
        })
      );

      // the test should run until the end with a passed result
      expect(message).to.equal(message);
    });
  });
});
