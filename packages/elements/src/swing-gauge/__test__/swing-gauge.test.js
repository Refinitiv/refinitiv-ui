import { fixture, expect, elementUpdated, aTimeout } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/swing-gauge';
import '@refinitiv-ui/elemental-theme/light/ef-swing-gauge.js';

describe('SapphireSwingGaugeTest', () => {
  describe('Value', () => {
    let el;
    beforeEach(async () => {
      el = await fixture(`<ef-swing-gauge></ef-swing-gauge>`);
    });

    it('Should display correct percentage', async () => {
      el.primaryValue = 80;
      el.secondaryValue = 20;

      await elementUpdated(el);

      const primaryPercentage = el.shadowRoot.querySelector(
        '[part=primary-value]'
      ).textContent;
      const secondaryPercentage = el.shadowRoot.querySelector(
        '[part=secondary-value]'
      ).textContent;

      expect(primaryPercentage).to.equal(`${el.primaryValue.toFixed(2)}%`);
      expect(secondaryPercentage).to.equal(`${el.secondaryValue.toFixed(2)}%`);
    });
    it('Should reset value to 0 when it is not a positive number', async () => {
      el.primaryValue = -28;
      el.secondaryValue = -120;

      await elementUpdated(el);

      expect(el.primaryValue).to.equal(0);
      expect(el.secondaryValue).to.equal(0);
    });
    it('Should reset value to 0 when it is invalid', async () => {
      el.primaryValue = 'ABC';
      el.secondaryValue = null;

      await elementUpdated(el);

      expect(el.primaryValue).to.equal(0);
      expect(el.secondaryValue).to.equal(0);
    });
    it('Should display correct percentage when value is small', async () => {
      el.primaryValue = 1;
      el.secondaryValue = 2;

      await elementUpdated(el);

      const primaryPercentage = el.shadowRoot.querySelector(
        '[part=primary-value]'
      ).textContent;
      const secondaryPercentage = el.shadowRoot.querySelector(
        '[part=secondary-value]'
      ).textContent;

      // Accessing private getPercentage() for testing purpose
      expect(primaryPercentage).to.equal(
        `${el.getPercentage(el.primaryValue).toFixed(2)}%`
      );
      expect(secondaryPercentage).to.equal(
        `${el.getPercentage(el.secondaryValue).toFixed(2)}%`
      );
    });
    it('Should display correct percentage when value is large', async () => {
      el.primaryValue = 1321;
      el.secondaryValue = 3213;

      await elementUpdated(el);

      const primaryPercentage = el.shadowRoot.querySelector(
        '[part=primary-value]'
      ).textContent;
      const secondaryPercentage = el.shadowRoot.querySelector(
        '[part=secondary-value]'
      ).textContent;

      // Accessing private getPercentage() for testing purpose
      expect(primaryPercentage).to.equal(
        `${el.getPercentage(el.primaryValue).toFixed(2)}%`
      );
      expect(secondaryPercentage).to.equal(
        `${el.getPercentage(el.secondaryValue).toFixed(2)}%`
      );
    });
    it('Should display only 2 decimal points', async () => {
      el.primaryValue = 90.241;
      el.secondaryValue = 9.759;

      await elementUpdated(el);

      const primaryPercentage = el.shadowRoot.querySelector(
        '[part=primary-value]'
      ).textContent;
      const secondaryPercentage = el.shadowRoot.querySelector(
        '[part=secondary-value]'
      ).textContent;

      expect(primaryPercentage).to.equal(`${el.primaryValue.toFixed(2)}%`);
      expect(secondaryPercentage).to.equal(`${el.secondaryValue.toFixed(2)}%`);
    });
    it('Should be able to customise value format using valueFormatter', async () => {
      el.primaryValue = 67;
      el.secondaryValue = 33;
      el.valueFormatter = (value) => `$${value}`;

      await elementUpdated(el);

      const primaryPercentage = el.shadowRoot.querySelector('[part=primary-value]').textContent;
      const secondaryPercentage = el.shadowRoot.querySelector('[part=secondary-value]').textContent;

      expect(primaryPercentage).to.equal(`$${el.primaryValue}`);
      expect(secondaryPercentage).to.equal(`$${el.secondaryValue}`);
    });
    it('Should be able to customise value format using valueFormatter with raw value', async () => {
      el.primaryValue = 123;
      el.secondaryValue = 321;
      el.valueFormatter = (value, rawValue) => `$${rawValue}`;

      await elementUpdated(el);

      const primaryPercentage = el.shadowRoot.querySelector('[part=primary-value]').textContent;
      const secondaryPercentage = el.shadowRoot.querySelector('[part=secondary-value]').textContent;

      expect(primaryPercentage).to.equal(`$${el.primaryValue}`);
      expect(secondaryPercentage).to.equal(`$${el.secondaryValue}`);
    });
  });

  describe('Label', () => {
    let el;
    beforeEach(async () => {
      el = await fixture(`<ef-swing-gauge></ef-swing-gauge>`);
    });
    it('Should display label correctly', async () => {
      el.primaryLabel = 'In';
      el.secondaryLabel = 'Out';

      await elementUpdated(el);

      const primaryLabel = el.shadowRoot.querySelector('[part=primary-label]').textContent.trim();
      const secondaryLabel = el.shadowRoot.querySelector('[part=secondary-label]').textContent.trim();

      expect(primaryLabel).to.equal(`${el.primaryLabel}`);
      expect(secondaryLabel).to.equal(`${el.secondaryLabel}`);
    });
  });

  describe('Legend', () => {
    let el;
    beforeEach(async () => {
      el = await fixture(`<ef-swing-gauge></ef-swing-gauge>`);
    });

    it('Should display legend correctly', async () => {
      el.primaryLegend = 'This is a primary legend';
      el.secondaryLegend = 'This is a secondary legend';

      await elementUpdated(el);

      const primaryLegend = el.shadowRoot.querySelector('[part=primary-legend]').textContent.trim();
      const secondaryLegend = el.shadowRoot.querySelector('[part=secondary-legend]').textContent.trim();

      expect(primaryLegend).to.equal(`${el.primaryLegend}`);
      expect(secondaryLegend).to.equal(`${el.secondaryLegend}`);
    });
  });

  describe('Center line', () => {
    let el;
    beforeEach(async () => {
      el = await fixture(`<ef-swing-gauge></ef-swing-gauge>`);
    });
    it('Should display solid center line by default', async () => {
      expect(`${el.getComputedVariable('--center-line', 'solid')}`.trim()).to.equal('solid');
    });
    it('Should display dotted center line', async () => {
      el.updateVariable('--center-line', 'dotted');
      await elementUpdated(el);
      expect(
        `${el.getComputedVariable('--center-line', 'solid')}`.trim()
      ).to.equal('dotted');
    });
    it('Should display dashed center line', async () => {
      el.updateVariable('--center-line', 'dashed');
      await elementUpdated(el);
      expect(
        `${el.getComputedVariable('--center-line', 'solid')}`.trim()
      ).to.equal('dashed');
    });
    it('Should hide center line', async () => {
      el.updateVariable('--center-line', 'none');
      await elementUpdated(el);
      expect(
        `${el.getComputedVariable('--center-line', 'solid')}`.trim()
      ).to.equal('none');
    });
  });

  describe('Responsiveness', () => {
    let el;
    beforeEach(async () => {
      el = await fixture(`<ef-swing-gauge primary-label="Primary label" primary-value="50" secondary-label="Secondary label" secondary-value="50" style="width: 100%; height: 200px"></ef-swing-gauge>`);
    });

    it('Should resize label font size', async () => {
      await aTimeout(100);

      const fontSize = Number(el.labelStyle.fontSize.replace('px', ''));

      el.primaryLabel = 'So long primary label and more and more and more';
      el.style.width = '20%';

      await elementUpdated(el);

      const newFontSize = Number(el.labelStyle.fontSize.replace('px', ''));
      expect(newFontSize).to.lessThan(fontSize);
      expect(newFontSize).to.not.lessThan(12);
      expect(el.primaryLabel).to.equal('So long primary label and more and more and more');
    });

    it('Should resize value font size', async () => {
      await aTimeout(50);

      const fontSize = Number(el.valueStyle.fontSize.replace('px', ''));

      el.primaryValue = 67;
      el.secondaryValue = 33;
      el.valueFormatter = (value, rawValue) => `$${value}% (${rawValue})`;

      el.style.width = '20%';

      await elementUpdated();

      const newFontSize = Number(el.valueStyle.fontSize.replace('px', ''));
      expect(newFontSize).to.lessThan(fontSize);
      expect(newFontSize).to.not.lessThan(15);
    });

    it('Should resize', async () => {
      el.style.width = '10%';

      await aTimeout(50);

      expect(el.scale).to.lessThan(1);
    })
  });

  describe('Public function', () => {
    let el;
    beforeEach(async () => {
      el = await fixture(`<ef-swing-gauge></ef-swing-gauge>`);
    });

    it('Should return correct value', async () => {
      expect(el.canvasSize.width).to.equal(el.offsetWidth);
      expect(el.canvasSize.height).to.equal(el.offsetHeight);
    });
  });
});

