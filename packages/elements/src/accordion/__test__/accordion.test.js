import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/collapse';
import '@refinitiv-ui/elements/accordion';
import '@refinitiv-ui/elements/tree';

import '@refinitiv-ui/elemental-theme/light/ef-accordion';
import '@refinitiv-ui/elemental-theme/light/ef-collapse';
import '@refinitiv-ui/elemental-theme/light/ef-tree';

describe('accordion/Accordion', () => {
  describe('Should Have A Correct DOM', () => {
    it('DOM structure is correct', async () => {
      const el = await fixture('<ef-accordion></ef-accordion>');
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Should have correct structure', async () => {
      const el = await fixture(`
        <ef-accordion>
          <ef-collapse header="1">
            Content
          </ef-collapse>
          <ef-collapse header="2">
            Content
          </ef-collapse>
        </ef-accordion>`);
      const items = el.querySelectorAll('ef-collapse');
      expect(items.length).to.equal(2);
    });

    it('Should open an item and closed the others when that item is clicked', async () => {
      const el = await fixture(`
        <ef-accordion>
          <ef-collapse header="1">
            Content
          </ef-collapse>
          <ef-collapse header="2">
            Content
          </ef-collapse>
        </ef-accordion>`);
      const items = el.querySelectorAll('ef-collapse');
      const header1 = items[0].shadowRoot.querySelector('[part=header-toggle]');
      const header2 = items[1].shadowRoot.querySelector('[part=header-toggle]');

      setTimeout(() => header1.dispatchEvent(new Event('tap')));
      await oneEvent(header1, 'tap');

      expect(items[0].expanded).to.equal(true);
      expect(items[1].expanded).to.equal(false);

      setTimeout(() => header2.dispatchEvent(new Event('tap')));
      await oneEvent(header2, 'tap');

      expect(items[0].expanded).to.equal(false);
      expect(items[1].expanded).to.equal(true);
    });

    it('Should open an item and do not closed the others with autoCollapseDisabled', async () => {
      const el = await fixture(`
        <ef-accordion auto-collapse-disabled>
          <ef-collapse header="1">
            Content
          </ef-collapse>
          <ef-collapse header="2">
            Content
          </ef-collapse>
        </ef-accordion>`);
      const items = el.querySelectorAll('ef-collapse');
      const header1 = items[0].shadowRoot.querySelector('[part=header-toggle]');
      const header2 = items[1].shadowRoot.querySelector('[part=header-toggle]');

      setTimeout(() => header1.dispatchEvent(new Event('tap')));
      await oneEvent(header1, 'tap');

      expect(items[0].expanded).to.equal(true);
      expect(items[1].expanded).to.equal(false);

      setTimeout(() => header2.dispatchEvent(new Event('tap')));
      await oneEvent(header2, 'tap');

      expect(items[0].expanded).to.equal(true);
      expect(items[1].expanded).to.equal(true);
    });
  });

  it('Should process nested accordion collapses without affecting parent collapse', async () => {
    const el = await fixture(`
      <ef-accordion>
        <ef-collapse class="top-level" expanded>
          <div class="inner">
            <ef-accordion>
              <ef-collapse expanded>
                Content
              </ef-collapse>
              <ef-collapse>
                Content
              </ef-collapse>
            </ef-accordion>
          </div>
        </ef-collapse>
        <ef-collapse class="top-level">
          Content
        </ef-collapse>
      </ef-accordion>
    `);
    const topLevelCollapses = el.querySelectorAll('ef-collapse.top-level');
    const nestedCollapses = el.querySelectorAll('ef-collapse:not(.top-level)');
    const nestedHeader2 = nestedCollapses[1].shadowRoot.querySelector('[part=header-toggle]');

    expect(topLevelCollapses[0].expanded).to.equal(true);
    expect(topLevelCollapses[1].expanded).to.equal(false);

    expect(nestedCollapses[0].expanded).to.equal(true);
    expect(nestedCollapses[1].expanded).to.equal(false);

    setTimeout(() => nestedHeader2.dispatchEvent(new Event('tap')));
    await oneEvent(nestedHeader2, 'tap');

    expect(topLevelCollapses[0].expanded).to.equal(true);
    expect(topLevelCollapses[1].expanded).to.equal(false);

    expect(nestedCollapses[0].expanded).to.equal(false);
    expect(nestedCollapses[1].expanded).to.equal(true);
  });

  it('Should process nested tree without affecting parent collapse', async () => {
    const el = await fixture(`
      <ef-accordion>
        <ef-collapse class="top-level" expanded>
          <ef-tree></ef-tree>
        </ef-collapse>
      </ef-accordion>
    `);
    const collapse = el.querySelector('ef-collapse');
    const tree = el.querySelector('ef-tree');

    tree.data = [{
      label: 'Item 1',
      value: '1',
      expanded: true,
      items: [{
        label: 'Item 1.1',
        value: '1.1'
      }
      ]
    }]
    await elementUpdated(el);
    expect(collapse.expanded).to.equal(true);
    tree.children[0].click();
    await elementUpdated(el);
    expect(collapse.expanded).to.equal(true);

  });

  describe('Should Have Correct Properties', () => {
    it('Should have default value of property', async () => {
      const el = await fixture('<ef-accordion></ef-accordion>');

      expect(el.autoCollapseDisabled).to.equal(false);
      expect(el.hasAttribute('autoCollapseDisabled')).to.equal(false, 'attribute "autoCollapseDisabled" should not be exists');
      expect(el.getAttribute('autoCollapseDisabled')).to.equal(null, 'attribute "autoCollapseDisabled" should equal null');

      expect(el.spacing).to.equal(false);
      expect(el.hasAttribute('spacing')).to.equal(false, 'attribute "spacing" should not be exists');
      expect(el.getAttribute('spacing')).to.equal(null, 'attribute "spacing" should equal null');
    });

    it('Spacing property', async () => {
      const el = await fixture('<ef-accordion></ef-accordion>');

      expect(el.spacing).to.equal(false);
      expect(el.hasAttribute('spacing')).to.equal(false, 'attribute "spacing" should not be exists');
      expect(el.getAttribute('spacing')).to.equal(null, 'attribute "spacing" should equal null');

      el.setAttribute('spacing', '');
      expect(el.spacing).to.equal(true);
      expect(el.hasAttribute('spacing')).to.equal(true, 'attribute "spacing" should be exists');
      expect(el.getAttribute('spacing')).to.equal('', 'attribute "spacing" should equal ""');

      el.spacing = false;
      await elementUpdated(el);
      expect(el.spacing).to.equal(false);
      expect(el.hasAttribute('spacing')).to.equal(false, 'property "spacing" should not reflected');
      expect(el.getAttribute('spacing')).to.equal(null, 'property "spacing" should not reflected');

    });

    it('autoCollapseDisabled property', async () => {
      const el = await fixture('<ef-accordion></ef-accordion>');

      expect(el.autoCollapseDisabled).to.equal(false);
      expect(el.hasAttribute('auto-collapse-disabled')).to.equal(false, 'attribute "auto-collapse-disabled" should not be exists');
      expect(el.getAttribute('auto-collapse-disabled')).to.equal(null, 'attribute "auto-collapse-disabled" should equal null');

      el.setAttribute('auto-collapse-disabled', '');
      expect(el.autoCollapseDisabled).to.equal(true);
      expect(el.hasAttribute('auto-collapse-disabled')).to.equal(true, 'attribute "auto-collapse-disabled" should be exists');
      expect(el.getAttribute('auto-collapse-disabled')).to.equal('', 'attribute "auto-collapse-disabled" should equal ""');

      el.autoCollapseDisabled = false;
      await elementUpdated(el);
      expect(el.autoCollapseDisabled).to.equal(false);
      expect(el.hasAttribute('auto-collapse-disabled')).to.equal(true, 'property "auto-collapse-disabled" should not reflected');
      expect(el.getAttribute('auto-collapse-disabled')).to.equal('', 'property "auto-collapse-disabled" should not reflected');

    });

  });

});

