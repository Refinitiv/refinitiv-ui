import { createSandbox, restore, spy } from 'sinon';

import { expect, fixture } from '@refinitiv-ui/test-helpers';

import {
  ViewportManager,
  clear,
  deregister,
  register,
  size
} from '../../../../lib/overlay/managers/viewport-manager.js';
import * as zIndexManager from '../../../../lib/overlay/managers/zindex-manager.js';
import { openedUpdated } from './../mocks/helper';

const createFixture = async (zIndex) => {
  return typeof zIndex === 'undefined'
    ? fixture('<ef-overlay opened>test</ef-overlay>')
    : fixture(`<ef-overlay z-index="${zIndex}" opened>test</ef-overlay>`);
};

describe('overlay/manager/ViewportManager', function() {
  describe('Viewport Manager', function() {
    let manager = {};
    let element;

    before(function() {
      createSandbox();
    });

    beforeEach(async function() {
      clear();
      zIndexManager.clear();

      manager.register = spy(ViewportManager.prototype, 'register');
      manager.deregister = spy(ViewportManager.prototype, 'deregister');
      manager.clear = spy(ViewportManager.prototype, 'clear');
      manager.size = spy(ViewportManager.prototype, 'size');

      element = await createFixture();
    });

    afterEach(function() {
      restore();
    });

    describe('Test register', function() {
      it('Test one element', function() {
        expect(manager.register).to.have.callCount(1).calledWith(element);
        expect(size()).to.equal(1, '1 element should be registered');
      });

      it('Test twice same element', function() {
        register(element);

        expect(manager.register).to.have.callCount(2).calledWith(element);
        expect(size()).to.equal(1, 'element should be registered just once');
      });
    });

    describe('Test deregister', function() {
      it('Test one element', async function() {
        element.opened = false;
        await openedUpdated(element);

        expect(manager.deregister).to.have.callCount(1).calledWith(element);
        expect(size()).to.equal(0, 'element should be deregistered');
      });

      it('Test twice same element', async function() {
        element.opened = false;
        await openedUpdated(element);

        deregister(element);

        expect(manager.deregister).to.have.callCount(2).calledWith(element);
        expect(size()).to.equal(0, 'element should be deregistered just once');
      });
    });

    xdescribe('Test clear', function() {
      it('Test clear', async function() {
        const element2 = await createFixture();

        clear();

        expect(manager.clear).to.have.callCount(1);
        expect(size()).to.equal(0, 'all element should be moved from registry');
      });
    });
  });
});
