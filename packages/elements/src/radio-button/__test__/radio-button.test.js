import { fixture, expect, elementUpdated, oneEvent, keyboardEvent, isIE } from '@refinitiv-ui/test-helpers';
import '@refinitiv-ui/elements/radio-button';
import '@refinitiv-ui/elemental-theme/light/ef-radio-button';
import './radio-wrapper-mockup.js';

const createEnterKeyboardEvent = () => keyboardEvent('keydown', { key: 'Enter' });
const createSpacebarKeyboardEvent = () => keyboardEvent('keydown', { key: isIE() ? 'Spacebar' : ' ' });
const keyArrowLeft = () => keyboardEvent('keydown', { key: isIE() ? 'Left' : 'ArrowLeft'});
const keyArrowRight = () => keyboardEvent('keydown', { key: isIE() ? 'Right' : 'ArrowRight'});

const updateGroup = async (group) => {
  for (let i = 0; i < group.length; i += 1) {
    await elementUpdated(group[i]);
  }
};

describe('radio-button/RadioButton', () => {
  describe('DOM structure', () => {
    it('DOM structure unchecked is correct', async () => {
      const el = await fixture('<ef-radio-button>unchecked</ef-radio-button>');
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure of checked is correct', async () => {
      const el = await fixture('<ef-radio-button checked>checked</ef-radio-button>');
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure of no label is correct', async () => {
      const el = await fixture('<ef-radio-button></ef-radio-button>');
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('Contains the correct label', async () => {
      const checked = await fixture('<ef-radio-button checked>checked</ef-radio-button>');
      const unchecked = await fixture('<ef-radio-button>unchecked</ef-radio-button>');
      expect(checked.textContent.trim()).to.equal('checked');
      expect(unchecked.textContent.trim()).to.equal('unchecked');
    });
  });

  describe('Events', () => {
    let checked;
    let unchecked;
    let eventFired;

    beforeEach(async () => {
      eventFired = false;
      unchecked = await fixture('<ef-radio-button>unchecked</ef-radio-button>');
      checked = await fixture('<ef-radio-button checked>checked</ef-radio-button>');
    });

    it('Should not fire event when checked by property', async () => {
      unchecked.addEventListener('checked-changed', () => {
        eventFired = true;
      });
      checked.checked = false;
      await elementUpdated(checked);
      expect(eventFired).to.equal(false, 'check event is not fired');
    });
    it('Should not fire event when checked by attribute', async () => {
      unchecked.addEventListener('checked-changed', () => {
        eventFired = true;
      });
      checked.setAttribute('checked', false);
      await elementUpdated(checked);
      expect(eventFired).to.equal(false, 'check event is not fired');
    });
    it('Should fire event and changes its state to checked when click', async () => {
      setTimeout(() => unchecked.dispatchEvent(new Event('tap')));
      const event = await oneEvent(unchecked, 'checked-changed');
      await elementUpdated(unchecked);

      expect(unchecked.hasAttribute('checked')).to.equal(true, 'is checked');
      expect(unchecked.checked).to.equal(true, 'property is checked');
      expect(event.detail.value).to.equal(true, 'property is checked');
    });
    it('Should fire event and changes its state to checked when using Space key', async () => {
      const event = createSpacebarKeyboardEvent();

      window.setTimeout(() => {
        unchecked.dispatchEvent(event);
      });

      const { detail } = await oneEvent(unchecked, 'checked-changed');

      expect(detail.value).to.equal(true, 'checked-changed event is fired');
      await elementUpdated(unchecked);

      expect(unchecked.checked).to.equal(true, 'property is checked');
      expect(unchecked.hasAttribute('checked')).to.equal(true, 'attribute is checked');
    });
  });

  describe('Unchecked state', () => {
    let unchecked;

    beforeEach(async () => {
      unchecked = await fixture('<ef-radio-button>unchecked</ef-radio-button>');
    });

    it('Can be unchecked via attribute', async () => {
      expect(unchecked.hasAttribute('checked')).to.equal(false, 'is unchecked');
    });
    it('Can be unchecked via property', async () => {
      expect(unchecked.checked).to.equal(false, 'is unchecked');
    });
    it('Can be checked by attribute', async () => {
      unchecked.setAttribute('checked', true);
      await elementUpdated(unchecked);
      expect(unchecked.hasAttribute('checked')).to.equal(true, 'is checked');
      expect(unchecked.checked).to.equal(true, 'property is checked');
    });
    it('Can be checked by property', async () => {
      unchecked.checked = true;
      await elementUpdated(unchecked);
      expect(unchecked.hasAttribute('checked')).to.equal(true, 'is checked');
      expect(unchecked.checked).to.equal(true, 'property is checked');
    });
  });

  describe('Checked state', () => {
    let checked;

    beforeEach(async () => {
      checked = await fixture('<ef-radio-button checked>checked</ef-radio-button>');
    });

    it('Has checked attribute', async () => {
      expect(checked.hasAttribute('checked')).to.equal(true, 'is checked');
    });
    it('Has checked property equals to true', async () => {
      expect(checked.checked).to.equal(true, 'property is checked');
    });
    it('Can be unchecked by changing checked attribute', async () => {
      checked.removeAttribute('checked');
      await elementUpdated(checked);
      expect(checked.hasAttribute('checked')).to.equal(false, 'is not checked');
      expect(checked.checked).to.equal(false, 'property is not checked');
    });
    it('Can be unchecked by changing checked property', async () => {
      checked.checked = false;
      await elementUpdated(checked);
      expect(checked.hasAttribute('checked')).to.equal(false, 'is not checked');
      expect(checked.checked).to.equal(false, 'property is not checked');
    });
    it('Cannot unchecked by tapping', async () => {
      checked.dispatchEvent(new Event('tap'));
      await elementUpdated(checked);
      expect(checked.hasAttribute('checked')).to.equal(true);
      expect(checked.checked).to.equal(true, 'radio is still in checked state');
    });
  });

  describe('Disabled state', () => {
    let unchecked;
    let disabled;

    beforeEach(async () => {
      unchecked = await fixture('<ef-radio-button>unchecked</ef-radio-button>');
      disabled = await fixture('<ef-radio-button disabled>disabled</ef-radio-button>');
    });
    it('Can be set by attribute', async () => {
      unchecked.setAttribute('disabled', true);
      await elementUpdated(unchecked);
      expect(unchecked.hasAttribute('disabled')).to.equal(true, 'is disabled');
      expect(unchecked.disabled).to.equal(true, 'property is disabled');
    });
    it('Can be set by property', async () => {
      unchecked.disabled = true;
      await elementUpdated(unchecked);
      expect(unchecked.hasAttribute('disabled')).to.equal(true, 'is disabled');
      expect(unchecked.disabled).to.equal(true, 'property is disabled');
    });
    it('Can be unset by attribute', async () => {
      disabled.removeAttribute('disabled');
      await elementUpdated(disabled);
      expect(disabled.hasAttribute('disabled')).to.equal(false, 'is not disabled');
      expect(disabled.disabled).to.equal(false, 'property is not disabled');
    });
    it('Can be unset by property', async () => {
      disabled.disabled = false;
      await elementUpdated(disabled);
      expect(disabled.hasAttribute('disabled')).to.equal(false, 'is not disabled');
      expect(disabled.disabled).to.equal(false, 'property is not disabled');
    });
    it('Should not fire check-changed event when disabled', async () => {
      let eventFired = false;
      disabled.addEventListener('checked-changed', (e) => {
        eventFired = true;
      });
      disabled.dispatchEvent(new Event('tap'));
      await elementUpdated(disabled);
      expect(disabled.hasAttribute('checked')).to.equal(false, 'is checked');
      expect(disabled.checked).to.equal(false, 'property is checked');
      expect(eventFired).to.equal(false, 'check event is not fired');
    });
  });

  describe('Readonly state', () => {
    let unchecked;
    let readonly;

    beforeEach(async () => {
      unchecked = await fixture('<ef-radio-button>unchecked</ef-radio-button>');
      readonly = await fixture('<ef-radio-button readonly>readonly</ef-radio-button>');
    });
    it('Can be set by attribute', async () => {
      unchecked.setAttribute('readonly', true);
      await elementUpdated(unchecked);
      expect(unchecked.hasAttribute('readonly')).to.equal(true, 'is readonly');
      expect(unchecked.readonly).to.equal(true, 'property is readonly');
    });
    it('Can be set by property', async () => {
      unchecked.readonly = true;
      await elementUpdated(unchecked);
      expect(unchecked.hasAttribute('readonly')).to.equal(true, 'is readonly');
      expect(unchecked.readonly).to.equal(true, 'property is readonly');
    });
    it('Can be unset by attribute', async () => {
      readonly.removeAttribute('readonly');
      await elementUpdated(readonly);
      expect(readonly.hasAttribute('readonly')).to.equal(false, 'is not readonly');
      expect(readonly.readonly).to.equal(false, 'property is not readonly');
    });
    it('Can be unset by property', async () => {
      readonly.readonly = false;
      await elementUpdated(readonly);
      expect(readonly.hasAttribute('readonly')).to.equal(false, 'is not readonly');
      expect(readonly.readonly).to.equal(false, 'property is not readonly');
    });
    it('Should not be fire check-changed event when readonly', async () => {
      let eventFired = false;
      readonly.addEventListener('checked-changed', (e) => {
        eventFired = true;
      });
      readonly.dispatchEvent(new Event('tap'));
      await elementUpdated(readonly);
      expect(readonly.hasAttribute('readonly')).to.equal(true, 'is readonly');
      expect(readonly.checked).to.equal(false, 'readonly is unchecked');
      expect(eventFired).to.equal(false, 'check event is not fired');
    });
  });

  describe('Group', () => {
    it('Should have correct states', async () => {
      const group = [
        await fixture('<ef-radio-button name="group2" checked>group2</ef-radio-button>'),
        await fixture('<ef-radio-button name="group2">group2</ef-radio-button>')
      ];
      group.forEach((el, index) => {
        expect(el.checked).to.equal(!index);
      });
    });
    it('Can be in initial state of unchecked', async () => {
      const group = [
        await fixture('<ef-radio-button name="group">group</ef-radio-button>'),
        await fixture('<ef-radio-button name="group">group</ef-radio-button>')
      ];
      group.forEach(el => {
        expect(el.checked).to.equal(false);
      });
    });
    it('Should not be able to uncheck by tapping', async () => {
      const group = [
        await fixture('<ef-radio-button name="group2">group2</ef-radio-button>'),
        await fixture('<ef-radio-button name="group2">group2</ef-radio-button>')
      ];

      expect(group[0].checked).to.equal(false);
      expect(group[1].checked).to.equal(false);

      // checked on first radio button.
      group[0].dispatchEvent(new Event('tap'));
      await updateGroup(group);

      expect(group[0].checked).to.equal(true);
      expect(group[1].checked).to.equal(false);

      // change checked state to second radio button.
      group[1].dispatchEvent(new Event('tap'));
      await updateGroup(group);

      expect(group[0].checked).to.equal(false);
      expect(group[1].checked).to.equal(true);

      // second radio should be checked.
      group[1].dispatchEvent(new Event('tap'));
      await updateGroup(group);

      expect(group[0].checked).to.equal(false);
      expect(group[1].checked).to.equal(true);

      // both of radio button should be unchecked.
      group[1].removeAttribute('checked', false);
      await updateGroup(group);

      expect(group[0].checked).to.equal(false);
      expect(group[1].checked).to.equal(false);
    });
    it('Should not be able to check by Enter key', async () => {
      const group = [
        await fixture('<ef-radio-button name="group2">group2</ef-radio-button>'),
        await fixture('<ef-radio-button name="group2">group2</ef-radio-button>')
      ];
      const event = createEnterKeyboardEvent();
      group[0].dispatchEvent(event);
      await updateGroup(group);

      expect(group[0].checked).to.equal(false);
    });
    it('Should not be able to uncheck by Enter key', async () => {
      const group = [
        await fixture('<ef-radio-button name="group2" checked>group2</ef-radio-button>'),
        await fixture('<ef-radio-button name="group2">group2</ef-radio-button>')
      ];
      const event = createEnterKeyboardEvent();
      group[0].dispatchEvent(event);
      await updateGroup(group);

      expect(group[0].checked).to.equal(true);
    });
    it('Should not be able to uncheck by Space key', async () => {
      const group = [
        await fixture('<ef-radio-button name="group2" checked>group2</ef-radio-button>'),
        await fixture('<ef-radio-button name="group2">group2</ef-radio-button>')
      ];
      const event = createSpacebarKeyboardEvent();
      group[0].dispatchEvent(event);
      await updateGroup(group);
      expect(group[0].checked).to.equal(true);
    });
    it('Can be programmatically uncheck', async () => {
      const group = [
        await fixture('<ef-radio-button name="group2" checked>group2</ef-radio-button>'),
        await fixture('<ef-radio-button name="group2">group2</ef-radio-button>')
      ];
      group[0].checked = false;
      await updateGroup(group);
      expect(group[0].checked).to.equal(false);
    });
    it('Should be able to handle different groups in a page', async () => {
      const group1 = await Promise.all([
        fixture('<ef-radio-button name="group1" id="1">1</ef-radio-button>'),
        fixture('<ef-radio-button name="group1" id="2">2</ef-radio-button>'),
        fixture('<ef-radio-button name="group1" id="3">3</ef-radio-button>')
      ]);
      const group2 = await Promise.all([
        fixture('<ef-radio-button name="group2">1</ef-radio-button>'),
        fixture('<ef-radio-button name="group2">2</ef-radio-button>')
      ]);

      // Groups should start with none checked
      group1.forEach(el => expect(el.checked).to.equal(false));
      group2.forEach(el => expect(el.checked).to.equal(false));

      group1[0].checked = true;
      await updateGroup(group1);
      await updateGroup(group2);

      group1.forEach((el, index) => {
        expect(el.checked).to.equal(!index);
      });

      group2.forEach(el => expect(el.checked).to.equal(false));
    });
    it('Should have only one radio checked when new group is created', async () => {
      const notGroup = [
        await fixture('<ef-radio-button id="1" checked>1</ef-radio-button>'),
        await fixture('<ef-radio-button id="2" checked>2</ef-radio-button>'),
        await fixture('<ef-radio-button id="3" checked>3</ef-radio-button>')
      ];

      notGroup.forEach((el) => {
        el.name = 'group-name';
      });

      await updateGroup(notGroup);

      notGroup.forEach((el, index) => {
        // Only the last radio should be checked
        expect(el.checked).to.equal(index === 2);
      });
    });
    it('Can be add to the group by assigning name attribute', async () => {
      const group = [
        await fixture('<ef-radio-button id="1" name="group" checked>1</ef-radio-button>'),
        await fixture('<ef-radio-button id="2" name="group">2</ef-radio-button>'),
        await fixture('<ef-radio-button id="3">3</ef-radio-button>')
      ];

      // Adding radio to the group
      group[2].name = 'group';
      await updateGroup(group);

      group.forEach((el, index) => {
        // First radio should maintain checked state
        expect(el.checked).to.equal(!index);
      });
    });
    it('Can be add to the group by assigning name attribute and remain checked', async () => {
      const group = [
        await fixture('<ef-radio-button id="1" name="group" checked>1</ef-radio-button>'),
        await fixture('<ef-radio-button id="2" name="group">2</ef-radio-button>'),
        await fixture('<ef-radio-button id="3" checked>3</ef-radio-button>')
      ];

      // Adding radio to the group
      group[2].name = 'group';
      await updateGroup(group);

      group.forEach((el, index) => {
        // Checked state should change to the lastest radio addition
        expect(el.checked).to.equal(index === 2);
      });
    });
    it('Should handle checked state of group correctly when it has been removed and appended old element back to DOM', async () => {
      const element = await fixture(`
        <div id="container">
          <div id="wrapper">
            <ef-radio-button id="btn1" name="group" checked>1</ef-radio-button>
            <ef-radio-button id="btn2" name="group">2</ef-radio-button>
          </div>
        </div>`
      );

      const wrapper = element.querySelector('#wrapper');

      // Keep element in a memory then removed it from DOM
      const btn1 = element.querySelector('#btn1');
      wrapper.removeChild(btn1);
      // Append element back to DOM
      wrapper.appendChild(btn1);

      const btn2 = element.querySelector('#btn2');
      btn2.checked = true;

      await updateGroup(btn1);

      // Should not allow multiple checked
      expect(btn1.checked).to.equal(false);
      expect(btn2.checked).to.equal(true);
    });
    it('Should have only 1 checked radio and checked the new radio in a group when append a new checked radio ', async () => {
      const group = [
        await fixture('<ef-radio-button name="group" id="btn1" checked>1</ef-radio-button>')
      ];
      group.push(await fixture('<ef-radio-button name="group" id="btn2" checked>2</ef-radio-button>'));
      await updateGroup(group);

      const checkedRadio = group.find(element => element.checked);
      expect(checkedRadio.id).to.equal('btn2');
    });
    it('Should separate scope between shadow DOM and light DOM', async () => {
      const radio1 = await fixture('<ef-radio-button name="group" id="btn1" checked>1</ef-radio-button>');
      const radio2 = await fixture('<ef-radio-button name="group" id="btn2">2</ef-radio-button>');
      const radioWrapper = await fixture('<radio-wrapper></radio-wrapper>');
      const radioInShadow1 = radioWrapper.shadowRoot.querySelector('#btn1');
      const radioInShadow2 = radioWrapper.shadowRoot.querySelector('#btn2');
      expect(radio1.checked).to.equal(true);
      expect(radio2.checked).to.equal(false);
      expect(radioInShadow1.checked).to.equal(true);
      expect(radioInShadow2.checked).to.equal(false);

      radio2.checked = true;
      await elementUpdated(radio1);
      expect(radio1.checked).to.equal(false);
      expect(radio2.checked).to.equal(true);
      expect(radioInShadow1.checked).to.equal(true);
      expect(radioInShadow2.checked).to.equal(false);
    });
    it('Should separate shadow DOM scope in each element that contain radio-button', async () => {
      const radioWrapper1 = await fixture('<radio-wrapper></radio-wrapper>');
      const radioWrapper2 = await fixture('<radio-wrapper></radio-wrapper>');
      const radio1InGroup1 = radioWrapper1.shadowRoot.querySelector('#btn1');
      const radio2InGroup1 = radioWrapper1.shadowRoot.querySelector('#btn2');
      const radio1InGroup2 = radioWrapper2.shadowRoot.querySelector('#btn1');
      const radio2InGroup2 = radioWrapper2.shadowRoot.querySelector('#btn2');
      expect(radio1InGroup1.checked).to.equal(true);
      expect(radio2InGroup1.checked).to.equal(false);
      expect(radio1InGroup2.checked).to.equal(true);
      expect(radio2InGroup2.checked).to.equal(false);

      radio2InGroup1.checked = true;
      await elementUpdated(radio1InGroup1);
      expect(radio1InGroup1.checked).to.equal(false);
      expect(radio2InGroup1.checked).to.equal(true);
      expect(radio1InGroup2.checked).to.equal(true);
      expect(radio2InGroup2.checked).to.equal(false);
    });
  });

  describe('Group navigation', () => {
    it('Should uncheck the current button and move to check previous button', async () => {
      const option1 = await fixture('<ef-radio-button name="group2">Option 1</ef-radio-button>');
      const option2 = await fixture('<ef-radio-button name="group2" checked>Option 2</ef-radio-button>');
      expect(option1.checked).to.equal(false);
      expect(option2.checked).to.equal(true);
      setTimeout(() => option2.dispatchEvent(keyArrowLeft()));
      const event = await oneEvent(option2, 'keydown');
      expect(event.key).to.equal('ArrowLeft');
      expect(option1.checked).to.equal(true);
      expect(option2.checked).to.equal(false);

    });
    it('Should uncheck the current button and move to check last button', async () => {
      const option1 = await fixture('<ef-radio-button name="group2" checked>Option 1</ef-radio-button>');
      const option2 = await fixture('<ef-radio-button name="group2">Option 2</ef-radio-button>');
      expect(option1.checked).to.equal(true);
      expect(option2.checked).to.equal(false);

      setTimeout(() => option1.dispatchEvent(keyArrowLeft()));
      const event = await oneEvent(option1, 'keydown');
      expect(event.key).to.equal('ArrowLeft');
      expect(option1.checked).to.equal(false);
      expect(option2.checked).to.equal(true);
    });
    it('Should uncheck the current button and check next button', async () => {
      const option1 = await fixture('<ef-radio-button name="group2" checked>Option 1</ef-radio-button>');
      const option2 = await fixture('<ef-radio-button name="group2">Option 2</ef-radio-button>');
      expect(option1.checked).to.equal(true);
      expect(option2.checked).to.equal(false);

      setTimeout(() => option1.dispatchEvent(keyArrowRight()));
      const event = await oneEvent(option1, 'keydown');
      expect(event.key).to.equal('ArrowRight');
      expect(option1.checked).to.equal(false);
      expect(option2.checked).to.equal(true);
    });
    it('Should uncheck the current button and check first button', async () => {
      const option1 = await fixture('<ef-radio-button name="group2">Option 1</ef-radio-button>');
        const option2 = await fixture('<ef-radio-button name="group2" checked>Option 2</ef-radio-button>');
        expect(option1.checked).to.equal(false);
        expect(option2.checked).to.equal(true);
        setTimeout(() => option2.dispatchEvent(keyArrowRight()));
        const event = await oneEvent(option2, 'keydown');
        expect(event.key).to.equal('ArrowRight');
        expect(option1.checked).to.equal(true);
        expect(option2.checked).to.equal(false);
    });
  });

  describe('Group Tabindex', () => {
    it('Should have correct tabIndex when initial state of unchecked', async () => {
      const group = [
        await fixture('<ef-radio-button name="group2">group1</ef-radio-button>'),
        await fixture('<ef-radio-button name="group2">group2</ef-radio-button>')
      ];
      group.forEach((el, index) => {
        expect(el.checked).to.equal(false);
        expect(el.getAttribute('tabIndex')).to.equal(index === 0 ? '0' : '-1');
      });
    });
    it('Should have correct tabIndex when one of radio checked', async () => {
      const group = [
        await fixture('<ef-radio-button name="group2">group1</ef-radio-button>'),
        await fixture('<ef-radio-button name="group2" checked>group2</ef-radio-button>')
      ];

      group.forEach((el, index) => {
        expect(el.checked).to.equal(index === 1 ? true : false);
        expect(el.getAttribute('tabIndex')).to.equal(index === 1 ? '0' : '-1');
      });
    });
    it('Should have correct tabIndex when it has more than one checked radio', async () => {
      const group = [
        await fixture('<ef-radio-button name="group2" checked>group1</ef-radio-button>'),
        await fixture('<ef-radio-button name="group2" checked>group2</ef-radio-button>'),
        await fixture('<ef-radio-button name="group2" checked>group3</ef-radio-button>')
      ];
      group.forEach((el, index) => {
        expect(el.checked).to.equal(index === 2 ? true : false);
        expect(el.getAttribute('tabIndex')).to.equal(index === 2 ? '0' : '-1');
      });
    });
    it('Should have correct tabIndex when unchecked radio was removed from group ', async() => {
        const group = [
          await fixture('<ef-radio-button name="group1">1</ef-radio-button>'),
          await fixture('<ef-radio-button name="group1">2</ef-radio-button>'),
          await fixture('<ef-radio-button name="group1">3</ef-radio-button>')
        ];

        group.forEach((el, index) => {
          expect(el.checked).to.equal(false);
          expect(el.getAttribute('tabIndex')).to.equal(index === 0 ? '0' : '-1');
        });
        // Remove radio from group
        group[0].name = '';
        await updateGroup(group);

        group.forEach((el, index) => {
          expect(el.checked).to.equal(false);
          expect(el.getAttribute('tabIndex')).to.equal(index === 2 ? '-1' : '0');
        });
    });
    it('Should have correct tabIndex when checked radio was removed from group ', async() => {
      const group = [
        await fixture('<ef-radio-button name="group1">1</ef-radio-button>'),
        await fixture('<ef-radio-button name="group1">2</ef-radio-button>'),
        await fixture('<ef-radio-button name="group1" checked>3</ef-radio-button>')
      ];

      group.forEach((el, index) => {
        expect(el.checked).to.equal(index === 2 ? true : false);
        expect(el.getAttribute('tabIndex')).to.equal(index === 2 ? '0' : '-1');
      });

      // Remove radio from group
      group[2].name = '';
      await updateGroup(group);

      group.forEach((el, index) => {
        expect(el.checked).to.equal(index === 2 ? true : false);
        expect(el.getAttribute('tabIndex')).to.equal(index === 1 ? '-1' : '0');
      });
    });
    it('Should have correct tabIndex when unchecked radio has moved to another group ', async() => {
      const group1 = [
        await fixture('<ef-radio-button name="group1">1</ef-radio-button>'),
        await fixture('<ef-radio-button name="group1">2</ef-radio-button>')
      ];
      const group2 = [
        await fixture('<ef-radio-button name="group2">1</ef-radio-button>'),
        await fixture('<ef-radio-button name="group2">2</ef-radio-button>')
      ];

      group1.forEach((el, index) => {
        expect(el.checked).to.equal(false);
        expect(el.getAttribute('tabIndex')).to.equal(index === 0 ? '0' : '-1');
      });

      group2.forEach((el, index) => {
        expect(el.checked).to.equal(false);
        expect(el.getAttribute('tabIndex')).to.equal(index === 0 ? '0' : '-1');
      });

      // Move radio to another group
      group1[1].name = 'group2';
      await updateGroup(group1);
      await updateGroup(group2);

      group1.forEach((el, index) => {
        expect(el.checked).to.equal(false);
        expect(el.getAttribute('tabIndex')).to.equal('0');
      });

      group2.forEach((el, index) => {
        expect(el.checked).to.equal(false);
        expect(el.getAttribute('tabIndex')).to.equal('-1');
      });
    });
    it('Should have correct tabIndex when checked radio has moved to another group ', async() => {
      const group1 = [
        await fixture('<ef-radio-button name="group1" checked>1</ef-radio-button>'),
        await fixture('<ef-radio-button name="group1">2</ef-radio-button>')
      ];
      const group2 = [
        await fixture('<ef-radio-button name="group2" checked>1</ef-radio-button>'),
        await fixture('<ef-radio-button name="group2">2</ef-radio-button>')
      ];

      group1.forEach((el, index) => {
        expect(el.checked).to.equal(index === 0 ? true : false);
        expect(el.getAttribute('tabIndex')).to.equal(index === 0 ? '0' : '-1');
      });

      group2.forEach((el, index) => {
        expect(el.checked).to.equal(index === 0 ? true : false);
        expect(el.getAttribute('tabIndex')).to.equal(index === 0 ? '0' : '-1');
      });

      // Move radio to another group
      group2[0].name = 'group1';
      await updateGroup(group1);
      await updateGroup(group2);

      group1.forEach((el, index) => {
        expect(el.checked).to.equal(false);
        expect(el.getAttribute('tabIndex')).to.equal('-1');
      });

      group2.forEach((el, index) => {
        expect(el.checked).to.equal(index === 0 ? true : false);
        expect(el.getAttribute('tabIndex')).to.equal('0');
      });
    });
  })

  describe('No label', () => {
    let noLabelRadio;
    let labelPart;
    let UPDATED_CONTENT = 'uncheck';

    beforeEach(async () => {
      noLabelRadio = await fixture('<ef-radio-button></ef-radio-button>');
    });

    it('Should hide label part when radio has no label', async () => {
      labelPart = noLabelRadio.shadowRoot.querySelector('[part="label"]');
      expect(window.getComputedStyle(labelPart).display).equal('none');
    });

    it('Should show/hide label when content has been updated', async () => {
      noLabelRadio.textContent = UPDATED_CONTENT;
      await elementUpdated(noLabelRadio);
      labelPart = noLabelRadio.shadowRoot.querySelector('[part="label"]');
      expect(window.getComputedStyle(labelPart).display).not.equal('none');
      noLabelRadio.textContent = '';
      await elementUpdated(noLabelRadio);
      expect(window.getComputedStyle(labelPart).display).equal('none');
    });
  });

  describe('Accessiblity', () => {
    it('should fail without label', async () => {
      const el = await fixture('<ef-radio-button></ef-radio-button>');
      expect(el).not.to.be.accessible();
    });
    it('should pass a11y test with aria-label', async () => {
      const el = await fixture(`<ef-radio-button aria-label="Radio Button"></ef-checkbox>`);
      expect(el).to.be.accessible({ignoredRules: ['aria-allowed-attr']});
      expect(el.ariaChecked).to.be.equal(String(el.checked), 'ariaChecked');
      expect(el.getAttribute('aria-checked')).to.be.equal(String(el.checked), 'aria-checked');
    });
    it('should pass a11y test with slotted label', async () => {
      const el = await fixture(`<ef-radio-button>Radio Button</ef-checkbox>`);
      expect(el).to.be.accessible({ignoredRules: ['aria-allowed-attr']});
      expect(el.ariaChecked).to.be.equal(String(el.checked), 'ariaChecked');
      expect(el.getAttribute('aria-checked')).to.be.equal(String(el.checked), 'aria-checked');
    });
    it('should pass a11y test when radio button is checked', async () => {
      const el = await fixture(`<ef-radio-button checked>Radio Button</ef-checkbox>`);
      expect(el).to.be.accessible({ignoredRules: ['aria-allowed-attr']});
      expect(el.ariaChecked).to.be.equal(String(el.checked), 'ariaChecked');
      expect(el.getAttribute('aria-checked')).to.be.equal(String(el.checked), 'aria-checked');
    });
    it('should pass a11y test when disabled', async () => {
      const el = await fixture(`<ef-radio-button disabled>Radio Button</ef-checkbox>`);
      expect(el).to.be.accessible({ignoredRules: ['aria-allowed-attr']});
    });
  });
});
