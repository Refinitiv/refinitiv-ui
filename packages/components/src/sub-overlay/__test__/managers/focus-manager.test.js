import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';
import { createSandbox, restore, spy } from 'sinon';
import { fireKeydownEvent, openedUpdated } from './../mocks/helper';

import { clear, deregister, FocusManager, register, size } from '../../../../lib/overlay/managers/focus-manager.js';
import * as zIndexManager from '../../../../lib/overlay/managers/zindex-manager.js';
import { Overlay } from '@refinitiv-ui/components/sub-overlay';

const createFixture = async (zIndex) => {
  return (typeof zIndex === 'undefined') ? fixture('<ds-overlay opened>test</ds-overlay>') :
    fixture(`<ds-overlay z-index="${zIndex}" opened>test</ds-overlay>`);
};

describe('overlay/manager/FocusManager', () => {
  describe('Focus Manager', () => {
    beforeEach(() => {
      clear();
      zIndexManager.clear();
    });

    describe('Test Methods', () => {
      let manager = {};
      let element;

      before(() => {
        createSandbox();
      });

      beforeEach(async () => {
        manager.register = spy(FocusManager.prototype, 'register');
        manager.deregister = spy(FocusManager.prototype, 'deregister');
        manager.clear = spy(FocusManager.prototype, 'clear');
        manager.size = spy(FocusManager.prototype, 'size');

        element = await createFixture();
      });

      afterEach(() => {
        restore();
      });

      describe('Test register', () => {
        it('Test single component', () => {
          expect(manager.register).to.have.callCount(1).calledWith(element);
          expect(size()).to.equal(1, '1 element should be registered');
        });

        it('Test twice same component', () => {
          register(element);

          expect(manager.register).to.have.callCount(2).calledWith(element);
          expect(size()).to.equal(1, 'element should be registered just once');
        });

        it('Test with detached element in zIndexManager', () => {
          const element2 = new Overlay();

          zIndexManager.register(element2);
          register(element2);

          expect(manager.register).to.have.callCount(2);
          expect(size()).to.equal(2, '1 element should be registered');
        });
      });

      describe('Test deregister', () => {
        it('Test deregister once', async () => {
          element.opened = false;
          await openedUpdated(element);

          expect(manager.deregister).to.have.callCount(1).calledWith(element);
          expect(size()).to.equal(0, 'element should be deregistered');
        });

        it('Test with activeElement', async () => {
          expect(document.activeElement).to.be.exist;

          const activeElement = document.activeElement;

          element.opened = false;
          await openedUpdated(element);

          expect(document.activeElement).to.equal(activeElement);
        });

        it('Test twice same component', async () => {
          element.opened = false;
          await openedUpdated(element);

          deregister(element);

          expect(manager.deregister).to.have.callCount(2).calledWith(element);
          expect(size()).to.equal(0, 'element should be deregistered just once');
        });
      });

      describe('Test clear', () => {
        it('Test clear', async () => {
          const element2 = await createFixture();

          clear();

          expect(manager.clear).to.have.callCount(1);
          expect(size()).to.equal(0, 'all element should be moved from registry');
        });
      });
    });

    describe('Test Functionality', () => {
      it('Test focus `tab` on empty overlay', async () => {
        const element = await createFixture();
        element.focus();

        fireKeydownEvent(document, 'Tab');

        expect(document.activeElement).to.equal(element);
      });

      it('Test focus `tab` on overlay with single element', async () => {
        const element = await fixture('<ds-overlay opened><button id="first">first</button></ds-overlay>');
        const first = element.querySelector('#first');

        element.focus();

        fireKeydownEvent(document, 'Tab');

        expect(document.activeElement).to.equal(first);
      });

      describe('Test focus on overlay with three elements inside', () => {
        let element;
        let first, second, third;

        beforeEach(async () => {
          element = await fixture('<ds-overlay opened><button id="first">first</button><button id="second">second</button><button id="third">third</button></ds-overlay>');
          first = element.querySelector('#first');
          second = element.querySelector('#second');
          third = element.querySelector('#third');
        });

        describe('Test `tab`', () => {
          it('Test [first->second]', () => {
            first.focus();
            fireKeydownEvent(document, 'Tab');
            expect(document.activeElement).to.equal(first);
          });

          it('Test [second->third]', () => {
            second.focus();
            fireKeydownEvent(document, 'Tab');
            expect(document.activeElement).to.equal(second);
          });

          it('Test [third->first]', () => {
            third.focus();
            fireKeydownEvent(document, 'Tab');
            expect(document.activeElement).to.equal(first);
          });
        });

        describe('Test `shift + tab`', () => {
          it('Test [third->second]', () => {
            third.focus();
            fireKeydownEvent(document, 'Tab', true);
            expect(document.activeElement).to.equal(third);
          });

          it('Test [second->first]', () => {
            second.focus();
            fireKeydownEvent(document, 'Tab', true);
            expect(document.activeElement).to.equal(second);
          });

          it('Test [first->third]', () => {
            first.focus();
            fireKeydownEvent(document, 'Tab', true);
            expect(document.activeElement).to.equal(third);
          });
        });
      });

      describe('Test two overlays', () => {
        let element, element2;
        let first, second;

        beforeEach(async () => {
          element = await fixture('<ds-overlay opened><button id="first">first</button></ds-overlay>');
          element2 = await fixture('<ds-overlay opened><button id="second">second</button></ds-overlay>');
          first = element.querySelector('#first');
          second = element2.querySelector('#second');
        });

        it('Test `tab`', () => {
          second.focus();

          fireKeydownEvent(document, 'Tab');

          expect(document.activeElement).to.equal(first);

          fireKeydownEvent(document, 'Tab');

          expect(document.activeElement).to.equal(second);
        });

        it('Test `shift + tab`', () => {
          second.focus();

          fireKeydownEvent(document, 'Tab', true);

          expect(document.activeElement).to.equal(first);

          fireKeydownEvent(document, 'Tab', true);

          expect(document.activeElement).to.equal(second);
        });

        it('Test `tab` with backdrop', async () => {
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
