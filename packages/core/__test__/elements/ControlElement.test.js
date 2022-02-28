import { elementUpdated, expect, fixture, html, oneEvent, triggerFocusFor, isIE } from '@refinitiv-ui/test-helpers';
import { ControlElement } from '../../lib/elements/ControlElement';
import { customElement } from '../../lib/decorators/custom-element';
import { elementUpdatedWithAsyncFrames, isChrome, asyncFrames } from '../helper';

const MOCKED_COMPARE_LENGTH_VALUE = 12;

class ControlElementTest extends ControlElement {
  constructor () {
    super();

    this.warnCount = 0;
  }

  get tabbableElements () {
    return this.disabled ? [] : super.tabbableElements;
  }

  // here is overriding default functionality to be used in functional test value setter
  isValidValue (value) {
    return super.isValidValue(value) && value.length < MOCKED_COMPARE_LENGTH_VALUE;
  }

  warnInvalidValue (value) {
    super.warnInvalidValue(value);
    this.warnCount += 1;
  }

  render () {
    return html`
      <style>
        :host {
          width: 100px;
          height: 100px;
          display: block;
          background-color: red;
        }

        div {
          width: 10px;
          height: 10px;
          display: block;
          background-color: green;
        }
      </style>
      <div id="first-element" tabindex="0"></div>
      <div id="second-element"></div>
      <div id="third-element"></div>
    `;
  }
}

customElement('control-element-test', {
  theme: false
})(ControlElementTest);

