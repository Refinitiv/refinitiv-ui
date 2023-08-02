import '@refinitiv-ui/elements/tab';

import '@refinitiv-ui/elemental-theme/light/ef-tab';
import { elementUpdated, expect, fixture, keyboardEvent, oneEvent } from '@refinitiv-ui/test-helpers';

const keyDelete = keyboardEvent('keydown', { key: 'Delete' });

describe('tab/Tab', function() {
  describe('DOM Structure', function() {
    it('DOM structure is correct', async function() {
      const el = await fixture('<ef-tab></ef-tab>');
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure with label is correct', async function() {
      const el = await fixture('<ef-tab label="Home"></ef-tab>');
      expect(el).shadowDom.to.equalSnapshot({ ignoreAttributes: ['class', 'style'] });
    });
    it('DOM structure with sub label is correct', async function() {
      const el = await fixture('<ef-tab label="Home" sub-label="Secondary Info"></ef-tab>');
      expect(el).shadowDom.to.equalSnapshot({ ignoreAttributes: ['class', 'style'] });
    });
    it('DOM structure with slotted content is correct', async function() {
      const el = await fixture('<ef-tab>Slotted Content</ef-tab>');
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure with icon is correct', async function() {
      const el = await fixture('<ef-tab icon="home"></ef-tab>');
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure with clear button is correct', async function() {
      const el = await fixture('<ef-tab clears></ef-tab>');
      expect(el).shadowDom.to.equalSnapshot();
    });
  });
  describe('Label', function() {
    let el;
    const text = 'Label text';

    beforeEach(async function() {
      el = await fixture('<ef-tab></ef-tab>');
    });

    it('Can set label using attribute', async function() {
      el.setAttribute('label', text);

      await elementUpdated();
      expect(el.label).to.equal(text);
      expect(el.shadowRoot.querySelector("[part='label']").textContent.trim()).to.equal(text);
    });
    it('Can set label using property', async function() {
      el.label = text;

      await elementUpdated();

      expect(el.label).to.equal(text);
      expect(el.shadowRoot.querySelector("[part='label']").textContent.trim()).to.equal(text);
    });
  });
  describe('Clears and Clears on hover', function() {
    it('fired clear event when tap on clear button', async function() {
      const el = await fixture('<ef-tab clears icon="home"></ef-tab>');
      const closeBtn = el.shadowRoot.querySelector("[part='close']");
      const onTap = () => closeBtn.dispatchEvent(new Event('tap'));
      setTimeout(onTap);
      await oneEvent(el, 'clear');
      expect(el.label).to.equal(el.label);
    });
    it('fired clear event when tap on clear button with clears-on-hover attr', async function() {
      const el = await fixture('<ef-tab clears-on-hover icon="home"></ef-tab>');
      const closeBtn = el.shadowRoot.querySelector("[part='close']");
      const onTap = () => closeBtn.dispatchEvent(new Event('tap'));
      setTimeout(onTap);
      await oneEvent(el, 'clear');
      expect(el.label).to.equal(el.label);
    });
  });
  describe('Sub-label', function() {
    let el;
    const text = 'Label text';
    const subText = 'Sub text';

    beforeEach(async function() {
      el = await fixture('<ef-tab></ef-tab>');
    });

    it('Should not render subLabel part', async function() {
      el.label = text;
      await elementUpdated();
      const subLabel = el.shadowRoot.querySelector("[part='sub-label']");
      expect(subLabel).to.equal(null);
    });
    it('Can set sub label using attribute', async function() {
      el.setAttribute('sub-label', subText);
      await elementUpdated();
      expect(el.subLabel).to.equal(subText);
      expect(el.shadowRoot.querySelector("[part='sub-label']").textContent.trim()).to.equal(subText);
    });
    it('Can set sub label using property', async function() {
      el.subLabel = subText;
      await elementUpdated();
      expect(el.subLabel).to.equal(subText);
      expect(el.shadowRoot.querySelector("[part='sub-label']").textContent.trim()).to.equal(subText);
    });
  });
  describe('Truncate and max-line', function() {
    let el;
    beforeEach(async function() {
      el = await fixture('<ef-tab label="Application Details"></ef-tab>');
    });
    it('Should pass truncate 1 line to quartz-label by default', function() {
      const labelPart = el.shadowRoot.querySelector("[part='label']");
      expect(labelPart.lineClamp).to.equal(1);
    });
    it('Should be line-clamp=0 to quartz-label when middle ellipsis', async function() {
      el.lineClamp = null;
      const labelPart = el.shadowRoot.querySelector("[part='label']");
      await elementUpdated();
      expect(labelPart.lineClamp).to.equal(0);

      el.lineClamp = 0;
      await elementUpdated();
      expect(labelPart.lineClamp).to.equal(0);
    });
    it('Should be ignore multiple lines when sub-label is provided', async function() {
      el.lineClamp = 2;
      const subLabelText = 'Secondary Text';
      el.subLabel = subLabelText;
      await elementUpdated();
      const labelPart = el.shadowRoot.querySelector("[part='label']");
      expect(el.subLabel).to.equal(subLabelText);
      expect(labelPart.lineClamp).to.equal(1);
    });
  });
  describe('Slot', function() {
    it('Accepts content in default slot and it should have the highest priority', async function() {
      const slottedContent = 'Slotted Content';
      const el = await fixture('<ef-tab>' + slottedContent + '</ef-tab>');
      expect(el.textContent.trim()).to.equal(slottedContent);
    });
    it('Should not render label or sub-label element when tab has children', async function() {
      const el = await fixture(
        '<ef-tab label="This text should not exist" sub-label="This text should not exist"></ef-tab>'
      );
      let label = el.shadowRoot.querySelector('[part=label]');
      let subLabel = el.shadowRoot.querySelector('[part=sub-label]');
      expect(label.textContent.trim()).to.equal('This text should not exist');
      expect(subLabel.textContent.trim()).to.equal('This text should not exist');

      const slottedContent = 'Slotted Content';

      el.textContent = slottedContent;
      await elementUpdated();
      label = el.shadowRoot.querySelector('[part=label]');
      subLabel = el.shadowRoot.querySelector('[part=sub-label]');
      expect(el.textContent.trim()).to.equal(slottedContent);
      expect(label).to.equal(null);
      expect(subLabel).to.equal(null);
    });
  });
  describe('Accessibility', function() {
    it('Should apply aria-selected to active tab', async function() {
      const el = await fixture('<ef-tab label="Home"></ef-tab>');
      expect(el.getAttribute('aria-selected')).to.equal('false');
      el.active = true;
      await elementUpdated();
      expect(el.getAttribute('aria-selected')).to.equal('true');
    });
    it('Should fired clear event when press delete', async function() {
      const el = await fixture('<ef-tab label="Home" clears></ef-tab>');
      setTimeout(() => el.dispatchEvent(keyDelete));
      const ev = await oneEvent(el, 'clear');
      expect(ev.type).to.equal('clear');
    });
  });
});
