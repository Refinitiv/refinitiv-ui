import { expect, fixture, html, nextFrame } from '@refinitiv-ui/test-helpers';

import { TapEvent } from '../../lib/events/TapEvent.js';
import { isChrome } from '../helper.js';

let identifiers = new Map();
let identifier = 0;

const getIdentifier = (element) => {
  if (!identifiers.has(element)) {
    identifier += 1;
    identifiers.set(element, identifier);
  }
  return identifiers.get(element);
};

// MouseEvent button, https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#value
const createMouseEvent = (element, eventType, button = 0) => {
  const position = element.getBoundingClientRect();

  return new MouseEvent(eventType, {
    bubbles: true,
    composed: true,
    cancelable: true,
    detail: 1,
    screenX: position.left + element.offsetLeft + position.width / 2,
    screenY: position.top + element.offsetTop + position.height / 2,
    clientX: position.left + position.width / 2,
    clientY: position.top + position.height / 2,
    button: button,
    buttons: 1,
    isTrusted: true,
    view: window
  });
};

const createTouchEvent = (element, eventType) => {
  const position = element.getBoundingClientRect();

  return new TouchEvent(eventType, {
    bubbles: true,
    composed: true,
    cancelable: true,
    isTrusted: true,
    detail: 1,
    view: window,
    changedTouches: [
      new Touch({
        screenX: position.left + element.offsetLeft + position.width / 2,
        screenY: position.top + element.offsetTop + position.height / 2,
        clientX: position.left + position.width / 2,
        clientY: position.top + position.height / 2,
        target: element,
        identifier: getIdentifier(element)
      })
    ]
  });
};

const dispatchMouseEvent = (element, eventType, button = 0) => {
  element.dispatchEvent(createMouseEvent(element, eventType, button));
};

const dispatchTouchEvent = (element, eventType) => {
  element.dispatchEvent(createTouchEvent(element, eventType));
};

const click = async (element1, element2) => {
  dispatchMouseEvent(element1, 'mousedown');
  await nextFrame();
  dispatchMouseEvent(element2, 'mouseup');
  await nextFrame();
};

const auxiliaryClick = async (element1, element2) => {
  dispatchMouseEvent(element1, 'mousedown', 1);
  await nextFrame();
  dispatchMouseEvent(element2, 'mouseup', 1);
  await nextFrame();
};

const secondaryClick = async (element1, element2) => {
  dispatchMouseEvent(element1, 'mousedown', 2);
  await nextFrame();
  dispatchMouseEvent(element2, 'mouseup', 2);
  await nextFrame();
};

const touch = async (element1, element2) => {
  dispatchTouchEvent(element1, 'touchstart');
  await nextFrame();
  dispatchTouchEvent(element2, 'touchend');
  await nextFrame();
};

