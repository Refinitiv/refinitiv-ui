import {
  fixture,
  expect,
  elementUpdated,
  oneEvent
} from '@refinitiv-ui/test-helpers';
import { fireKeydownEvent } from './utils';

// import element and theme
import '@refinitiv-ui/elements/datetime-picker';
import '@refinitiv-ui/elemental-theme/light/ef-datetime-picker';

describe('datetime-picker/Navigation', () => {
  describe('Navigation', () => {
    it('Clicking on datetime picker icon should open/close calendar and fire opened-changed event', async () => {
      const el = await fixture('<ef-datetime-picker></ef-datetime-picker>');
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
    it('Clicking on datetime picker should open calendar', async () => {
      const el = await fixture('<ef-datetime-picker></ef-datetime-picker>');
      el.click();
      await elementUpdated(el);
      expect(el.opened).to.be.equal(true, 'Clicking on calendar area should open calendar');
      el.click();
      await elementUpdated(el);
      expect(el.opened).to.be.equal(true, 'Clicking on calendar area again should not close calendar');
    });
    it('Arrow Down/Up should open/close calendar', async () => {
      const el = await fixture('<ef-datetime-picker></ef-datetime-picker>');
      fireKeydownEvent(el, 'ArrowDown');
      await elementUpdated(el);
      expect(el.opened).to.be.equal(true, 'Arrow down should open calendar');
      fireKeydownEvent(el, 'ArrowUp');
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Arrow up should close calendar');
      fireKeydownEvent(el, 'Down');
      await elementUpdated(el);
      expect(el.opened).to.be.equal(true, 'Down should open calendar');
      fireKeydownEvent(el, 'Up');
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Up should close calendar');
    });
    it('Esc should close calendar', async () => {
      const el = await fixture('<ef-datetime-picker opened></ef-datetime-picker>');
      fireKeydownEvent(el.calendarEl, 'Esc');
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Esc should close calendar');
    });
    it('Escape should close calendar', async () => {
      const el = await fixture('<ef-datetime-picker opened></ef-datetime-picker>');
      fireKeydownEvent(el.calendarEl, 'Escape');
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Escape should close calendar');
    });
    it('Esc on input should close calendar', async () => {
      const el = await fixture('<ef-datetime-picker opened></ef-datetime-picker>');
      fireKeydownEvent(el.inputEl, 'Esc');
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Esc should close calendar');
    });
    it('Escape on input should close calendar', async () => {
      const el = await fixture('<ef-datetime-picker opened></ef-datetime-picker>');
      fireKeydownEvent(el.inputEl, 'Escape');
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Escape should close calendar');
    });
    it('Enter key on input should open calendar', async () => {
      const el = await fixture('<ef-datetime-picker></ef-datetime-picker>');
      fireKeydownEvent(el.inputEl, 'Enter');
      await elementUpdated(el);
      expect(el.opened).to.be.equal(true, 'Enter should open calendar');
    });
    it('Clicking on outside should close calendar', async () => {
      const el = await fixture('<ef-datetime-picker opened></ef-datetime-picker>');
      document.dispatchEvent(new CustomEvent('tapstart'));
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Clicking on document body should close calendar');
    });
    it('It should not be possible to open disabled calendar', async () => {
      const el = await fixture('<ef-datetime-picker disabled></ef-datetime-picker>');
      el.click();
      expect(el.opened).to.be.equal(false, 'Clicking on disabled should do nothing');
    });
    it('Calendar should close itself if becomes disabled', async () => {
      const el = await fixture('<ef-datetime-picker opened></ef-datetime-picker>');
      el.disabled = true;
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Setting disabled should close calendar');
    });
  });
});
