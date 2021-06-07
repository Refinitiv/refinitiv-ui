import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/clock';
import '@refinitiv-ui/elemental-theme/light/ef-clock.js';

describe('Clock', () => {
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
  });
});
