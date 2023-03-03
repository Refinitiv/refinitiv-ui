import { fixture, expect, elementUpdated, oneEvent, triggerFocusFor, triggerBlurFor } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/time-picker';
import '@refinitiv-ui/elemental-theme/light/ef-time-picker';

describe('time-picker/TimePicker', () => {
  let el;
  let hoursPart;
  let minutesPart;
  let secondsPart;

  const InputKey = {
    arrowLeft: {
      key: 'ArrowLeft'
    },
    arrowUp: {
      key: 'ArrowUp'
    },
    arrowRight: {
      key: 'ArrowRight'
    },
    arrowDown: {
      key: 'ArrowDown'
    },
    tab: {
      key: 'Tab'
    },
    enter: {
      key: 'Enter'
    },
    num0: {
      key: '0'
    },
    num1: {
      key: '1'
    },
    num2: {
      key: '2'
    },
    num3: {
      key: '3'
    },
    num4: {
      key: '4'
    },
    num5: {
      key: '5'
    },
    num6: {
      key: '6'
    },
    num7: {
      key: '7'
    },
    num8: {
      key: '8'
    },
    num9: {
      key: '9'
    },
    charA: {
      key: 'a'
    }
  };

  const createKeyboardEvent = (elem, keyOption) => {
    elem.dispatchEvent(new KeyboardEvent('keydown', keyOption));
    elem.dispatchEvent(new KeyboardEvent('keypress', keyOption));
    elem.dispatchEvent(new KeyboardEvent('keyup', keyOption));
  };

  const timePickerDefaults = '<ef-time-picker></ef-time-picker>';
  const timePickerReadonly = '<ef-time-picker value="00:00:00" readonly></ef-time-picker>';
  const timePickerDisabled = '<ef-time-picker value="00:00:00" disabled></ef-time-picker>';
  const timePickerAMPM = '<ef-time-picker value="13:30" am-pm></ef-time-picker>';
  const timePickerValueZeroWithSec = '<ef-time-picker value="00:00:00"></ef-time-picker>';
  const timePickerValueNumberWithSec = '<ef-time-picker value="08:16:32"></ef-time-picker>';
  const timePickerValueNumberWithoutSec = '<ef-time-picker value="08:16"></ef-time-picker>';
  const timePickerRoleNone = '<ef-time-picker role="none"></ef-time-picker>';

  describe('Time Picker Snapshot Testing', () => {
    /* cannot test default as value is set to current time */
    it('DOM structure: readonly', async () => {
      const el = await fixture(timePickerReadonly);
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure: disabled', async () => {
      const el = await fixture(timePickerDisabled);
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure: value, no seconds', async () => {
      const el = await fixture(timePickerValueNumberWithoutSec);
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure: value, with seconds', async () => {
      const el = await fixture(timePickerValueNumberWithSec);
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure: value, am/pm no seconds', async () => {
      const el = await fixture(timePickerAMPM);
      /**
       * The karma snapshots render `am/pm` in `aria-label` to upper case
       * but in the real DOM it is lower case that make this test case fail on the
       * Edge browser only, In others browser are works fine, we need to ignore this weird behavior.
       */
      await expect(el).shadowDom.to.equalSnapshot({ ignoreAttributes: ['aria-label'] });
    });

    it('DOM structure: role=none', async () => {
      const el = await fixture(timePickerRoleNone);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Defaults', () => {
    beforeEach(async () => {
      el = await fixture(timePickerDefaults);
    });

    it('Default structure is correct', () => {
      expect(el.renderRoot.querySelectorAll('[part=input]')).to.have.lengthOf(2);
      expect(el.renderRoot.querySelectorAll('[part=toggle]')).to.have.lengthOf(0);
    });

    it('Default properties are correct', () => {
      const now = new Date();
      now.setMinutes(Math.round(now.getMinutes() / 15) * 15);
      now.setSeconds(0);
      expect(el.hours).to.equal(null, 'Default hours should be null');
      expect(el.minutes).to.equal(null, 'Default minutes should be null');
      expect(el.seconds).to.equal(null, 'Default seconds should be null');
      expect(el.value).to.equal('', 'Default value should be empty');
    });
  });

  describe('Value', () => {
    it('Can set and reset value', async () => {
      const el = await fixture('<ef-time-picker value="12:20:35"></ef-time-picker>');
      expect(el.hours).to.equal(12);
      expect(el.minutes).to.equal(20);
      expect(el.seconds).to.equal(35);
      el.value = '';
      await elementUpdated(el);
      expect(el.hours).to.equal(null);
      expect(el.minutes).to.equal(null);
      expect(el.seconds).to.equal(null);
    });

    it('Can reset value when internal input clears', async () => {
      const el = await fixture('<ef-time-picker value="12:20:35"></ef-time-picker>');
      const hoursPart = el.renderRoot.querySelector('#hours');
      const minutesPart = el.renderRoot.querySelector('#minutes');
      const secondsPart = el.renderRoot.querySelector('#seconds');
      hoursPart.value = '';
      hoursPart.dispatchEvent(new CustomEvent('value-changed', { bubbles: true, detail: { value: '' } }));
      await elementUpdated(el);
      expect(el.hours).to.equal(null);
      minutesPart.value = '';
      minutesPart.dispatchEvent(new CustomEvent('value-changed', { bubbles: true, detail: { value: '' } }));
      await elementUpdated(el);
      expect(el.minutes).to.equal(null);
      secondsPart.value = '';
      secondsPart.dispatchEvent(new CustomEvent('value-changed', { bubbles: true, detail: { value: '' } }));
      await elementUpdated(el);
      expect(el.seconds).to.equal(null);
    });
  });

  describe('Modes', () => {
    it('Should show seconds input when option is set', async () => {
      const el = await fixture(timePickerDefaults);
      el.showSeconds = true;
      await elementUpdated(el);
      expect(el.renderRoot.querySelectorAll('[part=input]')).to.have.lengthOf(3);
    });

    it('Should show seconds input when seconds are passed as a value', async () => {
      const el = await fixture(timePickerDefaults);
      el.value = '00:00:00';
      await elementUpdated(el);
      expect(el.renderRoot.querySelectorAll('[part=input]')).to.have.lengthOf(3);
    });

    it('Should support 12hr mode', async () => {
      const el = await fixture(timePickerDefaults);
      el.amPm = true;
      await elementUpdated(el);
      expect(el.renderRoot.querySelectorAll('[part=toggle]')).to.have.lengthOf(1);
    });

    it('Should able to toggle mode between 12hr and 24hr by click and press arrow up/down', async () => {
      const el = await fixture(timePickerAMPM);
      await elementUpdated(el);
      let togglePart = el.renderRoot.querySelector('[part=toggle]');
      expect(togglePart).to.exist;
      await triggerFocusFor(togglePart);

      expect(el.hours).to.equal(13);
      expect(el.formattedHours).to.equal('01', 'should be 01');
      expect(el.value).to.equal('13:30', 'should be 13:30');

      setTimeout(() => togglePart.dispatchEvent(new Event('tap')));
      await oneEvent(togglePart, 'tap');
      await elementUpdated(el);
      expect(el.hours).to.equal(1);
      expect(el.formattedHours).to.equal('01', 'should be 01');
      expect(el.value).to.equal('01:30', 'should be 01:30');

      setTimeout(() => togglePart.dispatchEvent(new Event('tap')));
      await oneEvent(togglePart, 'tap');
      await elementUpdated(el);
      expect(el.hours).to.equal(13);
      expect(el.formattedHours).to.equal('01', 'should be 01');
      expect(el.value).to.equal('13:30', 'should be 13:30');

      createKeyboardEvent(togglePart, InputKey.arrowUp);
      await elementUpdated(el);
      expect(el.hours).to.equal(1);
      expect(el.formattedHours).to.equal('01', 'should be 01');
      expect(el.value).to.equal('01:30', 'should be 01:30');

      createKeyboardEvent(togglePart, InputKey.arrowUp);
      await elementUpdated(el);
      expect(el.hours).to.equal(13);
      expect(el.formattedHours).to.equal('01', 'should be 01');
      expect(el.value).to.equal('13:30', 'should be 13:30');

      createKeyboardEvent(togglePart, InputKey.arrowDown);
      await elementUpdated(el);
      expect(el.hours).to.equal(1);
      expect(el.formattedHours).to.equal('01', 'should be 01');
      expect(el.value).to.equal('01:30', 'should be 01:30');

      createKeyboardEvent(togglePart, InputKey.arrowDown);
      await elementUpdated(el);
      expect(el.hours).to.equal(13);
      expect(el.formattedHours).to.equal('01', 'should be 01');
      expect(el.value).to.equal('13:30', 'should be 13:30');

      el.amPm = false;
      await elementUpdated(el);
      expect(el.hours).to.equal(13);
      expect(el.formattedHours).to.equal('13', 'should be 13');
      expect(el.value).to.equal('13:30', 'should be 13:30');
      expect(el.renderRoot.querySelectorAll('[part=toggle]')).to.have.lengthOf(0);

      el.value = '22:20';
      await triggerFocusFor(el.hoursInput);
      await triggerBlurFor(el.hoursInput);
      await elementUpdated(el);
      expect(el.hours).to.equal(22);
      expect(el.formattedHours).to.equal('22', 'should be 22');
      expect(el.value).to.equal('22:20', 'should be 22:20');

      el.amPm = true;
      await elementUpdated(el);
      togglePart = el.renderRoot.querySelector('[part=toggle]');
      expect(togglePart).to.exist;
      await triggerFocusFor(el.hoursInput);
      await triggerBlurFor(el.hoursInput);
      await elementUpdated(el);
      expect(el.hours).to.equal(22);
      expect(el.formattedHours).to.equal('10', 'should be 10');
      expect(el.value).to.equal('22:20', 'should be 22:20');

      setTimeout(() => togglePart.dispatchEvent(new Event('tap')));
      await oneEvent(togglePart, 'tap');
      await elementUpdated(el);
      await triggerFocusFor(el.hoursInput);
      await triggerBlurFor(el.hoursInput);
      await elementUpdated(el);
      expect(el.hours).to.equal(10);
      expect(el.formattedHours).to.equal('10', 'should be 10');
      expect(el.value).to.equal('10:20', 'should be 10:20');
    });

    it('Should able to toggle am/pm', async () => {
      const el = await fixture(timePickerAMPM);
      const toggleEl = el.renderRoot.querySelector('#toggle');
      toggleEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);
      expect(el.value).to.equal('01:30');
      toggleEl.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      await elementUpdated(el);
      expect(el.value).to.equal('13:30');
    });
  });

  describe('Formats and data handling', () => {
    it('Supports hh:mm:ss value format', async () => {
      const el = await fixture(timePickerValueNumberWithSec);
      expect(el.value).to.equal('08:16:32');
      expect(el.hours).to.equal(8);
      expect(el.minutes).to.equal(16);
      expect(el.seconds).to.equal(32);
      el.hours = 9;

      await elementUpdated(el);

      expect(el.value).to.equal('09:16:32');
    });

    it('Supports hh:mm value format', async () => {
      const el = await fixture(timePickerValueNumberWithoutSec);
      expect(el.value).to.equal('08:16');
      expect(el.hours).to.equal(8);
      expect(el.minutes).to.equal(16);
      expect(el.seconds).to.equal(0);
      el.hours = 9;

      await elementUpdated(el);

      expect(el.value).to.equal('09:16');
    });

    it('Can handle changing value from value, hours, minutes and seconds properties', async () => {
      const el = await fixture(timePickerDefaults);

      el.value = '01:00:00';
      await elementUpdated(el);

      expect(el.value).to.equal('01:00:00');
      expect(el.hours).to.equal(1);
      expect(el.minutes).to.equal(0);
      expect(el.seconds).to.equal(0);

      el.value = '01:02:03';
      await elementUpdated(el);

      expect(el.value).to.equal('01:02:03');
      expect(el.hours).to.equal(1);
      expect(el.minutes).to.equal(2);
      expect(el.seconds).to.equal(3);

      el.hours = 4;
      await elementUpdated(el);

      expect(el.value).to.equal('04:02:03');
      expect(el.hours).to.equal(4);
      expect(el.minutes).to.equal(2);
      expect(el.seconds).to.equal(3);

      el.minutes = 5;
      await elementUpdated(el);

      expect(el.value).to.equal('04:05:03');
      expect(el.hours).to.equal(4);
      expect(el.minutes).to.equal(5);
      expect(el.seconds).to.equal(3);

      el.seconds = 6;
      await elementUpdated(el);

      expect(el.value).to.equal('04:05:06');
      expect(el.hours).to.equal(4);
      expect(el.minutes).to.equal(5);
      expect(el.seconds).to.equal(6);

      // Setting the value to hh:mm format
      // this should keep the format even when seconds are modified
      el.value = '01:00';
      await elementUpdated(el);

      expect(el.value).to.equal('01:00');
      expect(el.hours).to.equal(1);
      expect(el.minutes).to.equal(0);
      expect(el.seconds).to.equal(0);

      el.hours = 4;
      await elementUpdated(el);

      expect(el.value).to.equal('04:00');
      expect(el.hours).to.equal(4);
      expect(el.minutes).to.equal(0);
      expect(el.seconds).to.equal(0);

      el.minutes = 5;
      await elementUpdated(el);

      expect(el.value).to.equal('04:05');
      expect(el.hours).to.equal(4);
      expect(el.minutes).to.equal(5);
      expect(el.seconds).to.equal(0);

      el.seconds = 6;
      await elementUpdated(el);

      expect(el.value).to.equal('04:05');
      expect(el.hours).to.equal(4);
      expect(el.minutes).to.equal(5);
      expect(el.seconds).to.equal(6);

      el.hours = 90;
      await elementUpdated(el);

      expect(el.value).to.equal('04:05');
      expect(el.hours).to.equal(4);
      expect(el.minutes).to.equal(5);
      expect(el.seconds).to.equal(6);

      el.minutes = 90;
      await elementUpdated(el);

      expect(el.value).to.equal('04:05');
      expect(el.hours).to.equal(4);
      expect(el.minutes).to.equal(5);
      expect(el.seconds).to.equal(6);

      el.seconds = 90;
      await elementUpdated(el);

      expect(el.value).to.equal('04:05');
      expect(el.hours).to.equal(4);
      expect(el.minutes).to.equal(5);
      expect(el.seconds).to.equal(6);

      el.hours = 990;
      await elementUpdated(el);

      expect(el.value).to.equal('04:05');
      expect(el.hours).to.equal(4);
      expect(el.minutes).to.equal(5);
      expect(el.seconds).to.equal(6);
    });

    it('Should handle invalid use case. Value is the source of truth.', async () => {
      const el = await fixture(timePickerDefaults);
      el.value = '08:16:32';
      expect(el.value).to.equal('08:16:32');
      el.value = '99:99:99'; /* invalid value */
      expect(el.value).to.equal('08:16:32');
    });
  });

  describe('Readonly', () => {
    it('Should avoid to type key up/down to change value', async () => {
      const el = await fixture(timePickerReadonly);
      const hoursPart = el.renderRoot.querySelector('#hours');
      expect(el.hours).to.equal(0);
      await triggerFocusFor(hoursPart);
      createKeyboardEvent(hoursPart, InputKey.arrowUp);
      await elementUpdated(el);
      expect(el.hours).to.equal(0);
    });
  });

  describe('Key Navigation', () => {
    beforeEach(async () => {
      el = await fixture(timePickerValueZeroWithSec);
      hoursPart = el.renderRoot.querySelector('#hours');
      minutesPart = el.renderRoot.querySelector('#minutes');
      secondsPart = el.renderRoot.querySelector('#seconds');
    });

    it('Up key should cycle though hours correctly', async () => {
      expect(hoursPart).to.exist;
      await triggerFocusFor(hoursPart);
      for (let i = 0; i < 24; i += 1) {
        createKeyboardEvent(hoursPart, InputKey.arrowUp);
        await elementUpdated();
        expect(el.hours).to.equal((i + 1) % 24);
      }
    });

    it('Down key should cycle though hours correctly', async () => {
      expect(hoursPart).to.exist;
      await triggerFocusFor(hoursPart);
      for (let i = 24; i > 0; i--) {
        createKeyboardEvent(hoursPart, InputKey.arrowDown);
        await elementUpdated(el);
        expect(el.hours).to.equal(i - 1);
      }
    });

    it('Up key should cycle though minutes correctly', async () => {
      expect(minutesPart).to.exist;
      await triggerFocusFor(minutesPart);
      for (let i = 0; i < 60; i += 1) {
        createKeyboardEvent(minutesPart, InputKey.arrowUp);
        await elementUpdated(el);
        expect(el.minutes).to.equal((i + 1) % 60);
      }
    });

    it('Down key should cycle though minutes correctly', async () => {
      expect(minutesPart).to.exist;
      await triggerFocusFor(minutesPart);
      for (let i = 60; i > 0; i--) {
        createKeyboardEvent(minutesPart, InputKey.arrowDown);
        await elementUpdated(el);
        expect(el.minutes).to.equal(i - 1);
      }
    });

    it('Up key should cycle though seconds correctly', async () => {
      expect(secondsPart).to.exist;
      await triggerFocusFor(secondsPart);
      for (let i = 0; i < 60; i += 1) {
        createKeyboardEvent(secondsPart, InputKey.arrowUp);
        await elementUpdated(el);
        expect(el.seconds).to.equal((i + 1) % 60);
      }
    });

    it('Down key should cycle though seconds correctly', async () => {
      expect(secondsPart).to.exist;
      await triggerFocusFor(secondsPart);
      for (let i = 60; i > 0; i--) {
        createKeyboardEvent(secondsPart, InputKey.arrowDown);
        await elementUpdated(el);
        expect(el.seconds).to.equal(i - 1);
      }
    });

    it('Cycling through minutes/seconds should affect their parents values', async () => {
      expect(secondsPart).to.exist;
      expect(el.seconds).to.equal(0);
      expect(el.minutes).to.equal(0);
      expect(el.hours).to.equal(0);
      await triggerFocusFor(secondsPart);

      createKeyboardEvent(secondsPart, InputKey.arrowDown);
      await elementUpdated(el);
      expect(el.seconds).to.equal(59);
      expect(el.minutes).to.equal(59);
      expect(el.hours).to.equal(23);

      createKeyboardEvent(secondsPart, InputKey.arrowUp);
      await elementUpdated(el);
      expect(el.seconds).to.equal(0);
      expect(el.minutes).to.equal(0);
      expect(el.hours).to.equal(0);

      createKeyboardEvent(secondsPart, InputKey.arrowLeft);
      await elementUpdated(el);
      expect(el.seconds).to.equal(0);
      expect(el.minutes).to.equal(0);
      expect(el.hours).to.equal(0);

      createKeyboardEvent(secondsPart, InputKey.arrowRight);
      await elementUpdated(el);
      expect(el.seconds).to.equal(0);
      expect(el.minutes).to.equal(0);
      expect(el.hours).to.equal(0);

      createKeyboardEvent(secondsPart, InputKey.enter);
      await elementUpdated(el);
      expect(el.seconds).to.equal(0);
      expect(el.minutes).to.equal(0);
      expect(el.hours).to.equal(0);
    });
  });
});
