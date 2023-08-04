import '@refinitiv-ui/elements/slider';

import '@refinitiv-ui/elemental-theme/light/ef-slider';
import { elementUpdated, expect, fixture, keyboardEvent } from '@refinitiv-ui/test-helpers';

const ArrowUpEvent = keyboardEvent('keydown', { key: 'ArrowUp' });
const ArrowDownEvent = keyboardEvent('keydown', { key: 'ArrowDown' });
const HomeEvent = keyboardEvent('keydown', { key: 'Home' });
const EndEvent = keyboardEvent('keydown', { key: 'End' });

const getThumbs = (el) => el.shadowRoot.querySelectorAll('[part=thumb-container]');

describe('slider/Keyboard', function () {
  let el;
  let thumb;

  describe('Default', function () {
    const value = 5;
    const step = 1;

    beforeEach(async function () {
      el = await fixture(`<ef-slider value="${value}" step="${step}"></ef-slider>`);
      thumb = getThumbs(el)[0];
    });

    it('Should do nothing when readonly', function () {
      el.readonly = true;
      thumb.dispatchEvent(ArrowUpEvent);
      expect(el.value).to.be.equal(value.toString());
    });
    it('Should increase value by 1 on ArrowUp key press', function () {
      thumb.dispatchEvent(ArrowUpEvent);
      expect(el.value).to.be.equal((value + step).toString());
    });
    it('Should decrease value by 1 on ArrowDown key press', function () {
      thumb.dispatchEvent(ArrowDownEvent);
      expect(el.value).to.be.equal((value - step).toString());
    });
    it('Should increase value by 2 on ArrowUp key press twice', function () {
      thumb.dispatchEvent(ArrowUpEvent);
      thumb.dispatchEvent(ArrowUpEvent);
      expect(el.value).to.be.equal((value + step + step).toString());
    });
  });
  describe('Step', function () {
    const value = 6;
    const min = 3;
    const max = 12;
    const step = 3;

    beforeEach(async function () {
      el = await fixture(`<ef-slider value="${value}" min="${min}" max="${max}" step="${step}"></ef-slider>`);
      thumb = getThumbs(el)[0];
    });

    it(`Should increase value by ${step} on ArrowUp key press when step is ${step}`, function () {
      thumb.dispatchEvent(ArrowUpEvent);
      expect(el.value).to.be.equal((value + step).toString());
    });
    it(`Should decrease value by ${step} on ArrowDown key press when step is ${step}`, function () {
      thumb.dispatchEvent(ArrowDownEvent);
      expect(el.value).to.be.equal((value - step).toString());
    });
    it('Should try to match nearest step value when value is invalid on ArrowUp', async function () {
      el.value = 7;
      await elementUpdated(el);
      thumb.dispatchEvent(ArrowUpEvent);
      expect(el.value).to.be.equal((value + step).toString());
    });
    it('Should try to match nearest step value when value is invalid on ArrowDown', async function () {
      el.value = 5;
      await elementUpdated(el);
      thumb.dispatchEvent(ArrowDownEvent);
      expect(el.value).to.be.equal((value - step).toString());
    });
  });
  describe('Range', function () {
    const from = 10;
    const to = 20;
    const min = 0;
    const max = 30;
    const step = 5;

    let fromThumb;
    let toThumb;

    beforeEach(async function () {
      el = await fixture(
        `<ef-slider from="${from}" to="${to}" min="${min}" max="${max}" step="${step}" range></ef-slider>`
      );
      fromThumb = getThumbs(el)[0];
      toThumb = getThumbs(el)[1];
    });
    it('Should prevent from value from going below min', function () {
      fromThumb.dispatchEvent(ArrowDownEvent);
      fromThumb.dispatchEvent(ArrowDownEvent);
      fromThumb.dispatchEvent(ArrowDownEvent);
      expect(el.from).to.be.equal(min.toString());
    });
    it('Should prevent from value from going above to value', function () {
      fromThumb.dispatchEvent(ArrowUpEvent);
      fromThumb.dispatchEvent(ArrowUpEvent);
      fromThumb.dispatchEvent(ArrowUpEvent);
      expect(el.from).to.be.equal(to.toString());
    });
    it('Should prevent to value from going below from value', function () {
      toThumb.dispatchEvent(ArrowDownEvent);
      toThumb.dispatchEvent(ArrowDownEvent);
      toThumb.dispatchEvent(ArrowDownEvent);
      expect(el.to).to.be.equal(from.toString());
    });
    it('Should prevent to value from going above from max', function () {
      toThumb.dispatchEvent(ArrowUpEvent);
      toThumb.dispatchEvent(ArrowUpEvent);
      toThumb.dispatchEvent(ArrowUpEvent);
      expect(el.to).to.be.equal(max.toString());
    });
    it('Should decrease from value when ArrowDown is pressed on from thumb', function () {
      fromThumb.dispatchEvent(ArrowDownEvent);
      expect(el.from).to.be.equal((from - step).toString());
    });
    it('Should increase from value when ArrowUp is pressed on from thumb', function () {
      fromThumb.dispatchEvent(ArrowUpEvent);
      expect(el.from).to.be.equal((from + step).toString());
    });
    it('Should decrease to value when ArrowDown is pressed on to thumb', function () {
      toThumb.dispatchEvent(ArrowDownEvent);
      expect(el.to).to.be.equal((to - step).toString());
    });
    it('Should increase to value when ArrowUp is pressed on to thumb', function () {
      toThumb.dispatchEvent(ArrowUpEvent);
      expect(el.to).to.be.equal((to + step).toString());
    });
    it('Should set value to minimum value possible when Home is pressed on to thumb', function () {
      toThumb.dispatchEvent(HomeEvent);
      expect(el.to).to.be.equal(from.toString());
    });
    it('Should set value to maximum value possible when End is pressed on to thumb', function () {
      toThumb.dispatchEvent(EndEvent);
      expect(el.to).to.be.equal(max.toString());
    });
    it('Should set value to minimum value with min-range into account when Home is pressed on to thumb', function () {
      el.minRange = 5;
      toThumb.dispatchEvent(HomeEvent);
      expect(el.to).to.be.equal((from + el.minRange).toString());
    });
    it('Should set value to minimum value possible when Home is pressed on from thumb', function () {
      fromThumb.dispatchEvent(HomeEvent);
      expect(el.from).to.be.equal(min.toString());
    });
    it('Should set value to maximum value possible when End is pressed on from thumb', function () {
      fromThumb.dispatchEvent(EndEvent);
      expect(el.from).to.be.equal(to.toString());
    });
    it('Should set value to maximum value with min-range into account when End is pressed on from thumb', function () {
      el.minRange = 5;
      fromThumb.dispatchEvent(EndEvent);
      expect(el.from).to.be.equal((to - el.minRange).toString());
    });
  });
});
