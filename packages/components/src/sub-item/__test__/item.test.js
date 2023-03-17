import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/components/sub-item';

const createFixture = (type = '') => {
  switch (type) {
    case 'slots':
      return fixture('<ds-sub-item><div class="left" slot="left">Left Item</div><div class="center">Center Item</div><div class="right" slot="right">Right Item</div></ds-sub-item>');
    case 'events':
      return fixture('<ds-sub-item value="tiger">Tiger</ds-sub-item>');
    case 'highlightable':
      return fixture('<ds-sub-item type="text">Test Highlightable</ds-sub-item>');
    case 'not_highlightable':
      return fixture('<ds-sub-item type="header">Test Not Highlightable</ds-sub-item>');
    case 'check_properties':
      return fixture('<ds-sub-item label="tiger">Test Not Highlightable</ds-sub-item>');
    case 'with_icon':
      return fixture('<ds-sub-item icon="tick">With settings icon</ds-sub-item>');
    case 'with_empty_icon':
      return fixture('<ds-sub-item icon>With empty icon</ds-sub-item>');
    case 'header_with_label_and_subLabel':
      return fixture('<ds-sub-item type="header" label="tiger" sub-label="tiger"></ds-sub-item>');
    case 'default_with_label_and_subLabel':
      return fixture('<ds-sub-item label="tiger" sub-label="tiger"></ds-sub-item>');
    case 'default_with_content_and_subLabel':
      return fixture('<ds-sub-item sub-label="tiger">Tiger</ds-sub-item>');
    case 'default_only_subLabel':
      return fixture('<ds-sub-item sub-label="tiger"></ds-sub-item>');
    case 'sub_label_and_label_with_default_slot_ignorable_children':
      return fixture(`
        <ds-sub-item label="tiger" sub-label="tiger">
          <!--this is a comment node and linebreaks-->
        </ds-sub-item>
      `);
    default:
      return fixture('<ds-sub-item>Default</ds-sub-item>');
  }
};