describe('TestTapEvent', function () {
  let tapStartCount = 0;
  let tapEndCount = 0;
  let tapCount = 0;

  let tapStartEvent = null;
  let tapEndEvent = null;
  let tapEvent = null;

  let tapStartEventListener;
  let tapEndEventListener;
  let tapEventListener;

  before(function () {
    tapStartEventListener = (event) => {
      tapStartEvent = event;
      tapStartCount += 1;
    };

    document.addEventListener('tapstart', tapStartEventListener);

    tapEndEventListener = (event) => {
      tapEndEvent = event;
      tapEndCount += 1;
    };

    document.addEventListener('tapend', tapEndEventListener);

    tapEventListener = (event) => {
      tapEvent = event;
      tapCount += 1;
    };

    document.addEventListener('tap', tapEventListener);
  });

  after(function () {
    document.removeEventListener('tabstart', tapStartEventListener);
    document.removeEventListener('tapend', tapEndEventListener);
    document.removeEventListener('tap', tapEventListener);
  });

  beforeEach(function () {
    tapStartCount = 0;
    tapEndCount = 0;
    tapCount = 0;

    tapStartEvent = null;
    tapEndEvent = null;
    tapEvent = null;
  });

  describe('Test MouseEvents', function () {
    it('Test tap on simple element', async function () {
      const element = await fixture(
        html`<div style="display: block; width: 100px; height: 100px; background-color: red"></div>`
      );

      await click(element, element);

      expect(tapStartEvent).to.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(element);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(element);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.exist;
      expect(tapEvent).to.instanceOf(Event);
      expect(tapEvent.type).to.equal('tap', 'event should be of type `tap`');
      expect(tapEvent.target).to.equal(element);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Should not fire tap event on right-click', async function () {
      const element = await fixture(
        html`<div style="display: block; width: 100px; height: 100px; background-color: red"></div>`
      );

      await secondaryClick(element, element);

      expect(tapEvent).to.not.exist;
      expect(tapEvent).to.not.instanceOf(Event);
      expect(tapCount).to.equal(0, 'tap event should not be fired on right click');
    });

    it('Should not fire tapstart event on right-click', async function () {
      const element = await fixture(
        html`<div style="display: block; width: 100px; height: 100px; background-color: red"></div>`
      );

      await secondaryClick(element, element);

      expect(tapStartEvent).to.not.exist;
      expect(tapStartEvent).to.not.instanceOf(Event);
      expect(tapStartCount).to.equal(0, 'tapstart event should not be fired on right click');
    });

    it('Should not fire tapend event on right-click', async function () {
      const element = await fixture(
        html`<div style="display: block; width: 100px; height: 100px; background-color: red"></div>`
      );

      await secondaryClick(element, element);

      expect(tapEndEvent).to.not.exist;
      expect(tapEndEvent).to.not.instanceOf(Event);
      expect(tapEndCount).to.equal(0, 'tapend event should not be fired on right click');
    });

    it('Should not fire tap event on middle-click', async function () {
      const element = await fixture(
        html`<div style="display: block; width: 100px; height: 100px; background-color: red"></div>`
      );

      await auxiliaryClick(element, element);

      expect(tapEvent).to.not.exist;
      expect(tapEvent).to.not.instanceOf(Event);
      expect(tapCount).to.equal(0, 'tap event should not be fired on right click');
    });

    it('Should not fire tapstart event on middle-click', async function () {
      const element = await fixture(
        html`<div style="display: block; width: 100px; height: 100px; background-color: red"></div>`
      );

      await auxiliaryClick(element, element);

      expect(tapStartEvent).to.not.exist;
      expect(tapStartEvent).to.not.instanceOf(Event);
      expect(tapStartCount).to.equal(0, 'tapstart event should not be fired on right click');
    });

    it('Should not fire tapend event on middle-click', async function () {
      const element = await fixture(
        html`<div style="display: block; width: 100px; height: 100px; background-color: red"></div>`
      );

      await auxiliaryClick(element, element);

      expect(tapEndEvent).to.not.exist;
      expect(tapEndEvent).to.not.instanceOf(Event);
      expect(tapEndCount).to.equal(0, 'tapend event should not be fired on right click');
    });

    it('Test tap on parent element where mousedown is child and mouseup is parent', async function () {
      const parent = await fixture(html`
        <div id="parent" style="display: block; width: 300px; height: 300px; background-color: red">
          <div id="child" style="display: block; width: 100px; height: 100px; background-color: green"></div>
        </div>
      `);

      const child = parent.querySelector('#child');

      await click(child, parent);

      expect(tapStartEvent).to.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(child);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(parent);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.exist;
      expect(tapEvent).to.instanceOf(Event);
      expect(tapEvent.type).to.equal('tap', 'event should be of type `tap`');
      expect(tapEvent.target).to.equal(parent);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Test tap on parent element where mousedown is parent and mouseup is child', async function () {
      const parent = await fixture(html`
        <div id="parent" style="display: block; width: 300px; height: 300px; background-color: red">
          <div id="child" style="display: block; width: 100px; height: 100px; background-color: green"></div>
        </div>
      `);

      const child = parent.querySelector('#child');

      await click(parent, child);

      expect(tapStartEvent).to.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(parent);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(child);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.exist;
      expect(tapEvent).to.instanceOf(Event);
      expect(tapEvent.type).to.equal('tap', 'event should be of type `tap`');
      expect(tapEvent.target).to.equal(parent);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Test tap on parent element where mousedown is first child and mouseup is second child', async function () {
      const parent = await fixture(html`
        <div id="parent" style="display: block; width: 300px; height: 300px; background-color: red">
          <div id="child1" style="display: block; width: 100px; height: 100px; background-color: green"></div>
          <div id="child2" style="display: block; width: 100px; height: 100px; background-color: green"></div>
        </div>
      `);

      const child1 = parent.querySelector('#child1');
      const child2 = parent.querySelector('#child2');

      await click(child1, child2);

      expect(tapStartEvent).to.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(child1);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(child2);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.exist;
      expect(tapEvent).to.instanceOf(Event);
      expect(tapEvent.type).to.equal('tap', 'event should be of type `tap`');
      expect(tapEvent.target).to.equal(parent);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Should support tap event on role=button when Enter is pressed', async function () {
      const el = await fixture(html`<div role="button">Fake Button</div>`);
      const keyDownEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      el.dispatchEvent(keyDownEvent);
      const keyUpEvent = new KeyboardEvent('keyup', { key: 'Enter' });
      el.dispatchEvent(keyUpEvent);
      expect(tapEvent).to.exist;
      expect(tapEvent.target).to.equal(el);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Should support tap event on role=button when Spacebar is pressed', async function () {
      const el = await fixture(html`<div role="button">Fake Button</div>`);
      const keyDownEvent = new KeyboardEvent('keydown', { key: ' ' });
      el.dispatchEvent(keyDownEvent);
      const keyUpEvent = new KeyboardEvent('keyup', { key: ' ' });
      el.dispatchEvent(keyUpEvent);
      expect(tapEvent).to.exist;
      expect(tapEvent.target).to.equal(el);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Should not fire tap event twice on native button with role=button when Enter is pressed', async function () {
      const el = await fixture(html`<button role="button">Native Button</button>`);
      const keyDownEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      el.dispatchEvent(keyDownEvent);
      expect(tapCount).to.equal(0, 'tap event should not be fired');
    });

    it('Should support tap event on role=button when `space` is pressed', async function () {
      const el = await fixture('<div role="button">Fake Button</div>');
      const keydownEvent = new KeyboardEvent('keydown', { key: ' ' });
      const keyupEvent = new KeyboardEvent('keyup', { key: ' ' });
      el.dispatchEvent(keydownEvent);
      el.dispatchEvent(keyupEvent);
      expect(tapEvent).to.exist;
      expect(tapEvent.target).to.equal(el);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Should not run tap event on role=button when `space` is pressed and target has changed', async function () {
      const target1 = await fixture('<div role="button">Target 1</div>');
      const target2 = await fixture('<div role="button">Target 2</div>');
      const keydownEvent = new KeyboardEvent('keydown', { key: ' ' });
      const keyupEvent = new KeyboardEvent('keyup', { key: ' ' });
      target1.dispatchEvent(keydownEvent);
      target2.dispatchEvent(keyupEvent);
      expect(tapCount).to.equal(0, 'tap event should not be fired on different target');
    });

    it('Should not fire tap event when role=button is not set', async function () {
      const el = await fixture('<div>Not a Fake Button</div>');
      const event = new KeyboardEvent('keydown', {
        key: 'Enter'
      });
      el.dispatchEvent(event);
      await nextFrame();
      expect(tapCount).to.equal(0, 'tap event should not be fired');
    });
  });
  describe('Test TouchEvents', function () {
    it('Test tap on simple element', async function () {
      if (!isChrome) {
        this.skip();
      }
      const element = await fixture(
        html`<div style="display: block; width: 100px; height: 100px; background-color: red"></div>`
      );

      await touch(element, element);

      expect(tapStartEvent).to.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(element);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(element);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.exist;
      expect(tapEvent).to.instanceOf(Event);
      expect(tapEvent.type).to.equal('tap', 'event should be of type `tap`');
      expect(tapEvent.target).to.equal(element);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Test tap on simple element with touchmove', async function () {
      if (!isChrome) {
        this.skip();
      }
      const element = await fixture(
        html`<div style="display: block; width: 100px; height: 100px; background-color: red"></div>`
      );

      dispatchTouchEvent(element, 'touchstart');
      await nextFrame();
      dispatchTouchEvent(element, 'touchmove');
      await nextFrame();
      dispatchTouchEvent(element, 'touchend');
      await nextFrame();

      expect(tapStartEvent).to.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(element);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(element);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.not.exist;
      expect(tapEvent).to.equal(null);
      expect(tapCount).to.equal(0, 'tap event should not be fired if touch moved');
    });

    it('Test tap on parent element where mousedown is child and mouseup is parent', async function () {
      if (!isChrome) {
        this.skip();
      }
      const parent = await fixture(html`
        <div id="parent" style="display: block; width: 300px; height: 300px; background-color: red">
          <div id="child" style="display: block; width: 100px; height: 100px; background-color: green"></div>
        </div>
      `);

      const child = parent.querySelector('#child');

      await touch(child, parent);

      expect(tapStartEvent).to.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(child);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(parent);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.not.exist;
      expect(tapEvent).to.equal(null);
      expect(tapCount).to.equal(0, 'tap event should not be fired');
    });

    it('Test tap on parent element where mousedown is parent and mouseup is child', async function () {
      if (!isChrome) {
        this.skip();
      }
      const parent = await fixture(html`
        <div id="parent" style="display: block; width: 300px; height: 300px; background-color: red">
          <div id="child" style="display: block; width: 100px; height: 100px; background-color: green"></div>
        </div>
      `);

      const child = parent.querySelector('#child');

      await touch(parent, child);

      expect(tapStartEvent).to.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(parent);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(parent);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.not.exist;
      expect(tapEvent).to.equal(null);
      expect(tapCount).to.equal(0, 'tap event should not be fired');
    });

    it('Test tap on parent element where mousedown is first child and mouseup is second child', async function () {
      if (!isChrome) {
        this.skip();
      }
      const parent = await fixture(html`
        <div id="parent" style="display: block; width: 300px; height: 300px; background-color: red">
          <div id="child1" style="display: block; width: 100px; height: 100px; background-color: green"></div>
          <div id="child2" style="display: block; width: 100px; height: 100px; background-color: green"></div>
        </div>
      `);

      const child1 = parent.querySelector('#child1');
      const child2 = parent.querySelector('#child2');

      await touch(child1, child2);

      expect(tapStartEvent).to.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(child1);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(child2);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.not.exist;
      expect(tapEvent).to.equal(null);
      expect(tapCount).to.equal(0, 'tap event should not be fired');
    });
  });

  describe('Test mixed cases', function () {
    it('Test mouse event after touch events on simple element', async function () {
      if (!isChrome) {
        this.skip();
      }
      const element = await fixture(
        html`<div style="display: block; width: 100px; height: 100px; background-color: red"></div>`
      );

      await touch(element, element);
      await click(element, element);

      expect(tapStartEvent).to.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(element);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(element);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.exist;
      expect(tapEvent).to.instanceOf(Event);
      expect(tapEvent.type).to.equal('tap', 'event should be of type `tap`');
      expect(tapEvent.target).to.equal(element);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Test click with detail=0', async function () {
      if (!isChrome) {
        this.skip();
      }
      const element = await fixture(
        html`<button
          id="handle-enter"
          style="display: block; width: 100px; height: 100px; background-color: red"
        ></button>`
      );

      // element.focus();

      element.dispatchEvent(
        new KeyboardEvent('click', {
          bubbles: true,
          composed: true,
          cancelable: true,
          detail: 0
        })
      );

      expect(tapEvent).to.exist;
      expect(tapEvent).to.instanceOf(Event);
      expect(tapEvent.type).to.equal('tap', 'event should be of type `tap`');
      expect(tapEvent.target).to.equal(element);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Test click with detail !== 0', async function () {
      if (!isChrome) {
        this.skip();
      }
      const element = await fixture(
        html`<button
          id="handle-enter"
          style="display: block; width: 100px; height: 100px; background-color: red"
        ></button>`
      );

      element.focus();

      element.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          composed: true,
          cancelable: true,
          detail: 1
        })
      );

      expect(tapEvent).to.not.exist;
      expect(tapEvent).to.equal(null);
      expect(tapCount).to.equal(0, 'regular click should not generate tap event');
    });

    it('Test pointer event', async function () {
      if (!isChrome) {
        this.skip();
      }
      const element = await fixture(
        html`<button
          id="handle-enter"
          style="display: block; width: 100px; height: 100px; background-color: red"
        ></button>`
      );

      element.focus();

      element.dispatchEvent(
        new PointerEvent('click', {
          bubbles: true,
          composed: true,
          cancelable: true,
          pointerType: null
        })
      );

      expect(tapEvent).to.exist;
      expect(tapEvent).to.instanceOf(TapEvent);
      expect(tapEvent.type).to.equal('tap', 'event should be of type `tap`');
      expect(tapEvent.target).to.equal(element);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });
  });
});
