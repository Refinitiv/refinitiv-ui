import { createSandbox, restore, spy } from 'sinon';

import { Overlay } from '@refinitiv-ui/elements/overlay';

import { elementUpdated, expect, fixture, isIE } from '@refinitiv-ui/test-helpers';

import {
  FocusManager,
  clear,
  deregister,
  register,
  size
} from '../../../../lib/overlay/managers/focus-manager.js';
import * as zIndexManager from '../../../../lib/overlay/managers/zindex-manager.js';
import { fireKeydownEvent, openedUpdated } from './../mocks/helper';

const createFixture = async (zIndex) => {
  return typeof zIndex === 'undefined'
    ? fixture('<ef-overlay opened>test</ef-overlay>')
    : fixture(`<ef-overlay z-index="${zIndex}" opened>test</ef-overlay>`);
};

describe('overlay/manager/FocusManager', function() {
  describe('Focus Manager', function() {
    beforeEach(function() {
      clear();
      zIndexManager.clear();
    });

    describe('Test Methods', function() {
      let manager = {};
      let element;

      before(function() {
        createSandbox();
      });

      beforeEach(async function() {
        manager.register = spy(FocusManager.prototype, 'register');
        manager.deregister = spy(FocusManager.prototype, 'deregister');
        manager.clear = spy(FocusManager.prototype, 'clear');
        manager.size = spy(FocusManager.prototype, 'size');

        element = await createFixture();
      });

      afterEach(function() {
        restore();
      });

      describe('Test register', function() {
        it('Test single component', function() {
          expect(manager.register).to.have.callCount(1).calledWith(element);
          expect(size()).to.equal(1, '1 element should be registered');
        });

        it('Test twice same component', function() {
          register(element);

          expect(manager.register).to.have.callCount(2).calledWith(element);
          expect(size()).to.equal(1, 'element should be registered just once');
        });

        it('Test with detached element in zIndexManager', function() {
          const element2 = new Overlay();

          zIndexManager.register(element2);
          register(element2);

          expect(manager.register).to.have.callCount(2);
          expect(size()).to.equal(2, '1 element should be registered');
        });
      });

      describe('Test deregister', function() {
        it('Test deregister once', async function() {
          element.opened = false;
          await openedUpdated(element);

          expect(manager.deregister).to.have.callCount(1).calledWith(element);
          expect(size()).to.equal(0, 'element should be deregistered');
        });

        xit('Test with activeElement', async function() {
          expect(document.activeElement).to.be.exist;

          const activeElement = document.activeElement;

          element.opened = false;
          await openedUpdated(element);

          expect(document.activeElement).to.equal(activeElement);
        });

        it('Test twice same component', async function() {
          element.opened = false;
          await openedUpdated(element);

          deregister(element);

          expect(manager.deregister).to.have.callCount(2).calledWith(element);
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

    describe('Test Functionality', function() {
      const describeBrowser = isIE() ? xdescribe : describe;
      const itBrowser = isIE() ? xit : it;

      itBrowser('Test focus `tab` on empty overlay', async () => {
        const element = await createFixture();
        element.focus();

        fireKeydownEvent(document, 'Tab');

        expect(document.activeElement).to.equal(element);
      });

      itBrowser('Test focus `tab` on overlay with single element', async () => {
        const element = await fixture('<ef-overlay opened><button id="first">first</button></ef-overlay>');
        const first = element.querySelector('#first');

        element.focus();

        fireKeydownEvent(document, 'Tab');

        expect(document.activeElement).to.equal(first);
      });

      describeBrowser('Test focus on overlay with three elements inside', () => {
        let element;
        let first;
        let second;
        let third;

        beforeEach(async function() {
          element = await fixture(
            '<ef-overlay opened><button id="first">first</button><button id="second">second</button><button id="third">third</button></ef-overlay>'
          );
          first = element.querySelector('#first');
          second = element.querySelector('#second');
          third = element.querySelector('#third');
        });

        describe('Test `tab`', function() {
          it('Test [first->second]', function() {
            first.focus();
            fireKeydownEvent(document, 'Tab');
            expect(document.activeElement).to.equal(first);
          });

          it('Test [second->third]', function() {
            second.focus();
            fireKeydownEvent(document, 'Tab');
            expect(document.activeElement).to.equal(second);
          });

          it('Test [third->first]', function() {
            third.focus();
            fireKeydownEvent(document, 'Tab');
            expect(document.activeElement).to.equal(first);
          });
        });

        describe('Test `shift + tab`', function() {
          it('Test [third->second]', function() {
            third.focus();
            fireKeydownEvent(document, 'Tab', true);
            expect(document.activeElement).to.equal(third);
          });

          it('Test [second->first]', function() {
            second.focus();
            fireKeydownEvent(document, 'Tab', true);
            expect(document.activeElement).to.equal(second);
          });

          it('Test [first->third]', function() {
            first.focus();
            fireKeydownEvent(document, 'Tab', true);
            expect(document.activeElement).to.equal(third);
          });
        });
      });

      describeBrowser('Test two overlays', () => {
        let element;
        let element2;
        let first;
        let second;

        beforeEach(async function() {
          element = await fixture('<ef-overlay opened><button id="first">first</button></ef-overlay>');
          element2 = await fixture('<ef-overlay opened><button id="second">second</button></ef-overlay>');
          first = element.querySelector('#first');
          second = element2.querySelector('#second');
        });

        it('Test `tab`', function() {
          second.focus();

          fireKeydownEvent(document, 'Tab');

          expect(document.activeElement).to.equal(first);

          fireKeydownEvent(document, 'Tab');

          expect(document.activeElement).to.equal(second);
        });

        it('Test `shift + tab`', function() {
          second.focus();

          fireKeydownEvent(document, 'Tab', true);

          expect(document.activeElement).to.equal(first);

          fireKeydownEvent(document, 'Tab', true);

          expect(document.activeElement).to.equal(second);
        });

        it('Test `tab` with backdrop', async function() {
          element2.withBackdrop = true;

          await elementUpdated(element2);

          second.focus();

          fireKeydownEvent(document, 'Tab');

          expect(document.activeElement).to.equal(second);

          fireKeydownEvent(document, 'Tab');

          expect(document.activeElement).to.equal(second);
        });
      });
    });
  });
});
