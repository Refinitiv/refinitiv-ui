// import element and theme
import '@refinitiv-ui/elements/datetime-picker';

import '@refinitiv-ui/halo-theme/light/ef-datetime-picker.js';
import { elementUpdated, expect, fixture, nextFrame, oneEvent } from '@refinitiv-ui/test-helpers';

import { fireKeydownEvent } from './utils.js';

describe('datetime-picker/Navigation', function () {
  describe('Navigation', function () {
    it('Clicking on datetime picker icon should open/close calendar and fire opened-changed event', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb"></ef-datetime-picker>');
      const iconEl = el.iconEl;

      setTimeout(() => iconEl.click());
      await elementUpdated(el);
      let event = await oneEvent(el, 'opened-changed');
      expect(el.opened).to.be.equal(true, 'Clicking on icon should open calendar');
      expect(event.detail.value).to.be.equal(true, 'opened-changed event is wrong');

      setTimeout(() => iconEl.click());
      await elementUpdated(el);
      event = await oneEvent(el, 'opened-changed');
      expect(el.opened).to.be.equal(false, 'Clicking on icon again should close calendar');
      expect(event.detail.value).to.be.equal(false, 'opened-changed event is wrong');
    });
    it('Clicking on datetime picker should open calendar', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb"></ef-datetime-picker>');
      el.click();
      await elementUpdated(el);
      expect(el.opened).to.be.equal(true, 'Clicking on calendar area should open calendar');
      el.click();
      await elementUpdated(el);
      expect(el.opened).to.be.equal(true, 'Clicking on calendar area again should not close calendar');
    });
    it('Arrow Down/Up should open/close calendar', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb"></ef-datetime-picker>');
      fireKeydownEvent(el, 'ArrowDown');
      await elementUpdated(el);
      expect(el.opened).to.be.equal(true, 'Arrow down should open calendar');
      fireKeydownEvent(el, 'ArrowUp');
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Arrow up should close calendar');
    });
    it('Escape should close calendar', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened></ef-datetime-picker>');
      fireKeydownEvent(el.calendarEl, 'Escape');
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Escape should close calendar');
    });
    it('Escape on input should close calendar', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened></ef-datetime-picker>');
      fireKeydownEvent(el.inputEl, 'Escape');
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Escape should close calendar');
    });
    it('Enter key on input should open calendar', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb"></ef-datetime-picker>');
      fireKeydownEvent(el.inputEl, 'Enter');
      await elementUpdated(el);
      expect(el.opened).to.be.equal(true, 'Enter should open calendar');
    });
    it('Clicking on outside should close calendar', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened></ef-datetime-picker>');
      document.dispatchEvent(new CustomEvent('tapstart'));
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Clicking on document body should close calendar');
    });
    it('It should not be possible to open disabled calendar', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb" disabled></ef-datetime-picker>');
      el.click();
      expect(el.opened).to.be.equal(false, 'Clicking on disabled should do nothing');
    });
    it('Calendar should close itself if becomes disabled', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened></ef-datetime-picker>');
      el.disabled = true;
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Setting disabled should close calendar');
    });
    it('Should not close calendar when preventCloseOnSelect is true in single mode', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" opened prevent-close-on-select></ef-datetime-picker>'
      );
      await elementUpdated(el);

      const calendarEl = el.calendarEl;
      const cell = calendarEl.shadowRoot.querySelector('div[tabindex]'); // Select a date cell
      cell.click();
      await elementUpdated(el);

      expect(el.opened).to.be.equal(true, 'Calendar should remain open when preventCloseOnSelect is true');
    });
    it('Should not close calendar when preventCloseOnSelect is true in range mode', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" opened range duplex prevent-close-on-select></ef-datetime-picker>'
      );
      el.views = ['2020-04', '2020-05'];
      await elementUpdated(el);
      await nextFrame();
      await nextFrame();

      const calendarFromEl = el.calendarFromEl;
      const fromCell = calendarFromEl.shadowRoot.querySelector('div[tabindex]'); // Select a date in the "from" calendar
      fromCell.click();
      await elementUpdated(el);
      await nextFrame();

      const calendarToEl = el.calendarToEl;
      const toCell = calendarToEl.shadowRoot.querySelector('div[tabindex]'); // Select a date in the "to" calendar
      toCell.click();
      await elementUpdated(el);
      await nextFrame();

      expect(el.opened).to.be.equal(
        true,
        'Calendar should remain open when preventCloseOnSelect is true in range mode'
      );
    });
    it('Should not close calendar when preventCloseOnSelect is true with timepicker', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" opened timepicker prevent-close-on-select></ef-datetime-picker>'
      );
      await elementUpdated(el);

      const calendarEl = el.calendarEl;
      const cell = calendarEl.shadowRoot.querySelector('div[tabindex]'); // Select a date cell
      cell.click();
      await elementUpdated(el);

      const timepickerEl = el.timepickerEl;
      timepickerEl.value = '12:30'; // Simulate time selection
      await elementUpdated(el);

      expect(el.opened).to.be.equal(
        true,
        'Calendar should remain open when preventCloseOnSelect is true with timepicker'
      );
    });
    it('Should close calendar when preventCloseOnSelect is false', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened></ef-datetime-picker>');
      await elementUpdated(el);

      const calendarEl = el.calendarEl;
      const cell = calendarEl.shadowRoot.querySelector('div[tabindex]'); // Select a date cell
      cell.click();
      await elementUpdated(el);

      expect(el.opened).to.be.equal(false, 'Calendar should close when preventCloseOnSelect is false');
    });
  });
});
