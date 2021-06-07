import { fixture, expect, html, oneEvent } from '@refinitiv-ui/test-helpers';

import { Button } from '@refinitiv-ui/elements/button';
import { ButtonBar } from '@refinitiv-ui/elements/button-bar';
import '@refinitiv-ui/elemental-theme/light/ef-button-bar';

describe('ButtonBar', () => {
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
      const nodes = el.defaultSlot.assignedNodes();
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
      const nodes = el.defaultSlot.assignedNodes();
      const buttons = nodes.filter(node => node instanceof Button);
      expect(buttons.length).to.equal(5);
    });
  });

  describe('Managed The Default Slot', () => {
    it('should have no nodes', async () => {
      const el = await fixture(html`
        <ef-button-bar></ef-button-bar>
      `);
      const nodes = el.defaultSlot.assignedNodes();
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
      const nodes = el.defaultSlot.assignedNodes();
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
      const nodes = el.defaultSlot.assignedNodes();
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
      const buttons = el.defaultSlot.assignedNodes()
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
      const secondSplitButton = el.defaultSlot.assignedNodes()
        .filter(node => node instanceof ButtonBar)
        .find(node => node);
      const thirdSplitButton = secondSplitButton.defaultSlot.assignedNodes()
        .filter(node => node instanceof ButtonBar)
        .find(node => node);
      const button = thirdSplitButton.defaultSlot.assignedNodes()
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
      const button = el.defaultSlot.assignedNodes()
        .filter(node => node instanceof Button)
        .find((_, index) => index === 1);
      setTimeout(() =>
        button.dispatchEvent(new CustomEvent('tap', { bubbles: true }))
      );
      const event = await oneEvent(el, 'tap');
      expect(event.target.toggles).to.equal(false);
    });
  });
});

