import { expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';
import { createSandbox, restore, spy } from 'sinon';

import '@refinitiv-ui/components/overlay';

import { BackdropManager, clear, deregister, register, size } from '../../../../lib/overlay/managers/backdrop-manager.js';
import * as zIndexManager from '../../../../lib/overlay/managers/zindex-manager.js';
import { OverlayBackdrop } from '../../../../lib/overlay/elements/overlay-backdrop.js';
import { Overlay } from '@refinitiv-ui/components/overlay';

const createFixture = async (zIndex) => {
  return (typeof zIndex === 'undefined') ? fixture('<ds-overlay opened with-backdrop>test</ds-overlay>') :
    fixture(`<ds-overlay z-index="${zIndex}" opened with-backdrop>test</ds-overlay>`);
};

describe('overlay/manager/BackdropManager', () => {
  describe('Backdrop Manager', () => {

    let manager = {};
    let element;

    before(() => {
      createSandbox();
    });

    beforeEach(async () => {
      clear();
      zIndexManager.clear();

      await nextFrame();
      manager.register = spy(BackdropManager.prototype, 'register');
      manager.deregister = spy(BackdropManager.prototype, 'deregister');
      manager.clear = spy(BackdropManager.prototype, 'clear');
      manager.size = spy(BackdropManager.prototype, 'size');

      element = await createFixture();
    });

    afterEach(() => {
      restore();
    });

    describe('Test register', () => {
      it('Test register single component', () => {
        expect(manager.register).to.have.callCount(1).calledWith(element);
        expect(size()).to.equal(1, '1 element should be registered');
      });

      it('Test twice same component', () => {
        register(element);

        expect(manager.register).to.have.callCount(2);
        expect(size()).to.equal(1, 'element should be registered just once');
      });

      it('Test with element and check backdrop', () => {
        expect(size()).to.equal(1, '1 element should be registered');
        expect(element.previousElementSibling).to.be.exist;
        expect(element.previousElementSibling instanceof OverlayBackdrop).to.equal(true, 'backdrop should be set to be sibling of element');
      });

      it('Test with detached element in zIndexManager', () => {
        const element = new Overlay();

        zIndexManager.register(element);
        register(element);

        expect(manager.register).to.have.callCount(2);
        expect(size()).to.equal(2, '2 elements should be registered');
        expect(element.previousElementSibling).to.not.be.exist;
      });
    });

    describe('Test deregister', () => {
      it('Test single element', () => {
        deregister(element);

        expect(manager.deregister).to.have.callCount(1).calledWith(element);
        expect(size()).to.equal(0, 'element should be deregistered');
      });

      it('Test twice same component', () => {
        deregister(element);
        deregister(element);

        expect(manager.deregister).to.have.callCount(2);
        expect(size()).to.equal(0, 'element should be deregistered just once');
      });
    });

    describe('Test clear', () => {
      it('Test clear', async () => {
        clear();
        expect(manager.clear).to.have.callCount(1);
        expect(size()).to.equal(0, 'all element should be moved from registry');
      });
    });
  });
});
