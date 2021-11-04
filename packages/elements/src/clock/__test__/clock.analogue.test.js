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
      expect(el.shadowRoot.querySelector('[part="digital"]'), 'digital clock should display inside a default analog clock').not.to.be.null;
      
      // make size smaller than defined break point
      el.style.width = '129px';
      await elementUpdated(el);
      await nextFrame();

      expect(el.shadowRoot.querySelector('[part="digital"]'), 'digital clock should not display inside small clock').to.be.null;
      expect(el.amPm, 'am-pm should be hidden by default on small clock').to.be.equal(false);
      expect(el.shadowRoot.querySelector('[part="segment am-pm"]'), 'AM/PM should not display by default in small clock').to.be.null;
    });

    it('Small size clock show AM/PM if it has attribute "am-pm"', async () => {
      el.style.width = '129px';
      await elementUpdated(el);
      await nextFrame();
      
      // test default behavior
      expect(el.hasAttribute('am-pm')).to.be.equal(false);
      expect(el.amPm).to.be.equal(false);
      expect(el.shadowRoot.querySelector('[part="segment am-pm"]')).to.be.null;
      
      // test when it has am-pm attribute
      el = await fixture('<ef-clock analog am-pm></ef-clock>');
      el.style.width = '129px';
      await elementUpdated(el);
      await nextFrame();
      
      expect(el.amPm, 'amPm property should be true if am-pm attribute is set').to.be.equal(true);
      expect(el.shadowRoot.querySelector('[part="segment am-pm"]'), 'AM/PM should display on clock').not.to.be.null;

      // test when am-pm is set programmatically
      el.amPm = false;
      await elementUpdated(el);
      await nextFrame();
      expect(el.shadowRoot.querySelector('[part="segment am-pm"]'), 'AM/PM should be hidden if set amPm to false').to.be.null;
    });

    it('Attribute "size=small" should not present if it is not analogue clock', async () => {
      el = await fixture('<ef-clock></ef-clock>');
      el.style.width = '150px';
      await elementUpdated(el);
      await nextFrame();

      expect(el.hasAttribute('size'), 'size attribute should not show if not analog').to.be.equal(false);
      
      el.style.width = '129px';
      await elementUpdated(el);
      await nextFrame();

      expect(el.hasAttribute('size'), 'size attribute should not show if not analog even size is small').to.be.equal(false);
    });
  });
});
