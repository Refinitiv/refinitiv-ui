import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/tab';
import '@refinitiv-ui/elemental-theme/light/ef-tab';

describe('Tab', () => {
  describe('DOM Structure', () => {
    it('DOM structure is correct', async () => {
      const el = await fixture('<ef-tab></ef-tab>');
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure with label is correct', async () => {
      const el = await fixture('<ef-tab label="Home"></ef-tab>');
      expect(el).shadowDom.to.equalSnapshot({ ignoreAttributes: ['class', 'style'] });
    });
    it('DOM structure with sub label is correct', async () => {
      const el = await fixture('<ef-tab label="Home" sub-label="Secondary Info"></ef-tab>');
      expect(el).shadowDom.to.equalSnapshot({ ignoreAttributes: ['class', 'style'] });
    });
    it('DOM structure with slotted content is correct', async () => {
      const el = await fixture('<ef-tab>Slotted Content</ef-tab>');
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure with icon is correct', async () => {
      const el = await fixture('<ef-tab icon="home"></ef-tab>');
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure with clear button is correct', async () => {
      const el = await fixture('<ef-tab clears></ef-tab>');
      expect(el).shadowDom.to.equalSnapshot();
    });
  });
  describe('Label', () => {
    let el;
    const text = 'Label text';

    beforeEach(async () => {
      el = await fixture('<ef-tab></ef-tab>');
    });

    it('Can set label using attribute', async () => {
      el.setAttribute('label', text);

      await elementUpdated();
      expect(el.label).to.equal(text);
      expect(el.shadowRoot.querySelector("[part='label']").textContent.trim()).to.equal(text);
    });
    it('Can set label using property', async () => {
      el.label = text;

      await elementUpdated();

      expect(el.label).to.equal(text);
      expect(el.shadowRoot.querySelector("[part='label']").textContent.trim()).to.equal(text);
    });
  });
  describe('Clears and Clears on hover', () => {
    it('fired clear event when tap on clear button', async () => {
      const el = await fixture('<ef-tab clears icon="home"></ef-tab>');
      const closeBtn = el.shadowRoot.querySelector("[part='close']");
      const onTap = () => closeBtn.dispatchEvent(new Event('tap'));
      setTimeout(onTap);
      const e = await oneEvent(el, 'clear');
      expect(e.detail.label).to.equal(el.label);
    });
    it('fired clear event when tap on clear button with clears-on-hover attr', async () => {
      const el = await fixture('<ef-tab clears-on-hover icon="home"></ef-tab>');
      const closeBtn = el.shadowRoot.querySelector("[part='close']");
      const onTap = () => closeBtn.dispatchEvent(new Event('tap'));
      setTimeout(onTap);
      const e = await oneEvent(el, 'clear');
      expect(e.detail.label).to.equal(el.label);
    });
  });
  describe('Sub-label', () => {
    let el;
    const text = 'Label text';
    const subText = 'Sub text';

    beforeEach(async () => {
      el = await fixture('<ef-tab></ef-tab>');
    });

    it('Should not render subLabel part', async () => {
      el.label = text;
      await elementUpdated();
      const subLabel = el.shadowRoot.querySelector("[part='sub-label']");
      expect(subLabel).to.equal(null);
    });
    it('Can set sub label using attribute', async () => {
      el.setAttribute('sub-label', subText);
      await elementUpdated();
      expect(el.subLabel).to.equal(subText);
      expect(el.shadowRoot.querySelector("[part='sub-label']").textContent.trim()).to.equal(subText);
    });
    it('Can set sub label using property', async () => {
      el.subLabel = subText;
      await elementUpdated();
      expect(el.subLabel).to.equal(subText);
      expect(el.shadowRoot.querySelector("[part='sub-label']").textContent.trim()).to.equal(subText);
    });
  });
  describe('Truncate and max-line', () => {
    let el;
    beforeEach(async () => {
      el = await fixture('<ef-tab label="Application Details"></ef-tab>');
    });
    it('Should pass truncate with empty string value to ef-label by default', async () => {
      const labelPart = el.shadowRoot.querySelector("[part='label']");
      expect(labelPart.truncate).to.equal('');
    });
    it('Should be ignore max-line when sub-label is provided', async () => {
      const subLabelText = 'Secondary Text';
      el.subLabel = subLabelText;
      await elementUpdated();
      const labelPart = el.shadowRoot.querySelector("[part='label']");
      expect(el.subLabel).to.equal(subLabelText);
      expect(labelPart.maxLine).to.equal(null);
    });
  });
  describe('Slot', () => {
    it('Accepts content in default slot and it should have the highest priority', async () => {
      const slottedContent = 'Slotted Content';
      const el = await fixture('<ef-tab>' + slottedContent + '</ef-tab>');
      expect(el.textContent.trim()).to.equal(slottedContent);
    });
    it('Should not render label or sub-label element when tab has children', async () => {
      const el = await fixture('<ef-tab label="This text should not exist" sub-label="This text should not exist"></ef-tab>');
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
});
