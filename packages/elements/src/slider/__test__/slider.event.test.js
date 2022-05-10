import {
  fixture,
  expect,
  elementUpdated,
  oneEvent,
} from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/slider';
import '@refinitiv-ui/elemental-theme/light/ef-slider';

import { tabSliderPosition, calculateValue } from './utils';

describe('slider/Events', () => {
  describe('Events', () => {
    let el;

    beforeEach(async () => {
      el = await fixture('<ef-slider></ef-slider>');
    });

    it('Drag thumb slider on desktop', async () => {
      await elementUpdated(el);
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown'))
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', { clientX: 100, clientY: 0 })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: 100, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.value).to.equal(calculateValue(el, 100).toFixed(0).toString());
    });

    it('Drag thumb slider has range on desktop', async () => {
      el.range = true;
      await elementUpdated(el);
      expect(el.from).to.equal('0');
      expect(el.to).to.equal('100');

      // Drag from
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', { clientX: 100, clientY: 0 })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(calculateValue(el, 100).toFixed(0));
      expect(el.to).to.equal('100');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', { clientX: 150, clientY: 0 })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: 150, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.from).to.equal(calculateValue(el, 150).toFixed(0));
      expect(el.to).to.equal('100');

      // Drag to
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: window.innerWidth - 100,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(calculateValue(el, 150).toFixed(0));

      expect(el.to).to.equal(
        calculateValue(el, window.innerWidth - 100).toString()
      );

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: window.innerWidth - 90,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', {
            clientX: window.innerWidth - 90,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.from).to.equal(calculateValue(el, 150).toFixed(0));
      expect(el.to).to.equal(
        calculateValue(el, window.innerWidth - 90).toString()
      );
    });

    it('Drag "from" thumb slider to end of right.', async () => {
      el.range = true;
      await elementUpdated(el);
      expect(el.from).to.equal('0');
      expect(el.to).to.equal('100');

      // Drag from
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', { clientX: 100, clientY: 0 })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(calculateValue(el, 100).toFixed(0));
      expect(el.to).to.equal('100');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: window.innerWidth,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: window.innerWidth, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.from).to.equal(el.to);
      expect(el.to).to.equal('100');
    });

    it('Drag "to" thumb slider to end of left.', async () => {
      el.range = true;
      await elementUpdated(el);
      expect(el.from).to.equal('0');
      expect(el.to).to.equal('100');

      // Drag to
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: window.innerWidth - 100,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal('0');
      expect(el.to).to.equal(
        calculateValue(el, window.innerWidth - 100).toString()
      );

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', { clientX: 0, clientY: 0 })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: 0, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.from).to.equal('0');
      expect(el.to).to.equal(el.from);
    });

    it('Click near from thumb and click near to thumb has range slider on desktop', async () => {
      el.range = true;
      await elementUpdated(el);
      expect(el.from).to.equal('0');
      expect(el.to).to.equal('100');

      const clickFromPosition = tabSliderPosition(el, 20);
      const clickToPosition = tabSliderPosition(el, 80);

      // Click from
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: clickFromPosition,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(
        calculateValue(el, clickFromPosition).toString()
      );
      expect(el.to).to.equal('100');

      // Click to
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', { clientX: clickToPosition, clientY: 0 })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(
        calculateValue(el, clickFromPosition).toString()
      );
      expect(el.to).to.equal(calculateValue(el, clickToPosition).toString());
    });

    it('Event fires only when the "value-changed" in slider', async () => {
      expect(el.value).to.equal('0');

      let callCountValue = 0;
      el.addEventListener('value-changed', () => {
        callCountValue += 1;
      });

      const dragValuePositionFirst = tabSliderPosition(el, 10);
      const dragValuePositionSecond = tabSliderPosition(el, 30);
      const dragValuePositionLast = tabSliderPosition(el, 20);

      // Drag 'value' position 10 to 20
      // Drag start
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: dragValuePositionFirst,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.value).to.equal(
        calculateValue(el, dragValuePositionFirst).toString()
      );

      // Dragging
      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: dragValuePositionLast,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      // Darg end
      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', {
            clientX: dragValuePositionLast,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.value).to.equal(
        calculateValue(el, dragValuePositionLast).toString()
      );

      // Drag 'value' position 30 to 20
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: dragValuePositionSecond,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.value).to.equal(
        calculateValue(el, dragValuePositionSecond).toString()
      );

      // dragging
      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: dragValuePositionLast,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      // Drag end
      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', {
            clientX: dragValuePositionLast,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.value).to.equal(
        calculateValue(el, dragValuePositionLast).toString()
      );

      // Check call fire event
      expect(callCountValue).to.equal(1);
    });

    it('Event fires only when the "from-changed" and "to-changed" in slider range mode', async () => {
      el.range = true;
      await elementUpdated(el);
      expect(el.from).to.equal('0');
      expect(el.to).to.equal('100');

      let callCountFrom = 0;
      el.addEventListener('from-changed', () => {
        callCountFrom += 1;
      });

      let callCountTo = 0;
      el.addEventListener('to-changed', () => {
        callCountTo += 1;
      });

      const dragFromPositionFirst = tabSliderPosition(el, 10);
      const dragFromPositionSecond = tabSliderPosition(el, 30);
      const dragFromPositionLast = tabSliderPosition(el, 20);

      // Drag 'from' position 10 to 20
      // Drag start
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: dragFromPositionFirst,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(
        calculateValue(el, dragFromPositionFirst).toString()
      );

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: dragFromPositionLast,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', {
            clientX: dragFromPositionLast,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.from).to.equal(
        calculateValue(el, dragFromPositionLast).toString()
      );

      // Drag 'from' position 30 to 20
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: dragFromPositionSecond,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(
        calculateValue(el, dragFromPositionSecond).toString()
      );

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: dragFromPositionLast,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', {
            clientX: dragFromPositionLast,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.from).to.equal(
        calculateValue(el, dragFromPositionLast).toString()
      );

      const dragToPositionFirst = tabSliderPosition(el, 90);
      const dragToPositionSecond = tabSliderPosition(el, 60);
      const dragToPositionLast = tabSliderPosition(el, 50);

      // Drag 'to' position 90 to 50
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: dragToPositionFirst,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.to).to.equal(
        calculateValue(el, dragToPositionFirst).toString()
      );

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: dragToPositionLast,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: dragToPositionLast, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.to).to.equal(calculateValue(el, dragToPositionLast).toString());

      // Drag 'to' position 60 to 50
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: dragToPositionSecond,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.to).to.equal(
        calculateValue(el, dragToPositionSecond).toString()
      );

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: dragToPositionLast,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: dragToPositionLast, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.to).to.equal(calculateValue(el, dragToPositionLast).toString());

      // Check call fire event
      expect(callCountFrom).to.equal(1);
      expect(callCountTo).to.equal(1);
    });

    it('Drag thumb slider to right when has step="0.5"', async () => {
      el.min = '0';
      el.max = '10';
      el.step = '0.5';

      await elementUpdated(el);

      const clickPositionRight = tabSliderPosition(el, 100);

      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown'))
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: clickPositionRight,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: clickPositionRight, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');

      expect(el.dragging).to.be.false;
      expect(el.value).to.equal(
        calculateValue(el, clickPositionRight).toString()
      );
    });

    it('Drag thumb slider to right when has min="0.1"', async () => {
      el.min = '0.1';
      el.max = '10';
      el.step = '0.5';

      await elementUpdated(el);

      const clickPositionRight = tabSliderPosition(el, 100);

      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: clickPositionRight,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;

      setTimeout(() =>
        el.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: clickPositionRight,
            clientY: 0,
          })
        )
      );
      await oneEvent(el, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: clickPositionRight, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.value).to.equal(
        calculateValue(el, clickPositionRight).toString()
      );
    });

    it('Drag thumb slider to right when has max="10.1"', async () => {
      el.min = '0';
      el.max = '10.1';
      el.step = '0.5';

      await elementUpdated(el);

      const clickPositionRight = tabSliderPosition(el, 100);

      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: clickPositionRight,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;

      setTimeout(() =>
        el.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: clickPositionRight,
            clientY: 0,
          })
        )
      );
      await oneEvent(el, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: clickPositionRight, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.value).to.equal(
        calculateValue(el, clickPositionRight).toString()
      );
    });

    it('Drag thumb slider to left and right when has min="0.3", max="10.1" and step="0.5"', async () => {
      el.min = '0.3';
      el.max = '10.1';
      el.step = '0.5';

      await elementUpdated(el);

      // Drag to left
      const clickPositionLeft = tabSliderPosition(el, 0);

      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: clickPositionLeft,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;

      setTimeout(() =>
        el.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: clickPositionLeft,
            clientY: 0,
          })
        )
      );
      await oneEvent(el, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: clickPositionLeft, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;

      expect(el.value).to.equal(
        calculateValue(el, clickPositionLeft).toString()
      );

      await elementUpdated(el);

      // Drag to right
      const clickPositionRight = tabSliderPosition(el, 100);

      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: clickPositionRight,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;

      setTimeout(() =>
        el.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: clickPositionRight,
            clientY: 0,
          })
        )
      );
      await oneEvent(el, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: clickPositionRight, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.value).to.equal(
        calculateValue(el, clickPositionRight).toString()
      );
    });

    it('Drag thumb slider range to left and right when has min="0.1"', async () => {
      el.range = true;
      el.min = '0.1';
      el.max = '10';
      await elementUpdated(el);

      const clickPositionLeft = tabSliderPosition(el, 0);
      const clickPositionRight = tabSliderPosition(el, 100);

      // Drag from
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: clickPositionLeft,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(
        calculateValue(el, clickPositionLeft).toString()
      );
      expect(el.to).to.equal(el.max);

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: clickPositionLeft,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: clickPositionLeft, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.from).to.equal(
        calculateValue(el, clickPositionLeft).toString()
      );
      expect(el.to).to.equal(el.max);

      await elementUpdated(el);

      // Drag to

      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: clickPositionRight,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(
        calculateValue(el, clickPositionLeft).toString()
      );
      expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: clickPositionRight,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: clickPositionRight, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.from).to.equal(
        calculateValue(el, clickPositionLeft).toString()
      );
      expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());
    });

    it('Drag thumb slider range to left and right when has max="10"', async () => {
      el.range = true;
      el.min = '0';
      el.max = '10.1';
      await elementUpdated(el);

      const clickPositionLeft = tabSliderPosition(el, 0);
      const clickPositionRight = tabSliderPosition(el, 100);

      // Drag from
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: clickPositionLeft,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(
        calculateValue(el, clickPositionLeft).toString()
      );
      expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: clickPositionLeft,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: clickPositionLeft, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.from).to.equal(
        calculateValue(el, clickPositionLeft).toString()
      );
      expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());

      await elementUpdated(el);

      // Drag to
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: clickPositionRight,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(
        calculateValue(el, clickPositionLeft).toString()
      );
      expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: clickPositionRight,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: clickPositionRight, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.from).to.equal(
        calculateValue(el, clickPositionLeft).toString()
      );
      expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());
    });

    it('Drag thumb slider range when has min="0.1", max="10" and step="0.5"', async () => {
      el.range = true;
      el.min = '0.1';
      el.max = '10.1';
      el.step = '0.5';

      await elementUpdated(el);

      const clickPositionLeft = tabSliderPosition(el, 0);
      const clickPositionRight = tabSliderPosition(el, 100);

      // Drag from
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: clickPositionLeft,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(
        calculateValue(el, clickPositionLeft).toString()
      );
      expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: clickPositionLeft,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: clickPositionLeft, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.from).to.equal(
        calculateValue(el, clickPositionLeft).toString()
      );
      expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());

      await elementUpdated(el);

      // Drag to
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: clickPositionRight,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(
        calculateValue(el, clickPositionLeft).toString()
      );
      expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: clickPositionRight,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: clickPositionRight, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.from).to.equal(
        calculateValue(el, clickPositionLeft).toString()
      );
      expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());
    });

    it('Drag thumb slider range when has min-range more than step', async () => {
      el.range = true;
      el.min = '0.1';
      el.max = '10.1';
      el.step = '0.5';
      el.minRange = '2';

      await elementUpdated(el);

      const dragPosition20 = tabSliderPosition(el, 20);
      const dragPosition40 = tabSliderPosition(el, 40);
      const dragPosition60 = tabSliderPosition(el, 60);
      const dragPosition80 = tabSliderPosition(el, 80);
      const dragPosition100 = tabSliderPosition(el, 100);

      // Drag from
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', { clientX: dragPosition20, clientY: 0 })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(calculateValue(el, dragPosition20).toString());
      expect(el.to).to.equal(calculateValue(el, dragPosition100).toString());

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', { clientX: dragPosition40, clientY: 0 })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: dragPosition40, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.from).to.equal(calculateValue(el, dragPosition40).toString());
      expect(el.to).to.equal(calculateValue(el, dragPosition100).toString());

      await elementUpdated(el);

      // Drag to
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', { clientX: dragPosition80, clientY: 0 })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(calculateValue(el, dragPosition40).toString());
      expect(el.to).to.equal(calculateValue(el, dragPosition80).toString());

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', { clientX: dragPosition40, clientY: 0 })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: dragPosition40, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;

      expect(el.from).to.equal(calculateValue(el, dragPosition40).toString());
      expect(el.to).to.equal(calculateValue(el, dragPosition60).toString());
    });

    it('Drag thumb slider range when has min-range less more step', async () => {
      el.range = true;
      el.min = '0.1';
      el.max = '10.1';
      el.step = '1';
      el.minRange = '0.5';

      await elementUpdated(el);

      const dragPosition20 = tabSliderPosition(el, 20);
      const dragPosition40 = tabSliderPosition(el, 40);
      const dragPosition80 = tabSliderPosition(el, 80);
      const dragPosition100 = tabSliderPosition(el, 100);

      // Drag from
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', { clientX: dragPosition20, clientY: 0 })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(calculateValue(el, dragPosition20).toString());
      expect(el.to).to.equal(calculateValue(el, dragPosition100).toString());

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', { clientX: dragPosition40, clientY: 0 })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: dragPosition40, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.from).to.equal(calculateValue(el, dragPosition40).toString());
      expect(el.to).to.equal(calculateValue(el, dragPosition100).toString());

      await elementUpdated(el);

      // Drag to
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', { clientX: dragPosition80, clientY: 0 })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(calculateValue(el, dragPosition40).toString());
      expect(el.to).to.equal(calculateValue(el, dragPosition80).toString());

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', { clientX: dragPosition40, clientY: 0 })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: dragPosition40, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;

      expect(el.from).to.equal(calculateValue(el, dragPosition40).toString());
      expect(el.to).to.equal(calculateValue(el, dragPosition40).toString());
    });

    it('Drag thumb slider to the right when value decimal boundary more than max decimal', async () => {
      el.min = '-0.251';
      el.max = '0.1534';
      el.step = '0.01235';
      el.value = '0';

      await elementUpdated(el);
      const dragPositionToRight = tabSliderPosition(el, 100);

      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: dragPositionToRight,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;

      setTimeout(() =>
        el.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: dragPositionToRight,
            clientY: 0,
          })
        )
      );
      await oneEvent(el, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', {
            clientX: dragPositionToRight,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;

      expect(el.value).to.equal(
        calculateValue(el, dragPositionToRight).toString()
      );
    });

    it('Drag thumb slider range "to" and "from" to position the right when value decimal boundary more than max decimal', async () => {
      el.range = true;
      el.min = '-0.251';
      el.max = '0.1534';
      el.step = '0.01235';
      el.value = '0';

      const dragPosition0 = tabSliderPosition(el, 0);
      const dragPosition20 = tabSliderPosition(el, 20);
      const dragPosition80 = tabSliderPosition(el, 80);
      const dragPosition100 = tabSliderPosition(el, 100);

      await elementUpdated(el);

      // Drag to
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', { clientX: dragPosition80, clientY: 0 })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(calculateValue(el, dragPosition0).toString());
      expect(el.to).to.equal(calculateValue(el, dragPosition80).toString());

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', { clientX: dragPosition100, clientY: 0 })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: dragPosition100, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;

      expect(el.from).to.equal(calculateValue(el, dragPosition0).toString());
      expect(el.to).to.equal(calculateValue(el, dragPosition100).toString());

      // Drag from
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', { clientX: dragPosition20, clientY: 0 })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(calculateValue(el, dragPosition20).toString());
      expect(el.to).to.equal(calculateValue(el, dragPosition100).toString());

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', { clientX: dragPosition100, clientY: 0 })
        )
      );
      await oneEvent(window, 'mousemove');

      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: dragPosition100, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.from).to.equal(calculateValue(el, dragPosition100).toString());
      expect(el.to).to.equal(calculateValue(el, dragPosition100).toString());
    });

    it('Event value-changed should not fired when property programmatically set', async () => {
      const slider = await fixture('<ef-slider></ef-slider>');
      let eventCount = 0;
      slider.addEventListener('value-changed', () => {
        eventCount += 1;
      });

      // Set property programmatically
      slider.value = 90;
      await elementUpdated(slider);
      expect(eventCount, 'Event "value-changed" should not fired').to.equal(0);
      expect(slider.value).to.equal('90');
    });

    it('Event from-changed and to-changed should not fired when property programmatically set', async () => {
      const slider = await fixture('<ef-slider></ef-slider>');

      let fromEventFiredCount = 0;
      slider.addEventListener('from-changed', (event) => {
        fromEventFiredCount += 1;
      });

      let toEventFiredCount = 0;
      slider.addEventListener('to-changed', (event) => {
        toEventFiredCount += 1;
      });

      slider.range = true;

      // Set property programmatically
      slider.from = 40;
      await elementUpdated(slider);
      expect(
        fromEventFiredCount,
        'Event "from-changed" should not fired'
      ).to.equal(0);
      expect(slider.from).to.equal('40');

      // Set property programmatically
      slider.to = 90;
      await elementUpdated(slider);
      expect(toEventFiredCount, 'Event "to-changed" should not fired').to.equal(
        0
      );
      expect(slider.to).to.equal('90');
    });

    it('Event value-changed should fires when value property was set via api and drag the slider back to previous value', async () => {
      expect(el.value).to.equal('0');
      el.value = 10;
      await elementUpdated();
      expect(el.value).to.equal('10');

      let callCountValue = 0;
      el.addEventListener('value-changed', () => {
        callCountValue += 1;
      });

      // Drag 'value' position 10 to 0
      const dragValuePositionStart = tabSliderPosition(el, 0);
      const dragValuePositionFirst = tabSliderPosition(el, 10);
      // Drag start
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: dragValuePositionFirst,
            clientY: 0,
          })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.value).to.equal(
        calculateValue(el, dragValuePositionFirst).toString()
      );

      // Dragging
      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: dragValuePositionStart,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      // Darg end
      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', {
            clientX: dragValuePositionStart,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.value).to.equal(
        calculateValue(el, dragValuePositionStart).toString()
      );

      // Check call fire event
      expect(callCountValue).to.equal(1);
    });

    it('Event from-changed should fires when from property was set via api and drag the slider back to previous value', async () => {
      el.range = true;
      await elementUpdated(el);
      expect(el.from).to.equal('0');
      expect(el.to).to.equal('100');

      el.from = 10;
      await elementUpdated();
      expect(el.from).to.equal('10');

      let callCountValue = 0;
      el.addEventListener('from-changed', () => {
        callCountValue += 1;
      });

      // Drag 'from' position 10 to 0
      const dragPositionStart = tabSliderPosition(el, 0);
      const dragPosition10 = tabSliderPosition(el, 10);

      // Drag start
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', { clientX: dragPosition10, clientY: 0 })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.from).to.equal(calculateValue(el, dragPosition10).toString());

      // Dragging
      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: dragPositionStart,
            clientY: 0,
          })
        )
      );
      await oneEvent(window, 'mousemove');

      // Darg end
      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: dragPositionStart, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.from).to.equal(
        calculateValue(el, dragPositionStart).toString()
      );

      // Check call fire event
      expect(callCountValue).to.equal(1);
    });

    it('Event to-changed should fires when to property was set via api and drag the slider back to previous value', async () => {
      el.range = true;
      await elementUpdated(el);
      expect(el.from).to.equal('0');
      expect(el.to).to.equal('100');

      el.to = 80;
      await elementUpdated();
      expect(el.to).to.equal('80');

      let callCountValue = 0;
      el.addEventListener('to-changed', () => {
        callCountValue += 1;
      });

      // Drag 'to' position 80 to 100
      const dragPositionEnd = tabSliderPosition(el, 100);
      const dragPosition80 = tabSliderPosition(el, 80);

      // Drag start
      setTimeout(() =>
        el.sliderRef.value.dispatchEvent(
          new MouseEvent('mousedown', { clientX: dragPosition80, clientY: 0 })
        )
      );
      await oneEvent(el.sliderRef.value, 'mousedown');
      expect(el.dragging).to.be.true;
      expect(el.to).to.equal(calculateValue(el, dragPosition80).toString());

      // Dragging
      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mousemove', { clientX: dragPositionEnd, clientY: 0 })
        )
      );
      await oneEvent(window, 'mousemove');

      // Darg end
      setTimeout(() =>
        window.dispatchEvent(
          new MouseEvent('mouseup', { clientX: dragPositionEnd, clientY: 0 })
        )
      );
      await oneEvent(window, 'mouseup');
      expect(el.dragging).to.be.false;
      expect(el.to).to.equal(calculateValue(el, dragPositionEnd).toString());

      // Check call fire event
      expect(callCountValue).to.equal(1);
    });
  });
});
