import { fixture, expect, elementUpdated, isIE, oneEvent } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/time-picker';
import '@refinitiv-ui/elemental-theme/light/ef-number-field';
import '@refinitiv-ui/elemental-theme/light/ef-time-picker';

describe('time-picker/TimePicker', () => {
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

  const delay = (milliseconds = 10) => {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  };

  const getKeyboardEvent = (eventType, keyOption) => {
    if (isIE()) {
      const event = document.createEvent('KeyboardEvent');
      Object.defineProperty(event, 'which', {
        get: () => keyOption.which
      });
      Object.defineProperty(event, 'keyCode', {
        get: () => keyOption.keyCode
      });
      Object.defineProperty(event, 'key', {
        get: () => keyOption.ieKey
      });

      event.initKeyboardEvent(
        eventType,
        true, // canBubbleArg,
        true, // cancelableArg,
        null, // viewArg,  Specifies UIEvent.view. This value may be null.
        false, // ctrlKeyArg,
        false, // altKeyArg,
        false, // shiftKeyArg,
        false, // metaKeyArg,
        keyOption.keyCode, // keyCodeArg,
        0
      );
      return event;
    }
    else {
      return new KeyboardEvent(eventType, keyOption);
    }
  };

  const createKeyboardEvent = (elem, keyOption) => {
    elem.dispatchEvent(getKeyboardEvent('keydown', keyOption));
    elem.dispatchEvent(getKeyboardEvent('keypress', keyOption));
    elem.dispatchEvent(getKeyboardEvent('keyup', keyOption));
  };

  const timePickerDefaults = '<ef-time-picker></ef-time-picker>';
  const timePickerReadonly = '<ef-time-picker value="00:00:00" readonly></ef-time-picker>';
  const timePickerDisabled = '<ef-time-picker value="00:00:00" disabled></ef-time-picker>';
  const timePickerAMPM = '<ef-time-picker value="13:30" am-pm></ef-time-picker>';
  const timePickerValueZeroWithSec = '<ef-time-picker value="00:00:00"></ef-time-picker>';
  const timePickerValueNumberWithSec = '<ef-time-picker value="08:16:32"></ef-time-picker>';
  const timePickerValueNumberWithoutSec = '<ef-time-picker value="08:16"></ef-time-picker>';

  describe('Time Picker Snapshot Testing', () => {
    /* cannot test default as value is set to current time */
    it('DOM structure: readonly', async () => {
      const el = await fixture(timePickerReadonly);
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure: disabled', async () => {
      const el = await fixture(timePickerDisabled);
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure: value, no seconds', async () => {
      const el = await fixture(timePickerValueNumberWithoutSec);
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure: value, with seconds', async () => {
      const el = await fixture(timePickerValueNumberWithSec);
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure: value, am/pm no seconds', async () => {
      const el = await fixture(timePickerAMPM);
      expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Defaults', () => {

    beforeEach(async () => {
      el = await fixture(timePickerDefaults);
    });

    it('Default structure is correct', () => {
      expect(el.shadowRoot.querySelectorAll('[part=input]')).to.have.lengthOf(2);
      expect(el.shadowRoot.querySelectorAll('[part=toggle]')).to.have.lengthOf(0);
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

  describe('Modes', () => {
    beforeEach(async () => {
      el = await fixture(timePickerDefaults);
    });

    it('Should show seconds input when option is set', async () => {
      el.showSeconds = true;

      await elementUpdated();
      expect(el.shadowRoot.querySelectorAll('[part=input]')).to.have.lengthOf(3);
    });

    it('Should show seconds input when seconds are passed as a value', async () => {
      el.value = '00:00:00';

      await elementUpdated();
      expect(el.shadowRoot.querySelectorAll('[part=input]')).to.have.lengthOf(3);
    });

    it('Should support 12hr mode', async () => {
      el.amPm = true;

      await elementUpdated();
      expect(el.shadowRoot.querySelectorAll('[part=toggle]')).to.have.lengthOf(1);
    });

    it('Should able to toggle mode between 12hr and 24hr by click and press arrow up/down', async () => {
      el = await fixture(timePickerAMPM);
      await elementUpdated();
      let togglePart = el.shadowRoot.querySelector('[part=toggle]');
      expect(togglePart).to.exist;

      togglePart.focus();

      expect(el.hours).to.equal(13);
      expect(el.formattedHours).to.equal('01', 'should be 01');
      expect(el.value).to.equal('13:30', 'should be 13:30');

      setTimeout(() => togglePart.dispatchEvent(new Event('tap')));
      await oneEvent(togglePart, 'tap');
      await elementUpdated();
      expect(el.hours).to.equal(1);
      expect(el.formattedHours).to.equal('01', 'should be 01');
      expect(el.value).to.equal('01:30', 'should be 01:30');

      setTimeout(() => togglePart.dispatchEvent(new Event('tap')));
      await oneEvent(togglePart, 'tap');
      await elementUpdated();
      expect(el.hours).to.equal(13);
      expect(el.formattedHours).to.equal('01', 'should be 01');
      expect(el.value).to.equal('13:30', 'should be 13:30');

      createKeyboardEvent(togglePart, InputKey.arrowUp);
      await elementUpdated();
      expect(el.hours).to.equal(1);
      expect(el.formattedHours).to.equal('01', 'should be 01');
      expect(el.value).to.equal('01:30', 'should be 01:30');

      createKeyboardEvent(togglePart, InputKey.arrowUp);
      await elementUpdated();
      expect(el.hours).to.equal(13);
      expect(el.formattedHours).to.equal('01', 'should be 01');
      expect(el.value).to.equal('13:30', 'should be 13:30');

      createKeyboardEvent(togglePart, InputKey.arrowDown);
      await elementUpdated();
      expect(el.hours).to.equal(1);
      expect(el.formattedHours).to.equal('01', 'should be 01');
      expect(el.value).to.equal('01:30', 'should be 01:30');

      createKeyboardEvent(togglePart, InputKey.arrowDown);
      await elementUpdated();
      expect(el.hours).to.equal(13);
      expect(el.formattedHours).to.equal('01', 'should be 01');
      expect(el.value).to.equal('13:30', 'should be 13:30');

      el.amPm = false;
      await elementUpdated();
      expect(el.hours).to.equal(13);
      expect(el.formattedHours).to.equal('13', 'should be 13');
      expect(el.value).to.equal('13:30', 'should be 13:30');
      expect(el.shadowRoot.querySelectorAll('[part=toggle]')).to.have.lengthOf(0);

      el.value = '22:20';
      el.hoursInput.focus();
      el.hoursInput.blur();
      await elementUpdated();
      expect(el.hours).to.equal(22);
      expect(el.formattedHours).to.equal('22', 'should be 22');
      expect(el.value).to.equal('22:20', 'should be 22:20');

      el.amPm = true;
      await elementUpdated();
      togglePart = el.shadowRoot.querySelector('[part=toggle]');
      expect(togglePart).to.exist;
      el.hoursInput.focus();
      el.hoursInput.blur();
      await elementUpdated();
      expect(el.hours).to.equal(22);
      expect(el.formattedHours).to.equal('10', 'should be 10');
      expect(el.value).to.equal('22:20', 'should be 22:20');

      setTimeout(() => togglePart.dispatchEvent(new Event('tap')));
      await oneEvent(togglePart, 'tap');
      await elementUpdated();
      el.hoursInput.focus();
      el.hoursInput.blur();
      await elementUpdated();
      expect(el.hours).to.equal(10);
      expect(el.formattedHours).to.equal('10', 'should be 10');
      expect(el.value).to.equal('10:20', 'should be 10:20');
    });

  });

  describe('Formats and data handling', () => {
    it('Supports hh:mm:ss value format', async () => {
      el = await fixture(timePickerValueNumberWithSec);
      expect(el.value).to.equal('08:16:32');
      expect(el.hours).to.equal(8);
      expect(el.minutes).to.equal(16);
      expect(el.seconds).to.equal(32);
      el.hours = 9;

      await elementUpdated();

      expect(el.value).to.equal('09:16:32');
    });

    it('Supports hh:mm value format', async () => {
      el = await fixture(timePickerValueNumberWithoutSec);
      expect(el.value).to.equal('08:16');
      expect(el.hours).to.equal(8);
      expect(el.minutes).to.equal(16);
      expect(el.seconds).to.equal(0);
      el.hours = 9;

      await elementUpdated();

      expect(el.value).to.equal('09:16');
    });

    it('Can handle changing value from value, hours, minutes and seconds properties', async () => {
      el = await fixture(timePickerDefaults);

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
      el = await fixture(timePickerDefaults);
      el.value = '08:16:32';
      expect(el.value).to.equal('08:16:32');
      el.value = '99:99:99'; /* invalid value */
      expect(el.value).to.equal('08:16:32');
    });
  });

  describe('Readonly', () => {
    beforeEach(async () => {
      el = await fixture(timePickerReadonly);
      hoursPart = el.shadowRoot.querySelector('#hours');
      minutesPart = el.shadowRoot.querySelector('#minutes');
      secondsPart = el.shadowRoot.querySelector('#seconds');
    });

    it('Should avoid to type key up/down to change value', async () => {
      expect(el.hours).to.equal(0);

      hoursPart.focus();
      createKeyboardEvent(hoursPart, InputKey.arrowUp);
      await elementUpdated();

      expect(el.hours).to.equal(0);
    });
  });

  describe('Key Navigation', () => {
    beforeEach(async () => {
      el = await fixture(timePickerValueZeroWithSec);
      hoursPart = el.shadowRoot.querySelector('#hours');
      minutesPart = el.shadowRoot.querySelector('#minutes');
      secondsPart = el.shadowRoot.querySelector('#seconds');
    });

    it('Up key should cycle though hours correctly', async () => {
      expect(hoursPart).to.exist;
      hoursPart.focus();
      for (let i = 0; i < 24; i++) {
        createKeyboardEvent(hoursPart, InputKey.arrowUp);
        await elementUpdated();
        expect(el.hours).to.equal((i + 1) % 24);
        delay();
      }
    });

    it('Down key should cycle though hours correctly', async () => {
      expect(hoursPart).to.exist;
      hoursPart.focus();
      for (let i = 24; i > 0; i--) {
        createKeyboardEvent(hoursPart, InputKey.arrowDown);
        await elementUpdated();
        expect(el.hours).to.equal((i - 1));
        delay();
      }
    });

    it('Up key should cycle though minutes correctly', async () => {
      expect(minutesPart).to.exist;
      minutesPart.focus();
      for (let i = 0; i < 60; i++) {
        createKeyboardEvent(minutesPart, InputKey.arrowUp);
        await elementUpdated();
        expect(el.minutes).to.equal((i + 1) % 60);
        delay();
      }
    });

    it('Down key should cycle though minutes correctly', async () => {
      expect(minutesPart).to.exist;
      minutesPart.focus();
      for (let i = 60; i > 0; i--) {
        createKeyboardEvent(minutesPart, InputKey.arrowDown);
        await elementUpdated();
        expect(el.minutes).to.equal((i - 1));
        delay();
      }
    });

    it('Up key should cycle though seconds correctly', async () => {
      expect(secondsPart).to.exist;
      secondsPart.focus();
      for (let i = 0; i < 60; i++) {
        createKeyboardEvent(secondsPart, InputKey.arrowUp);
        await elementUpdated();
        expect(el.seconds).to.equal((i + 1) % 60);
        delay();
      }
    });

    it('Down key should cycle though seconds correctly', async () => {
      expect(secondsPart).to.exist;
      secondsPart.focus();
      for (let i = 60; i > 0; i--) {
        createKeyboardEvent(secondsPart, InputKey.arrowDown);
        await elementUpdated();
        expect(el.seconds).to.equal((i - 1));
        delay();
      }
    });

    it('Cycling through minutes/seconds should affect their parents values', async () => {
      expect(secondsPart).to.exist;
      expect(el.seconds).to.equal(0);
      expect(el.minutes).to.equal(0);
      expect(el.hours).to.equal(0);
      secondsPart.focus();

      createKeyboardEvent(secondsPart, InputKey.arrowDown);
      await elementUpdated();
      expect(el.seconds).to.equal(59);
      expect(el.minutes).to.equal(59);
      expect(el.hours).to.equal(23);

      createKeyboardEvent(secondsPart, InputKey.arrowUp);
      await elementUpdated();
      expect(el.seconds).to.equal(0);
      expect(el.minutes).to.equal(0);
      expect(el.hours).to.equal(0);

      createKeyboardEvent(secondsPart, InputKey.arrowLeft);
      await elementUpdated();
      expect(el.seconds).to.equal(0);
      expect(el.minutes).to.equal(0);
      expect(el.hours).to.equal(0);

      createKeyboardEvent(secondsPart, InputKey.arrowRight);
      await elementUpdated();
      expect(el.seconds).to.equal(0);
      expect(el.minutes).to.equal(0);
      expect(el.hours).to.equal(0);

      createKeyboardEvent(secondsPart, InputKey.enter);
      await elementUpdated();
      expect(el.seconds).to.equal(0);
      expect(el.minutes).to.equal(0);
      expect(el.hours).to.equal(0);
    });
  });
});
