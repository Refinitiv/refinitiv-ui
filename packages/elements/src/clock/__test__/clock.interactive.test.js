import { fixture, expect, elementUpdated, oneEvent, keyboardEvent, nextFrame } from '@refinitiv-ui/test-helpers';

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
      arrowLeft: {
        ieKey: 'Left',
        key: 'ArrowLeft',
        which: 37,
        keyCode: 37
      },
      arrowUp: {
        ieKey: 'Up',
        key: 'ArrowUp',
        which: 38,
        keyCode: 38
      },
      arrowRight: {
        ieKey: 'Right',
        key: 'ArrowRight',
        which: 39,
        keyCode: 39
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
      setTimeout(() => createKeyboardEvent(el, InputKey.arrowUp));
      const offsetEvent = await oneEvent(el, 'offset-changed');

      expect(offsetChangedCount, 'offset-changed count should be 1').to.be.equal(1);
      expect(offsetEvent.detail.value, '  should be 3600').to.be.equal(3600);

    });
    it('Should fire offset-changed when user interact on minute segment', async () => {
      let offsetChangedCount = 0;
      const offsetSpy = () => offsetChangedCount++;
      el.addEventListener('offset-changed', offsetSpy);

      await onTapstart(minutesSegment, el);
      setTimeout(() => createKeyboardEvent(el, InputKey.arrowUp));
      const offsetEvent = await oneEvent(el, 'offset-changed');

      expect(offsetChangedCount, 'offset-changed count should be 1').to.be.equal(1);
      expect(offsetEvent.detail.value, '  should be 60').to.be.equal(60);
    });
    
    describe('Accessibility', () => {
      it('Should have role="spinbutton" and focusable', async () => {
        expect(el.getAttribute('role')).to.be.equal('spinbutton');
        expect(el.getAttribute('tabindex')).to.be.equal('0');
      });
      it('Should update aria-valuetext after arrow Up on increase hour', async () => {
        await onTapstart(hoursSegment, el);
        createKeyboardEvent(el, InputKey.arrowUp);
        await elementUpdated(el);
  
        expect(el.getAttribute('aria-valuetext')).to.be.equal('Time: 01:00');
      });
      it('Should update aria-valuetext after arrow Down on decrease hour', async () => {
        await onTapstart(hoursSegment, el);
        createKeyboardEvent(el, InputKey.arrowDown);
        await elementUpdated(el);
  
        expect(el.getAttribute('aria-valuetext')).to.be.equal('Time: 23:00');
      });
      it('Should update aria-valuetext after arrow Up on increase minute', async () => {
        await onTapstart(minutesSegment, el);
        createKeyboardEvent(el, InputKey.arrowUp);
        await elementUpdated(el);
  
        expect(el.getAttribute('aria-valuetext')).to.be.equal('Time: 00:01');
      });
      it('Switch activeSegment when arrow Left or arrow Right', async () => {
        const hoursIncrementBtn = hoursSegment.querySelector('[part=increment-button]');
        const hoursDecrementBtn = hoursSegment.querySelector('[part=decrement-button]');
        const minuteIncrementBtn = minutesSegment.querySelector('[part=increment-button]');
        const minuteDecrementBtn = minutesSegment.querySelector('[part=decrement-button]');
        await onTapstart(hoursSegment, el);
        createKeyboardEvent(el, InputKey.arrowRight);
        await elementUpdated(el);
  
        expect(el.activeSegment).to.be.equal('minutes');
        expect(hoursIncrementBtn.getAttribute('active')).to.be.equal(null);
        expect(hoursDecrementBtn.getAttribute('active')).to.be.equal(null);
        expect(minuteIncrementBtn.getAttribute('active')).to.be.equal('');
        expect(minuteDecrementBtn.getAttribute('active')).to.be.equal('');

        createKeyboardEvent(el, InputKey.arrowLeft);
        await elementUpdated(el);
  
        expect(el.activeSegment).to.be.equal('hours');
        expect(hoursIncrementBtn.getAttribute('active')).to.be.equal('');
        expect(hoursDecrementBtn.getAttribute('active')).to.be.equal('');
        expect(minuteIncrementBtn.getAttribute('active')).to.be.equal(null);
        expect(minuteDecrementBtn.getAttribute('active')).to.be.equal(null);
      });
    });
  });
});
