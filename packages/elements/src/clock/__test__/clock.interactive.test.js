import { fixture, expect, elementUpdated, oneEvent, keyboardEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/clock';
import '@refinitiv-ui/elemental-theme/light/ef-clock.js';

describe('clock/Interactive', () => {
  describe('Interactive', () => {
    let el;
    let hoursSegment;
    let minutesSegment;

    const onTapstart = async (target, el) => {
      setTimeout(() =>
        target.dispatchEvent(new CustomEvent('tapstart', { bubbles: true }))
      );
      await oneEvent(el.renderRoot, 'tapstart');
      await elementUpdated(el);
    }

    const InputKey = {
      arrowUp: {
        ieKey: 'Up',
        key: 'ArrowUp',
        which: 38,
        keyCode: 38
      },
      arrowDown: {
        ieKey: 'Down',
        key: 'ArrowDown',
        which: 40,
        keyCode: 40
      }
    };

    const createKeyboardEvent = (elem, keyOption) => {
      keyOption = Object.assign({ bubbles: true }, keyOption);
      elem.dispatchEvent(keyboardEvent('keydown', keyOption));
      elem.dispatchEvent(keyboardEvent('keypress', keyOption));
      elem.dispatchEvent(keyboardEvent('keyup', keyOption));
    };

    beforeEach(async () => {
      el = await fixture('<ef-clock interactive></ef-clock>');
      hoursSegment = el.shadowRoot.querySelector('[part~=hours]');
      minutesSegment = el.shadowRoot.querySelector('[part~=minutes]');
    });

    it('Increases hour when increase button is clicked', async () => {
      const incrementBtn = hoursSegment.querySelector('[part=increment-button]');

      await onTapstart(hoursSegment, el);
      await onTapstart(incrementBtn, el);

      expect(el.offset, 'offset should be 3600').to.be.equal(3600);
      expect(el.displayHours, 'hours should be 1').to.be.equal(1);
    });
    it('Decreases hour when decrease button is clicked', async () => {
      const decrementBtn = hoursSegment.querySelector('[part=decrement-button]');

      await onTapstart(hoursSegment, el);
      await onTapstart(decrementBtn, el);

      expect(el.offset, 'offset should be 82800').to.be.equal(82800);
      expect(el.displayHours, 'hours should be 23').to.be.equal(23);
    });
    it('Increases hour when arrow Up is pressed', async () => {
      await onTapstart(hoursSegment, el);
      createKeyboardEvent(el, InputKey.arrowUp);
      await elementUpdated(el);

      expect(el.offset, 'offset should be 3600').to.be.equal(3600);
      expect(el.displayHours, 'hours should be 1').to.be.equal(1);
    });
    it('Decreases hour when arrow Down is pressed', async () => {
      await onTapstart(hoursSegment, el);
      createKeyboardEvent(el, InputKey.arrowDown);
      await elementUpdated(el);

      expect(el.offset, 'offset should be 82800').to.be.equal(82800);
      expect(el.displayHours, 'hours should be 23').to.be.equal(23);
    });
    it('Increases minute when increase button is clicked', async () => {
      const incrementBtn = minutesSegment.querySelector('[part=increment-button]');

      await onTapstart(minutesSegment, el);
      await onTapstart(incrementBtn, el);

      expect(el.offset, 'offset should be 60').to.be.equal(60);
      expect(el.displayMinutes, 'minutes should be 1').to.be.equal(1);
    });
    it('Decreases minute when decrease button is clicked', async () => {
      const decrementBtn = minutesSegment.querySelector('[part=decrement-button]');

      await onTapstart(minutesSegment, el);
      await onTapstart(decrementBtn, el);

      expect(el.offset, 'offset should be 86340').to.be.equal(86340);
      expect(el.displayMinutes, 'minutes should be 59').to.be.equal(59);
    });
    it('Increases minute when arrow Up is pressed', async () => {
      await onTapstart(minutesSegment, el);
      createKeyboardEvent(el, InputKey.arrowUp);
      await elementUpdated(el);

      expect(el.offset, 'offset should be 60').to.be.equal(60);
      expect(el.displayMinutes, 'minutes should be 1').to.be.equal(1);
    });
    it('Decreases minute when arrow Down is pressed', async () => {
      await onTapstart(minutesSegment, el);
      createKeyboardEvent(el, InputKey.arrowDown);
      await elementUpdated(el);

      expect(el.offset, 'offset should be 86340').to.be.equal(86340);
      expect(el.displayMinutes, 'minutes should be 59').to.be.equal(59);
    });
    it('Should fire offset-changed when user interact on hour segment', async () => {
      let offsetChangedCount = 0;
      const offsetSpy = () => offsetChangedCount++;
      el.addEventListener('offset-changed', offsetSpy);

      await onTapstart(hoursSegment, el);
      setTimeout(() => createKeyboardEvent(hoursSegment, InputKey.arrowUp));
      const offsetEvent = await oneEvent(el, 'offset-changed');

      expect(offsetChangedCount, 'offset-changed count should be 1').to.be.equal(1);
      expect(offsetEvent.detail.value, '  should be 3600').to.be.equal(3600);

    });
    it('Should fire offset-changed when user interact on minute segment', async () => {
      let offsetChangedCount = 0;
      const offsetSpy = () => offsetChangedCount++;
      el.addEventListener('offset-changed', offsetSpy);

      await onTapstart(minutesSegment, el);
      setTimeout(() => createKeyboardEvent(minutesSegment, InputKey.arrowUp));
      const offsetEvent = await oneEvent(el, 'offset-changed');

      expect(offsetChangedCount, 'offset-changed count should be 1').to.be.equal(1);
      expect(offsetEvent.detail.value, '  should be 60').to.be.equal(60);
    });
  });
});
