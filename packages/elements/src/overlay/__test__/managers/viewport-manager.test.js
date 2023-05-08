import {expect, fixture, isSafari } from '@refinitiv-ui/test-helpers';
import { createSandbox, restore, spy } from 'sinon';

import '@refinitiv-ui/elements/overlay';
import '@refinitiv-ui/elemental-theme/light/ef-overlay';

import { openedUpdated } from './../mocks/helper';

import { clear, deregister, register, size, ViewportManager } from '../../../../lib/overlay/managers/viewport-manager.js';
import * as zIndexManager from '../../../../lib/overlay/managers/zindex-manager.js';

const createFixture = async (zIndex) => {
  return (typeof zIndex === 'undefined') ? fixture('<ef-overlay opened>test</ef-overlay>') :
    fixture(`<ef-overlay z-index="${zIndex}" opened>test</ef-overlay>`);
};

describe('overlay/manager/ViewportManager', () => {
  describe('Viewport Manager', () => {
    let manager = {};
    let element;

    before(() => {
      createSandbox();
    });

    beforeEach(async () => {
      clear();
      zIndexManager.clear();

      manager.register = spy(ViewportManager.prototype, 'register');
      manager.deregister = spy(ViewportManager.prototype, 'deregister');
      manager.clear = spy(ViewportManager.prototype, 'clear');
      manager.size = spy(ViewportManager.prototype, 'size');

      element = await createFixture();
    });

    afterEach(() => {
      restore();
    });

    describe('Test register', () => {
      it('Test one element', () => {
        expect(manager.register).to.have.callCount(1).calledWith(element);
        expect(size()).to.equal(1, '1 element should be registered');
      });

      it('Test twice same element', () => {
        register(element);

        expect(manager.register).to.have.callCount(2).calledWith(element);
        expect(size()).to.equal(1, 'element should be registered just once');
      });
    });

    describe('Test deregister', () => {
      it('Test one element', async () => {
        element.opened = false;
        await openedUpdated(element);

        expect(manager.deregister).to.have.callCount(1).calledWith(element);
        expect(size()).to.equal(0, 'element should be deregistered');
      });

      it('Test twice same element', async () => {
        element.opened = false;
        await openedUpdated(element);

        deregister(element);

        expect(manager.deregister).to.have.callCount(2).calledWith(element);
        expect(size()).to.equal(0, 'element should be deregistered just once');
      });
    });

    describe('Test clear', () => {
      it('Test clear', async function () {
        isSafari() && this.skip()
        // This case is unstable when run test on Safari with Windows OS
        // It mostly passes when run in watch mode

        const element2 = await createFixture();

        clear();

        expect(manager.clear).to.have.callCount(1);
        expect(size()).to.equal(0, 'all element should be moved from registry');
      });
    });
  });
});
