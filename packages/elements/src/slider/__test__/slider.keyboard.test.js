import {
  fixture,
  expect,
  keyboardEvent,
  elementUpdated,
} from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/slider';
import '@refinitiv-ui/elemental-theme/light/ef-slider';

const ArrowUpEvent = keyboardEvent('keydown', { key: 'ArrowUp' });
const ArrowDownEvent = keyboardEvent('keydown', { key: 'ArrowDown' });

describe('slider/Keyboard', () => {
  describe('Keyboard interaction', () => {
    let el;
    let thumb;

    describe('Default', () => {
      const value = 5;
      const step = 1;

      beforeEach(async () => {
        el = await fixture(
          `<ef-slider value="${value}"  step="${step}"></ef-slider>`
        );
        thumb = el.shadowRoot.querySelector('[part=thumb-container]');
      });

      it('Should increase value by 1 on ArrowUp key press', () => {
        thumb.dispatchEvent(ArrowUpEvent);
        expect(el.value).to.be.equal((value + step).toString());
      });
      it('Should decrease value by 1 on ArrowDown key press', () => {
        thumb.dispatchEvent(ArrowDownEvent);
        expect(el.value).to.be.equal((value - step).toString());
      });
      it('Should increase value by 2 on ArrowUp key press twice', () => {
        thumb.dispatchEvent(ArrowUpEvent);
        thumb.dispatchEvent(ArrowUpEvent);
        expect(el.value).to.be.equal((value + step + step).toString());
      });
    });
    describe('Step', () => {
      const value = 6;
      const min = 3;
      const max = 12;
      const step = 3;

      beforeEach(async () => {
        el = await fixture(
          `<ef-slider value="${value}" min="${min}" max="${max}"  step="${step}"></ef-slider>`
        );
        thumb = el.shadowRoot.querySelector('[part=thumb-container]');
      });

      it(`Should increase value by ${step} on ArrowUp key press when step is ${step}`, () => {
        thumb.dispatchEvent(ArrowUpEvent);
        expect(el.value).to.be.equal((value + step).toString());
      });
      it(`Should decrease value by ${step} on ArrowDown key press when step is ${step}`, () => {
        thumb.dispatchEvent(ArrowDownEvent);
        expect(el.value).to.be.equal((value - step).toString());
      });
      it(`Should try to match nearest step value when value is invalid on ArrowUp`, async () => {
        el.value = 7;
        await elementUpdated(el);
        thumb.dispatchEvent(ArrowUpEvent);
        expect(el.value).to.be.equal((value + step).toString());
      });
      it(`Should try to match nearest step value when value is invalid on ArrowDown`, async () => {
        el.value = 5;
        await elementUpdated(el);
        thumb.dispatchEvent(ArrowDownEvent);
        expect(el.value).to.be.equal((value - step).toString());
      });
    });
  });
});
