// import element and theme
import '@refinitiv-ui/elements/time-picker';

import '@refinitiv-ui/elemental-theme/light/ef-time-picker';
import {
  elementUpdated,
  expect,
  fixture,
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

  describe('Time Picker Snapshot Testing', function () {
    /* cannot test default as value is set to current time */
    it('DOM structure: readonly', async function () {
      const el = await fixture(timePickerReadonly);
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure: disabled', async function () {
      const el = await fixture(timePickerDisabled);
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure: value, no seconds', async function () {
      const el = await fixture(timePickerValueNumberWithoutSec);
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure: value, with seconds', async function () {
      const el = await fixture(timePickerValueNumberWithSec);
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure: value, am/pm no seconds', async function () {
      const el = await fixture(timePickerAMPM);
      /**
       * The karma snapshots render `am/pm` in `aria-label` to upper case
       * but in the real DOM it is lower case that make this test case fail on the
       * Edge browser only, In others browser are works fine, we need to ignore this weird behavior.
       */
      await expect(el).shadowDom.to.equalSnapshot({ ignoreAttributes: ['aria-label'] });
    });

    it('DOM structure: role=none', async function () {
      const el = await fixture(timePickerRoleNone);
      await expect(el).shadowDom.to.equalSnapshot();
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
    it('should set error state to false when reportValidity is called without value', async function () {
      const el = await fixture('<ef-time-picker error show-seconds></ef-time-picker>');
      const validity = el.reportValidity();
      expect(el.error).to.be.equal(false);
      expect(validity).to.be.equal(true);
    });
    it('should set error state to true when reportValidity is called with partial value', async function () {
      const el = await fixture('<ef-time-picker hours="12" show-seconds></ef-time-picker>');
      const validity = el.reportValidity();
      expect(el.error).to.be.equal(true);
      expect(validity).to.be.equal(false);
    });
    it('should set error state to false when reportValidity is called with valid values', async function () {
      const el = await fixture('<ef-time-picker value="12:11:10" error show-seconds></ef-time-picker>');
      const validity = el.reportValidity();
      expect(el.error).to.be.equal(false);
      expect(validity).to.be.equal(true);
    });
    it('should add error state when value is partial by a mock user interaction', async function () {
      const el = await fixture(timePickerDefaults);
      el.hoursInput.value = '12';
      setTimeout(() => el.hoursInput.dispatchEvent(new Event('input')));
      await oneEvent(el.hoursInput, 'input');
      expect(el.error).to.be.equal(true);
    });
    it('should remove error state when value is not partial by a mock user interaction', async function () {
      const el = await fixture(timePickerDefaults);
      el.hoursInput.value = '12';
      setTimeout(() => el.hoursInput.dispatchEvent(new Event('input')));
      await oneEvent(el.hoursInput, 'input');
      expect(el.error).to.be.equal(true);

      el.minutesInput.value = '00';
      setTimeout(() => el.minutesInput.dispatchEvent(new Event('input')));
      await oneEvent(el.minutesInput, 'input');
      expect(el.error).to.be.equal(false);
    });
    it('should add error state when value is partial with show seconds by a mock user interaction', async function () {
      const el = await fixture('<ef-time-picker show-seconds></ef-time-picker>');
      el.hoursInput.value = '12';
      el.minutesInput.value = '00';
      setTimeout(() => {
        el.hoursInput.dispatchEvent(new Event('input'));
        el.minutesInput.dispatchEvent(new Event('input'));
      });
      await Promise.all([oneEvent(el.minutesInput, 'input'), oneEvent(el.hoursInput, 'input')]);
      expect(el.error).to.be.equal(true);
    });
    it('should remove error state when value is not partial with show seconds by a mock user interaction', async function () {
      const el = await fixture('<ef-time-picker show-seconds></ef-time-picker>');
      el.hoursInput.value = '12';
      el.minutesInput.value = '00';
      setTimeout(() => {
        el.hoursInput.dispatchEvent(new Event('input'));
        el.minutesInput.dispatchEvent(new Event('input'));
      });
      await Promise.all([oneEvent(el.minutesInput, 'input'), oneEvent(el.hoursInput, 'input')]);
      expect(el.error).to.be.equal(true);

      el.secondsInput.value = '00';
      setTimeout(() => el.secondsInput.dispatchEvent(new Event('input')));
      await oneEvent(el.secondsInput, 'input');
      expect(el.error).to.be.equal(false);
    });
    it('should not add error state when remove all segments by a mock user interaction', async function () {
      const el = await fixture('<ef-time-picker value="12:00:00" show-seconds></ef-time-picker>');
      el.hoursInput.value = '';
      setTimeout(() => el.hoursInput.dispatchEvent(new Event('input')));
      await oneEvent(el.hoursInput, 'input');
      expect(el.error).to.be.equal(true);

      el.minutesInput.value = '';
      setTimeout(() => el.minutesInput.dispatchEvent(new Event('input')));
      await oneEvent(el.minutesInput, 'input');
      expect(el.error).to.be.equal(true);

      el.secondsInput.value = '';
      setTimeout(() => el.secondsInput.dispatchEvent(new Event('input')));
      await oneEvent(el.secondsInput, 'input');
      expect(el.error).to.be.equal(false);
    });
    it('should add error state when type invalid value by a mock user interaction', async function () {
      const el = await fixture('<ef-time-picker value="12:10:08" show-seconds></ef-time-picker>');
      el.secondsInput.value = '88';
      setTimeout(() => el.secondsInput.dispatchEvent(new Event('input')));
      await oneEvent(el.secondsInput, 'input');
      expect(el.error).to.be.equal(true);
    });

    it('Should add error state if tap on toggle when there is no value', async function () {
      const el = await fixture(timePickerAMPM);
      el.value = '';
      await elementUpdated(el);
      const toggleEl = el.renderRoot.querySelector('#toggle');
      toggleEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);
      expect(el.error).to.equal(true);
    });

    it('Should remove error state if tap on toggle while there is only hour segment to fill in', async function () {
      const el = await fixture('<ef-time-picker am-pm></ef-time-picker>');

      el.minutesInput.value = '00';
      setTimeout(() => {
        el.minutesInput.dispatchEvent(new Event('input'));
      });
      await oneEvent(el.minutesInput, 'input');
      expect(el.error).to.be.equal(true);

      const toggleEl = el.renderRoot.querySelector('#toggle');
      toggleEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);
      expect(el.error).to.equal(false);
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

    it('Should able to toggle mode between 12hr and 24hr by API toggle method', async function () {
      const el = await fixture(timePickerAMPM);

      el.toggle();
      await elementUpdated(el);
      expect(el.hours).to.equal(1);
      expect(el.formattedHours).to.equal('01', 'should be 01');
      expect(el.value).to.equal('01:30', 'should be 01:30');

      el.toggle();
      await elementUpdated(el);
      expect(el.hours).to.equal(13);
      expect(el.formattedHours).to.equal('01', 'should be 01');
      expect(el.value).to.equal('13:30', 'should be 13:30');
    });

    it('Should able to toggle am/pm', async function () {
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
        await elementUpdated(el);
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
