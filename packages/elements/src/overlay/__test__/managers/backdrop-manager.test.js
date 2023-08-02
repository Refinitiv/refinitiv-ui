import { createSandbox, restore, spy } from 'sinon';

import { Overlay } from '@refinitiv-ui/elements/overlay';

import { expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';

import { OverlayBackdrop } from '../../../../lib/overlay/elements/overlay-backdrop.js';
import {
  BackdropManager,
  clear,
  deregister,
  register,
  size
} from '../../../../lib/overlay/managers/backdrop-manager.js';
import * as zIndexManager from '../../../../lib/overlay/managers/zindex-manager.js';

const createFixture = (zIndex) => {
  return typeof zIndex === 'undefined'
    ? fixture('<ef-overlay opened with-backdrop>test</ef-overlay>')
    : fixture(`<ef-overlay z-index="${zIndex}" opened with-backdrop>test</ef-overlay>`);
};

describe('overlay/manager/BackdropManager', function() {
  describe('Backdrop Manager', function() {
    let manager = {};
    let element;

    before(function() {
      createSandbox();
    });

    beforeEach(async function() {
      clear();
      zIndexManager.clear();

      await nextFrame();
      manager.register = spy(BackdropManager.prototype, 'register');
      manager.deregister = spy(BackdropManager.prototype, 'deregister');
      manager.clear = spy(BackdropManager.prototype, 'clear');
      manager.size = spy(BackdropManager.prototype, 'size');

      element = await createFixture();
    });

    afterEach(function() {
      restore();
    });

    describe('Test register', function() {
      it('Test register single component', function() {
        expect(manager.register).to.have.callCount(1).calledWith(element);
        expect(size()).to.equal(1, '1 element should be registered');
      });

      it('Test twice same component', function() {
        register(element);

        expect(manager.register).to.have.callCount(2);
        expect(size()).to.equal(1, 'element should be registered just once');
      });

      it('Test with element and check backdrop', function() {
        expect(size()).to.equal(1, '1 element should be registered');
        expect(element.previousElementSibling).to.be.exist;
        expect(element.previousElementSibling instanceof OverlayBackdrop).to.equal(
          true,
          'backdrop should be set to be sibling of element'
        );
        // expect(Number(element.previousElementSibling.style.zIndex)).to.equal(Number(element.style.zIndex - 1), 'backdrop should have element style zIndex - 1');
      });

      it('Test with detached element in zIndexManager', function() {
        const element = new Overlay();

        zIndexManager.register(element);
        register(element);

        expect(manager.register).to.have.callCount(2);
        expect(size()).to.equal(2, '2 elements should be registered');
        expect(element.previousElementSibling).to.not.be.exist;
      });
    });

    describe('Test deregister', function() {
      it('Test single element', function() {
        deregister(element);

        expect(manager.deregister).to.have.callCount(1).calledWith(element);
        expect(size()).to.equal(0, 'element should be deregistered');
      });

      it('Test twice same component', function() {
        deregister(element);
        deregister(element);

        expect(manager.deregister).to.have.callCount(2);
        expect(size()).to.equal(0, 'element should be deregistered just once');
      });
    });

    describe('Test clear', function() {
      it('Test clear', async function() {
        const element2 = await createFixture();

        clear();

        expect(manager.clear).to.have.callCount(1);
        expect(size()).to.equal(0, 'all element should be moved from registry');
      });
    });
  });
});
