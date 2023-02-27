import {
  fixture,
  expect,
  elementUpdated
} from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/slider';
import '@refinitiv-ui/elemental-theme/light/ef-slider';

const getTrackElement = (el) => el.shadowRoot.querySelector('[part=track-wrapper]');

describe('slider/Slider', () => {
  let el;

  beforeEach(async () => {
    el = await fixture('<ef-slider></ef-slider>');
  });

  it('DOM structure is correct', async () => {
    await expect(el).shadowDom.to.equalSnapshot();
  });

  describe('Value', () => {
    it('If value should be equal to value when set value with valid', async () => {
      const newValue = 20;
      el.value = newValue;
      await elementUpdated(el);
      expect(el.value).to.equal(newValue.toString());
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
  });
  describe('Invalid values', () => {
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
  describe('Readonly', () => {
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
  describe('Disabled', () => {
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
  describe('Show-steps', () => {
    it('Show steps can be set via attribute and property', async () => {
      el.showSteps = true;
      await elementUpdated(el);
      const showSteps = getTrackElement(el);
      const showStepsSize = getComputedStyle(showSteps, '::after').height;
      expect(showStepsSize).to.not.equal('auto');
    });
    it('Show steps is not set by default', () => {
      el.showSteps = false;
      const showSteps = getTrackElement(el);
      const showStepsSize = getComputedStyle(showSteps, '::after').height;
      expect(showStepsSize).to.equal('auto');
    });
  });
  describe('Step', () => {
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
  describe('Min', () => {
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
  describe('Max', () => {
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
  describe('Pin', () => {
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
  describe('Range', () => {
    it('Set "to" via attribute to wrong value format.', async () => {
      el = await fixture(
        '<ef-slider range min="0" max="100" to="text"></ef-slider>'
      );
      await elementUpdated(el);
      expect(el.min).to.equal('0');
      expect(el.max).to.equal('100');
      expect(el.from).to.equal('0');
      expect(el.to).to.equal('100');
    });

    it('Set "from" via attribute to wrong value format.', async () => {
      el = await fixture(
        '<ef-slider range min="0" max="100" from="text"></ef-slider>'
      );
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
  describe('Min-range', () => {
    it('Set from and to wrong distance "to" nearly max', async () => {
      el = await fixture(
        '<ef-slider range min="-10" max="10" from="8" to="9" min-range="5"></ef-slider>'
      );
      await elementUpdated(el);
      expect(el.min).to.equal('-10');
      expect(el.max).to.equal('10');
      expect(el.from).to.equal('4');
      expect(el.to).to.equal('9');
    });

    it('Set from and to wrong distance "from" nearly min', async () => {
      el = await fixture(
        '<ef-slider range min="-10" max="10" from="-9" to="-8" min-range="5"></ef-slider>'
      );
      await elementUpdated(el);
      expect(el.min).to.equal('-10');
      expect(el.max).to.equal('10');
      expect(el.from).to.equal('-9');
      expect(el.to).to.equal('-4');
    });

    it('Set from, to out of boundary range more max', async () => {
      el = await fixture(
        '<ef-slider range min="-10" max="10" from="99" to="90" min-range="5"></ef-slider>'
      );
      await elementUpdated(el);
      expect(el.min).to.equal('-10');
      expect(el.max).to.equal('10');
      expect(el.from).to.equal('5');
      expect(el.to).to.equal('10');
    });

    it('Set from , to out of boundary range less min', async () => {
      el = await fixture(
        '<ef-slider range min="-10" max="10" from="-99" to="-90" min-range="5"></ef-slider>'
      );
      await elementUpdated(el);
      expect(el.min).to.equal('-10');
      expect(el.max).to.equal('10');
      expect(el.from).to.equal('-10');
      expect(el.to).to.equal('-5');
    });

    it('Set from , to out of boundary range less min', async () => {
      el = await fixture(
        '<ef-slider range min="-10" max="10" from="-99" to="99" min-range="5" ></ef-slider>'
      );
      await elementUpdated(el);
      expect(el.min).to.equal('-10');
      expect(el.max).to.equal('10');
      expect(el.from).to.equal('-10');
      expect(el.to).to.equal('10');
    });

    it('Set from , to out of boundary range more max and set min-range out of boundary', async () => {
      el = await fixture(
        '<ef-slider range min="-10" max="10" from="99" to="90" min-range="1000"></ef-slider>'
      );
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
  describe('Negative values', () => {
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
  describe('Decimal values', () => {
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
});
