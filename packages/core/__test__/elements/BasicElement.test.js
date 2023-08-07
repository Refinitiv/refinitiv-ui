import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

import { customElement } from '../../lib/decorators/custom-element.js';
import { BasicElement } from '../../lib/elements/BasicElement.js';

class BasicElementTest extends BasicElement {
  defaultRole = 'button';

  checkNotifyNoCancelable(value) {
    return this.notifyPropertyChange('fakeName', value, false);
  }

  checkNotifyNoCancelableDefault(value) {
    return this.notifyPropertyChange('fakeName', value);
  }

  checkNotifyCancelable(value) {
    return this.notifyPropertyChange('fakeName', value, true);
  }

  checkGetComputedVariable(...props) {
    return this.getComputedVariable(...props);
  }

  checkUpdateVariable(key, value) {
    return this.updateVariable(key, value);
  }
}

customElement('basic-element-test', {
  theme: false
})(BasicElementTest);

describe('TestBasicElement', function () {
  describe('Test properties and attributes', function () {
    describe('Test "role" attribute', function () {
      it('Should have no role by default', async function () {
        const roleELement = class RoleElementTest extends BasicElement {};
        customElement('role-element-test', {
          theme: false
        })(roleELement);

        const el = await fixture('<role-element-test></role-element-test>');
        expect(el.getAttribute('role')).to.equal(null);
      });
      it('Should be able to assign role using defaultRole property', async function () {
        const el = await fixture('<basic-element-test></basic-element-test>');
        expect(el.getAttribute('role')).to.equal('button');
      });
      it('Should take custom role as higher priority than default role', async function () {
        const el = await fixture('<basic-element-test role="checkbox"></basic-element-test>');
        expect(el.getAttribute('role')).to.equal('checkbox');
      });
    });
  });

  describe('Test functionality', function () {
    it('Test creation', function () {
      expect(async () => {
        await fixture('<basic-element-test></basic-element-test>');
      }).to.not.throw();
    });

    it('Test notify changed', async function () {
      const element = await fixture('<basic-element-test></basic-element-test>');
      let value;

      element.addEventListener('fake-name-changed', (event) => {
        value = event.detail.value;
      });

      const notified = element.checkNotifyNoCancelable('fakeValue');

      expect(notified).to.equal(true, 'Notify event not fired');
      expect(value).to.equal('fakeValue', 'Notify event value is wrong');
    });

    it('Test notify changed default cancelable', async function () {
      const element = await fixture('<basic-element-test></basic-element-test>');
      let value;

      element.addEventListener('fake-name-changed', (event) => {
        value = event.detail.value;
      });

      const notified = element.checkNotifyNoCancelableDefault('fakeValue');

      expect(notified).to.equal(true, 'Notify event not fired');
      expect(value).to.equal('fakeValue', 'Notify event value is wrong');
    });

    it('Test cancelable notify changed canceled', async function () {
      const element = await fixture('<basic-element-test></basic-element-test>');

      element.addEventListener('fake-name-changed', (event) => {
        event.preventDefault();
      });

      const notified = element.checkNotifyCancelable('fakeValue');

      expect(notified).to.equal(false, 'Notify event not canceled');
    });

    it('Test get computed variable', async function () {
      const element = await fixture('<basic-element-test></basic-element-test>');

      const emptyValue = element.checkGetComputedVariable('--fake-variable');
      expect(emptyValue).to.equal('', 'Not initialized variable should returns empty string');

      const defaultValue = element.checkGetComputedVariable('--fake-variable', 'fake-value');
      expect(defaultValue).to.equal('fake-value', 'Not initialized variable should return default value');

      const defaultValueWithFallback = element.checkGetComputedVariable(
        '--fake-variable',
        '--fake-variable2',
        'fake-value'
      );
      expect(defaultValueWithFallback).to.equal(
        'fake-value',
        'Not initialized variables should return default value'
      );
    });

    describe('Test update variable', function () {
      let element;

      beforeEach(async function () {
        element = await fixture('<basic-element-test></basic-element-test>');
      });

      it('Test updateVariable method', async function () {
        element.checkUpdateVariable('--fake-variable', 'super-fake-value');

        await elementUpdated(element);

        const emptyValue = element.getComputedVariable('--fake-variable');
        expect(emptyValue).to.equal('super-fake-value', 'Initialized variable should returns value');

        const filledValue = element.checkGetComputedVariable('--fake-variable', 'fake-value');
        expect(filledValue).to.not.equal(
          'fake-value',
          'Initialized variable should not return default value'
        );

        const defaultValue = element.checkGetComputedVariable(
          '--fake-variable2',
          '--fake-variable',
          'fake-value'
        );
        expect(defaultValue).to.not.equal(
          'fake-value',
          'Initialized variables should not return default value'
        );
      });

      it('Test remove property by setting empty value', async function () {
        element.checkUpdateVariable('--fake-variable', 'super-fake-value');
        await elementUpdated(element);

        element.checkUpdateVariable('--fake-variable');
        await elementUpdated(element);

        const removedValue = element.checkGetComputedVariable('--fake-variable');
        expect(removedValue).to.equal('', 'Property is not removed');
      });

      it('Test updateVariable method with wrong name', async function () {
        element.checkUpdateVariable('fake-variable', 'fake-value');

        await elementUpdated(element);

        const failedNameValue = element.checkGetComputedVariable('--fake-variable');
        expect(failedNameValue).to.equal('', 'Should not initialized property with wrong name');
      });
    });
  });
});
