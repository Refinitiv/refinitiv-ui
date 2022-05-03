import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/slider';
import '@refinitiv-ui/elemental-theme/light/ef-slider';


describe('slider/Slider', () => {

  let el;

  const tabSliderPosition = (percentValue) => {
    return (el.offsetWidth * percentValue / 100) + el.offsetLeft;
  };

  const calculateValue = (el, mouseX) => {
    if((Number(el.min) % 1) !== 0 || Number(el.step) % 1 !== 0) {

      // Get decimal places when step or min have decimal
      const minDecimalPlaces = el.min.split('.').length > 1 ? el.min.split('.')[1].length : 0;
      const stepDecimalPlaces = el.step.split('.').length > 1 ? el.step.split('.')[1].length : 0;
      let decimalPlaces = stepDecimalPlaces > minDecimalPlaces ? stepDecimalPlaces : minDecimalPlaces;

      // Calculate drag step value
      const value = calculateDragValue(el, mouseX, decimalPlaces);

      // Display value
      let displayValue = '';
      const valueDecimalCount = value.toString().split('.').length > 1 ? value.toString().split('.')[1].length : 0;
      if(valueDecimalCount > decimalPlaces) {
        displayValue = value.toFixed(decimalPlaces).toString();
      }
      else {
        displayValue = value.toFixed(valueDecimalCount).toString();
      }
      return Number(displayValue);
    }
    else{
      return calculateDragValue(el, mouseX);
    }
  };

  const calculateDragValue = (el, mouseX, decimalPlaces) => {
    decimalPlaces |= 0;
    // Calculate step value
    const stepSize = Math.abs((((el.minNumber + el.stepNumber || 0) - el.minNumber) / (el.maxNumber - el.minNumber)));
    const thumbPos = (mouseX - el.offsetLeft) / el.offsetWidth;
    const posToFixStep = (Math.round(thumbPos / stepSize) * stepSize);
    let value;
    if (thumbPos <= posToFixStep + (stepSize / 2)) {
      if(posToFixStep <= 1) {
        value = posToFixStep;
      }
      else{
        value = posToFixStep - stepSize;
      }
    }
    else {
      value = posToFixStep + stepSize;
    }

    // Calculate step to value
    return el.minNumber + value * (el.maxNumber - el.minNumber);
  };


  describe('Test Default Structure', async () => {

    beforeEach(async () => {
      el = await fixture('<ef-slider></ef-slider>');
    });

    it('DOM structure is correct', async () => {
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Contains the correct structure', () => {
      expect(el.value).to.equal('0');
      expect(el.step).to.equal('1');
      expect(el.max).to.equal('100');
      expect(el.min).to.equal('0');
      expect(el.disabled).to.be.false;
      expect(el.showSteps).to.be.false;
      expect(el.pin).to.be.false;
      expect(el.range).to.be.false;
    });
    describe('Test value Property', () => {
      it('If value should be equal to value when set value with valid', async () => {
        const setValue = 20;
        el.value = setValue;
        await elementUpdated(el);
        expect(el.value).to.equal(setValue.toString());
      });

      it('If value more than max should be to value as max', async () => {
        el.value = 150;
        await elementUpdated(el);
        expect(el.value).to.equal(el.max.toString());
      });

      it('If value less than min should be to value as min', async () => {
        el.value = -150;
        await elementUpdated(el);
        expect(el.value).to.equal(el.min.toString());
      });
    });
    describe('Test disabled State', () => {

      it('Disabled can be set via attribute and property', async () => {
        el.disabled = true;
        await elementUpdated(el);
        expect(el.hasAttribute('disabled')).to.equal(true);
        expect(el.disabled).to.be.true;
      });

      it('Disabled is not set by default', async () => {
        await elementUpdated(el);
        expect(el.hasAttribute('disabled')).to.false;
        expect(el.disabled).to.be.false;
      });
    });
    describe('Test show-steps Attribute', () => {
      it('Show steps can be set via attribute and property', async () => {
        el.showSteps = true;
        await elementUpdated(el);
        let showSteps = el.shadowRoot.querySelector('[part=track-wrapper]');
        let showStepsSize = getComputedStyle(showSteps, '::after').height;
        expect(showStepsSize).to.not.equal('auto');
      });
      it('Show steps is not set by default', () => {
        el.showSteps = false;
        let showSteps = el.shadowRoot.querySelector('[part=track-wrapper]');
        let showStepsSize = getComputedStyle(showSteps, '::after').height;
        expect(showStepsSize).to.equal('auto');
      });
    });
    describe('Test step Attribute', () => {
      it('stepRange should be equal to step when set step with valid value', async () => {
        el.step = 10;
        await elementUpdated(el);
        expect(el.step).to.equal('10');
        expect(el.stepRange).to.equal(10);
      });
      it('stepRange should be positive when set step with negative number', async () => {
        el.step = -5;
        await elementUpdated(el);
        expect(el.step).to.equal('-5');
        expect(el.stepRange).to.equal(5);
      });
      it('If step more than max, stepRange should be set to max', async () => {
        el.step = 10000;
        await elementUpdated(el);
        expect(el.step).to.equal('10000');
        expect(el.stepRange.toString()).to.equal(el.max);
        expect(el.step).to.satisfy((num) => {
          return num > parseInt(el.max, 10);
        });
      });
      it('If step less than min, Step should be set max', async () => {
        el.step = -10000;
        await elementUpdated(el);
        expect(el.step).to.equal('-10000');
        expect(el.stepRange.toString()).to.equal(el.max);
        expect(el.step).to.satisfy((num) => {
          return num < el.min;
        });
      });

      it('Set "step" via attribute by 10.55', async () => {
        el = await fixture('<ef-slider step="10.55"></ef-slider>');
        await elementUpdated(el);
        expect(el.min).to.equal('0');
        expect(el.max).to.equal('100');
        expect(el.value).to.equal('0');
        expect(el.decimalPlace).to.equal(2);
      });
    });
    describe('Test min Attribute', () => {

      it('Min should be equal to value when set value with valid', async () => {
        el.min = 10;
        await elementUpdated(el);
        expect(el.min).to.equal('10');
      });

      it('Min should be negative number when set value with negative number', async () => {
        el.min = -5;
        await elementUpdated(el);
        expect(el.min).to.equal('-5');
      });

      it('If min more than max when min set value with valid', async () => {
        el.min = 10000;
        await elementUpdated(el);
        expect(el.min).to.equal(el.max);
      });

      it('If min less than max when min set value with valid', async () => {
        el.min = -10000;
        await elementUpdated(el);
        expect(el.min).to.equal('-10000');
        expect(el.min).to.satisfy((num) => {
          return num < el.max;
        });
      });

      it('If has range and min less than max when min set value with valid and set value from as min', async () => {
        el.range = true;
        await elementUpdated(el);
        el.min = -5000;
        await elementUpdated(el);
        expect(el.min).to.equal('-5000');
      });
    });
    describe('Test max Attribute', () => {

      it('Max should be equal to value when set value with valid', async () => {
        el.max = 10;
        await elementUpdated(el);
        expect(el.max).to.equal('10');
      });

      it('Max should be negative number when set value with negative number', async () => {
        el.max = -5;
        await elementUpdated(el);
        expect(el.max).to.equal(el.min);
      });

      it('If max more than min when max set value with valid', async () => {
        el.max = 10000;
        await elementUpdated(el);
        expect(el.max).to.equal('10000');
        expect(el.max).to.satisfy((num) => {
          return num > el.min;
        });
      });

      it('If max less than min when max set value with valid', async () => {
        el.max = -10000;
        await elementUpdated(el);
        expect(el.max).to.equal(el.min);
      });
    });
    describe('Test value Property', () => {

      it('Value should be equal to value with valid', async () => {
        el.value = 50;
        await elementUpdated(el);
        expect(el.value).to.equal('50');
      });
      it('If value more than max, Value should be set to max', async () => {
        el.value = 10000;
        await elementUpdated(el);
        expect(el.value).to.equal('100');
      });
      it('If value more than min, Value should be set to min', async () => {
        el.value = -10000;
        await elementUpdated(el);
        expect(el.value).to.equal('0');
      });

      it('Set "min" equal to "max" via attribute.', async () => {
        el = await fixture('<ef-slider min="0" max="0"></ef-slider>');
        await elementUpdated(el);
        expect(el.min).to.equal('0');
        expect(el.max).to.equal('0');
        expect(el.value).to.equal('0');
      });
    });
    describe('Test pin Attribute', () => {

      it('Pin can be set via attribute and property', async () => {
        el.pin = true;
        await elementUpdated(el);
        expect(el.hasAttribute('pin')).to.equal(true);
        expect(el.pin).to.be.true;
      });

      it('Pin is not set by default', () => {
        expect(el.hasAttribute('pin')).to.false;
      });
    });
    describe('Test range Attribute', () => {

      it('Set "to" via attribute to wrong value format.', async () => {
        el = await fixture('<ef-slider range min="0" max="100" to="text"></ef-slider>');
        await elementUpdated(el);
        expect(el.min).to.equal('0');
        expect(el.max).to.equal('100');
        expect(el.from).to.equal('0');
        expect(el.to).to.equal('100');
      });

      it('Set "from" via attribute to wrong value format.', async () => {
        el = await fixture('<ef-slider range min="0" max="100" from="text"></ef-slider>');
        await elementUpdated(el);
        expect(el.min).to.equal('0');
        expect(el.max).to.equal('100');
        expect(el.from).to.equal('0');
        expect(el.to).to.equal('100');
      });

      it('Set "min" equal to "max" via attribute.', async () => {
        el = await fixture('<ef-slider range min="0" max="0"></ef-slider>');
        await elementUpdated(el);
        expect(el.min).to.equal('0');
        expect(el.max).to.equal('0');
        expect(el.from).to.equal('0');
        expect(el.to).to.equal('0');
      });

      it('Set "from" via property. If "from" more than to, Value should be set value "to"', async () => {

        el.range = true;
        await elementUpdated(el);
        el.from = '200';
        await elementUpdated(el);
        el.to = '50';
        await elementUpdated(el);
        expect(el.from).to.equal(el.to);
      });

      it('Set "from" via property. If "from" less than min, Value should be set value "min"', async () => {
        el.range = true;
        await elementUpdated(el);
        el.from = '-200';
        await elementUpdated(el);
        expect(el.from).to.equal(el.min);
      });

      it('Set "to" via property. If "from" more than max, Value should be set value "max"', async () => {
        el.range = true;
        await elementUpdated(el);
        el.to = '200';
        await elementUpdated(el);
        expect(el.to).to.equal(el.max);
      });

      it('Set "from" via attribute. If "from" more than to, Value should be set value "to"', async () => {
        el = await fixture('<ef-slider range from="100" to="50" ></ef-slider>');
        await elementUpdated(el);
        expect(el.from).to.equal(el.to);
      });

    });
    describe('Test min-range Attribute', () => {

      it('Set from and to wrong distance "to" nearly max', async () => {
        el = await fixture('<ef-slider range min="-10" max="10" from="8" to="9" min-range="5"></ef-slider>');
        await elementUpdated(el);
        expect(el.min).to.equal('-10');
        expect(el.max).to.equal('10');
        expect(el.from).to.equal('4');
        expect(el.to).to.equal('9');
      });

      it('Set from and to wrong distance "from" nearly min', async () => {
        el = await fixture('<ef-slider range min="-10" max="10" from="-9" to="-8" min-range="5"></ef-slider>');
        await elementUpdated(el);
        expect(el.min).to.equal('-10');
        expect(el.max).to.equal('10');
        expect(el.from).to.equal('-9');
        expect(el.to).to.equal('-4');
      });

      it('Set from, to out of boundary range more max', async () => {
        el = await fixture('<ef-slider range min="-10" max="10" from="99" to="90" min-range="5"></ef-slider>');
        await elementUpdated(el);
        expect(el.min).to.equal('-10');
        expect(el.max).to.equal('10');
        expect(el.from).to.equal('5');
        expect(el.to).to.equal('10');
      });

      it('Set from , to out of boundary range less min', async () => {
        el = await fixture('<ef-slider range min="-10" max="10" from="-99" to="-90" min-range="5"></ef-slider>');
        await elementUpdated(el);
        expect(el.min).to.equal('-10');
        expect(el.max).to.equal('10');
        expect(el.from).to.equal('-10');
        expect(el.to).to.equal('-5');
      });

      it('Set from , to out of boundary range less min', async () => {
        el = await fixture('<ef-slider range min="-10" max="10" from="-99" to="99" min-range="5" ></ef-slider>');
        await elementUpdated(el);
        expect(el.min).to.equal('-10');
        expect(el.max).to.equal('10');
        expect(el.from).to.equal('-10');
        expect(el.to).to.equal('10');
      });

      it('Set from , to out of boundary range more max and set min-range out of boundary', async () => {
        el = await fixture('<ef-slider range min="-10" max="10" from="99" to="90" min-range="1000"></ef-slider>');
        await elementUpdated(el);
        expect(el.min).to.equal('-10');
        expect(el.max).to.equal('10');
        expect(el.from).to.equal('-10');
        expect(el.to).to.equal('10');

        el.min = '-9';
        await elementUpdated(el);
        expect(el.min).to.equal('-10');
      });

    });
    describe('Test Using Negative Number', () => {
      it('Set negative number min,max,step when value with valid', async () => {
        el.min = '-20';
        await elementUpdated(el);
        el.max = '-10';
        await elementUpdated(el);
        el.step = '-2';
        await elementUpdated(el);
        expect(el.min).to.equal('-20');
        expect(el.max).to.equal('-10');
        expect(el.step).to.equal('-2');
      });
    });
    describe('Test Using Decimal Number', () => {
      it('Set decimal number step when value with valid', () => {
        el.step = '';
        el.step = null;
      });
      it('Set decimal negative number step when value with valid', async () => {
        el.step = '-5.5';
        await elementUpdated(el);
        expect(el.step).to.equal('-5.5');
        expect(el.stepRange).to.equal(5.5);
      });
      it('Set decimal number value', async () => {
        el.step = '5.5';
        await elementUpdated(el);
        expect(el.step).to.equal('5.5');
        expect(el.stepRange).to.equal(5.5);
      });
    });
    describe('Test Using Invalid Type step, min, max', () => {
      it('Set step properties type invalid when return value with default', async () => {
        el.step = 'ABC';
        await elementUpdated(el);
        expect(el.step).to.equal('1');

        el.step = '';
        await elementUpdated(el);
        expect(el.step).to.equal('1');

        el.step = undefined;
        await elementUpdated(el);
        expect(el.step).to.equal('1');

        el.step = null;
        await elementUpdated(el);
        expect(el.step).to.equal('1');
      });

      it('Set Value properties type invalid when return value with default', async () => {
        el.value = 'ABC';
        await elementUpdated(el);
        expect(el.value).to.equal('0');

        el.value = '';
        await elementUpdated(el);
        expect(el.value).to.equal('0');

        el.value = undefined;
        await elementUpdated(el);
        expect(el.value).to.equal('0');

        el.value = null;
        await elementUpdated(el);
        expect(el.value).to.equal('0');
      });

      it('Set Min properties type invalid when return value with default', async () => {
        el.min = 'ABC';
        await elementUpdated(el);
        expect(el.min).to.equal('0');

        el.min = '';
        await elementUpdated(el);
        expect(el.min).to.equal('0');

        el.min = undefined;
        await elementUpdated(el);
        expect(el.min).to.equal('0');

        el.min = null;
        await elementUpdated(el);
        expect(el.min).to.equal('0');
      });

      it('Set Max properties type invalid when return value with default', async () => {
        el.max = 'ABC';
        await elementUpdated(el);
        expect(el.max).to.equal('100');

        el.max = '';
        await elementUpdated(el);
        expect(el.max).to.equal('100');

        el.max = undefined;
        await elementUpdated(el);
        expect(el.max).to.equal('100');

        el.max = null;
        await elementUpdated(el);
        expect(el.max).to.equal('100');
      });

    });
    describe('Test readonly State', () => {
      it('readonly can be set via attribute', async () => {
        el = await fixture('<ef-slider readonly></ef-slider>');
        await elementUpdated(el);
        expect(el.hasAttribute('readonly')).to.true;
      });
      it('readonly is not set by default', async () => {
        await elementUpdated(el);
        expect(el.hasAttribute('readonly')).to.false;
        expect(el.readonly).to.false;
      });
      it('readonly can be set via property', async () => {
        el.readonly = true;
        await elementUpdated(el);
        expect(el.readonly).to.be.true;
      });
      it('readonly can be set via property and has value more than max', async () => {
        el.readonly = true;
        el.value = '150';
        await elementUpdated(el);
        expect(el.readonly).to.be.true;
        expect(el.value).to.equal(el.max.toString());
      });
    });
    describe('Test Input Field', () => {


      it('input number field has set value 40 it should be slider value has correct ', async () => {

        el.showInputField = '';
        await elementUpdated(el);
        expect(el.hasAttribute('show-input-field')).to.equal(true);

        let input = el.shadowRoot.querySelector('ef-number-field[name=value]');
        setTimeout(() => input.dispatchEvent(new Event('focus')));
        await oneEvent(input, 'focus');
        input.value = '40';
        setTimeout(() => input.dispatchEvent(new Event('blur')));
        await oneEvent(input, 'blur');

        await elementUpdated(el);
        expect(el.value).to.equal(input.value);
        expect(input.value).to.equal('40');
      });

      it('input number field has set from 10 and to 20 on slider range', async () => {
        el.showInputField = '';
        await elementUpdated(el);
        expect(el.hasAttribute('show-input-field')).to.equal(true);

        el.range = true;
        await elementUpdated(el);
        expect(el.hasAttribute('range')).to.equal(true);

        let inputFrom = el.shadowRoot.querySelector('ef-number-field[name=from]');
        setTimeout(() => inputFrom.dispatchEvent(new Event('focus')));
        await oneEvent(inputFrom, 'focus');
        inputFrom.value = '10';
        setTimeout(() => inputFrom.dispatchEvent(new Event('blur')));
        await oneEvent(inputFrom, 'blur');
        await elementUpdated(el);
        expect(el.from).to.equal(inputFrom.value);

        let inputTo = el.shadowRoot.querySelector('ef-number-field[name=to]');
        setTimeout(() => inputTo.dispatchEvent(new Event('focus')));
        await oneEvent(inputTo, 'focus');
        inputTo.value = '20';
        setTimeout(() => inputTo.dispatchEvent(new Event('blur')));
        await oneEvent(inputTo, 'blur');

        await elementUpdated(el);
        expect(el.to).to.equal(inputTo.value);
      });

      it('slider set value 10 it should be input number field has correct', async () => {
        el.showInputField = '';
        await elementUpdated(el);
        expect(el.hasAttribute('show-input-field')).to.equal(true);

        el.value = '15';
        await elementUpdated(el);
        expect(el.value).to.equal('15');
        let input = el.shadowRoot.querySelector('ef-number-field[name=value]');
        expect(input.value).to.equal(el.value);
      });

      it('Input field should in readonly state when show-input-field value is equal "readonly"', async () => {
        el.showInputField = 'readonly';
        await elementUpdated(el);
        expect(el.hasAttribute('show-input-field')).to.equal(true);
        let input = el.shadowRoot.querySelector('ef-number-field[name=value]');
        expect(input.readonly).to.equal(true);

        el.range = true;
        el.showInputField = 'readonly';
        await elementUpdated(el);
        expect(el.hasAttribute('show-input-field')).to.equal(true);

        let inputFrom = el.shadowRoot.querySelector('ef-number-field[name=from]');
        expect(inputFrom.readonly).to.equal(true);
        let inputTo = el.shadowRoot.querySelector('ef-number-field[name=to]');
        expect(inputTo.readonly).to.equal(true);
      });

      it('Input field should be displayed and not in readonly state when show-input-field value is not equal to null', async () => {

        el.showInputField = 'Readonly';
        await elementUpdated(el);
        expect(el.hasAttribute('show-input-field')).to.equal(true);
        let inputValue = el.shadowRoot.querySelector('ef-number-field[name=value]');
        expect(inputValue.readonly).to.equal(false);

        el.range = true;
        await elementUpdated(el);
        expect(el.hasAttribute('show-input-field')).to.equal(true);
        let inputFrom = el.shadowRoot.querySelector('ef-number-field[name=from]');
        expect(inputFrom.readonly).to.equal(false);
        let inputTo = el.shadowRoot.querySelector('ef-number-field[name=to]');
        expect(inputTo.readonly).to.equal(false);
      });
    });
    describe('Test Events', () => {
      it('Drag thumb slider on desktop', async () => {
        await elementUpdated(el);
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown')));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: 100, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.value).to.equal(calculateValue(el, 100).toFixed(0).toString());
      });

      it('Drag thumb slider has range on desktop', async () => {
        el.range = true;
        await elementUpdated(el);
        expect(el.from).to.equal('0');
        expect(el.to).to.equal('100');

        // Drag from
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, 100).toFixed(0));
        expect(el.to).to.equal('100');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: 150, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.from).to.equal(calculateValue(el, 150).toFixed(0));
        expect(el.to).to.equal('100');

        // Drag to
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: window.innerWidth - 100, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, 150).toFixed(0));

        expect(el.to).to.equal(calculateValue(el, window.innerWidth - 100).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: window.innerWidth - 90, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: window.innerWidth - 90, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.from).to.equal(calculateValue(el, 150).toFixed(0));
        expect(el.to).to.equal(calculateValue(el, window.innerWidth - 90).toString());
      });

      it('Drag "from" thumb slider to end of right.', async () => {
        el.range = true;
        await elementUpdated(el);
        expect(el.from).to.equal('0');
        expect(el.to).to.equal('100');

        // Drag from
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, 100).toFixed(0));
        expect(el.to).to.equal('100');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: window.innerWidth, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: window.innerWidth, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.from).to.equal(el.to);
        expect(el.to).to.equal('100');
      });

      it('Drag "to" thumb slider to end of left.', async () => {
        el.range = true;
        await elementUpdated(el);
        expect(el.from).to.equal('0');
        expect(el.to).to.equal('100');

        // Drag to
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: window.innerWidth - 100, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal('0');
        expect(el.to).to.equal(calculateValue(el, window.innerWidth - 100).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.from).to.equal('0');
        expect(el.to).to.equal(el.from);
      });

      it('Click near from thumb and click near to thumb has range slider on desktop', async () => {
        el.range = true;
        await elementUpdated(el);
        expect(el.from).to.equal('0');
        expect(el.to).to.equal('100');

        const clickFromPosition = tabSliderPosition(20);
        const clickToPosition = tabSliderPosition(80);

        // Click from
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: clickFromPosition, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, clickFromPosition).toString());
        expect(el.to).to.equal('100');

        // Click to
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: clickToPosition, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, clickFromPosition).toString());
        expect(el.to).to.equal(calculateValue(el, clickToPosition).toString());
      });

      it('Event fires only when the "value-changed" in slider', async () => {
        expect(el.value).to.equal('0');

        let callCountValue = 0;
        el.addEventListener('value-changed', () => {
          callCountValue += 1;
        });

        const dragValuePositionFirst = tabSliderPosition(10);
        const dragValuePositionSecond = tabSliderPosition(30);
        const dragValuePositionLast = tabSliderPosition(20);

        // Drag 'value' position 10 to 20
        // Drag start
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: dragValuePositionFirst, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.value).to.equal(calculateValue(el, dragValuePositionFirst).toString());

        // Dragging
        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: dragValuePositionLast, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        // Darg end
        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: dragValuePositionLast, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.value).to.equal(calculateValue(el, dragValuePositionLast).toString());

        // Drag 'value' position 30 to 20
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: dragValuePositionSecond, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.value).to.equal(calculateValue(el, dragValuePositionSecond).toString());

        // dragging
        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: dragValuePositionLast, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        // Drag end
        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: dragValuePositionLast, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.value).to.equal(calculateValue(el, dragValuePositionLast).toString());

        // Check call fire event
        expect(callCountValue).to.equal(1);
      });

      it('Event fires only when the "from-changed" and "to-changed" in slider range mode', async () => {
        el.range = true;
        await elementUpdated(el);
        expect(el.from).to.equal('0');
        expect(el.to).to.equal('100');

        let callCountFrom = 0;
        el.addEventListener('from-changed', () => {
          callCountFrom += 1;
        });

        let callCountTo = 0;
        el.addEventListener('to-changed', () => {
          callCountTo += 1;
        });

        const dragFromPositionFirst = tabSliderPosition(10);
        const dragFromPositionSecond = tabSliderPosition(30);
        const dragFromPositionLast = tabSliderPosition(20);

        // Drag 'from' position 10 to 20
        // Drag start
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: dragFromPositionFirst, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, dragFromPositionFirst).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: dragFromPositionLast, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: dragFromPositionLast, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.from).to.equal(calculateValue(el, dragFromPositionLast).toString());

        // Drag 'from' position 30 to 20
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: dragFromPositionSecond, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, dragFromPositionSecond).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: dragFromPositionLast, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: dragFromPositionLast, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.from).to.equal(calculateValue(el, dragFromPositionLast).toString());

        const dragToPositionFirst = tabSliderPosition(90);
        const dragToPositionSecond = tabSliderPosition(60);
        const dragToPositionLast = tabSliderPosition(50);

        // Drag 'to' position 90 to 50
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: dragToPositionFirst, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.to).to.equal(calculateValue(el, dragToPositionFirst).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: dragToPositionLast, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: dragToPositionLast, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.to).to.equal(calculateValue(el, dragToPositionLast).toString());

        // Drag 'to' position 60 to 50
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: dragToPositionSecond, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.to).to.equal(calculateValue(el, dragToPositionSecond).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: dragToPositionLast, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: dragToPositionLast, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.to).to.equal(calculateValue(el, dragToPositionLast).toString());

        // Check call fire event
        expect(callCountFrom).to.equal(1);
        expect(callCountTo).to.equal(1);
      });

      it('Drag thumb slider to right when has step="0.5"', async () => {

        el.min = '0';
        el.max = '10';
        el.step = '0.5';

        await elementUpdated(el);

        const clickPositionRight = tabSliderPosition(100);

        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown')));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(window, 'mouseup');

        expect(el.dragging).to.be.false;
        expect(el.value).to.equal(calculateValue(el, clickPositionRight).toString());
      });

      it('Drag thumb slider to right when has min="0.1"', async () => {

        el.min = '0.1';
        el.max = '10';
        el.step = '0.5';

        await elementUpdated(el);

        const clickPositionRight = tabSliderPosition(100);

        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;

        setTimeout(() => el.dispatchEvent(new MouseEvent('mousemove', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(el, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.value).to.equal(calculateValue(el, clickPositionRight).toString());
      });

      it('Drag thumb slider to right when has max="10.1"', async () => {

        el.min = '0';
        el.max = '10.1';
        el.step = '0.5';

        await elementUpdated(el);

        const clickPositionRight = tabSliderPosition(100);

        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;

        setTimeout(() => el.dispatchEvent(new MouseEvent('mousemove', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(el, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.value).to.equal(calculateValue(el, clickPositionRight).toString());
      });

      it('Drag thumb slider to left and right when has min="0.3", max="10.1" and step="0.5"', async () => {

        el.min = '0.3';
        el.max = '10.1';
        el.step = '0.5';

        await elementUpdated(el);

        // Drag to left
        const clickPositionLeft = tabSliderPosition(0);

        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: clickPositionLeft, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;

        setTimeout(() => el.dispatchEvent(new MouseEvent('mousemove', { clientX: clickPositionLeft, clientY: 0 })));
        await oneEvent(el, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: clickPositionLeft, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;

        expect(el.value).to.equal(calculateValue(el, clickPositionLeft).toString());

        await elementUpdated(el);

        // Drag to right
        const clickPositionRight = tabSliderPosition(100);

        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;

        setTimeout(() => el.dispatchEvent(new MouseEvent('mousemove', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(el, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.value).to.equal(calculateValue(el, clickPositionRight).toString());
      });

      it('Drag thumb slider range to left and right when has min="0.1"', async () => {

        el.range = true;
        el.min = '0.1';
        el.max = '10';
        await elementUpdated(el);

        const clickPositionLeft = tabSliderPosition(0);
        const clickPositionRight = tabSliderPosition(100);

        // Drag from
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: clickPositionLeft, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, clickPositionLeft).toString());
        expect(el.to).to.equal(el.max);

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: clickPositionLeft, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: clickPositionLeft, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.from).to.equal(calculateValue(el, clickPositionLeft).toString());
        expect(el.to).to.equal(el.max);

        await elementUpdated(el);

        // Drag to

        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, clickPositionLeft).toString());
        expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.from).to.equal(calculateValue(el, clickPositionLeft).toString());
        expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());
      });

      it('Drag thumb slider range to left and right when has max="10"', async () => {

        el.range = true;
        el.min = '0';
        el.max = '10.1';
        await elementUpdated(el);

        const clickPositionLeft = tabSliderPosition(0);
        const clickPositionRight = tabSliderPosition(100);

        // Drag from
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: clickPositionLeft, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, clickPositionLeft).toString());
        expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: clickPositionLeft, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: clickPositionLeft, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.from).to.equal(calculateValue(el, clickPositionLeft).toString());
        expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());

        await elementUpdated(el);

        // Drag to
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, clickPositionLeft).toString());
        expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.from).to.equal(calculateValue(el, clickPositionLeft).toString());
        expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());
      });

      it('Drag thumb slider range when has min="0.1", max="10" and step="0.5"', async () => {

        el.range = true;
        el.min = '0.1';
        el.max = '10.1';
        el.step = '0.5';

        await elementUpdated(el);

        const clickPositionLeft = tabSliderPosition(0);
        const clickPositionRight = tabSliderPosition(100);

        // Drag from
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: clickPositionLeft, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, clickPositionLeft).toString());
        expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: clickPositionLeft, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: clickPositionLeft, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.from).to.equal(calculateValue(el, clickPositionLeft).toString());
        expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());

        await elementUpdated(el);

        // Drag to
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, clickPositionLeft).toString());
        expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: clickPositionRight, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.from).to.equal(calculateValue(el, clickPositionLeft).toString());
        expect(el.to).to.equal(calculateValue(el, clickPositionRight).toString());
      });

      it('Drag thumb slider range when has min-range more than step', async () => {

        el.range = true;
        el.min = '0.1';
        el.max = '10.1';
        el.step = '0.5';
        el.minRange = '2';

        await elementUpdated(el);

        const dragPosition20 = tabSliderPosition(20);
        const dragPosition40 = tabSliderPosition(40);
        const dragPosition60 = tabSliderPosition(60);
        const dragPosition80 = tabSliderPosition(80);
        const dragPosition100 = tabSliderPosition(100);

        // Drag from
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: dragPosition20, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, dragPosition20).toString());
        expect(el.to).to.equal(calculateValue(el, dragPosition100).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: dragPosition40, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: dragPosition40, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.from).to.equal(calculateValue(el, dragPosition40).toString());
        expect(el.to).to.equal(calculateValue(el, dragPosition100).toString());

        await elementUpdated(el);

        // Drag to
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: dragPosition80, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, dragPosition40).toString());
        expect(el.to).to.equal(calculateValue(el, dragPosition80).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: dragPosition40, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: dragPosition40, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;

        expect(el.from).to.equal(calculateValue(el, dragPosition40).toString());
        expect(el.to).to.equal(calculateValue(el, dragPosition60).toString());
      });

      it('Drag thumb slider range when has min-range less more step', async () => {

        el.range = true;
        el.min = '0.1';
        el.max = '10.1';
        el.step = '1';
        el.minRange = '0.5';

        await elementUpdated(el);

        const dragPosition20 = tabSliderPosition(20);
        const dragPosition40 = tabSliderPosition(40);
        const dragPosition80 = tabSliderPosition(80);
        const dragPosition100 = tabSliderPosition(100);

        // Drag from
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: dragPosition20, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, dragPosition20).toString());
        expect(el.to).to.equal(calculateValue(el, dragPosition100).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: dragPosition40, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: dragPosition40, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.from).to.equal(calculateValue(el, dragPosition40).toString());
        expect(el.to).to.equal(calculateValue(el, dragPosition100).toString());

        await elementUpdated(el);

        // Drag to
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: dragPosition80, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, dragPosition40).toString());
        expect(el.to).to.equal(calculateValue(el, dragPosition80).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: dragPosition40, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: dragPosition40, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;

        expect(el.from).to.equal(calculateValue(el, dragPosition40).toString());
        expect(el.to).to.equal(calculateValue(el, dragPosition40).toString());
      });

      it('Drag thumb slider to the right when value decimal boundary more than max decimal', async () => {

        el.min = '-0.251';
        el.max = '0.1534';
        el.step = '0.01235';
        el.value = '0';

        await elementUpdated(el);
        const dragPositionToRight = tabSliderPosition(100);

        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: dragPositionToRight, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;

        setTimeout(() => el.dispatchEvent(new MouseEvent('mousemove', { clientX: dragPositionToRight, clientY: 0 })));
        await oneEvent(el, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: dragPositionToRight, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;

        expect(el.value).to.equal(calculateValue(el, dragPositionToRight).toString());
      });

      it('Drag thumb slider range "to" and "from" to position the right when value decimal boundary more than max decimal', async () => {

        el.range = true;
        el.min = '-0.251';
        el.max = '0.1534';
        el.step = '0.01235';
        el.value = '0';

        const dragPosition0 = tabSliderPosition(0);
        const dragPosition20 = tabSliderPosition(20);
        const dragPosition80 = tabSliderPosition(80);
        const dragPosition100 = tabSliderPosition(100);

        await elementUpdated(el);

        // Drag to
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: dragPosition80, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, dragPosition0).toString());
        expect(el.to).to.equal(calculateValue(el, dragPosition80).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: dragPosition100, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: dragPosition100, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;

        expect(el.from).to.equal(calculateValue(el, dragPosition0).toString());
        expect(el.to).to.equal(calculateValue(el, dragPosition100).toString());

        // Drag from
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: dragPosition20, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, dragPosition20).toString());
        expect(el.to).to.equal(calculateValue(el, dragPosition100).toString());

        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: dragPosition100, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: dragPosition100, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.from).to.equal(calculateValue(el, dragPosition100).toString());
        expect(el.to).to.equal(calculateValue(el, dragPosition100).toString());
      });

      it('Event value-changed should not fired when property programmatically set', async () => {
        const slider = await fixture('<ef-slider></ef-slider>');
        let eventCount = 0;
        slider.addEventListener('value-changed', () => {
          eventCount += 1;
        });

        // Set property programmatically
        slider.value = 90;
        await elementUpdated(slider);
        expect(eventCount, 'Event "value-changed" should not fired').to.equal(0);
        expect(slider.value).to.equal('90');
      });

      it('Event from-changed and to-changed should not fired when property programmatically set', async () => {
        const slider = await fixture('<ef-slider></ef-slider>');

        let fromEventFiredCount = 0;
        slider.addEventListener('from-changed', (event) => {
          fromEventFiredCount += 1;
        });

        let toEventFiredCount = 0;
        slider.addEventListener('to-changed', (event) => {
          toEventFiredCount += 1;
        });

        slider.range = true;

        // Set property programmatically
        slider.from = 40;
        await elementUpdated(slider);
        expect(fromEventFiredCount, 'Event "from-changed" should not fired').to.equal(0);
        expect(slider.from).to.equal('40');

        // Set property programmatically
        slider.to = 90;
        await elementUpdated(slider);
        expect(toEventFiredCount, 'Event "to-changed" should not fired').to.equal(0);
        expect(slider.to).to.equal('90');
      });

      it('Event value-changed should fires when value property was set via api and drag the slider back to previous value', async () => {
        expect(el.value).to.equal('0');
        el.value = 10;
        await elementUpdated();
        expect(el.value).to.equal('10');


        let callCountValue = 0;
        el.addEventListener('value-changed', () => {
          callCountValue += 1;
        });

        // Drag 'value' position 10 to 0
        const dragValuePositionStart = tabSliderPosition(0);
        const dragValuePositionFirst = tabSliderPosition(10);
        // Drag start
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: dragValuePositionFirst, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.value).to.equal(calculateValue(el, dragValuePositionFirst).toString());

        // Dragging
        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: dragValuePositionStart, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        // Darg end
        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: dragValuePositionStart, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.value).to.equal(calculateValue(el, dragValuePositionStart).toString());

        // Check call fire event
        expect(callCountValue).to.equal(1);
      });

      it('Event from-changed should fires when from property was set via api and drag the slider back to previous value', async () => {
        el.range = true;
        await elementUpdated(el);
        expect(el.from).to.equal('0');
        expect(el.to).to.equal('100');

        el.from = 10;
        await elementUpdated();
        expect(el.from).to.equal('10');

        let callCountValue = 0;
        el.addEventListener('from-changed', () => {
          callCountValue += 1;
        });

        // Drag 'from' position 10 to 0
        const dragPositionStart = tabSliderPosition(0);
        const dragPosition10 = tabSliderPosition(10);

        // Drag start
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: dragPosition10, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.from).to.equal(calculateValue(el, dragPosition10).toString());

        // Dragging
        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: dragPositionStart, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        // Darg end
        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: dragPositionStart, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.from).to.equal(calculateValue(el, dragPositionStart).toString());

        // Check call fire event
        expect(callCountValue).to.equal(1);
      });

      it('Event to-changed should fires when to property was set via api and drag the slider back to previous value', async () => {
        el.range = true;
        await elementUpdated(el);
        expect(el.from).to.equal('0');
        expect(el.to).to.equal('100');

        el.to = 80;
        await elementUpdated();
        expect(el.to).to.equal('80');

        let callCountValue = 0;
        el.addEventListener('to-changed', () => {
          callCountValue += 1;
        });

        // Drag 'to' position 80 to 100
        const dragPositionEnd = tabSliderPosition(100);
        const dragPosition80 = tabSliderPosition(80);

        // Drag start
        setTimeout(() => el.sliderRef.value.dispatchEvent(new MouseEvent('mousedown', { clientX: dragPosition80, clientY: 0 })));
        await oneEvent(el.sliderRef.value, 'mousedown');
        expect(el.dragging).to.be.true;
        expect(el.to).to.equal(calculateValue(el, dragPosition80).toString());

        // Dragging
        setTimeout(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: dragPositionEnd, clientY: 0 })));
        await oneEvent(window, 'mousemove');

        // Darg end
        setTimeout(() => window.dispatchEvent(new MouseEvent('mouseup', { clientX: dragPositionEnd, clientY: 0 })));
        await oneEvent(window, 'mouseup');
        expect(el.dragging).to.be.false;
        expect(el.to).to.equal(calculateValue(el, dragPositionEnd).toString());

        // Check call fire event
        expect(callCountValue).to.equal(1);
      });

    });
  });
});
