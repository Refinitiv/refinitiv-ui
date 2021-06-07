import { elementUpdated, expect, fixture, oneEvent } from '@refinitiv-ui/test-helpers';
import { createSandbox, restore, spy } from 'sinon';

import { fireKeydownEvent, openedUpdated } from './../mocks/helper';

import { clear, CloseManager, deregister, register, size } from '../../../../lib/overlay/managers/close-manager.js';
import * as zIndexManager from '../../../../lib/overlay/managers/zindex-manager.js';
import { Overlay } from '@refinitiv-ui/elements/overlay';

const createFixture = async (zIndex) => {
  return (typeof zIndex === 'undefined') ? fixture('<ef-overlay opened >test</ef-overlay>') :
    fixture(`<ef-overlay z-index="${zIndex}" opened>test</ef-overlay>`);
};

describe('Overlay', () => {
  describe('Close Manager', () => {
    let manager = {};
    let element;

    before(() => {
      createSandbox();
    });

    beforeEach(async () => {
      clear();
      zIndexManager.clear();

      manager.register = spy(CloseManager.prototype, 'register');
      manager.deregister = spy(CloseManager.prototype, 'deregister');
      manager.clear = spy(CloseManager.prototype, 'clear');
      manager.size = spy(CloseManager.prototype, 'size');

      element = await createFixture();
    });

    afterEach(() => {
      restore();
    });

    describe('Test register', () => {
      it('Test single element', () => {
        expect(manager.register).to.have.callCount(1).calledWith(element);
        expect(size()).to.equal(1, '1 element should be registered');
      });

      it('Test twice same component', () => {
        register(element, () => {
        });

        expect(manager.register).to.have.callCount(2);
        expect(size()).to.equal(1, 'element should be registered just once');
      });

      it('Test with detached element', async () => {
        const element2 = new Overlay();

        register(element2, () => {
        });

        expect(manager.register).to.have.callCount(2);
        expect(size()).to.equal(2, '1 element should be registered');
      });
    });

    describe('Test deregister', () => {
      it('Test single element', async () => {
        element.opened = false;
        await openedUpdated(element);

        expect(manager.deregister).to.have.callCount(1).calledWith(element);
        expect(size()).to.equal(0, 'element should be deregistered');
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

    describe('Test tapstart Event', () => {
      describe('Test Single Element', () => {
        it('Test element tapstart', async () => {
          setTimeout(() => {
            element.dispatchEvent(new CustomEvent('tapstart'));
          });

          const event = await oneEvent(element, 'tapstart');


          expect(event).to.be.exist;
          expect(element.opened).to.equal(true, 'Close callback should not be called on overlay click');
        });

        it('Test document tapstart with noCancelOnOutsideClick=false', async () => {
          setTimeout(() => {
            document.dispatchEvent(new CustomEvent('tapstart'));
          });

          const event = await oneEvent(element, 'opened-changed');

          expect(event.detail.value).to.equal(false, 'Overlay callback should return new state of opened');
          expect(element.opened).to.equal(false, 'Overlay should be closed');
        });

        it('Test document tapstart with noCancelOnOutsideClick=true', async () => {
          element.noCancelOnOutsideClick = true;
          await elementUpdated(element);

          setTimeout(() => {
            document.dispatchEvent(new CustomEvent('tapstart'));
          });

          await oneEvent(document, 'tapstart');


          expect(element.opened).to.equal(true, 'Overlay should not be closed');
        });
      });

      describe('Test tapstart Two Elements', () => {
        let element2;

        beforeEach(async () => {
          element2 = await createFixture();
        });

        it('Test overlay tapstart', async () => {
          setTimeout(() => {
            element.dispatchEvent(new CustomEvent('tapstart'));
          });

          await oneEvent(element2, 'opened-changed');

          expect(element.opened).to.equal(true, 'First element should stay opened');
          expect(element2.opened).to.equal(false, 'Second element should be closed');
        });

        it('Test document tapstart', async () => {
          setTimeout(() => {
            document.dispatchEvent(new CustomEvent('tapstart'));
          });

          await oneEvent(element2, 'opened-changed');

          expect(element.opened).to.equal(true, 'Close callback should not be called for bottom element');
          expect(element2.opened).to.equal(false, 'Close callback should be called for most top element');
        });
      });
    });
    describe('Test document keydown', () => {
      describe('Test keydown single element', () => {
        it('Test overlay keydown', async () => {
          setTimeout(() => {
            fireKeydownEvent(element, 'Escape');
          });

          const event = await oneEvent(element, 'opened-changed');

          expect(event.detail.value).to.equal(false, 'Overlay callback should return new state of opened');
          expect(element.opened).to.equal(false, 'Overlay should be closed');
        });

        it('Test document keydown', async () => {
          setTimeout(() => {
            fireKeydownEvent(document, 'Escape');
          });

          const event = await oneEvent(element, 'opened-changed');

          expect(event.detail.value).to.equal(false, 'Overlay callback should return new state of opened');
          expect(element.opened).to.equal(false, 'Overlay should be closed');
        });

        it('Test document keydown with noCancelOnEscKey=true', async () => {
          element.noCancelOnEscKey = true;
          await elementUpdated(element);

          setTimeout(() => {
            fireKeydownEvent(document, 'Escape');

          });

          await oneEvent(document, 'keydown');

          expect(element.opened).to.equal(true, 'Close callback should not be called for element with flag noCancelOnEscKey');
        });
      });

      describe('Test escape event with two elements', () => {
        let element2;

        beforeEach(async () => {
          element2 = await createFixture();
        });

        it('Test overlay keydown', async () => {
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

        it('Test document keydown', async () => {
          setTimeout(() => {
            fireKeydownEvent(document, 'Esc');
          });

          await oneEvent(element2, 'opened-changed');

          expect(element.opened).to.equal(true, 'Bottom element should not be closed');
          expect(element2.opened).to.equal(false, 'Top element should be closed');
        });
      });
    });
  });
});
