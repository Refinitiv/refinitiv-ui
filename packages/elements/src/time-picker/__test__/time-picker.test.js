// import element and theme
import '@refinitiv-ui/elements/time-picker';

import '@refinitiv-ui/elemental-theme/light/ef-time-picker';
import {
  elementUpdated,
  expect,
  fixture,
  keyboardEvent,
  oneEvent,
  triggerBlurFor,
  triggerFocusFor
} from '@refinitiv-ui/test-helpers';

describe('time-picker/TimePicker', function () {
  let el;
  let hoursPart;
  let minutesPart;
  let secondsPart;

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
    },
    tab: {
      ieKey: 'Tab',
      key: 'Tab',
      which: 9,
      keyCode: 9
    },
    enter: {
      ieKey: 'Enter',
      key: 'Enter',
      which: 13,
      keyCode: 13
    },
    num0: {
      ieKey: '0',
      key: '0',
      which: 48,
      keyCode: 48
    },
    num1: {
      ieKey: '1',
      key: '1',
      which: 49,
      keyCode: 49
    },
    num2: {
      ieKey: '2',
      key: '2',
      which: 50,
      keyCode: 50
    },
    num3: {
      ieKey: '3',
      key: '3',
      which: 51,
      keyCode: 51
    },
    num4: {
      ieKey: '4',
      key: '4',
      which: 52,
      keyCode: 52
    },
    num5: {
      ieKey: '5',
      key: '5',
      which: 53,
      keyCode: 53
    },
    num6: {
      ieKey: '6',
      key: '6',
      which: 54,
      keyCode: 54
    },
    num7: {
      ieKey: '7',
      key: '7',
      which: 55,
      keyCode: 55
    },
    num8: {
      ieKey: '8',
      key: '8',
      which: 56,
      keyCode: 56
    },
    num9: {
      ieKey: '9',
      key: '9',
      which: 57,
      keyCode: 57
    },
    charA: {
      ieKey: 'a',
      key: 'a',
      which: 65,
      keyCode: 65
    }
  };

  const createKeyboardEvent = (elem, keyOption) => {
    elem.dispatchEvent(keyboardEvent('keydown', keyOption));
    elem.dispatchEvent(keyboardEvent('keypress', keyOption));
    elem.dispatchEvent(keyboardEvent('keyup', keyOption));
  };

  const timePickerDefaults = '<ef-time-picker></ef-time-picker>';
  const timePickerReadonly = '<ef-time-picker value="00:00:00" readonly></ef-time-picker>';
  const timePickerDisabled = '<ef-time-picker value="00:00:00" disabled></ef-time-picker>';
  const timePickerAMPM = '<ef-time-picker value="13:30" am-pm></ef-time-picker>';
  const timePickerValueZeroWithSec = '<ef-time-picker value="00:00:00"></ef-time-picker>';
  const timePickerValueNumberWithSec = '<ef-time-picker value="08:16:32"></ef-time-picker>';
  const timePickerValueNumberWithoutSec = '<ef-time-picker value="08:16"></ef-time-picker>';
  const timePickerRoleNone = '<ef-time-picker role="none"></ef-time-picker>';

  describe('Time Picker Snapshot Testing', function () {
    /* cannot test default as value is set to current time */
    it('DOM structure: readonly', async function () {
      const el = await fixture(timePickerReadonly);
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure: disabled', async function () {
      const el = await fixture(timePickerDisabled);
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure: value, no seconds', async function () {
      const el = await fixture(timePickerValueNumberWithoutSec);
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure: value, with seconds', async function () {
      const el = await fixture(timePickerValueNumberWithSec);
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure: value, am/pm no seconds', async function () {
      const el = await fixture(timePickerAMPM);
      /**
       * The karma snapshots render `am/pm` in `aria-label` to upper case
       * but in the real DOM it is lower case that make this test case fail on the
       * Edge browser only, In others browser are works fine, we need to ignore this weird behavior.
       */
      expect(el).shadowDom.to.equalSnapshot({ ignoreAttributes: ['aria-label'] });
    });

    it('DOM structure: role=none', async function () {
      const el = await fixture(timePickerRoleNone);
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('should not pre-populate other segments value when hours value changes', async function () {
      const el = await fixture('<ef-time-picker></ef-time-picker>');
      const hoursInput = el.hoursInput;
      hoursInput.value = '12';
      hoursInput.dispatchEvent(
        new CustomEvent('focused-changed', { bubbles: true, detail: { value: false } })
      );
      await elementUpdated(el);
      expect(el.hours).to.equal(12);
      expect(el.minutes).to.equal(null);
      expect(el.seconds).to.equal(null);
    });

    it('should not pre-populate other segments value when minutes value change', async function () {
      const el = await fixture('<ef-time-picker></ef-time-picker>');
      const minutesInput = el.minutesInput;
      minutesInput.value = '30';
      minutesInput.dispatchEvent(
        new CustomEvent('focused-changed', { bubbles: true, detail: { value: false } })
      );
      await elementUpdated(el);
      expect(el.hours).to.equal(null);
      expect(el.minutes).to.equal(30);
      expect(el.seconds).to.equal(null);
    });

    it('should not pre-populate other segments value when seconds value change', async function () {
      const el = await fixture('<ef-time-picker show-seconds></ef-time-picker>');
      const secondsInput = el.secondsInput;
      secondsInput.value = '45';
      secondsInput.dispatchEvent(
        new CustomEvent('focused-changed', { bubbles: true, detail: { value: false } })
      );
      await elementUpdated(el);
      expect(el.hours).to.equal(null);
      expect(el.minutes).to.equal(null);
      expect(el.seconds).to.equal(45);
    });
  });

  describe('Defaults', function () {
    beforeEach(async function () {
      el = await fixture(timePickerDefaults);
    });

    it('Default structure is correct', function () {
      expect(el.renderRoot.querySelectorAll('[part=input]')).to.have.lengthOf(2);
      expect(el.renderRoot.querySelectorAll('[part=toggle]')).to.have.lengthOf(0);
    });

    it('Default properties are correct', function () {
      const now = new Date();
      now.setMinutes(Math.round(now.getMinutes() / 15) * 15);
      now.setSeconds(0);
      expect(el.hours).to.equal(null, 'Default hours should be null');
      expect(el.minutes).to.equal(null, 'Default minutes should be null');
      expect(el.seconds).to.equal(null, 'Default seconds should be null');
      expect(el.value).to.equal('', 'Default value should be empty');
    });
  });

  describe('Value', function () {
    it('Can set and reset value', async function () {
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

    it('Can reset value when internal input clears', async function () {
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
    it('should set error state to false when reportValidity is called without value', async function () {
      const el = await fixture('<ef-time-picker error show-seconds></ef-time-picker>');
      el.reportValidity();
      expect(el.error).to.be.equal(false);
    });
    it('should set error state to true when reportValidity is called with partial value', async function () {
      const el = await fixture('<ef-time-picker show-seconds></ef-time-picker>');
      el.hours = '12';
      await elementUpdated(el);

      el.reportValidity();
      expect(el.error).to.be.equal(true);
    });
    it('should set error state to false when reportValidity is called with valid values', async function () {
      const el = await fixture('<ef-time-picker error show-seconds></ef-time-picker>');
      el.hours = '12';
      await elementUpdated(el);

      el.minutes = '11';
      await elementUpdated(el);

      el.seconds = '10';
      await elementUpdated(el);

      el.reportValidity();
      expect(el.error).to.be.equal(false);
    });

    it('checkValidity should return true when it is called without value', async function () {
      const el = await fixture('<ef-time-picker show-seconds></ef-time-picker>');
      expect(el.checkValidity()).to.be.equal(true);
    });
    it('checkValidity should return false when it is called with partial value', async function () {
      const el = await fixture('<ef-time-picker show-seconds></ef-time-picker>');
      el.hours = '12';
      await elementUpdated(el);

      expect(el.checkValidity()).to.be.equal(false);
    });
    it('checkValidity should return true when it is called with valid values', async function () {
      const el = await fixture('<ef-time-picker show-seconds></ef-time-picker>');
      el.hours = '12';
      await elementUpdated(el);

      el.minutes = '11';
      await elementUpdated(el);

      el.seconds = '10';
      await elementUpdated(el);

      expect(el.checkValidity()).to.be.equal(true);
    });
  });

  describe('Modes', function () {
    it('Should show seconds input when option is set', async function () {
      const el = await fixture(timePickerDefaults);
      el.showSeconds = true;
      await elementUpdated(el);
      expect(el.renderRoot.querySelectorAll('[part=input]')).to.have.lengthOf(3);
    });

    it('Should show seconds input when seconds are passed as a value', async function () {
      const el = await fixture(timePickerDefaults);
      el.value = '00:00:00';
      await elementUpdated(el);
      expect(el.renderRoot.querySelectorAll('[part=input]')).to.have.lengthOf(3);
    });

    it('Should support 12hr mode', async function () {
      const el = await fixture(timePickerDefaults);
      el.amPm = true;
      await elementUpdated(el);
      expect(el.renderRoot.querySelectorAll('[part=toggle]')).to.have.lengthOf(1);
    });

    it('Should able to toggle mode between 12hr and 24hr by click and press arrow up/down', async function () {
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

    it('Should able to toggle am/pm', async function () {
      const el = await fixture(timePickerAMPM);
      const toggleEl = el.renderRoot.querySelector('#toggle');
      toggleEl.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);
      expect(el.value).to.equal('01:30');
      toggleEl.dispatchEvent(keyboardEvent('keydown', { key: ' ' }));
      await elementUpdated(el);
      expect(el.value).to.equal('13:30');
    });
  });

  describe('Formats and data handling', function () {
    it('Supports hh:mm:ss value format', async function () {
      const el = await fixture(timePickerValueNumberWithSec);
      expect(el.value).to.equal('08:16:32');
      expect(el.hours).to.equal(8);
      expect(el.minutes).to.equal(16);
      expect(el.seconds).to.equal(32);
      el.hours = 9;

      await elementUpdated(el);

      expect(el.value).to.equal('09:16:32');
    });

    it('Supports hh:mm value format', async function () {
      const el = await fixture(timePickerValueNumberWithoutSec);
      expect(el.value).to.equal('08:16');
      expect(el.hours).to.equal(8);
      expect(el.minutes).to.equal(16);
      expect(el.seconds).to.equal(0);
      el.hours = 9;

      await elementUpdated(el);

      expect(el.value).to.equal('09:16');
    });

    it('Can handle changing value from value, hours, minutes and seconds properties', async function () {
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

    it('Should handle invalid use case. Value is the source of truth.', async function () {
      const el = await fixture(timePickerDefaults);
      el.value = '08:16:32';
      expect(el.value).to.equal('08:16:32');
      el.value = '99:99:99'; /* invalid value */
      expect(el.value).to.equal('08:16:32');
    });
  });

  describe('Readonly', function () {
    it('Should avoid to type key up/down to change value', async function () {
      const el = await fixture(timePickerReadonly);
      const hoursPart = el.renderRoot.querySelector('#hours');
      expect(el.hours).to.equal(0);
      await triggerFocusFor(hoursPart);
      createKeyboardEvent(hoursPart, InputKey.arrowUp);
      await elementUpdated(el);
      expect(el.hours).to.equal(0);
    });
  });

  describe('Key Navigation', function () {
    beforeEach(async function () {
      el = await fixture(timePickerValueZeroWithSec);
      hoursPart = el.renderRoot.querySelector('#hours');
      minutesPart = el.renderRoot.querySelector('#minutes');
      secondsPart = el.renderRoot.querySelector('#seconds');
    });

    it('Up key should cycle though hours correctly', async function () {
      expect(hoursPart).to.exist;
      await triggerFocusFor(hoursPart);
      for (let i = 0; i < 24; i += 1) {
        createKeyboardEvent(hoursPart, InputKey.arrowUp);
        await elementUpdated();
        expect(el.hours).to.equal((i + 1) % 24);
      }
    });

    it('Down key should cycle though hours correctly', async function () {
      expect(hoursPart).to.exist;
      await triggerFocusFor(hoursPart);
      for (let i = 24; i > 0; i--) {
        createKeyboardEvent(hoursPart, InputKey.arrowDown);
        await elementUpdated(el);
        expect(el.hours).to.equal(i - 1);
      }
    });

    it('Up key should cycle though minutes correctly', async function () {
      expect(minutesPart).to.exist;
      await triggerFocusFor(minutesPart);
      for (let i = 0; i < 60; i += 1) {
        createKeyboardEvent(minutesPart, InputKey.arrowUp);
        await elementUpdated(el);
        expect(el.minutes).to.equal((i + 1) % 60);
      }
    });

    it('Down key should cycle though minutes correctly', async function () {
      expect(minutesPart).to.exist;
      await triggerFocusFor(minutesPart);
      for (let i = 60; i > 0; i--) {
        createKeyboardEvent(minutesPart, InputKey.arrowDown);
        await elementUpdated(el);
        expect(el.minutes).to.equal(i - 1);
      }
    });

    it('Up key should cycle though seconds correctly', async function () {
      expect(secondsPart).to.exist;
      await triggerFocusFor(secondsPart);
      for (let i = 0; i < 60; i += 1) {
        createKeyboardEvent(secondsPart, InputKey.arrowUp);
        await elementUpdated(el);
        expect(el.seconds).to.equal((i + 1) % 60);
      }
    });

    it('Down key should cycle though seconds correctly', async function () {
      expect(secondsPart).to.exist;
      await triggerFocusFor(secondsPart);
      for (let i = 60; i > 0; i--) {
        createKeyboardEvent(secondsPart, InputKey.arrowDown);
        await elementUpdated(el);
        expect(el.seconds).to.equal(i - 1);
      }
    });

    it('Cycling through minutes/seconds should affect their parents values', async function () {
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

    it('Cycling through seconds should not pre-populate other segments value', async function () {
      el = await fixture('<ef-time-picker show-seconds></ef-time-picker>');
      expect(el.hours).to.equal(null);
      expect(el.minutes).to.equal(null);
      expect(el.seconds).to.equal(null);
      createKeyboardEvent(el.secondsInput, InputKey.arrowDown);
      await elementUpdated(el);
      expect(el.hours).to.equal(null);
      expect(el.minutes).to.equal(null);
      expect(el.seconds).to.equal(0);

      createKeyboardEvent(el.secondsInput, InputKey.arrowDown);
      await elementUpdated(el);
      expect(el.hours).to.equal(null);
      expect(el.minutes).to.equal(null);
      expect(el.seconds).to.equal(59);
    });

    it('Cycling through minutes should not pre-populate other segments value', async function () {
      el = await fixture(timePickerDefaults);
      expect(el.hours).to.equal(null);
      expect(el.minutes).to.equal(null);
      expect(el.seconds).to.equal(null);
      createKeyboardEvent(el.minutesInput, InputKey.arrowDown);
      await elementUpdated(el);
      expect(el.hours).to.equal(null);
      expect(el.minutes).to.equal(0);
      expect(el.seconds).to.equal(null);

      createKeyboardEvent(el.minutesInput, InputKey.arrowDown);
      await elementUpdated(el);
      expect(el.hours).to.equal(null);
      expect(el.minutes).to.equal(59);
      expect(el.seconds).to.equal(null);
    });

    it('Cycling through hours should not pre-populate other segments value', async function () {
      el = await fixture(timePickerDefaults);
      expect(el.hours).to.equal(null);
      expect(el.minutes).to.equal(null);
      expect(el.seconds).to.equal(null);
      createKeyboardEvent(el.hoursInput, InputKey.arrowDown);
      await elementUpdated(el);
      expect(el.hours).to.equal(0);
      expect(el.minutes).to.equal(null);
      expect(el.seconds).to.equal(null);

      createKeyboardEvent(el.hoursInput, InputKey.arrowDown);
      await elementUpdated(el);
      expect(el.hours).to.equal(23);
      expect(el.minutes).to.equal(null);
      expect(el.seconds).to.equal(null);
    });
  });
});
