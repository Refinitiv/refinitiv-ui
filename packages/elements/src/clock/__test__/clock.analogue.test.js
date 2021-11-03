import { fixture, expect, elementUpdated, nextFrame } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/clock';
import '@refinitiv-ui/elemental-theme/light/ef-clock.js';

describe('clock/Analogue', () => {
  describe('Analogue', () => {
    let el;
    let hoursHand;
    let minutesHand;

    const getClockHand = (part) =>
      el.shadowRoot.querySelector(`[part='hand ${part}']`);

    beforeEach(async () => {
      el = await fixture('<ef-clock analogue></ef-clock>');
      hoursHand = getClockHand('hour');
      minutesHand = getClockHand('minute');
    });

    it('Shows correct hour hand angle when time is set to 15:00:00', async () => {
      el.value = '15:00:00';
      await elementUpdated(el);

      expect(hoursHand.style.transform, 'hour hand should have 450 degrees angle').to.be.equal('rotate(450deg)');
    });
    it('Shows correct minute hand angle when time is set to 15:30:00', async () => {
      el.value = '15:30:00';
      await elementUpdated(el);

      expect(minutesHand.style.transform, 'minute hand should have 180 degrees angle').to.be.equal('rotate(180deg)');
    });

    it('Can shows second hand', async () => {
      el.showSeconds = true;
      await elementUpdated(el);

      expect(getClockHand('second'), 'second hand should appear').to.be.not.null;
    });
    it('Shows correct second hand angle when time is set to 15:30:45', async () => {
      el.value = '15:30:45';
      el.showSeconds = true;
      await elementUpdated(el);

      expect(getClockHand('second').style.transform, 'seconds hand should have 270 degrees angle').to.be.equal('rotate(270deg)');
    });
    it('Shows small size clock when width is less than 130px', async () => {
      expect(el.shadowRoot.querySelector('[part="digital"]'), 'digital clock should display').not.to.be.null;
      
      el.style.width = '129px';
      el.amPm = true;
      await elementUpdated(el);
      await nextFrame();

      expect(el.shadowRoot.querySelector('[part="digital"]'), 'digital clock should not display').to.be.null;
      expect(el.shadowRoot.querySelector('[part="hands"] [part="segment am-pm"]'), 'AM/PM should display correctly').not.to.be.null;
    });
    it('Small size clock show AM/PM if it has attribute "am-pm"', async () => {
      el.style.width = '129px';
      await elementUpdated(el);
      await nextFrame();

      expect(el.shadowRoot.querySelector('[part="segment am-pm"]'), 'AM/PM should not display ').to.be.null;

      el.amPm = true;
      await elementUpdated(el);
      await nextFrame();
      
      expect(el.shadowRoot.querySelector('[part="segment am-pm"]'), 'AM/PM should display').not.to.be.null;
    });
    it('Attribute "size=small" should not show if it is not analogue clock', async () => {
      el = await fixture('<ef-clock></ef-clock>');
      el.style.width = '129px';
      await elementUpdated(el);
      await nextFrame();

      expect(el.getAttribute('size')).to.not.equal('small', 'attribute "size=small" should not display even width is less than 130px');

      el.style.width = '150px';
      await elementUpdated(el);
      await nextFrame();

      expect(el.getAttribute('size')).to.not.equal('small', 'attribute "size=small" should not display');
    });
  });
});
