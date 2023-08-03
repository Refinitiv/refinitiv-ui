import { createSandbox, restore, spy } from 'sinon';

import '@refinitiv-ui/elements/overlay';

import '@refinitiv-ui/elemental-theme/light/ef-overlay';
import { elementUpdated, expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';

import {
  ZIndex,
  ZIndexManager,
  clear,
  deregister,
  getOverlayLayers,
  getOverlays,
  register,
  size,
  toFront
} from '../../../../lib/overlay/managers/zindex-manager.js';
import { openedUpdated } from './../mocks/helper.js';

const createFixture = (zIndex) => {
  return typeof zIndex === 'undefined'
    ? fixture('<ef-overlay opened>test</ef-overlay>')
    : fixture(`<ef-overlay z-index="${zIndex}" opened>test</ef-overlay>`);
};

describe('overlay/manager/ZIndexManager', function () {
  describe('ZIndex Manager', function () {
    let manager = {};

    before(function () {
      createSandbox();
    });

    beforeEach(async function () {
      clear();
      await nextFrame();

      manager.register = spy(ZIndexManager.prototype, 'register');
      manager.deregister = spy(ZIndexManager.prototype, 'deregister');
      manager.clear = spy(ZIndexManager.prototype, 'clear');
      manager.size = spy(ZIndexManager.prototype, 'size');
      manager.toFront = spy(ZIndexManager.prototype, 'toFront');
      manager.getOverlays = spy(ZIndexManager.prototype, 'getOverlays');
      manager.getOverlayLayers = spy(ZIndexManager.prototype, 'getOverlayLayers');
    });

    afterEach(async function () {
      restore();
      await nextFrame();
    });

    describe('Test register method', function () {
      describe('Test add one element', function () {
        it('Test zIndex=undefined', async function () {
          const element = await createFixture();

          expect(manager.register).to.have.callCount(1).calledWith(element);
          expect(size()).to.equal(1, 'after adding size of registry should be 1');
          expect(element.zIndex).to.equal(undefined, 'element zIndex should not be changed');
          expect(Number(element.style.zIndex)).to.equal(
            ZIndex,
            'element style z-index should be initial ZIndex ' + ZIndex
          );
        });

        it('Test zIndex=100', async function () {
          const initialZIndex = 100;
          const element = await createFixture(initialZIndex);

          expect(manager.register).to.have.callCount(1).calledWith(element);
          expect(size()).to.equal(1, 'after adding size of registry should be 1');
          expect(element.zIndex).to.equal(initialZIndex, 'element zIndex should not be changed');
          expect(Number(element.style.zIndex)).to.equal(
            initialZIndex,
            'first element style z-index should be initial element zIndex ' + initialZIndex
          );
        });
      });

      describe('Test adding two elements behavior', function () {
        it('Test zIndex=(undefined, undefined)', async function () {
          const element = await createFixture();
          const element2 = await createFixture();

          expect(manager.register).to.have.callCount(2);
          expect(size()).to.equal(2, 'size should be 2');
          expect(element.zIndex).to.equal(undefined, 'element zIndex should not be changed');
          expect(element2.zIndex).to.equal(undefined, 'element zIndex should not be changed');

          expect(Number(element.style.zIndex)).to.equal(
            ZIndex,
            'element style z-index should be initial ZIndex ' + ZIndex
          );
          expect(Number(element2.style.zIndex)).to.equal(
            ZIndex + 2,
            'element style z-index should be initial ZIndex + 2 ' + Number(ZIndex + 2)
          );
        });

        it('Test zIndex=(100, undefined)', async function () {
          const initialZIndex = 100;
          const element = await createFixture(100);
          const element2 = await createFixture();

          expect(size()).to.equal(2, 'size should be 2');
          expect(element.zIndex).to.equal(initialZIndex, 'element zIndex should not be changed');
          expect(element2.zIndex).to.equal(undefined, 'element zIndex should not be changed');

          expect(Number(element.style.zIndex)).to.equal(
            initialZIndex,
            'element style z-index should be initial element zIndex ' + initialZIndex
          );
          expect(Number(element2.style.zIndex)).to.equal(
            initialZIndex + 2,
            'element style z-index should be first element zIndex + 2 ' + Number(initialZIndex + 2)
          );
        });

        it('Test zIndex=(100,200)', async function () {
          const initialZIndex = 100;
          const initialZIndex2 = 200;

          const element = await createFixture(initialZIndex);
          const element2 = await createFixture(initialZIndex2);

          expect(size()).to.equal(2, 'size should be 2');
          expect(element.zIndex).to.equal(initialZIndex, 'element zIndex should not be changed');
          expect(element2.zIndex).to.equal(initialZIndex2, 'element zIndex should not be changed');

          expect(Number(element.style.zIndex)).to.equal(
            initialZIndex,
            'element style z-index should be initial element zIndex ' + initialZIndex
          );
          expect(Number(element2.style.zIndex)).to.equal(
            initialZIndex2,
            'element style z-index should be initial element zIndex ' + initialZIndex2
          );
        });

        it('Test zIndex=(200,100)', async function () {
          const initialZIndex = 200;
          const initialZIndex2 = 100;

          const element = await createFixture(initialZIndex);
          const element2 = await createFixture(initialZIndex2);

          expect(size()).to.equal(2, 'size should be 2');
          expect(element.zIndex).to.equal(initialZIndex, 'element zIndex should not be changed');
          expect(element2.zIndex).to.equal(initialZIndex2, 'element zIndex should not be changed');

          expect(Number(element.style.zIndex)).to.equal(
            initialZIndex,
            'element style z-index should be initial element zIndex ' + initialZIndex
          );
          expect(Number(element2.style.zIndex)).to.equal(
            initialZIndex + 2,
            'element style z-index should be first element zIndex + 2 ' + Number(initialZIndex + 2)
          );
        });

        it('Test zIndex=(undefined,100)', async function () {
          const initialZIndex2 = 100;

          const element = await createFixture();
          const element2 = await createFixture(initialZIndex2);

          expect(size()).to.equal(2, 'size should be 2');
          expect(element.zIndex).to.equal(undefined, 'element zIndex should not be changed');
          expect(element2.zIndex).to.equal(initialZIndex2, 'element zIndex should not be changed');

          expect(Number(element.style.zIndex)).to.equal(
            ZIndex,
            'element style z-index should be initial ZIndex ' + ZIndex
          );
          expect(Number(element2.style.zIndex)).to.equal(
            ZIndex + 2,
            'element style z-index should be first element zIndex + 2 ' + Number(ZIndex + 2)
          );
        });

        it('Test zIndex=(undefined,200)', async function () {
          const initialZIndex = undefined;
          const initialZIndex2 = 200;

          const element = await createFixture(initialZIndex);
          const element2 = await createFixture(initialZIndex2);

          expect(size()).to.equal(2, 'size should be 2');
          expect(element.zIndex).to.equal(initialZIndex, 'element zIndex should not be changed');
          expect(element2.zIndex).to.equal(initialZIndex2, 'element zIndex should not be changed');

          expect(Number(element.style.zIndex)).to.equal(
            ZIndex,
            'element style z-index should be initial ZIndex ' + ZIndex
          );
          expect(Number(element2.style.zIndex)).to.equal(
            initialZIndex2,
            'element style z-index should be initial element zIndex ' + initialZIndex2
          );
        });
      });

      describe('Test adding same element', function () {
        it('Test zIndex=(undefined->undefined)', async function () {
          const element = await createFixture();
          register(element);
          expect(manager.register).to.have.callCount(2);
          expect(Number(element.style.zIndex)).to.equal(
            ZIndex,
            'after second registration with undefined element zIndex style zIndex should not be changed'
          );
        });
        it('Test zIndex=(undefined->100)', async function () {
          const element = await createFixture();
          const newZIndex = ZIndex - 3;
          const registeredZIndex = element.style.zIndex;
          element.zIndex = newZIndex;
          await elementUpdated(element);
          register(element);
          expect(manager.register).to.have.callCount(2);
          expect(Number(element.style.zIndex)).to.equal(
            newZIndex,
            'after second registration with defined element zIndex style zIndex should be changed to new value'
          );
          expect(registeredZIndex).to.not.equal(newZIndex, 'new zIndex should not be equal to initial one');
        });
        it('Test zIndex=(100->100)', async function () {
          const initialZIndex = ZIndex - 3;
          const element = await createFixture(initialZIndex);
          register(element);
          expect(manager.register).to.have.callCount(2);
          expect(Number(element.style.zIndex)).to.equal(
            initialZIndex,
            'after second registration with defined element style zIndex should not be changed'
          );
        });
      });
    });

    describe('Test deregister method', function () {
      it('Test remove one element zIndex=undefined', async function () {
        const element = await createFixture();

        element.opened = false;
        await openedUpdated(element);

        expect(manager.deregister).to.have.callCount(1);
        expect(size()).to.equal(0, 'after removing size of registry should be 0');
        expect(element.zIndex).to.equal(undefined, 'element zIndex should not be changed');
        expect(Number(element.style.zIndex)).to.equal(
          ZIndex,
          'element style z-index should be initial ZIndex ' + ZIndex
        );
      });

      it('Test remove one element zIndex=100', async function () {
        const initialZIndex = 100;
        const element = await createFixture(initialZIndex);

        element.opened = false;
        await openedUpdated(element);

        expect(manager.deregister).to.have.callCount(1);
        expect(size()).to.equal(0, 'after removing size of registry should be 0');
        expect(element.zIndex).to.equal(initialZIndex, 'element zIndex should not be changed');
        expect(Number(element.style.zIndex)).to.equal(
          initialZIndex,
          'element style z-index should be initial element zIndex ' + initialZIndex
        );
      });

      it('Test remove two elements zIndex=(undefined,200)', async function () {
        const initialZIndex2 = 200;

        const element = await createFixture();
        const element2 = await createFixture(initialZIndex2);

        element.opened = false;
        await openedUpdated(element);
        element2.opened = false;
        await openedUpdated(element2);

        expect(manager.deregister).to.have.callCount(2).calledWith(element);
        expect(size()).to.equal(0, 'size should be 0');
        expect(element.zIndex).to.equal(undefined, 'element zIndex should not be changed');
        expect(element2.zIndex).to.equal(initialZIndex2, 'element zIndex should not be changed');

        expect(Number(element.style.zIndex)).to.equal(
          ZIndex,
          'element style z-index should be initial ZIndex ' + ZIndex
        );
        expect(Number(element2.style.zIndex)).to.equal(
          initialZIndex2,
          'element style z-index should be initial ' + initialZIndex2
        );
      });

      it('Test deregister not registered element', async function () {
        const element = await fixture('<ef-overlay>test</ef-overlay>');
        const initialZIndex = element.zIndex;
        const initialStyleZIndex = element.style.zIndex;

        deregister(element);

        expect(manager.deregister).to.have.callCount(1).calledWith(element);
        expect(size()).to.equal(0, 'after deregister not existing component size should not be changed');
        expect(element.zIndex).to.equal(initialZIndex, 'element zIndex should not be changed');
        expect(element.style.zIndex).to.equal(
          initialStyleZIndex,
          'element style z-index should not be changed'
        );
      });

      it('Test deregister already deregistered element', async function () {
        const element = await createFixture();

        element.opened = false;
        await openedUpdated(element);

        deregister(element);

        expect(manager.deregister).to.have.callCount(2).calledWith(element);
        expect(size()).to.equal(0, 'after deregister not existing component size should not be changed');
        expect(element.zIndex).to.equal(undefined, 'element zIndex should not be changed');
        expect(Number(element.style.zIndex)).to.equal(
          ZIndex,
          'element style z-index should be initial ZIndex ' + ZIndex
        );
      });
    });

    describe('Test clear method', function () {
      it('Test clear one element zIndex=undefined', async function () {
        const element = await createFixture();
        clear();
        expect(size()).to.equal(0, 'after removing size of registry should be 0');
        expect(element.zIndex).to.equal(undefined, 'element zIndex should not be changed');
        expect(Number(element.style.zIndex)).to.equal(
          ZIndex,
          'element style z-index should be initial ZIndex ' + ZIndex
        );
      });

      it('Test clear one element with zIndex=100', async function () {
        const initialZIndex = 100;
        const element = await createFixture(initialZIndex);

        clear();

        expect(manager.clear).to.have.callCount(1);
        expect(size()).to.equal(0, 'after removing size of registry should be 0');
        expect(element.zIndex).to.equal(initialZIndex, 'element zIndex should not be changed');
        expect(Number(element.style.zIndex)).to.equal(
          initialZIndex,
          'element style z-index should be initial element zIndex ' + initialZIndex
        );
      });

      it('Test clear two elements zIndex=(undefined,200)', async function () {
        const initialZIndex2 = 200;
        const element = await createFixture();
        const element2 = await createFixture(initialZIndex2);

        clear();

        expect(manager.clear).to.have.callCount(1);
        expect(size()).to.equal(0, 'size should be 0');
        expect(element.zIndex).to.equal(undefined, 'element zIndex should not be changed');
        expect(element2.zIndex).to.equal(initialZIndex2, 'element zIndex should not be changed');

        expect(Number(element.style.zIndex)).to.equal(
          ZIndex,
          'element style z-index should be initial ZIndex ' + ZIndex
        );
        expect(Number(element2.style.zIndex)).to.equal(
          initialZIndex2,
          'element style z-index should be initial zIndex ' + initialZIndex2
        );
      });
    });

    describe('Test toFront', function () {
      it('Test not registered element', async function () {
        const element = await fixture('<ef-overlay></ef-overlay>');

        toFront(element);

        expect(manager.toFront).to.have.callCount(1);
        // expect(size()).to.equal(0, 'Not registered element should not affect manager');
        expect(element.zIndex).to.equal(undefined, 'Initial element zIndex property should not be changed');
        // expect(element.style.zIndex).to.equal(initialStyleZIndex, 'Initial element zIndex style should not be changed');
      });
      it('Test same element', async function () {
        const element = await createFixture();

        toFront(element);

        expect(size()).to.equal(1, 'toFront should not change elements count in registry');
        expect(element.zIndex).to.equal(undefined, 'Initial element zIndex property should not be changed');
        expect(Number(element.style.zIndex)).to.equal(
          ZIndex,
          'Initial element zIndex style should not be changed'
        );
      });
      it('Test two elements', async function () {
        const initialZIndex2 = 200;
        const element = await createFixture();
        const element2 = await createFixture(initialZIndex2);

        toFront(element);

        expect(size()).to.equal(2, 'toFront should not change elements count in registry');
        expect(element.zIndex).to.equal(undefined, 'Initial element zIndex property should not be changed');
        expect(Number(element.style.zIndex)).to.equal(
          initialZIndex2 + 2,
          'Initial element zIndex style should be changed to top zIndex + 2'
        );
        expect(element2.zIndex).to.equal(initialZIndex2, 'element zIndex should not be changed');
        expect(Number(element2.style.zIndex)).to.equal(
          initialZIndex2,
          'element style z-index should not be changed: ' + initialZIndex2
        );
      });
    });

    describe('Test getOverlays', function () {
      it('Test with empty manager', function () {
        const overlays = getOverlays();

        // expect(manager.getOverlays).to.have.callCount(1);
        expect(overlays.length).to.equal(0, 'Overlays should be empty array while manager is empty');
        expect(size()).to.equal(0, 'manager registry should not be affected');
      });
      it('Test with one element', async function () {
        const element = await createFixture();

        const overlays = getOverlayLayers();

        // once on focus + one time direct call
        // expect(manager.getOverlays).to.have.callCount(2);
        expect(overlays.length).to.equal(1, 'should return array with one element');
        expect(overlays[0].overlay).to.equal(element, 'returned element should contain registered element');
        expect(overlays[0].zIndex).to.equal(ZIndex, 'returned element should have initial ZIndex');
        expect(size()).to.equal(1, 'manager registry should not be affected');
      });
      it('Test with two elements', async function () {
        const element = await createFixture();
        const element2 = await createFixture();

        const overlays = getOverlayLayers();

        // once on focus first element + twice on focus second element + one time direct call
        // expect(manager.getOverlays).to.have.callCount(4);
        expect(overlays.length).to.equal(2, 'should return array with one element');
        expect(overlays[0].overlay).to.equal(
          element2,
          'first returned element should contain second registered element'
        );
        expect(overlays[0].zIndex).to.equal(
          ZIndex + 2,
          'first returned element should have initial ZIndex + 2 ' + Number(ZIndex + 2)
        );
        expect(overlays[1].overlay).to.equal(
          element,
          'second returned element should contain first registered element'
        );
        expect(overlays[1].zIndex).to.equal(
          ZIndex,
          'second returned element should have initial ZIndex ' + ZIndex
        );
        expect(size()).to.equal(2, 'manager registry should not be affected');
      });
      it('Test with two elements and change first zIndex=200', async function () {
        const element = await createFixture();
        const element2 = await createFixture();

        element.zIndex = 200;
        await elementUpdated(element);
        register(element);

        const overlays = getOverlayLayers();

        // once on focus first element + twice on focus second element + one time direct call
        // expect(manager.getOverlays).to.have.callCount(4);
        expect(overlays.length).to.equal(2, 'should return array with one element');
        expect(overlays[0].overlay).to.equal(
          element,
          'first returned element should contain element with highest zIndex'
        );
        expect(overlays[0].zIndex).to.equal(200, 'first returned element should have initial zIndex 200');
        expect(overlays[1].overlay).to.equal(
          element2,
          'second returned element should contain element with lowest zIndex'
        );
        expect(overlays[1].zIndex).to.equal(
          ZIndex + 2,
          'second returned element should have initial ZIndex + 2' + Number(ZIndex + 2)
        );
        expect(size()).to.equal(2, 'manager registry should not be affected');
      });
    });
  });
});
