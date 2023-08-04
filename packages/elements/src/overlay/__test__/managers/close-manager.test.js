import { createSandbox, restore, spy } from 'sinon';

import { Overlay } from '@refinitiv-ui/elements/overlay';

import '@refinitiv-ui/elemental-theme/light/ef-overlay';
import { elementUpdated, expect, fixture, oneEvent } from '@refinitiv-ui/test-helpers';

import {
  CloseManager,
  clear,
  deregister,
  register,
  size
} from '../../../../lib/overlay/managers/close-manager.js';
import * as zIndexManager from '../../../../lib/overlay/managers/zindex-manager.js';
import { fireKeydownEvent, openedUpdated } from './../mocks/helper.js';

const createFixture = (zIndex) => {
  return typeof zIndex === 'undefined'
    ? fixture('<ef-overlay opened >test</ef-overlay>')
    : fixture(`<ef-overlay z-index="${zIndex}" opened>test</ef-overlay>`);
};

describe('overlay/manager/CloseManager', function () {
  describe('Close Manager', function () {
    let manager = {};
    let element;

    before(function () {
      createSandbox();
    });

    beforeEach(async function () {
      clear();
      zIndexManager.clear();

      manager.register = spy(CloseManager.prototype, 'register');
      manager.deregister = spy(CloseManager.prototype, 'deregister');
      manager.clear = spy(CloseManager.prototype, 'clear');
      manager.size = spy(CloseManager.prototype, 'size');

      element = await createFixture();
    });

    afterEach(function () {
      restore();
    });

    describe('Test register', function () {
      it('Test single element', function () {
        expect(manager.register).to.have.callCount(1).calledWith(element);
        expect(size()).to.equal(1, '1 element should be registered');
      });

      it('Test twice same component', function () {
        register(element, () => {});

        expect(manager.register).to.have.callCount(2);
        expect(size()).to.equal(1, 'element should be registered just once');
      });

      it('Test with detached element', function () {
        const element2 = new Overlay();

        register(element2, () => {});

        expect(manager.register).to.have.callCount(2);
        expect(size()).to.equal(2, '1 element should be registered');
      });
    });

    describe('Test deregister', function () {
      it('Test single element', async function () {
        element.opened = false;
        await openedUpdated(element);

        expect(manager.deregister).to.have.callCount(1).calledWith(element);
        expect(size()).to.equal(0, 'element should be deregistered');
      });

      it('Test twice same component', async function () {
        element.opened = false;
        await openedUpdated(element);

        deregister(element);

        expect(manager.deregister).to.have.callCount(2).calledWith(element);
        expect(size()).to.equal(0, 'element should be deregistered just once');
      });
    });

    describe('Test clear', function () {
      it('Test clear', async function () {
        await createFixture();

        clear();

        expect(manager.clear).to.have.callCount(1);
        expect(size()).to.equal(0, 'all element should be moved from registry');
      });
    });

    describe('Test tapstart Event', function () {
      describe('Test Single Element', function () {
        it('Test element tapstart', async function () {
          setTimeout(() => {
            element.dispatchEvent(new CustomEvent('tapstart'));
          });

          const event = await oneEvent(element, 'tapstart');

          expect(event).to.be.exist;
          expect(element.opened).to.equal(true, 'Close callback should not be called on overlay click');
        });

        it('Test document tapstart with noCancelOnOutsideClick=false', async function () {
          setTimeout(() => {
            document.dispatchEvent(new CustomEvent('tapstart'));
          });

          const event = await oneEvent(element, 'opened-changed');

          expect(event.detail.value).to.equal(false, 'Overlay callback should return new state of opened');
          expect(element.opened).to.equal(false, 'Overlay should be closed');
        });

        it('Test document tapstart with noCancelOnOutsideClick=true', async function () {
          element.noCancelOnOutsideClick = true;
          await elementUpdated(element);

          setTimeout(() => {
            document.dispatchEvent(new CustomEvent('tapstart'));
          });

          await oneEvent(document, 'tapstart');

          expect(element.opened).to.equal(true, 'Overlay should not be closed');
        });
      });

      describe('Test tapstart Two Elements', function () {
        let element2;

        beforeEach(async function () {
          element2 = await createFixture();
        });

        it('Test overlay tapstart', async function () {
          setTimeout(() => {
            element.dispatchEvent(new CustomEvent('tapstart'));
          });

          await oneEvent(element2, 'opened-changed');

          expect(element.opened).to.equal(true, 'First element should stay opened');
          expect(element2.opened).to.equal(false, 'Second element should be closed');
        });

        it('Test document tapstart', async function () {
          setTimeout(() => {
            document.dispatchEvent(new CustomEvent('tapstart'));
          });

          await oneEvent(element2, 'opened-changed');

          expect(element.opened).to.equal(true, 'Close callback should not be called for bottom element');
          expect(element2.opened).to.equal(false, 'Close callback should be called for most top element');
        });
      });
    });
    describe('Test document keydown', function () {
      describe('Test keydown single element', function () {
        it('Test overlay keydown', async function () {
          setTimeout(() => {
            fireKeydownEvent(element, 'Escape');
          });

          const event = await oneEvent(element, 'opened-changed');

          expect(event.detail.value).to.equal(false, 'Overlay callback should return new state of opened');
          expect(element.opened).to.equal(false, 'Overlay should be closed');
        });

        it('Test document keydown', async function () {
          setTimeout(() => {
            fireKeydownEvent(document, 'Escape');
          });

          const event = await oneEvent(element, 'opened-changed');

          expect(event.detail.value).to.equal(false, 'Overlay callback should return new state of opened');
          expect(element.opened).to.equal(false, 'Overlay should be closed');
        });

        it('Test document keydown with noCancelOnEscKey=true', async function () {
          element.noCancelOnEscKey = true;
          await elementUpdated(element);

          setTimeout(() => {
            fireKeydownEvent(document, 'Escape');
          });

          await oneEvent(document, 'keydown');

          expect(element.opened).to.equal(
            true,
            'Close callback should not be called for element with flag noCancelOnEscKey'
          );
        });
      });

      describe('Test escape event with two elements', function () {
        let element2;

        beforeEach(async function () {
          element2 = await createFixture();
        });

        it('Test overlay keydown', async function () {
          setTimeout(() => {
            fireKeydownEvent(element, 'Escape');
          });

          await oneEvent(element2, 'opened-changed');

          expect(element.opened).to.equal(true, 'Bottom element should not be closed');
          expect(element2.opened).to.equal(false, 'Top element should be closed');

          setTimeout(() => {
            fireKeydownEvent(document, 'Escape');
          });

          await oneEvent(element, 'opened-changed');

          expect(element.opened).to.equal(false, 'Top element should be closed');
        });

        it('Test document keydown', async function () {
          setTimeout(() => {
            fireKeydownEvent(document, 'Escape');
          });

          await oneEvent(element2, 'opened-changed');

          expect(element.opened).to.equal(true, 'Bottom element should not be closed');
          expect(element2.opened).to.equal(false, 'Top element should be closed');
        });
      });
    });
  });
});
