import { createSandbox, restore, spy } from 'sinon';

import '@refinitiv-ui/elements/overlay';

import '@refinitiv-ui/elemental-theme/light/ef-overlay';
import { expect, fixture } from '@refinitiv-ui/test-helpers';
import { isSafari } from '@refinitiv-ui/utils';

import {
  ViewportManager,
  clear,
  deregister,
  register,
  size
} from '../../../../lib/overlay/managers/viewport-manager.js';
import * as zIndexManager from '../../../../lib/overlay/managers/zindex-manager.js';
import { openedUpdated } from './../mocks/helper.js';

const createFixture = (zIndex) => {
  return typeof zIndex === 'undefined'
    ? fixture('<ef-overlay opened>test</ef-overlay>')
    : fixture(`<ef-overlay z-index="${zIndex}" opened>test</ef-overlay>`);
};

describe('overlay/manager/ViewportManager', function () {
  describe('Viewport Manager', function () {
    let manager = {};
    let element;

    before(function () {
      createSandbox();
    });

    beforeEach(async function () {
      clear();
      zIndexManager.clear();

      manager.register = spy(ViewportManager.prototype, 'register');
      manager.deregister = spy(ViewportManager.prototype, 'deregister');
      manager.clear = spy(ViewportManager.prototype, 'clear');
      manager.size = spy(ViewportManager.prototype, 'size');

      element = await createFixture();
    });

    afterEach(function () {
      restore();
    });

    describe('Test register', function () {
      it('Test one element', function () {
        expect(manager.register).to.have.callCount(1).calledWith(element);
        expect(size()).to.equal(1, '1 element should be registered');
      });

      it('Test twice same element', function () {
        register(element);

        expect(manager.register).to.have.callCount(2).calledWith(element);
        expect(size()).to.equal(1, 'element should be registered just once');
      });
    });

    describe('Test deregister', function () {
      it('Test one element', async function () {
        element.opened = false;
        await openedUpdated(element);

        expect(manager.deregister).to.have.callCount(1).calledWith(element);
        expect(size()).to.equal(0, 'element should be deregistered');
      });

      it('Test twice same element', async function () {
        element.opened = false;
        await openedUpdated(element);

        deregister(element);

        expect(manager.deregister).to.have.callCount(2).calledWith(element);
        expect(size()).to.equal(0, 'element should be deregistered just once');
      });
    });

    describe('Test clear', function () {
      it('Test clear', async function () {
        isSafari() && this.skip();
        // This case is unstable when run test on Safari with Windows OS
        // It mostly passes when run in watch mode

        await createFixture();
        clear();

        expect(manager.clear).to.have.callCount(1);
        expect(size()).to.equal(0, 'all element should be moved from registry');
      });
    });
  });
});
