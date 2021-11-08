import { expect, fixture, html, nextFrame, keyboardEvent } from '@refinitiv-ui/test-helpers';
import { TapEvent } from '../../lib/events/TapEvent';
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

const createMouseEvent = (element, eventType) => {
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
    button: 0,
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
    changedTouches: [new Touch({
      screenX: position.left + element.offsetLeft + position.width / 2,
      screenY: position.top + element.offsetTop + position.height / 2,
      clientX: position.left + position.width / 2,
      clientY: position.top + position.height / 2,
      target: element,
      identifier: getIdentifier(element)
    })]
  });
};

const dispatchMouseEvent = (element, eventType) => {
  element.dispatchEvent(createMouseEvent(element, eventType));
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

const touch = async (element1, element2) => {
  dispatchTouchEvent(element1, 'touchstart');
  await nextFrame();
  dispatchTouchEvent(element2, 'touchend');
  await nextFrame();
};

describe('TestTapEvent', async () => {
  let tapStartCount = 0;
  let tapEndCount = 0;
  let tapCount = 0;

  let tapStartEvent = null;
  let tapEndEvent = null;
  let tapEvent = null;

  const tapStartEventListener = (event) => {
    tapStartEvent = event;
    tapStartCount += 1;
  };

  document.addEventListener('tapstart', tapStartEventListener);

  const tapEndEventListener = (event) => {
    tapEndEvent = event;
    tapEndCount += 1;
  };

  document.addEventListener('tapend', tapEndEventListener);

  const tapEventListener = (event) => {
    tapEvent = event;
    tapCount += 1;
  };

  document.addEventListener('tap', tapEventListener);

  beforeEach(() => {
    tapStartCount = 0;
    tapEndCount = 0;
    tapCount = 0;

    tapStartEvent = null;
    tapEndEvent = null;
    tapEvent = null;
  });

  describe('Test MouseEvents', async () => {
    it('Test tap on simple element', async () => {

      const element = await fixture(html`<div style="display: block; width: 100px; height: 100px; background-color: red"></div>`);

      await click(element, element);

      expect(tapStartEvent).to.be.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(element);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.be.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(element);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.be.exist;
      expect(tapEvent).to.instanceOf(Event);
      expect(tapEvent.type).to.equal('tap', 'event should be of type `tap`');
      expect(tapEvent.target).to.equal(element);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Test tap on parent element where mousedown is child and mouseup is parent', async () => {
      const parent = await fixture(html`
      <div id="parent" style="display: block; width: 300px; height: 300px; background-color: red">
        <div id="child" style="display: block; width: 100px; height: 100px; background-color: green"></div>
      </div>
    `);

      const child = parent.querySelector('#child');

      await click(child, parent);

      expect(tapStartEvent).to.be.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(child);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.be.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(parent);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.be.exist;
      expect(tapEvent).to.instanceOf(Event);
      expect(tapEvent.type).to.equal('tap', 'event should be of type `tap`');
      expect(tapEvent.target).to.equal(parent);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Test tap on parent element where mousedown is parent and mouseup is child', async () => {
      const parent = await fixture(html`
      <div id="parent" style="display: block; width: 300px; height: 300px; background-color: red">
        <div id="child" style="display: block; width: 100px; height: 100px; background-color: green"></div>
      </div>
    `);

      const child = parent.querySelector('#child');

      await click(parent, child);

      expect(tapStartEvent).to.be.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(parent);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.be.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(child);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.be.exist;
      expect(tapEvent).to.instanceOf(Event);
      expect(tapEvent.type).to.equal('tap', 'event should be of type `tap`');
      expect(tapEvent.target).to.equal(parent);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Test tap on parent element where mousedown is first child and mouseup is second child', async () => {
      const parent = await fixture(html`
      <div id="parent" style="display: block; width: 300px; height: 300px; background-color: red">
        <div id="child1" style="display: block; width: 100px; height: 100px; background-color: green"></div>
        <div id="child2" style="display: block; width: 100px; height: 100px; background-color: green"></div>
      </div>
    `);

      const child1 = parent.querySelector('#child1');
      const child2 = parent.querySelector('#child2');

      await click(child1, child2);

      expect(tapStartEvent).to.be.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(child1);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.be.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(child2);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.be.exist;
      expect(tapEvent).to.instanceOf(Event);
      expect(tapEvent.type).to.equal('tap', 'event should be of type `tap`');
      expect(tapEvent.target).to.equal(parent);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Should support tap event on role=button when Enter is pressed', async function () {
      const el = await fixture(html`<div role="button">Fake Button</div>`);
      const keyDownEvent = keyboardEvent('keydown', { key: 'Enter' });
      el.dispatchEvent(keyDownEvent);
      const keyUpEvent = keyboardEvent('keyup', { key: 'Enter' });
      el.dispatchEvent(keyUpEvent);
      expect(tapEvent).to.be.exist;
      expect(tapEvent.target).to.equal(el);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Should support tap event on role=button when Spacebar is pressed', async function () {
      const el = await fixture(html`<div role="button">Fake Button</div>`);
      const keyDownEvent = keyboardEvent('keydown', { key: ' ' });
      el.dispatchEvent(keyDownEvent);
      const keyUpEvent = keyboardEvent('keyup', { key: ' ' });
      el.dispatchEvent(keyUpEvent);
      expect(tapEvent).to.be.exist;
      expect(tapEvent.target).to.equal(el);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Should not fire tap event twice on native button with role=button when Enter is pressed', async function () {
      const el = await fixture(html`<button role="button">Native Button</button>`);
      const keyDownEvent = keyboardEvent('keydown', { key: 'Enter' });
      el.dispatchEvent(keyDownEvent);
      expect(tapCount).to.equal(0, 'tap event should not be fired');
    });

    it('Should support tap event on role=button when space bar is pressed', async function () {
      const el = await fixture('<div role="button">Fake Button</div>');
      const event = keyboardEvent('keyup', {
        key: ' '
      });
      el.dispatchEvent(event);
      expect(tapEvent).to.be.exist;
      expect(tapEvent.target).to.equal(el);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Should not fire tap event when role=button is not set', async function () {
      const el = await fixture('<div>Not a Fake Button</div>');
      const event = keyboardEvent('keydown', {
        key: 'Enter'
      });
      el.dispatchEvent(event);
      await nextFrame();
      expect(tapCount).to.equal(0, 'tap event should not be fired');
    });
  });
  describe('Test TouchEvents', async () => {
    it('Test tap on simple element', async function () {
      if (!isChrome) {
        this.skip();
      }
      const element = await fixture(html`<div style="display: block; width: 100px; height: 100px; background-color: red"></div>`);

      await touch(element, element);

      expect(tapStartEvent).to.be.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(element);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.be.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(element);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.be.exist;
      expect(tapEvent).to.instanceOf(Event);
      expect(tapEvent.type).to.equal('tap', 'event should be of type `tap`');
      expect(tapEvent.target).to.equal(element);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Test tap on simple element with touchmove', async function () {
      if (!isChrome) {
        this.skip();
      }
      const element = await fixture(html`<div style="display: block; width: 100px; height: 100px; background-color: red"></div>`);

      dispatchTouchEvent(element, 'touchstart');
      await nextFrame();
      dispatchTouchEvent(element, 'touchmove');
      await nextFrame();
      dispatchTouchEvent(element, 'touchend');
      await nextFrame();

      expect(tapStartEvent).to.be.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(element);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.be.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(element);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.be.not.exist;
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

      expect(tapStartEvent).to.be.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(child);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.be.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(parent);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.be.not.exist;
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

      expect(tapStartEvent).to.be.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(parent);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.be.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(parent);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.be.not.exist;
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

      expect(tapStartEvent).to.be.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(child1);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.be.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(child2);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.be.not.exist;
      expect(tapEvent).to.equal(null);
      expect(tapCount).to.equal(0, 'tap event should not be fired');
    });
  });

  describe('Test mixed cases', () => {
    it('Test mouse event after touch events on simple element', async function () {
      if (!isChrome) {
        this.skip();
      }
      const element = await fixture(html`<div style="display: block; width: 100px; height: 100px; background-color: red"></div>`);

      await touch(element, element);
      await click(element, element);

      expect(tapStartEvent).to.be.exist;
      expect(tapStartEvent).to.instanceOf(Event);
      expect(tapStartEvent.type).to.equal('tapstart', 'event should be of type `tapstart`');
      expect(tapStartEvent.target).to.equal(element);
      expect(tapStartCount).to.equal(1, 'tapstart event should be fired just once');

      expect(tapEndEvent).to.be.exist;
      expect(tapEndEvent).to.instanceOf(Event);
      expect(tapEndEvent.type).to.equal('tapend', 'event should be of type `tapend`');
      expect(tapEndEvent.target).to.equal(element);
      expect(tapEndCount).to.equal(1, 'tapend event should be fired just once');

      expect(tapEvent).to.be.exist;
      expect(tapEvent).to.instanceOf(Event);
      expect(tapEvent.type).to.equal('tap', 'event should be of type `tap`');
      expect(tapEvent.target).to.equal(element);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Test click with detail=0', async function () {
      if (!isChrome) {
        this.skip();
      }
      const element = await fixture(html`<button id="handle-enter" style="display: block; width: 100px; height: 100px; background-color: red"></button>`);

      // element.focus();

      element.dispatchEvent(new KeyboardEvent('click', {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: 0
      }));

      expect(tapEvent).to.be.exist;
      expect(tapEvent).to.instanceOf(Event);
      expect(tapEvent.type).to.equal('tap', 'event should be of type `tap`');
      expect(tapEvent.target).to.equal(element);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });

    it('Test click with detail !== 0', async function () {
      if (!isChrome) {
        this.skip();
      }
      const element = await fixture(html`<button id="handle-enter" style="display: block; width: 100px; height: 100px; background-color: red"></button>`);

      element.focus();

      element.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: 1
      }));

      expect(tapEvent).to.be.not.exist;
      expect(tapEvent).to.equal(null);
      expect(tapCount).to.equal(0, 'regular click should not generate tap event');
    });

    it('Test pointer event', async function () {
      if (!isChrome) {
        this.skip();
      }
      const element = await fixture(html`<button id="handle-enter" style="display: block; width: 100px; height: 100px; background-color: red"></button>`);

      element.focus();

      element.dispatchEvent(new PointerEvent('click', {
        bubbles: true,
        composed: true,
        cancelable: true,
        pointerType: null
      }));

      expect(tapEvent).to.be.exist;
      expect(tapEvent).to.instanceOf(TapEvent);
      expect(tapEvent.type).to.equal('tap', 'event should be of type `tap`');
      expect(tapEvent.target).to.equal(element);
      expect(tapCount).to.equal(1, 'tap event should be fired just once');
    });
  });

});
