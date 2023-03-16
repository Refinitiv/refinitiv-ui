import { elementUpdated, expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';
import { createSandbox, restore, spy } from 'sinon';

import { openedUpdated } from './../mocks/helper';

import '@refinitiv-ui/elements/sub-overlay';

import {
  clear,
  deregister,
  getOverlays,
  getOverlayLayers,
  register,
  size,
  toFront,
  ZIndex,
  ZIndexManager
} from '../../../../lib/sub-overlay/managers/zindex-manager.js';

const createFixture = async (zIndex) => {
  return (typeof zIndex === 'undefined') ? fixture('<ds-overlay opened>test</ds-overlay>') :
    fixture(`<ds-overlay z-index="${zIndex}" opened>test</ds-overlay>`);
};

describe('overlay/manager/ZIndexManager', () => {
  describe('ZIndex Manager', () => {
    let manager = {};

    before(() => {
      createSandbox();
    });

    beforeEach(async () => {
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

    afterEach(async () => {
      restore();
      await nextFrame();
    });

    describe('Test register method',  () => {
      describe('Test add one element', () => {
        it('Test zIndex=undefined', async () => {
          const element = await createFixture();

          expect(manager.register).to.have.callCount(1).calledWith(element);
          expect(size()).to.equal(1, 'after adding size of registry should be 1');
          expect(element.zIndex).to.equal(undefined, 'element zIndex should not be changed');
          expect(Number(element.style.zIndex)).to.equal(ZIndex, 'element style z-index should be initial ZIndex ' + ZIndex);
        });

        it('Test zIndex=100', async () => {
          const initialZIndex = 100;
          const element = await createFixture(initialZIndex);

          expect(manager.register).to.have.callCount(1).calledWith(element);
          expect(size()).to.equal(1, 'after adding size of registry should be 1');
          expect(element.zIndex).to.equal(initialZIndex, 'element zIndex should not be changed');
          expect(Number(element.style.zIndex)).to.equal(initialZIndex, 'first element style z-index should be initial element zIndex ' + initialZIndex);
        });
      });

      describe('Test adding two elements behavior', () => {
        it('Test zIndex=(undefined, undefined)', async () => {
          const element = await createFixture();
          const element2 = await createFixture();

          expect(manager.register).to.have.callCount(2);
          expect(size()).to.equal(2, 'size should be 2');
          expect(element.zIndex).to.equal(undefined, 'element zIndex should not be changed');
          expect(element2.zIndex).to.equal(undefined, 'element zIndex should not be changed');

          expect(Number(element.style.zIndex)).to.equal(ZIndex, 'element style z-index should be initial ZIndex ' + ZIndex);
          expect(Number(element2.style.zIndex)).to.equal(ZIndex + 2, 'element style z-index should be initial ZIndex + 2 ' + Number(ZIndex + 2));

        });

        it('Test zIndex=(100, undefined)', async () => {
          const initialZIndex = 100;
          const element = await createFixture(100);
          const element2 = await createFixture();

          expect(size()).to.equal(2, 'size should be 2');
          expect(element.zIndex).to.equal(initialZIndex, 'element zIndex should not be changed');
          expect(element2.zIndex).to.equal(undefined, 'element zIndex should not be changed');

          expect(Number(element.style.zIndex)).to.equal(initialZIndex, 'element style z-index should be initial element zIndex ' + initialZIndex);
          expect(Number(element2.style.zIndex)).to.equal(initialZIndex + 2, 'element style z-index should be first element zIndex + 2 ' + Number(initialZIndex + 2));
        });

        it('Test zIndex=(100,200)', async () => {
          const initialZIndex = 100;
          const initialZIndex2 = 200;

          const element = await createFixture(initialZIndex);
          const element2 = await createFixture(initialZIndex2);

          expect(size()).to.equal(2, 'size should be 2');
          expect(element.zIndex).to.equal(initialZIndex, 'element zIndex should not be changed');
          expect(element2.zIndex).to.equal(initialZIndex2, 'element zIndex should not be changed');

          expect(Number(element.style.zIndex)).to.equal(initialZIndex, 'element style z-index should be initial element zIndex ' + initialZIndex);
          expect(Number(element2.style.zIndex)).to.equal(initialZIndex2, 'element style z-index should be initial element zIndex ' + initialZIndex2);
        });

        it('Test zIndex=(200,100)', async () => {
          const initialZIndex = 200;
          const initialZIndex2 = 100;

          const element = await createFixture(initialZIndex);
          const element2 = await createFixture(initialZIndex2);

          expect(size()).to.equal(2, 'size should be 2');
          expect(element.zIndex).to.equal(initialZIndex, 'element zIndex should not be changed');
          expect(element2.zIndex).to.equal(initialZIndex2, 'element zIndex should not be changed');

          expect(Number(element.style.zIndex)).to.equal(initialZIndex, 'element style z-index should be initial element zIndex ' + initialZIndex);
          expect(Number(element2.style.zIndex)).to.equal(initialZIndex + 2, 'element style z-index should be first element zIndex + 2 ' + Number(initialZIndex + 2));
        });

        it('Test zIndex=(undefined,100)', async () => {
          const initialZIndex2 = 100;

          const element = await createFixture();
          const element2 = await createFixture(initialZIndex2);

          expect(size()).to.equal(2, 'size should be 2');
          expect(element.zIndex).to.equal(undefined, 'element zIndex should not be changed');
          expect(element2.zIndex).to.equal(initialZIndex2, 'element zIndex should not be changed');

          expect(Number(element.style.zIndex)).to.equal(ZIndex, 'element style z-index should be initial ZIndex ' + ZIndex);
          expect(Number(element2.style.zIndex)).to.equal(ZIndex + 2, 'element style z-index should be first element zIndex + 2 ' + Number(ZIndex + 2));
        });

        it('Test zIndex=(undefined,200)', async () => {
          const initialZIndex = undefined;
          const initialZIndex2 = 200;

          const element = await createFixture(initialZIndex);
          const element2 = await createFixture(initialZIndex2);

          expect(size()).to.equal(2, 'size should be 2');
          expect(element.zIndex).to.equal(initialZIndex, 'element zIndex should not be changed');
          expect(element2.zIndex).to.equal(initialZIndex2, 'element zIndex should not be changed');

          expect(Number(element.style.zIndex)).to.equal(ZIndex, 'element style z-index should be initial ZIndex ' + ZIndex);
          expect(Number(element2.style.zIndex)).to.equal(initialZIndex2, 'element style z-index should be initial element zIndex ' + initialZIndex2);
        });
      });

      describe('Test adding same element', () => {
        it('Test zIndex=(undefined->undefined)', async () => {
          const element = await createFixture();
          register(element);
          expect(manager.register).to.have.callCount(2);
          expect(Number(element.style.zIndex)).to.equal(ZIndex, 'after second registration with undefined element zIndex style zIndex should not be changed');
        });
        it('Test zIndex=(undefined->100)', async () => {
          const element = await createFixture();
          const newZIndex = ZIndex - 3;
          const registeredZIndex = element.style.zIndex;
          element.zIndex = newZIndex;
          await elementUpdated(element);
          register(element);
          expect(manager.register).to.have.callCount(2);
          expect(Number(element.style.zIndex)).to.equal(newZIndex, 'after second registration with defined element zIndex style zIndex should be changed to new value');
          expect(registeredZIndex).to.not.equal(newZIndex, 'new zIndex should not be equal to initial one');
        });
        it('Test zIndex=(100->100)', async () => {
          const initialZIndex = ZIndex - 3;
          const element = await createFixture(initialZIndex);
          register(element);
          expect(manager.register).to.have.callCount(2);
          expect(Number(element.style.zIndex)).to.equal(initialZIndex, 'after second registration with defined element style zIndex should not be changed');
        });
      });
    });

    describe('Test deregister method', async () => {
      it('Test remove one element zIndex=undefined', async () => {
        const element = await createFixture();

        element.opened = false;
        await openedUpdated(element);

        expect(manager.deregister).to.have.callCount(1);
        expect(size()).to.equal(0, 'after removing size of registry should be 0');
        expect(element.zIndex).to.equal(undefined, 'element zIndex should not be changed');
        expect(Number(element.style.zIndex)).to.equal(ZIndex, 'element style z-index should be initial ZIndex ' + ZIndex);
      });

      it('Test remove one element zIndex=100', async () => {
        const initialZIndex = 100;
        const element = await createFixture(initialZIndex);

        element.opened = false;
        await openedUpdated(element);

        expect(manager.deregister).to.have.callCount(1);
        expect(size()).to.equal(0, 'after removing size of registry should be 0');
        expect(element.zIndex).to.equal(initialZIndex, 'element zIndex should not be changed');
        expect(Number(element.style.zIndex)).to.equal(initialZIndex, 'element style z-index should be initial element zIndex ' + initialZIndex);
      });

      it('Test remove two elements zIndex=(undefined,200)', async () => {
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

        expect(Number(element.style.zIndex)).to.equal(ZIndex, 'element style z-index should be initial ZIndex ' + ZIndex);
        expect(Number(element2.style.zIndex)).to.equal(initialZIndex2, 'element style z-index should be initial ' + initialZIndex2);
      });

      it('Test deregister not registered element', async () => {
        const element = await fixture('<ds-overlay>test</ds-overlay>');
        const initialZIndex = element.zIndex;
        const initialStyleZIndex = element.style.zIndex;

        deregister(element);

        expect(manager.deregister).to.have.callCount(1).calledWith(element);
        expect(size()).to.equal(0, 'after deregister not existing component size should not be changed');
        expect(element.zIndex).to.equal(initialZIndex, 'element zIndex should not be changed');
        expect(element.style.zIndex).to.equal(initialStyleZIndex, 'element style z-index should not be changed');
      });

      it('Test deregister already deregistered element', async () => {
        const element = await createFixture();

        element.opened = false;
        await openedUpdated(element);

        deregister(element);

        expect(manager.deregister).to.have.callCount(2).calledWith(element);
        expect(size()).to.equal(0, 'after deregister not existing component size should not be changed');
        expect(element.zIndex).to.equal(undefined, 'element zIndex should not be changed');
        expect(Number(element.style.zIndex)).to.equal(ZIndex, 'element style z-index should be initial ZIndex ' + ZIndex);
      });
    });

    describe('Test clear method', function () {
      it('Test clear one element zIndex=undefined', async () => {
        const element = await createFixture();
        clear();
        expect(size()).to.equal(0, 'after removing size of registry should be 0');
        expect(element.zIndex).to.equal(undefined, 'element zIndex should not be changed');
        expect(Number(element.style.zIndex)).to.equal(ZIndex, 'element style z-index should be initial ZIndex ' + ZIndex);
      });

      it('Test clear one element with zIndex=100', async () => {
        const initialZIndex = 100;
        const element = await createFixture(initialZIndex);

        clear();

        expect(manager.clear).to.have.callCount(1);
        expect(size()).to.equal(0, 'after removing size of registry should be 0');
        expect(element.zIndex).to.equal(initialZIndex, 'element zIndex should not be changed');
        expect(Number(element.style.zIndex)).to.equal(initialZIndex, 'element style z-index should be initial element zIndex ' + initialZIndex);
      });

      it('Test clear two elements zIndex=(undefined,200)', async () => {
        const initialZIndex2 = 200;
        const element = await createFixture();
        const element2 = await createFixture(initialZIndex2);

        clear();

        expect(manager.clear).to.have.callCount(1);
        expect(size()).to.equal(0, 'size should be 0');
        expect(element.zIndex).to.equal(undefined, 'element zIndex should not be changed');
        expect(element2.zIndex).to.equal(initialZIndex2, 'element zIndex should not be changed');

        expect(Number(element.style.zIndex)).to.equal(ZIndex, 'element style z-index should be initial ZIndex ' + ZIndex);
        expect(Number(element2.style.zIndex)).to.equal(initialZIndex2, 'element style z-index should be initial zIndex ' + initialZIndex2);
      });
    });

    describe('Test toFront', () => {
      it('Test not registered element', async () => {
        const element = await fixture('<ds-overlay></ds-overlay>');

        toFront(element);

        expect(manager.toFront).to.have.callCount(1);
        // expect(size()).to.equal(0, 'Not registered element should not affect manager');
        expect(element.zIndex).to.equal(undefined, 'Initial element zIndex property should not be changed');
        // expect(element.style.zIndex).to.equal(initialStyleZIndex, 'Initial element zIndex style should not be changed');

      });
      it('Test same element', async () => {
        const element = await createFixture();

        toFront(element);

        expect(size()).to.equal(1, 'toFront should not change elements count in registry');
        expect(element.zIndex).to.equal(undefined, 'Initial element zIndex property should not be changed');
        expect(Number(element.style.zIndex)).to.equal(ZIndex, 'Initial element zIndex style should not be changed');

      });
      it('Test two elements', async () => {
        const initialZIndex2 = 200;
        const element = await createFixture();
        const element2 = await createFixture(initialZIndex2);

        toFront(element);

        expect(size()).to.equal(2, 'toFront should not change elements count in registry');
        expect(element.zIndex).to.equal(undefined, 'Initial element zIndex property should not be changed');
        expect(Number(element.style.zIndex)).to.equal(initialZIndex2 + 2, 'Initial element zIndex style should be changed to top zIndex + 2');
        expect(element2.zIndex).to.equal(initialZIndex2, 'element zIndex should not be changed');
        expect(Number(element2.style.zIndex)).to.equal(initialZIndex2, 'element style z-index should not be changed: ' + initialZIndex2);
      });
    });

    describe('Test getOverlays', () => {
      it('Test with empty manager', () => {
        const overlays = getOverlays();

        // expect(manager.getOverlays).to.have.callCount(1);
        expect(overlays.length).to.equal(0, 'Overlays should be empty array while manager is empty');
        expect(size()).to.equal(0, 'manager registry should not be affected');
      });
      it('Test with one element', async () => {
        const element = await createFixture();

        const overlays = getOverlayLayers();

        // once on focus + one time direct call
        // expect(manager.getOverlays).to.have.callCount(2);
        expect(overlays.length).to.equal(1, 'should return array with one element');
        expect(overlays[0].overlay).to.equal(element, 'returned element should contain registered element');
        expect(overlays[0].zIndex).to.equal(ZIndex, 'returned element should have initial ZIndex');
        expect(size()).to.equal(1, 'manager registry should not be affected');
      });
      it('Test with two elements', async () => {
        const element = await createFixture();
        const element2 = await createFixture();

        const overlays = getOverlayLayers();

        // once on focus first element + twice on focus second element + one time direct call
        // expect(manager.getOverlays).to.have.callCount(4);
        expect(overlays.length).to.equal(2, 'should return array with one element');
        expect(overlays[0].overlay).to.equal(element2, 'first returned element should contain second registered element');
        expect(overlays[0].zIndex).to.equal(ZIndex + 2, 'first returned element should have initial ZIndex + 2 ' + Number(ZIndex + 2));
        expect(overlays[1].overlay).to.equal(element, 'second returned element should contain first registered element');
        expect(overlays[1].zIndex).to.equal(ZIndex, 'second returned element should have initial ZIndex ' + ZIndex);
        expect(size()).to.equal(2, 'manager registry should not be affected');
      });
      it('Test with two elements and change first zIndex=200', async () => {
        const element = await createFixture();
        const element2 = await createFixture();

        element.zIndex = 200;
        await elementUpdated(element);
        register(element);

        const overlays = getOverlayLayers();

        // once on focus first element + twice on focus second element + one time direct call
        // expect(manager.getOverlays).to.have.callCount(4);
        expect(overlays.length).to.equal(2, 'should return array with one element');
        expect(overlays[0].overlay).to.equal(element, 'first returned element should contain element with highest zIndex');
        expect(overlays[0].zIndex).to.equal(200, 'first returned element should have initial zIndex 200');
        expect(overlays[1].overlay).to.equal(element2, 'second returned element should contain element with lowest zIndex');
        expect(overlays[1].zIndex).to.equal(ZIndex + 2, 'second returned element should have initial ZIndex + 2' + Number(ZIndex + 2));
        expect(size()).to.equal(2, 'manager registry should not be affected');
      });
    });
  });
});
