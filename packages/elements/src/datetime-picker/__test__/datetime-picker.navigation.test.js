import {
  fixture,
  expect,
  elementUpdated,
  oneEvent
} from '@refinitiv-ui/test-helpers';
import { fireKeydownEvent, buttonElement } from './utils';

// import element and theme
import '@refinitiv-ui/elements/datetime-picker';
import '@refinitiv-ui/elemental-theme/light/ef-datetime-picker';

describe('datetime-picker/Navigation', () => {
  describe('Navigation', () => {
    it('Clicking on datetime picker button should open calendar and fire opened-changed event', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb"></ef-datetime-picker>');
      const buttonEl = buttonElement(el);
      setTimeout(() => buttonEl.click());
      await elementUpdated(el);
      const event = await oneEvent(el, 'opened-changed');
      expect(el.opened).to.be.equal(true, 'Clicking on icon should open calendar');
      expect(event.detail.value).to.be.equal(true, 'opened-changed event is wrong');
    });
    it('Tab on button should open calendar', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb"></ef-datetime-picker>');
      buttonElement(el).dispatchEvent(new CustomEvent('tap'));
      await elementUpdated(el);
      expect(el.opened).to.be.equal(true, 'Tab should open calendar');
    });
    it('Esc should close calendar', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened></ef-datetime-picker>');
      fireKeydownEvent(el, 'Esc');
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Esc should close calendar');
    });
    it('Escape should close calendar', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened></ef-datetime-picker>');
      fireKeydownEvent(el, 'Escape');
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Escape should close calendar');
    });
    it('Clicking on outside should close calendar', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened></ef-datetime-picker>');
      document.dispatchEvent(new CustomEvent('tapstart'));
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Clicking on document body should close calendar');
    });
    it('It should not be possible to open disabled calendar', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" disabled></ef-datetime-picker>');
      el.click();
      expect(el.opened).to.be.equal(false, 'Clicking on disabled should do nothing');
    });
    it('Calendar should close itself if becomes disabled', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened></ef-datetime-picker>');
      el.disabled = true;
      await elementUpdated(el);
      expect(el.opened).to.be.equal(false, 'Setting disabled should close calendar');
    });
  });
});
