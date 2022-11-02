import { fixture, expect, html, oneEvent, elementUpdated } from '@refinitiv-ui/test-helpers';

import { Button } from '@refinitiv-ui/elements/button';
import { ButtonBar } from '@refinitiv-ui/elements/button-bar';
import '@refinitiv-ui/elemental-theme/light/ef-button-bar';

const keyArrowLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft'});
const keyArrowRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
const keyArrowDown = new KeyboardEvent('keydown', { key: 'ArrowDown' });
const keyArrowUp = new KeyboardEvent('keydown', { key: 'ArrowUp'});
const keyHome = new KeyboardEvent('keydown', { key: 'Home'});
const keyEnd = new KeyboardEvent('keydown', { key: 'End'});
const keyTab = new KeyboardEvent('keydown', { key: 'Tab'});

describe('button-bar/ButtonBar', () => {
  it('should be created', async () => {
    const el = await fixture(html`<ef-button-bar></ef-button-bar>`);
    expect(el).is.instanceOf(HTMLElement);
    expect(el).shadowDom.to.equalSnapshot();
  });

  describe('The Managed Property', () => {
    it('should set to true if the managed attribute exists', async () => {
      const el = await fixture(html`<ef-button-bar managed></ef-button-bar>`);
      expect(el.managed).to.equal(true);
    });

    it('should set to false if the managed attribute doesn\'t exist', async () => {
      const el = await fixture(html`<ef-button-bar></ef-button-bar>`);
      expect(el.managed).to.equal(false);
    });
  });

  describe('ButtonBar The Default Slot', () => {
    it('should be created', async () => {
      const el = await fixture(html`
        <ef-button-bar>Some</ef-button-bar>
      `);
      expect(el.defaultSlot).to.exist;
    });

    it('should have no nodes empty', async () => {
      const el = await fixture(html`
        <ef-button-bar></ef-button-bar>
      `);
      const nodes = el.defaultSlot.value.assignedNodes();
      const buttons = nodes.filter(node => node instanceof Element);
      expect(buttons.length).to.equal(0);
    });

    it('should have 5 node which have the type of ef-button components', async () => {
      const el = await fixture(html`
        <ef-button-bar>
          <ef-button>One</ef-button>
          <ef-button>Two</ef-button>
          <ef-button>Three</ef-button>
          <ef-button>Four</ef-button>
          <ef-button>Five</ef-button>
        </ef-button-bar>
      `);
      const nodes = el.defaultSlot.value.assignedNodes();
      const buttons = nodes.filter(node => node instanceof Button);
      expect(buttons.length).to.equal(5);
    });
  });

  describe('Managed The Default Slot', () => {
    it('should have no nodes', async () => {
      const el = await fixture(html`
        <ef-button-bar></ef-button-bar>
      `);
      const nodes = el.defaultSlot.value.assignedNodes();
      const buttons = nodes.filter(node => node instanceof Element);
      expect(buttons.length).to.equal(0);
    });

    it('should have 5 node which have the type of ef-button components', async () => {
      const el = await fixture(html`
        <ef-button-bar>
          <ef-button>One</ef-button>
          <ef-button>Two</ef-button>
          <ef-button>Three</ef-button>
          <ef-button>Four</ef-button>
          <ef-button>Five</ef-button>
        </ef-button-bar>
      `);
      const nodes = el.defaultSlot.value.assignedNodes();
      const buttons = nodes.filter(node => node instanceof Button);
      expect(buttons.length).to.equal(5);
    });

    it('should have first ef-button with toggles and active attributes', async () => {
      const el = await fixture(html`
        <ef-button-bar managed>
          <ef-button toggles active>One</ef-button>
          <ef-button toggles>Two</ef-button>
          <ef-button toggles>Three</ef-button>
          <ef-button toggles>Four</ef-button>
          <ef-button toggles>Five</ef-button>
        </ef-button-bar>
      `);
      const nodes = el.defaultSlot.value.assignedNodes();
      const buttons = nodes.filter(node => node instanceof Button);
      const [firstButton] = buttons;
      expect(firstButton).to.be.exist;
      expect(firstButton.toggles).to.equal(true);
      expect(firstButton.active).to.equal(true);
    });
  });

  describe('The Tap Event', () => {
    it('should call completely', async () => {
      const el = await fixture(html`
        <ef-button-bar managed>
          <ef-button toggles active>One</ef-button>
          <ef-button toggles>Two</ef-button>
          <ef-button toggles>Three</ef-button>
          <ef-button toggles>Four</ef-button>
          <ef-button toggles>Five</ef-button>
        </ef-button-bar>
      `);
      setTimeout(() => el.dispatchEvent(new Event('tap')));
      const event = await oneEvent(el, 'tap');
      expect(event).is.instanceof(Event);
    });

    it('should call not completely', async () => {
      const el = await fixture(html`
        <ef-button-bar>
          <ef-button toggles active>One</ef-button>
          <ef-button toggles>Two</ef-button>
          <ef-button toggles>Three</ef-button>
          <ef-button toggles>Four</ef-button>
          <ef-button toggles>Five</ef-button>
        </ef-button-bar>
      `);
      setTimeout(() => el.dispatchEvent(new Event('tap')));
      await oneEvent(el, 'tap');
      expect(el.managed).to.equal(false);
    });

    it('should call with target of ef-button', async () => {
      const el = await fixture(html`
        <ef-button-bar managed>
          <ef-button toggles active>One</ef-button>
          <ef-button toggles>Two</ef-button>
          <ef-button toggles>Three</ef-button>
          <ef-button toggles>Four</ef-button>
          <ef-button toggles>Five</ef-button>
        </ef-button-bar>
      `);
      const buttons = el.defaultSlot.value.assignedNodes()
        .filter(node => node instanceof Button);
      const inactiveButton = buttons.find(button => !button.active);
      setTimeout(() =>
        inactiveButton.dispatchEvent(new Event('tap', { bubbles: true }))
      );
      const event = await oneEvent(el, 'tap');
      expect(event.target).to.equal(inactiveButton);
    });

    it('should call a child ef-button component', async () => {
      const el = await fixture(html`
        <ef-button-bar>
          <ef-button>One</ef-button>
          <ef-button>Two</ef-button>
          <ef-button-bar managed>
            <ef-button toggles>Three</ef-button>
            <ef-button toggles active>Four</ef-button>
            <ef-button-bar>
              <ef-button toggles>Five</ef-button>
              <ef-button toggles active>Six</ef-button>
            </ef-button-bar>
          </ef-button-bar>
        </ef-button-bar>
      `);
      const secondSplitButton = el.defaultSlot.value.assignedNodes()
        .filter(node => node instanceof ButtonBar)
        .find(node => node);
      const thirdSplitButton = secondSplitButton.defaultSlot.value.assignedNodes()
        .filter(node => node instanceof ButtonBar)
        .find(node => node);
      const button = thirdSplitButton.defaultSlot.value.assignedNodes()
        .filter(node => node instanceof Button)
        .find(node => node);
      setTimeout(() =>
        button.dispatchEvent(new Event('tap', { bubbles: true }))
      );
      await oneEvent(thirdSplitButton, 'tap');
    });

    it('shouln\t call tap and toggles is false', async () => {
      const el = await fixture(html`
        <ef-button-bar managed>
          <ef-button toggles>Toggles</ef-button>
          <ef-button>Without toggles</ef-button>
        </ef-button-bar>
      `);
      const button = el.defaultSlot.value.assignedNodes()
        .filter(node => node instanceof Button)
        .find((_, index) => index === 1);
      setTimeout(() =>
        button.dispatchEvent(new CustomEvent('tap', { bubbles: true }))
      );
      const event = await oneEvent(el, 'tap');
      expect(event.target.toggles).to.equal(false);
    });
  });

  describe('Group Tabindex', () => {
    let el;
    let btn1;
    let btn2;
    let btn3;
    let btn4;
    let bar;
    beforeEach(async () => {
      el = await fixture(`<ef-button-bar>
        <ef-button-bar managed role="radiogroup" id="bar">
          <ef-button id="btn1" toggles role="radio" active>1</ef-button>
          <ef-button id="btn2" toggles role="radio">2</ef-button>
        </ef-button-bar>
        <ef-button id="btn3" toggles active>3</ef-button>
        <ef-button id="btn4" disabled>4</ef-button>
      </ef-button-bar>`);
      btn1 = el.querySelector('#btn1');
      btn2 = el.querySelector('#btn2');
      btn3 = el.querySelector('#btn3');
      btn4 = el.querySelector('#btn4');
      bar = el.querySelector('#bar');
      btn1.focus();
    })
    it('Should initial tabIndex=0 at first child', async () => {
      const group = el.getFocusableButtons();
      group.forEach((button, index) => {
        expect(button.getAttribute('tabIndex')).to.equal(index === 0 ? '0' : '-1');
      });
    });
    it('Should set tabIndex=0 to previous button when navigate left', async () => {
      setTimeout(() => el.dispatchEvent(keyArrowLeft)); // will navigate to last focusable button
      const event1 = await oneEvent(el, 'keydown');
      expect(event1.key).to.equal('ArrowLeft');
      expect(document.activeElement).to.equal(btn3);
      el.getFocusableButtons().forEach((button, index) => {
        expect(button.getAttribute('tabIndex')).to.equal(index === 2 ? '0' : '-1');
      });
      setTimeout(() => el.dispatchEvent(keyArrowLeft));
      const event2 = await oneEvent(el, 'keydown');
      expect(event2.key).to.equal('ArrowLeft');
      expect(document.activeElement).to.equal(btn2);
      el.getFocusableButtons().forEach((button, index) => {
        expect(button.getAttribute('tabIndex')).to.equal(index === 1 ? '0' : '-1');
      });
    });
    it('Should set tabIndex=0 to next button when navigate right', async () => {
      setTimeout(() => el.dispatchEvent(keyArrowRight));
      const event1 = await oneEvent(el, 'keydown');
      expect(event1.key).to.equal('ArrowRight');
      expect(document.activeElement).to.equal(btn2);
      el.getFocusableButtons().forEach((button, index) => {
        expect(button.getAttribute('tabIndex')).to.equal(index === 1 ? '0' : '-1');
      });
      setTimeout(() => el.dispatchEvent(keyArrowRight));
      const event2 = await oneEvent(el, 'keydown');
      expect(event2.key).to.equal('ArrowRight');
      expect(document.activeElement).to.equal(btn3);
      el.getFocusableButtons().forEach((button, index) => {
        expect(button.getAttribute('tabIndex')).to.equal(index === 2 ? '0' : '-1');
      });
    });
    it('Should set tabIndex=0 to next button and loop inside managed button-bar when navigate down', async () => {
      setTimeout(() => bar.dispatchEvent(keyArrowDown));
      const event1 = await oneEvent(bar, 'keydown');
      expect(event1.key).to.equal('ArrowDown');
      expect(document.activeElement).to.equal(btn2);
      expect(btn1.getAttribute('tabIndex')).to.equal('-1');
      expect(btn2.getAttribute('tabIndex')).to.equal('0');
      setTimeout(() => bar.dispatchEvent(keyArrowDown));
      const event2 = await oneEvent(bar, 'keydown');
      expect(event2.key).to.equal('ArrowDown');
      expect(document.activeElement).to.equal(btn1);
      expect(btn2.getAttribute('tabIndex')).to.equal('-1');
      expect(btn1.getAttribute('tabIndex')).to.equal('0');
    });
    it('Should set tabIndex=0 to previous button and loop inside managed button-bar when navigate up', async () => {
      setTimeout(() => bar.dispatchEvent(keyArrowUp));
      const event1 = await oneEvent(bar, 'keydown');
      expect(event1.key).to.equal('ArrowUp');
      expect(document.activeElement).to.equal(btn2);
      expect(btn1.getAttribute('tabIndex')).to.equal('-1');
      expect(btn2.getAttribute('tabIndex')).to.equal('0');
      setTimeout(() => bar.dispatchEvent(keyArrowUp));
      const event2 = await oneEvent(bar, 'keydown');
      expect(event2.key).to.equal('ArrowUp');
      expect(document.activeElement).to.equal(btn1);
      expect(btn2.getAttribute('tabIndex')).to.equal('-1');
      expect(btn1.getAttribute('tabIndex')).to.equal('0');
    });
    it('Should set tabIndex=0 to last button when keydown End', async () => {
      setTimeout(() => el.dispatchEvent(keyEnd));
      const event1 = await oneEvent(el, 'keydown');
      expect(event1.key).to.equal('End');
      expect(document.activeElement).to.equal(btn3);
      el.getFocusableButtons().forEach((button, index) => {
        expect(button.getAttribute('tabIndex')).to.equal(index === 2 ? '0' : '-1');
      });
    });
    it('Should set tabIndex=0 to first button when keydown Home', async () => {
      btn3.focus();
      setTimeout(() => el.dispatchEvent(keyHome));
      const event1 = await oneEvent(el, 'keydown');
      expect(event1.key).to.equal('Home');
      expect(document.activeElement).to.equal(btn1);
      el.getFocusableButtons().forEach((button, index) => {
        expect(button.getAttribute('tabIndex')).to.equal(index === 0 ? '0' : '-1');
      });
    });
    it('Should out of focus when press Tab in case inject a new button', async () => {
      const newButton = document.createElement('ef-button');
      newButton.id = 'btn5';
      newButton.innerText = 'newButton';
      el.appendChild(newButton);
      await elementUpdated(el);

      btn1.focus();
      setTimeout(() => el.dispatchEvent(keyTab));
      const event1 = await oneEvent(el, 'keydown');
      expect(event1.key).to.equal('Tab');

      const group = el.getFocusableButtons();
      const addedButton = group.find((button) => button.id === 'btn5');
      expect(addedButton.getAttribute('tabIndex')).to.equal('-1');
      expect(btn1.getAttribute('tabIndex')).to.equal('0', 'Current focusing button should still be focusable');
    });
  });
});

