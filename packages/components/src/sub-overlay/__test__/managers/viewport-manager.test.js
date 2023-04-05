import { expect, fixture } from '@refinitiv-ui/test-helpers';
import { createSandbox, restore, spy } from 'sinon';

import '@refinitiv-ui/components/sub-overlay';

import { openedUpdated } from './../mocks/helper';

import { clear, deregister, register, size, ViewportManager } from '../../../../lib/sub-overlay/managers/viewport-manager.js';
import * as zIndexManager from '../../../../lib/sub-overlay/managers/zindex-manager.js';

const createFixture = async (zIndex) => {
  return (typeof zIndex === 'undefined') ? fixture('<ui-sub-overlay opened>test</ui-sub-overlay>') :
    fixture(`<ui-sub-overlay z-index="${zIndex}" opened>test</ui-sub-overlay>`);
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
  });
});
