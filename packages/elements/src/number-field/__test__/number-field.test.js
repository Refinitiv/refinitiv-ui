import { fixture, expect, oneEvent, elementUpdated, nextFrame, isIE, keyboardEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/number-field';
import '@refinitiv-ui/elemental-theme/light/ef-number-field';

const dispatchTapEvent = (el) => {
  el.dispatchEvent(new Event('tap', {
    bubbles: true
  }));
};

describe('number-field/NumberField', () => {
  describe('Dom Structure', () => {
    it('DOM structure is correct', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure without spinner is correct', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      el.setAttribute('no-spinner', true);
      await elementUpdated();
      expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Appearances', () => {
    it('Should have transparent attribute', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      el.setAttribute('transparent', true);
      expect(el.transparent).to.equal(true);
      expect(el.getAttribute('transparent')).to.equal('true');
    });

    it('Should have transparent attribute when it is set directly', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      el.transparent = true;

      await elementUpdated(el);

      expect(el.transparent).to.equal(true);
      expect(el.getAttribute('transparent')).to.not.null;
    });
    it('Should have error attribute', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      el.setAttribute('error', true);

      expect(el.error).to.equal(true);
      expect(el.getAttribute('error')).to.equal('true');
    });
    it('Should have error attribute when it is set directly', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      el.error = true;

      await elementUpdated(el);

      expect(el.error).to.equal(true);
      expect(el.getAttribute('error')).to.not.null;
    });
    it('Should have warning attribute', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      el.setAttribute('warning', true);

      expect(el.warning).to.equal(true);
      expect(el.getAttribute('warning')).to.equal('true');
    });
    it('Should have warning attribute when it is set directly', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      el.warning = true;

      await elementUpdated(el);

      expect(el.warning).to.equal(true);
      expect(el.getAttribute('warning')).to.not.null;
    });
    it('Should display correct placeholder', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      const PLACEHOLDER_TEXT = 'This is placeholder';

      el.setAttribute('placeholder', PLACEHOLDER_TEXT);
      expect(el.getAttribute('placeholder')).to.equal(
        PLACEHOLDER_TEXT
      );
    });
    it('Should display correct placeholder when it is set directly', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      const PLACEHOLDER_TEXT = 'This is placeholder';

      el.placeholder = PLACEHOLDER_TEXT;
      await elementUpdated(el);
      expect(el.getAttribute('placeholder')).to.equal(null);
    });
  });

  describe('Value', () => {
    let el;

    beforeEach(async () => {
      el = await fixture('<ef-number-field></ef-number-field>');
    });

    it('Should be able to set and display correct value', async () => {
      el.value = '3';
      await elementUpdated();
      expect(el.value).to.equal('3');
    });
    it('Should be able to set and display correct value using setAttribute', () => {
      el.setAttribute('value', '12');

      expect(el.value).to.equal('12');
      expect(el.getAttribute('value')).to.equal('12');
    });
    it('Should not update value when it is not a number', async () => {
      el.value = 'ABC';
      await elementUpdated();
      expect(el.value).to.equal('');
    });
    it('Should return valid number when valueAsNumber function is used', async () => {
      el.value = '12';
      expect(el.valueAsNumber).to.equal(12);
    });
    it('Should not update value when it is not a number using setAttribute', () => {
      el.setAttribute('value', 'ABC');
      expect(el.value).to.equal('');
    });
    it('Should be able to reset its value to empty string', () => {
      el.setAttribute('value', '1');
      el.setAttribute('value', '');

      expect(el.value).to.equal('');
    });
    it('Should reflect any numeric value programmatically set to the input', async () => {
      el.setAttribute('max', '10');
      el.setAttribute('value', '100');

      await elementUpdated();

      expect(el.value).to.equal('100');
    });
    it("Should fire event when value changes by user's interactions", async () => {
      const input = el.shadowRoot.querySelector('input');
      input.value = '3';

      setTimeout(() => input.dispatchEvent(new Event('input')));
      const eventFired = await oneEvent(el, 'value-changed');

      expect(el.value).to.equal('3');
      expect(eventFired.detail.value).to.equal('3');
    });
    it('Should not fire event when value programmatically changes', async () => {
      let eventFired = false;
      el.addEventListener('value-changed', () => {
        eventFired = true;
      });

      el.value = '4';

      expect(eventFired).to.equal(false);
      expect(el.value).to.equal('4');
    });
  });

  describe('Spinner', () => {
    let el;
    let spinnerUpEl;
    let spinnerDownEl;

    beforeEach(async () => {
      el = await fixture('<ef-number-field></ef-number-field>');
      spinnerUpEl = el.shadowRoot.querySelector("[part='spinner-up']");
      spinnerDownEl = el.shadowRoot.querySelector("[part='spinner-down']");
    });

    it('Should increase the value by 1', async () => {
      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');
      expect(el.value).to.equal('1');
    });
    it('Should decrease the value by 1', async () => {
      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');
      expect(el.value).to.equal('-1');
    });
    it('Should not increase the value when it is readonly', async () => {
      el.setAttribute('readonly', true);
      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');
      expect(el.value).to.equal('');
    });
    it('Should not decrease the value when it is readonly', async () => {
      el.setAttribute('readonly', true);
      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');
      expect(el.value).to.equal('');
    });
    it('Should not increase the value when it is disabled', async () => {
      // IE11 cannot fire tap event
      if (!isIE()) {
        el.setAttribute('disabled', true);
        await elementUpdated();

        setTimeout(() => dispatchTapEvent(spinnerUpEl));
        await oneEvent(spinnerUpEl, 'tap');
        expect(el.value).to.equal('');
      }
    });
    it('Should not decrease the value when it is disabled', async () => {
      // IE11 cannot fire tap event
      if (!isIE()) {
        el.setAttribute('disabled', true);
        await elementUpdated();

        setTimeout(() => dispatchTapEvent(spinnerDownEl));
        await oneEvent(spinnerDownEl, 'tap');
        expect(el.value).to.equal('');
      }
    });
    it('Should increase the value by 0.01', async () => {
      el.setAttribute('step', '0.01');

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('0.01');
    });
    it('Should decrease the value by 0.01', async () => {
      el.setAttribute('step', '0.01');

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('-0.01');
    });
    it('Should increase the value by 10', async () => {
      el.setAttribute('step', 10);

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('10');
    });
    it('Should decrease the value by 10', async () => {
      el.setAttribute('step', 10);

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('-10');
    });

    it('Should round the value up (ceil) when value is decimal, but step is a whole number when spinner up is clicked', async () => {
      el.value = '3.3';

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('4');
    });

    it('Should round the value down (floor) when value is decimal, but step is a whole number when spinner down is clicked', async () => {
      el.value = '5.5';

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('5');
    });

    it('Should respect zero max value when increment with spinner up button', async () => {
      el.setAttribute('min', '-5');
      el.setAttribute('max', '0');
      el.setAttribute('step', '1');
      el.value = '-1';

      await elementUpdated(el);

      dispatchTapEvent(spinnerUpEl);

      await elementUpdated(el);
      expect(el.value).to.equal('0', 'value should be incremented, when it is less then zero');

      dispatchTapEvent(spinnerUpEl);

      await elementUpdated(el);
      expect(el.value).to.equal('0', 'value should not be greater then zero');
    });

    it('Should respect zero min value when decrement with spinner down button', async () => {
      el.setAttribute('min', '0');
      el.setAttribute('max', '5');
      el.setAttribute('step', '1');
      el.value = '1';

      await elementUpdated(el);

      dispatchTapEvent(spinnerDownEl);

      await elementUpdated(el);
      expect(el.value).to.equal('0', 'value should be decremented, when it is grater then zero');

      dispatchTapEvent(spinnerDownEl);

      await elementUpdated(el);
      expect(el.value).to.equal('0', 'value should not be less then zero');
    });
  });

  describe('Keyboard Events', () => {
    it('ArrowUp should increase value', async () => {
      const el = await fixture('<ef-number-field value="2"></ef-number-field>');
      el.inputElement.dispatchEvent(keyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(el.value).to.be.equal('3');
    });
    it('ArrowDown should decrease value', async () => {
      const el = await fixture('<ef-number-field value="2"></ef-number-field>');
      el.inputElement.dispatchEvent(keyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(el.value).to.be.equal('1');
    });
    it('ArrowUp/Down should do nothing when disabled', async () => {
      const el = await fixture('<ef-number-field value="2" disabled></ef-number-field>');
      el.inputElement.dispatchEvent(keyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(el.value).to.be.equal('2');
      el.inputElement.dispatchEvent(keyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(el.value).to.be.equal('2');
    });
    it('ArrowUp/Down should do nothing when readonly', async () => {
      const el = await fixture('<ef-number-field value="2" readonly></ef-number-field>');
      el.inputElement.dispatchEvent(keyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(el.value).to.be.equal('2');
      el.inputElement.dispatchEvent(keyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(el.value).to.be.equal('2');
    });
  });

  describe('No Spinner', () => {
    it('Should not render spinner', async () => {
      const noSpinnerElement = await fixture('<ef-number-field no-spinner></ef-number-field>');
      const up = noSpinnerElement.shadowRoot.querySelector("[part='spinner-up']");
      const down = noSpinnerElement.shadowRoot.querySelector("[part='spinner-down']");

      expect(up).to.equal(null);
      expect(down).to.equal(null);
    });
  });

  describe('Min/Max', () => {
    let el;
    let spinnerUpEl;
    let spinnerDownEl;

    beforeEach(async () => {
      el = await fixture('<ef-number-field min="-5" max="15" step="5"></ef-number-field>');
      spinnerUpEl = el.shadowRoot.querySelector("[part='spinner-up']");
      spinnerDownEl = el.shadowRoot.querySelector("[part='spinner-down']");
    });

    it('Should prevent the spinner from updating value to more than Max', async () => {
      setTimeout(() => dispatchTapEvent(spinnerUpEl));

      await oneEvent(spinnerUpEl, 'tap');

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('10');
    });
    it('Should prevent the spinner from updating value to less than Min', async () => {
      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      setTimeout(() => dispatchTapEvent(spinnerDownEl));

      await oneEvent(spinnerDownEl, 'tap');
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('-5');
    });
    it('Should allow programmatically set input to change value to more than Max', () => {
      el.value = '100';
      expect(el.value).to.equal('100');
    });
    it('Should have error state when value to programmatically set to more than Max', async () => {
      el.value = '100';
      el.reportValidity();
      await elementUpdated();
      expect(el.error).to.equal(true);
    });
    it('Should have not change value when it\'s set to more than max and spinner-up button is tap', async () => {
      el.setAttribute('value', '60');
      el.reportValidity();
      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.error).to.equal(true);
      expect(el.value).to.equal('60');
    });
    it('Should reset value to max when current value to more than max and spinner down button is tap', async () => {
      el.value = '1000';
      el.reportValidity();

      await elementUpdated();

      expect(el.error).to.equal(true);

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('15');

      el.setAttribute('min', '1.5');
      el.setAttribute('step', '1');
      el.setAttribute('max', '3');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('2.5');
    });
    it('Should allow programmatically set input to change value to less than min', () => {
      el.value = '-100';
      expect(el.value).to.equal('-100');
    });
    it('Should have error state when value to programmatically set to less than min', async () => {
      el.value = '-200';
      el.reportValidity();

      await elementUpdated();
      expect(el.error).to.equal(true);
    });
    it('Should reset value to min when current value to more than min and spinner-up button is tap', async () => {
      el.value = '-200';
      el.reportValidity();

      await elementUpdated();

      expect(el.error).to.equal(true);

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('-5');
    });
    it('Should not change value when it\'s set is below min and spinner-down button is tap', async () => {
      el.setAttribute('value', '-20');
      el.reportValidity();

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.error).to.equal(true);
      expect(el.value).to.equal('-20');
    });
  });

  describe('Step', () => {
    let el;
    let spinnerUpEl;
    let spinnerDownEl;

    beforeEach(async () => {
      el = await fixture('<ef-number-field step="2"></ef-number-field>');
      spinnerUpEl = el.shadowRoot.querySelector('[part="spinner-up"]');
      spinnerDownEl = el.shadowRoot.querySelector('[part="spinner-down"]');
    });

    it('Should be able to step up value correctly', async () => {
      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      setTimeout(() => dispatchTapEvent(spinnerUpEl));

      await oneEvent(spinnerUpEl, 'tap');
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('4');
      el.reportValidity();
      expect(el.error).to.equal(false);
    });
    it('Should show error when value is not divisible by step', async () => {
      // Available values are even numbers
      el.value = '5';
      el.reportValidity();

      await elementUpdated();

      expect(el.error).to.equal(true);
    });
    it('Should show error when value is not divisible by step with min/max', async () => {
      // Available values are 1, 4, 7
      el.setAttribute('min', '1');
      el.setAttribute('max', '9');
      el.setAttribute('step', '3');
      el.value = '5';
      el.reportValidity();

      await elementUpdated();

      expect(el.error).to.equal(true);
    });
    it('Should re-validate when step value changes', async () => {
      // Available values are 2, 4, 6 and 8
      el.setAttribute('min', '2');
      el.setAttribute('max', '8');
      el.value = '4';
      el.reportValidity();

      await elementUpdated();

      expect(el.error).to.equal(false);

      el.setAttribute('step', '3');
      el.reportValidity();

      await elementUpdated();

      expect(el.error).to.equal(true);
    });
    it('Should be able to step up value correctly when step value = -2', async () => {
      el.setAttribute('step', '-2');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('1');
      expect(el.error).to.equal(false);
    });
    it('Should be able to step up value correctly when step value is not a number', async () => {
      el.setAttribute('step', 'NOT A NUMBER');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('2');
      expect(el.error).to.equal(false);
    });
    it('Should have correct starting value when no value is set and when step is 2 and min is -2 (spinner up)', async () => {
      el.setAttribute('min', '-2');
      el.setAttribute('step', '2');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('2');
      expect(el.error).to.equal(false);
    });
    it('Should have correct starting value when no value is set and when step is 2 and min is -2 (spinner down)', async () => {
      el.setAttribute('min', '-2');
      el.setAttribute('step', '2');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('-2');
      expect(el.error).to.equal(false);
    });
    it('Should have correct starting value when no value is set and when step is 3 and min is -1 (spinner up)', async () => {
      el.setAttribute('min', '-1');
      el.setAttribute('step', '3');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('2');
      expect(el.error).to.equal(false);
    });
    it('Should have correct starting value when no value is set and when step is 3 and min is -1 (spinner down)', async () => {
      el.setAttribute('min', '-1');
      el.setAttribute('step', '3');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('-1');
      expect(el.error).to.equal(false);
    });
    it('Should have correct starting value when no value is set and when step is 3 and min is -2 (spinner up)', async () => {
      el.setAttribute('min', '-2');
      el.setAttribute('step', '3');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('1');
      expect(el.error).to.equal(false);
    });
    it('Should have correct starting value when no value is set and when step is 3 and min is -2 (spinner down)', async () => {
      el.setAttribute('min', '-2');
      el.setAttribute('step', '3');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('-2');
      expect(el.error).to.equal(false);
    });
    it('Should be able to step up value correctly with min = 1, max = 8 and step = 2 and without having error attribute shown (spinner up)', async () => {
      el.setAttribute('min', '1');
      el.setAttribute('max', '8');
      el.setAttribute('step', '2');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('1');
      expect(el.error).to.equal(false);

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('3');
      expect(el.error).to.equal(false);

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('5');
      expect(el.error).to.equal(false);
    });
    it('Should be able to step up value correctly with min = 1, max = 9 and step = 3 and without having error attribute shown (spinner up)', async () => {
      el.setAttribute('min', '1');
      el.setAttribute('max', '9');
      el.setAttribute('step', '3');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('1');
      expect(el.error).to.equal(false);

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('4');
      expect(el.error).to.equal(false);

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('7');
      expect(el.error).to.equal(false);
    });
    it('Should be able to step down value correctly', async () => {
      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('-2');
    });
    it('Should have correct starting value when no value is set and when step is 3 and min is -1 (spinner down)', async () => {
      el.setAttribute('min', '-1');
      el.setAttribute('step', '3');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('-1');
      expect(el.error).to.equal(false);
    });
    it('Should have correct starting value when no value is set and when step is 3 and min is -2 (spinner down)', async () => {
      el.setAttribute('min', '-2');
      el.setAttribute('step', '3');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('-2');
      expect(el.error).to.equal(false);
    });
    it('Should be able to step down value correctly with min = -5, max = 8 and step = 2 and without having error attribute shown (spinner down)', async () => {
      el.setAttribute('min', '-5');
      el.setAttribute('max', '8');
      el.setAttribute('step', '2');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('-1');
      expect(el.error).to.equal(false);

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('-3');
      expect(el.error).to.equal(false);

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('-5');
      expect(el.error).to.equal(false);
    });
    it('Should be able to step down value correctly with min = 1, max = 9 and step = 3 and without having error attribute shown (spinner down)', async () => {
      el.setAttribute('min', '1');
      el.setAttribute('max', '9');
      el.setAttribute('step', '3');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('1');
      expect(el.error).to.equal(false);

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('4');
      expect(el.error).to.equal(false);

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('7');
      expect(el.error).to.equal(false);
    });
    it('Should be able to step up value correctly using Spinner when step is a decimal number', async () => {
      el.setAttribute('step', '0.001');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      setTimeout(() => dispatchTapEvent(spinnerUpEl));

      await oneEvent(spinnerUpEl, 'tap');
      await oneEvent(spinnerUpEl, 'tap');
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('0.003');
    });
    it('Should be able to step down value correctly using Spinner when step is a decimal number', async () => {
      el.setAttribute('step', '0.001');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      setTimeout(() => dispatchTapEvent(spinnerDownEl));

      await oneEvent(spinnerDownEl, 'tap');
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('-0.002');
    });
    it('Should be able to step up value correctly using Spinner when value is empty and min is whole number', async () => {
      el.setAttribute('step', '1');
      el.setAttribute('min', '1');
      el.setAttribute('max', '6');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('1');
    });
    it('Should be able to step down value correctly using Spinner when value is empty and min is whole number', async () => {
      el.setAttribute('step', '1');
      el.setAttribute('min', '1');
      el.setAttribute('max', '6');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('1');
    });
    it('Should be able to step up value correctly using Spinner when value is empty and min is decimal number', async () => {
      el.setAttribute('step', '1');
      el.setAttribute('min', '1.5');
      el.setAttribute('max', '3');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('1.5');

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('2.5');
    });
    it('Should be able to step down value correctly using Spinner when value is empty and min is decimal number', async () => {
      el.setAttribute('step', '1');
      el.setAttribute('min', '1.5');
      el.setAttribute('max', '3');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      setTimeout(() => dispatchTapEvent(spinnerDownEl));

      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('1.5');
    });
    it('Should be able to step up & down value correctly using Spinner when value is empty and min is decimal number', async () => {
      el.setAttribute('step', '1');
      el.setAttribute('min', '1.5');
      el.setAttribute('max', '3');

      await elementUpdated();

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('1.5');

      setTimeout(() => dispatchTapEvent(spinnerUpEl));
      await oneEvent(spinnerUpEl, 'tap');

      expect(el.value).to.equal('2.5');

      setTimeout(() => dispatchTapEvent(spinnerDownEl));
      await oneEvent(spinnerDownEl, 'tap');

      expect(el.value).to.equal('1.5');
    });

    describe('Step="any"', () => {
      it('Factor should be 1 when step up', async () => {
        el.setAttribute('step', 'any');
        el.setAttribute('value', '-1.86');
        await elementUpdated();

        setTimeout(() => dispatchTapEvent(spinnerUpEl));
        await oneEvent(spinnerUpEl, 'tap');
        expect(el.value).to.equal('-0.86', 'Value should be increase by 1 and decimal value should keep stay');

        setTimeout(() => dispatchTapEvent(spinnerUpEl));
        await oneEvent(spinnerUpEl, 'tap');
        expect(el.value).to.equal('0.14', 'Value should be increase by 1 and decimal value should keep stay');

        setTimeout(() => dispatchTapEvent(spinnerUpEl));
        await oneEvent(spinnerUpEl, 'tap');
        expect(el.value).to.equal('1.14', 'Value should be increase by 1 and decimal value should keep stay');
      });
      it('Factor should be 1 when step down', async () => {
        el.setAttribute('step', 'any');
        el.setAttribute('value', '1.86');
        await elementUpdated();

        setTimeout(() => dispatchTapEvent(spinnerDownEl));
        await oneEvent(spinnerDownEl, 'tap');
        expect(el.value).to.equal('0.86', 'Value should be decrease by 1 and decimal value should keep stay');
        
        setTimeout(() => dispatchTapEvent(spinnerDownEl));
        await oneEvent(spinnerDownEl, 'tap');
        expect(el.value).to.equal('-0.14', 'Value should be decrease by 1 and decimal value should keep stay');
        
        setTimeout(() => dispatchTapEvent(spinnerDownEl));
        await oneEvent(spinnerDownEl, 'tap');
        expect(el.value).to.equal('-1.14', 'Value should be decrease by 1 and decimal value should keep stay');
      });
      it('Should be decreased to min if value is decimal and min is integer', async () => {
        el.setAttribute('step', 'any');
        el.setAttribute('value', '1.86');
        el.setAttribute('min', '1');
        await elementUpdated();

        setTimeout(() => dispatchTapEvent(spinnerDownEl));
        await oneEvent(spinnerDownEl, 'tap');
        expect(el.value).to.equal('1', 'Follow by native behavior that value should decrease when min is integer.');
      });
      it('Should not be decreased to min if value is decimal and min is decimal', async () => {
        el.setAttribute('step', 'any');
        el.setAttribute('value', '1.86');
        el.setAttribute('min', '1.1');
        await elementUpdated();

        setTimeout(() => dispatchTapEvent(spinnerDownEl));
        await oneEvent(spinnerDownEl, 'tap');
        expect(el.value).to.equal('1.86', 'Follow by native behavior that value should decrease when min is decimal.');
      });
      it('Should not be increased to max if value is decimal and max is integer', async () => {
        el.setAttribute('step', 'any');
        el.setAttribute('value', '1.86');
        el.setAttribute('max', '2');
        await elementUpdated();

        setTimeout(() => dispatchTapEvent(spinnerUpEl));
        await oneEvent(spinnerUpEl, 'tap');
        expect(el.value).to.equal('1.86', 'Follow by native behavior that value should increase when max is integer.');
      });
      it('Should not be increased to max if value is decimal and max is decimal', async () => {
        el.setAttribute('step', 'any');
        el.setAttribute('value', '1.86');
        el.setAttribute('max', '2.1');
        await elementUpdated();

        setTimeout(() => dispatchTapEvent(spinnerUpEl));
        await oneEvent(spinnerUpEl, 'tap');
        expect(el.value).to.equal('1.86', 'Follow by native behavior that value should increase when max is integer.');
      });
    });
  });
});