describe('item/Item', () => {
  describe('Defaults', () => {
    it('Should have correct Shadow DOM structure', async () => {
      const el = await createFixture();
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('Should have correct Shadow DOM structure with icon', async () => {
      const el = await createFixture('with_icon');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('Should have correct Shadow DOM structure with empty icon', async () => {
      const el = await createFixture('with_empty_icon');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('Header item should have correct Shadow DOM structure with subLabel', async () => {
      const el = await createFixture('header_with_label_and_subLabel');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('Default item should have correct Shadow DOM structure with label and subLabel', async () => {
      const el = await createFixture('default_with_label_and_subLabel');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('Default item should have correct Shadow DOM structure with content and subLabel', async () => {
      const el = await createFixture('default_with_content_and_subLabel');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('Default item should have correct Shadow DOM structure with subLabel, if there is no content or label', async () => {
      const el = await createFixture('default_only_subLabel');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('Default item should have correct Shadow DOM structure with label, sub-label and ignorable default slot children', async () => {
      const el = await createFixture('sub_label_and_label_with_default_slot_ignorable_children');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('Slots are correctly populated', async () => {
      const el = await createFixture('slots');
      await expect(el).lightDom.to.equalSnapshot();

      const shadowRoot = el.shadowRoot;

      const leftPart = shadowRoot.querySelector('[part=left]');
      expect(leftPart, 'Left part does not exist').to.exist;
      const leftSlot = leftPart.querySelector('slot[name=left]');
      const leftItem = el.querySelector('.left');
      expect(leftSlot, 'Left slot does not exist').to.exist;
      expect(leftSlot.assignedNodes().length, 'Incorrect number of items in the left slot').to.equal(1);
      expect(leftSlot.assignedNodes()[0], 'Incorrect item assigned to the slot').to.equal(leftItem);

      const rightPart = shadowRoot.querySelector('[part=right]');
      expect(rightPart, 'Right part does not exist').to.exist;
      const rightSlot = rightPart.querySelector('slot[name=right]');
      const rightItem = el.querySelector('.right');
      expect(rightSlot, 'Right slot does not exist').to.exist;
      expect(rightSlot.assignedNodes().length, 'Incorrect number of items in the right slot').to.equal(1);
      expect(rightSlot.assignedNodes()[0], 'Incorrect item assigned to the right slot').to.equal(rightItem);

      const centerPart = shadowRoot.querySelector('[part=center]');
      expect(centerPart, 'Center part does not exist').to.exist;
      const defaultSlot = centerPart.querySelector('slot');
      const defaultItem = el.querySelector('.center');
      expect(defaultSlot, 'Default slot does not exist').to.exist;
      expect(defaultSlot.assignedNodes().length, 'Incorrect number of items in the default slot').to.equal(1);
      expect(defaultSlot.assignedNodes()[0], 'Incorrect item assigned to the default slot').to.equal(defaultItem);
    });

    it('Test Highlightable', async () => {
      const el = await createFixture('highlightable');
      expect(el.highlightable).to.equal(true);
    });

    it('Test Not Highlightable', async () => {
      const el = await createFixture('not_highlightable');
      expect(el.highlightable).to.equal(false);
    });
  });

  describe('Check Properties', () => {
    let el;

    beforeEach(async () => {
      el = await createFixture('check_properties');
    });

    it('Check property label', async () => {
      expect(el.hasAttribute('label')).to.equal(true, 'attribute "label" should be exists');
      expect(el.getAttribute('label')).to.equal('tiger', 'attribute "label" should equal "tiger"');
      el.label = 'cat';
      await elementUpdated(el);
      expect(el.hasAttribute('label')).to.equal(true, 'attribute "label" should be exists');
      expect(el.getAttribute('label')).to.equal('tiger', 'attribute "label" should equal "tiger" without changes');
    });

    it('Check property header', async () => {
      expect(el.hasAttribute('type')).to.equal(false, 'attribute "type" should not be exists');
      expect(el.getAttribute('type')).to.equal(null, 'attribute "type" should equal null');
      el.type = 'header';
      await elementUpdated(el);
      expect(el.hasAttribute('type')).to.equal(true, 'attribute "type" should be exists');
      expect(el.getAttribute('type')).to.equal('header', 'attribute "type" should equal "header"');
    });

    it('Check property icon', async () => {
      expect(el.hasAttribute('icon')).to.equal(false, 'attribute "icon" should not be exists');
      expect(el.getAttribute('icon')).to.equal(null, 'attribute "icon" should equal null');
      el.icon = 'menu';
      await elementUpdated(el);
      expect(el.hasAttribute('icon')).to.equal(true, 'attribute "icon" should be exists');
      expect(el.getAttribute('icon')).to.equal('menu', 'attribute "icon" should equal "menu"');
    });

    it('Check property selected', async () => {
      expect(el.hasAttribute('selected')).to.equal(false, 'attribute "selected" should not be exists');
      expect(el.getAttribute('selected')).to.equal(null, 'attribute "selected" should equal null');
      el.selected = true;
      await elementUpdated(el);
      expect(el.hasAttribute('selected')).to.equal(true, 'attribute "selected" should be exists');
      expect(el.getAttribute('selected')).to.equal('', 'attribute "selected" should equal ""');
    });

    it('Check property highlighted', async () => {
      expect(el.hasAttribute('highlighted')).to.equal(false, 'attribute "highlighted" should not be exists');
      expect(el.getAttribute('highlighted')).to.equal(null, 'attribute "highlighted" should equal null');
      el.highlighted = true;
      await elementUpdated(el);
      expect(el.hasAttribute('highlighted')).to.equal(true, 'attribute "highlighted" should be exists');
      expect(el.getAttribute('highlighted')).to.equal('', 'attribute "highlighted" should equal ""');
    });

    it('Check property subLabel', async () => {
      expect(el.hasAttribute('sub-label')).to.equal(false, 'attribute "sub-label" should not exist');
      expect(el.getAttribute('sub-label')).to.equal(null, 'attribute "sub-label" should equal null');
      el.subLabel = 'tiger';
      await elementUpdated(el);
      expect(el.hasAttribute('sub-label')).to.equal(true, 'attribute "sub-label" should exist');
      expect(el.getAttribute('sub-label')).to.equal('tiger', 'attribute "sub-label" should equal "tiger"');
    });
  });

  describe('Special Attributes', () => {
    it('Check property for', async () => {
      const el = await fixture('<ds-sub-item for="for">For</ds-sub-item>');
      expect(el.for).to.equal('for', 'For should be reflected as property');
      await expect(el).shadowDom.to.equalSnapshot();
    });
    describe('Check property multiple',  () => {
      let el;
      let checkbox;

      beforeEach(async () =>{
        el = await fixture('<ds-sub-item multiple>Multiple</ds-sub-item>');
        checkbox = el.shadowRoot.querySelector('[part=checkbox]');
      });

      it('Checkbox for item should be displayed', async () => {
        expect(el.multiple).to.equal(true, 'Multiple should be reflected as property');
        expect(checkbox).to.not.be.null;
        expect(checkbox.checked).to.be.false;
        await expect(el).shadowDom.to.equalSnapshot({ ignoreAttributes: ['class'] });
      });
      it('Checkbox should be checked ', async () => {
        el.selected = true;
        await elementUpdated(el);
        expect(checkbox.checked).to.be.true;
        await expect(el).shadowDom.to.equalSnapshot({ ignoreAttributes: ['class'] });
      });
      it('Checkbox for item should not be displayed', async () => {
        el.multiple = false;
        await elementUpdated(el);
        expect(el.shadowRoot.querySelector('[part=checkbox]')).to.be.null;
        await expect(el).shadowDom.to.equalSnapshot({ ignoreAttributes: ['class'] });
      });
    });
  });
});