describe('TestControlElement', () => {
  it('Test creation', () => {
    expect(async () => {
      await fixture('<control-element-test></control-element-test>');
    }).to.not.throw();
  });

  it('Needs to have correct DOM structure', async () => {
    const el = await fixture('<control-element-test></control-element-test>');

    expect(el).shadowDom.to.equalSnapshot();
    expect(el).lightDom.to.equalSnapshot();
  });

  describe('Test properties and attributes', async () => {
    describe('Test "disabled" property and attribute', async () => {
      it('Should have correct property and attribute "disabled" by default', async () => {
        const el = await fixture('<control-element-test></control-element-test>');

        expect(el.disabled).to.equal(false, 'property "disabled" should be false by default');

        el.setAttribute('disabled', '');
        await elementUpdated(el);

        expect(el.disabled).to.equal(true, 'property "disabled" should be equal true');
        expect(el.hasAttribute('disabled')).to.equal(true, 'attribute "disabled" should be exists');
        expect(el.getAttribute('disabled')).to.equal('', 'attribute "disabled" should equal ""');

        expect(el.style.pointerEvents).to.equal('none', 'pointer events should be set to "none"');

        expect(el.hasAttribute('aria-disabled')).to.equal(true, 'attribute "aria-disabled" should be present');
        expect(el.getAttribute('aria-disabled')).to.equal('true', '"aria-disabled" should be true');

        expect(el.tabIndex).to.equal(-1, 'property tabIndex should be changed to -1 if element disabled');
        expect(el.getAttribute('tabindex')).to.equal('-1', 'attribute "tabindex" should be changed to "-1" if element disabled');

        el.disabled = false;
        await elementUpdated(el);

        expect(el.disabled).to.equal(false, 'property "disabled" need to be set false');

        expect(el.tabIndex).to.equal(0, 'property tabIndex should be changed to 0 (default property value) if element enabled');
        expect(el.getAttribute('tabindex')).to.equal('0', 'attribute "tabindex" should be changed to "0" (default attribute value) if element disabled');
      });

      it('Should have correct property and attribute "disabled"', async () => {
        const el = await fixture('<control-element-test disabled></control-element-test>');

        expect(el.disabled).to.equal(true, 'property "disabled" should be setted');
        expect(el.getAttribute('disabled')).to.equal('', 'attribute "disabled" should equal empty string');
        expect(el.hasAttribute('disabled')).to.equal(true, 'attribute "disabled" should be present');

        expect(el.style.pointerEvents).to.equal('none', 'pointer events should be set to "none"');

        expect(el.hasAttribute('aria-disabled')).to.equal(true, 'attribute "aria-disabled" should be present');
        expect(el.getAttribute('aria-disabled')).to.equal('true', '"aria-disabled" should be true');

        expect(el.tabIndex).to.equal(-1, 'property tabIndex should be changed to -1 if element disabled');
        expect(el.getAttribute('tabindex')).to.equal('-1', 'attribute "tabindex" should be changed to "-1" if element disabled');
      });
    });

    describe('Test "readonly" property and attribute', async () => {
      it('Should have correct property and attribute "readonly" by default', async () => {
        const el = await fixture('<control-element-test></control-element-test>');

        expect(el.readonly).to.equal(false, 'property "readonly" should be false by default');

        el.setAttribute('readonly', '');
        await elementUpdated(el);

        expect(el.readonly).to.equal(true, 'property "readonly" should be equal true');
        expect(el.hasAttribute('readonly')).to.equal(true, 'attribute "readonly" should be exists');
        expect(el.getAttribute('readonly')).to.equal('', 'attribute "readonly" should equal ""');

        el.readonly = false;
        await elementUpdated(el);

        expect(el.readonly).to.equal(false, 'property "readonly" need to be set false');
      });

      it('Should have correct property and attribute "readonly"', async () => {
        const el = await fixture('<control-element-test readonly></control-element-test>');

        expect(el.readonly).to.equal(true, 'property "readonly" should be setted');
        expect(el.getAttribute('readonly')).to.equal('', 'attribute "readonly" should equal empty string');
        expect(el.hasAttribute('readonly')).to.equal(true, 'attribute "readonly" should be present');

      });
    });

    describe('Test "focused" property and attribute', async () => {
      it('Should have correct property and attribute "focused" by default', async () => {
        const el = await fixture('<control-element-test></control-element-test>');

        expect(el.getAttribute('focused')).to.equal(null, 'attribute "focused" should equal null by default');
        expect(el.hasAttribute('focused')).to.equal(false, 'attribute "focused" should not be exists by default');

        el.setAttribute('focused', '');
        await elementUpdated(el);

        expect(el.hasAttribute('focused')).to.equal(true, 'attribute "focused" should be exists');
        expect(el.getAttribute('focused')).to.equal('', 'attribute "focused" should equal ""');
      });

      it('Should have correct property and attribute "focused"', async () => {
        const el = await fixture('<control-element-test focused></control-element-test>');

        expect(el.getAttribute('focused')).to.equal('', 'attribute "focused" should equal empty string');
        expect(el.hasAttribute('focused')).to.equal(true, 'attribute "focused" should be present');
      });
    });

    describe('Test "name" property and attribute', async () => {
      it('Should have correct property and attribute "name" by default', async () => {
        const el = await fixture('<control-element-test></control-element-test>');

        expect(el.name).to.equal('', 'property "name" should be false by default');
        expect(el.getAttribute('name')).to.equal(null, 'attribute "name" should equal null by default');
        expect(el.hasAttribute('name')).to.equal(false, 'attribute "name" should not be exists by default');

        el.setAttribute('name', 'super-name');
        await elementUpdated(el);

        expect(el.name).to.equal('super-name', 'property "name" should be equal "super-name"');
        expect(el.hasAttribute('name')).to.equal(true, 'attribute "name" should be exists');
        expect(el.getAttribute('name')).to.equal('super-name', 'attribute "name" should equal "super-name"');

        el.name = '';
        await elementUpdated(el);
        expect(el.name).to.equal('', 'property "name" should be equal ""');
        expect(el.hasAttribute('name')).to.equal(true, 'attribute "name" should be exists');
        expect(el.getAttribute('name')).to.equal('super-name', 'attribute "name" should not reflect from property');
      });

      it('Should have correct property and attribute "name"', async () => {
        const el = await fixture('<control-element-test name="super-name"></control-element-test>');

        expect(el.name).to.equal('super-name', 'property "name" should be setted');
        expect(el.getAttribute('name')).to.equal('super-name', 'attribute "name" should equal empty string');
        expect(el.hasAttribute('name')).to.equal(true, 'attribute "name" should be present');
      });
    });

    describe('Test "tabIndex" property and attribute', async () => {
      it('Should have correct property and attribute "tabIndex" by default', async () => {
        const el = await fixture('<control-element-test></control-element-test>');

        expect(el.tabIndex).to.equal(0, 'property "tabIndex" should be 0 by default');

        expect(el.hasAttribute('tabindex')).to.equal(true, 'attribute "tabindex" should be exists by default');
        expect(el.getAttribute('tabindex')).to.equal('0', 'attribute "tabindex" should equal "0" by default');

        el.setAttribute('tabindex', '1');
        await elementUpdated(el);

        expect(el.tabIndex).to.equal(1, 'property "tabIndex" should be equal 1');
        expect(el.hasAttribute('tabindex')).to.equal(true, 'attribute "tabindex" should be exists');
        expect(el.getAttribute('tabindex')).to.equal('1', 'attribute "tabindex" should equal "1"');

        el.tabIndex = -1;
        await elementUpdated(el);
        expect(el.tabIndex).to.equal(-1, 'property "tabIndex" need to be set -1');
        expect(el.getAttribute('tabindex')).to.equal('-1', 'property "tabindex" should reflected');
        expect(el.hasAttribute('tabindex')).to.equal(true, 'property "tabindex" should reflected');
      });

      it('Should have correct property and attribute "tabIndex" for value 10', async () => {
        const el = await fixture('<control-element-test tabIndex="10"></control-element-test>');

        expect(el.tabIndex).to.equal(10, 'property "tabIndex" should be equal 10');
        expect(el.getAttribute('tabindex')).to.equal('10', 'attribute "tabindex" should equal "10"');
        expect(el.hasAttribute('tabindex')).to.equal(true, 'attribute "tabindex" should be present');
      });

      it('Should have correct property and attribute "tabIndex" for value -1', async () => {
        const el = await fixture('<control-element-test tabIndex="-1"></control-element-test>');

        expect(el.tabIndex).to.equal(-1, 'property "tabIndex" should be equal -1');
        expect(el.getAttribute('tabindex')).to.equal('-1', 'attribute "tabindex" should equal "-1"');
        expect(el.hasAttribute('tabindex')).to.equal(true, 'attribute "tabindex" should be present');
      });
    });

    describe('Test "value" property and attribute', async () => {
      it('Should have correct property and attribute "value" by default', async () => {
        const el = await fixture('<control-element-test></control-element-test>');

        expect(el.value).to.equal('', 'property "value" should be false by default');
        expect(el.getAttribute('value')).to.equal(null, 'attribute "value" should equal null by default');
        expect(el.hasAttribute('value')).to.equal(false, 'attribute "value" should not be exists by default');

        el.setAttribute('value', 'super-value');
        await elementUpdated(el);

        expect(el.value).to.equal('super-value', 'property "value" should be equal "super-value"');
        expect(el.hasAttribute('value')).to.equal(true, 'attribute "value" should be exists');
        expect(el.getAttribute('value')).to.equal('super-value', 'attribute "value" should equal "super-value"');

        el.value = '';
        await elementUpdated(el);
        expect(el.value).to.equal('', 'property "value" should be equal ""');
        expect(el.hasAttribute('value')).to.equal(true, 'attribute "value" should be exists');
        expect(el.getAttribute('value')).to.equal('super-value', 'attribute "value" should not reflect from property');

        el.value = 123;
        await elementUpdated(el);
        expect(el.value).to.equal('123', 'property "value" should always be string');

        el.value = null;
        await elementUpdated(el);
        expect(el.value).to.equal('', 'property "value" should cast null to empty string');

        el.value = undefined;
        await elementUpdated(el);
        expect(el.value).to.equal('undefined', 'property "value" should always be string');
      });

      it('Should have correct property and attribute "value"', async () => {
        const el = await fixture('<control-element-test value="super-value"></control-element-test>');

        expect(el.value).to.equal('super-value', 'property "value" should be setted');
        expect(el.getAttribute('value')).to.equal('super-value', 'attribute "value" should not equal empty string');
        expect(el.hasAttribute('value')).to.equal(true, 'attribute "value" should be present');
      });

      it('Should support resetting value to initial value', async () => {
        const el = await fixture('<control-element-test value="super-value"></control-element-test>');
        // Check defaults
        expect(el.getAttribute('value')).to.equal('super-value', 'attribute "value" should not equal empty string');
        expect(el.value).to.equal('super-value', 'value property should be in sync with attribute');
        // Update and checks values
        el.value = 'new-value';
        expect(el.getAttribute('value')).to.equal('super-value', 'attribute "value" should not change after property change');
        expect(el.value).to.equal('new-value', 'value property have updated to "new-value"');
        // Reset value and check state
        expect(el.reset()).to.not.throw;
        expect(el.getAttribute('value')).to.equal('super-value', 'attribute "value" should not change after reset');
        expect(el.value).to.equal('super-value', 'value property should reset to its initial value');
      });
    });
  });

  describe('Test functionality', async () => {
    describe('Test value', async () => {
      let warnCallCount = 0;

      const customWarnFunction = () => {
        warnCallCount += 1;
      };

      // eslint-disable-next-line no-console
      const originWarn = console.warn;

      beforeEach(() => {
        warnCallCount = 0;
        // eslint-disable-next-line no-console
        console.warn = customWarnFunction;
      });

      afterEach(() => {
        // eslint-disable-next-line no-console
        console.warn = originWarn;
      });

      it('Test setter', async () => {
        const el = await fixture('<control-element-test></control-element-test>');

        // some long string to be in length more than MOCKED_COMPARE_LENGTH_VALUE
        el.value = '-'.padEnd(MOCKED_COMPARE_LENGTH_VALUE + 1);
        await elementUpdated(el);

        expect(el.value).to.equal('', 'Invalid value should be casted to empty string');
        expect(warnCallCount).to.equal(1, 'Warning notice need to be shown by default');
        expect(el.warnCount).to.equal(1, 'Warning notice method could be override');

        // check one more time for another value
        // some long string to be in length more than MOCKED_COMPARE_LENGTH_VALUE
        el.value = '+'.padEnd(MOCKED_COMPARE_LENGTH_VALUE + 2);
        await elementUpdated(el);

        expect(el.value).to.equal('', 'Invalid value should be casted to empty string always');
        expect(warnCallCount).to.equal(2, 'Warning notice should be shown each time by default');
        expect(el.warnCount).to.equal(2, 'Warning notice method should be called each time');
      });

      describe('Test value-changed event', async () => {
        it('Test setting string value', async () => {
          const el = await fixture('<control-element-test></control-element-test>');
          let firedCount = 0;

          // count how many time value-changed fired
          el.addEventListener('value-changed', () => {
            firedCount += 1;
          });

          // call function to change value in async way
          setTimeout(() => {
            el.setValueAndNotify('new-value');
          });

          const { detail: { value } } = await oneEvent(el, 'value-changed');

          expect(firedCount).to.equal(1, 'value-changed should fire');
          expect(value).to.equal('new-value', 'Correct value need to be shown at value-changed event');

          // call function to change value in a sync way, value-changed should not be fired for the same value
          el.setValueAndNotify('new-value');

          expect(firedCount).to.equal(1, 'value-changed should fire just for changed values');
        });

        it('Test setting number value', async () => {
          const el = await fixture('<control-element-test></control-element-test>');

          setTimeout(() => {
            el.setValueAndNotify(123);
          });

          const { detail: { value } } = await oneEvent(el, 'value-changed');

          expect(value).to.equal(123, 'Value to be fired at event could be any type');
        });
        it('Test setting null value', async () => {
          const el = await fixture('<control-element-test></control-element-test>');

          setTimeout(() => {
            el.setValueAndNotify(null);
          });

          const { detail: { value } } = await oneEvent(el, 'value-changed');

          expect(value).to.equal(null, 'Value to be fired at event could be any type');
        });
        it('Test setting string value', async () => {
          const el = await fixture('<control-element-test></control-element-test>');

          setTimeout(() => {
            el.setValueAndNotify(undefined);
          });

          const { detail: { value } } = await oneEvent(el, 'value-changed');

          expect(value).to.equal(undefined, 'Value to be fired at event could be any type');
        });
      });
    });

    describe('Test tabIndex', async () => {
      describe('Test property setter', async () => {
        it('Should have default property equal 0 and have no attribute by default', async () => {
          const el = await fixture('<control-element-test></control-element-test>');

          expect(el.tabIndex).to.equal(0, 'should have default value 0');
          expect(el.hasAttribute('tabindex')).to.equal(true, 'should have attribute tabindex by default');
          expect(el.getAttribute('tabindex')).to.equal('0', 'tabIndex attribute should be equal "0" by default');

          el.tabIndex = 0;
          await elementUpdated(el);

          expect(el.tabIndex).to.equal(0, 'property value should stay the same');
          expect(el.getAttribute('tabindex')).to.equal('0', 'attribute tabindex should now exists and have value');

          el.tabIndex = 0;
          await elementUpdated(el);

          expect(el.tabIndex).to.equal(0, 'property value should not change');
          expect(el.getAttribute('tabindex')).to.equal('0', 'attribute tabindex should stay "0" without element updating');
        });

        it('Should cast null to correct value for property and reflect to attribute', async () => {
          const el = await fixture('<control-element-test></control-element-test>');

          el.tabIndex = null;

          await elementUpdated(el);

          expect(el.tabIndex).to.equal(0, 'null value should be casted to 0');
          expect(el.getAttribute('tabindex')).to.equal('0', 'casted value should reflect to attribute');
        });

        it('Should cast undefined to correct value for property and reflect to attribute', async () => {
          const el = await fixture('<control-element-test></control-element-test>');

          el.tabIndex = undefined;

          await elementUpdated(el);

          expect(el.tabIndex).to.equal(0, 'undefined value should be casted to 0');
          expect(el.getAttribute('tabindex')).to.equal('0', 'casted value should reflect to attribute');
        });

        it('Should cast empty string to correct value for property and reflect to attribute', async () => {
          const el = await fixture('<control-element-test></control-element-test>');

          el.tabIndex = '';

          await elementUpdated(el);

          expect(el.tabIndex).to.equal(0, '"" value should be casted to 0');
          expect(el.getAttribute('tabindex')).to.equal('0', 'casted value should reflect to attribute');
        });

        it('Should cast string to correct value for property and reflect to attribute', async () => {
          const el = await fixture('<control-element-test></control-element-test>');

          el.tabIndex = 'abbr';

          await elementUpdated(el);

          expect(el.tabIndex).to.equal(0, '"abbr" value should be casted to 0');
          expect(el.getAttribute('tabindex')).to.equal('0', 'casted value should reflect to attribute');
        });

        it('Should cast string integer to correct type value for property and reflect to attribute', async () => {
          const el = await fixture('<control-element-test></control-element-test>');

          el.tabIndex = '123';

          await elementUpdated(el);

          expect(el.tabIndex).to.equal(123, '"123" value should be casted to 123');
          expect(el.getAttribute('tabindex')).to.equal('123', 'casted value should reflect to attribute');
        });

        it('Should cast string float to correct type value for property and reflect to attribute', async () => {
          const el = await fixture('<control-element-test></control-element-test>');

          el.tabIndex = '123.999';
          await elementUpdated(el);

          expect(el.tabIndex).to.equal(123, '"123.999" value should be casted to 123');
          expect(el.getAttribute('tabindex')).to.equal('123', 'casted value should reflect to attribute');
        });

        it('Should cast string negative float to correct type value for property and reflect to attribute', async () => {
          const el = await fixture('<control-element-test></control-element-test>');

          el.tabIndex = '-123.999';
          await elementUpdated(el);

          expect(el.tabIndex).to.equal(-123, '"-123.999" value should be casted to- 123');
          expect(el.getAttribute('tabindex')).to.equal('-123', 'casted value should reflect to attribute');
        });

        it('Should cast float number to correct value for property and reflect to attribute', async () => {
          const el = await fixture('<control-element-test></control-element-test>');

          el.tabIndex = 123.999;
          await elementUpdated(el);

          expect(el.tabIndex).to.equal(123, '123.999 value should be casted to 123');
          expect(el.getAttribute('tabindex')).to.equal('123', 'casted value should reflect to attribute');
        });

        it('Should cast negative float number to correct value for property and reflect to attribute', async () => {
          const el = await fixture('<control-element-test></control-element-test>');

          el.tabIndex = -123.999;
          await elementUpdated(el);

          expect(el.tabIndex).to.equal(-123, '-123.999 value should be casted to -123');
          expect(el.getAttribute('tabindex')).to.equal('-123', 'casted value should reflect to attribute');
        });
      });

      describe('Test attribute set tabindex', async () => {
        // it('Should cast empty tabindex attribute to correct property', async () => {
        //   const el = await fixture('<control-element-test tabindex></control-element-test>');
        //
        //   expect(el.tabIndex).to.equal(0, 'Empty attribute value should be casted to 0 for property');
        // });
        //
        // it('Should cast empty string to correct property', async () => {
        //   const el = await fixture('<control-element-test tabindex=""></control-element-test>');
        //
        //   expect(el.tabIndex).to.equal(0, 'Empty string attribute should be casted to 0 for property');
        // });

        it('Should cast string integer to correct property', async () => {
          const el = await fixture('<control-element-test tabindex="1"></control-element-test>');

          expect(el.tabIndex).to.equal(1, '"1" attribute should be casted to 1 for property');
        });

        it('Should cast string float to correct property by removing fractional', async () => {
          const el = await fixture('<control-element-test tabindex="1.999"></control-element-test>');

          expect(el.tabIndex).to.equal(1, '"1.999" attribute should be casted to 1 for property');
        });

        it('Should cast string negative integer to correct property', async () => {
          const el = await fixture('<control-element-test tabindex="-10"></control-element-test>');

          expect(el.tabIndex).to.equal(-10, '"-10" attribute should be casted to -10 for property');
        });

        it('Should cast string negative float to correct property by removing fractional', async () => {
          const el = await fixture('<control-element-test tabindex="-10.99"></control-element-test>');

          expect(el.tabIndex).to.equal(-10, '"-10.99" attribute should be casted to -10 for property');
        });
      });
    });

    describe('Test focus', async () => {
      it('Test change disabled with default tabIndex', async () => {
        const el = await fixture('<control-element-test disabled></control-element-test>');

        el.disabled = false;
        await elementUpdated(el);

        expect(el.disabled).to.equal(false, 'disabled should be changed');
        expect(el.tabIndex).to.equal(0, 'tabIndex should change to default value 0');
      });

      it('Test change disabled with custom tabIndex', async () => {
        const el = await fixture('<control-element-test tabindex="10" disabled></control-element-test>');

        expect(el.disabled).to.equal(true, 'disabled property should be true');
        expect(el.tabIndex).to.equal(-1, 'tabIndex property should be changed');

        el.disabled = false;
        await elementUpdated(el);

        expect(el.disabled).to.equal(false, 'disabled should be changed');
        expect(el.tabIndex).to.equal(10, 'tabIndex should change to custom value 10');
      });

      it('Test change disabled after default tabIndex change', async () => {
        const el = await fixture('<control-element-test disabled></control-element-test>');

        el.tabIndex = 5;
        el.disabled = false;
        await elementUpdated(el);

        expect(el.disabled).to.equal(false, 'disabled should be changed');
        expect(el.tabIndex).to.equal(5, 'tabIndex should change to custom value 5');
      });

      it('Test change disabled after default tabIndex change to default value 0', async () => {
        const el = await fixture('<control-element-test disabled></control-element-test>');

        el.tabIndex = 0;
        el.disabled = false;
        await elementUpdated(el);

        expect(el.disabled).to.equal(false, 'disabled should be changed');
        expect(el.tabIndex).to.equal(0, 'tabIndex should change to custom value 0');
      });

      it('Test change property disabled after default tabIndex change and then move back', async () => {
        const el = await fixture('<control-element-test tabindex="10"></control-element-test>');

        expect(el.disabled).to.equal(false, 'disabled should be changed');
        expect(el.tabIndex).to.equal(10, 'tabIndex should change to custom value 10');

        el.disabled = true;
        await elementUpdated(el);

        expect(el.disabled).to.equal(true, 'disabled property changed');
        expect(el.tabIndex).to.equal(-1, 'tabIndex property should be changed');

        el.disabled = false;
        await elementUpdated(el);

        expect(el.disabled).to.equal(false, 'disabled should be removed');
        expect(el.tabIndex).to.equal(10, 'should be set back to custom value 10');
      });

      it('Test element focus', async function () {
        if (!isChrome) {
          this.skip();
        }
        const el = await fixture('<control-element-test autofocus></control-element-test>');
        await elementUpdatedWithAsyncFrames(el);

        expect(el.hasAttribute('focused')).to.equal(true, 'element attribute focused should be set to true');

        setTimeout(() => {
          el.disabled = true;
          // for Firefox it need to be something like
          // el.shadowRoot.activeElement.blur();
        });

        const blurEvent = await oneEvent(el, 'blur');

        expect(blurEvent.type).to.equal('blur', 'blur event should be fired on disabled set to true');

        expect(el.disabled).to.equal(true, 'property disabled should be equal true');
        await asyncFrames();
        expect(el.hasAttribute('focused')).to.equal(false, 'element attribute focused should be set to false when disabled');
        expect(el.style.pointerEvents).to.equal('none', 'pointer events should be set to none when disabled');
        expect(el.tabIndex).to.equal(-1, 'tabIndex should be set to -1');
        expect(el.getAttribute('aria-disabled')).to.equal('true', 'attribute aria-disabled should be set to "true" for disabled element');
      });

      it('Test element delegate focus', async function () {
        if (isIE()) {
          this.skip();
        }
        const el = await fixture('<control-element-test></control-element-test>');
        await triggerFocusFor(el);
        expect(el.shadowRoot.activeElement).to.equal(el.shadowRoot.querySelector('#first-element'));
      });
    });
  });
});
