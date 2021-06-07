import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/swing-gauge';
import '@refinitiv-ui/elemental-theme/light/ef-swing-gauge.js';

describe('SwingGauge', () => {
  let el;

  const noVal = '<ef-swing-gauge></ef-swing-gauge>';
  const nullVal = '<ef-swing-gauge primary-value="null" secondary-value="null"></ef-swing-gauge>';
  const primaryVal = '<ef-swing-gauge primary-value="100"></ef-swing-gauge>';
  const secondaryVal = '<ef-swing-gauge secondary-value="100"></ef-swing-gauge>';
  const primaryLabel = '<ef-swing-gauge primary-label="In"></ef-swing-gauge>';
  const secondaryLabel = '<ef-swing-gauge secondary-label="Out"></ef-swing-gauge>';
  const duration = '<ef-swing-gauge duration="500"></ef-swing-gauge>';

  const customStyleDotted = '<ef-swing-gauge line-dotted style="width: 1000px; height: 2000px;"></ef-swing-gauge>';
  const customStyleDashed = '<ef-swing-gauge line-dashed style="width: 1000px; height: 2000px;"></ef-swing-gauge>';
  const customStyleNone = '<ef-swing-gauge line-none style="width: 1000px; height: 2000px;"></ef-swing-gauge>';

  describe('Test Default Structure', () => {
    beforeEach(async () => {
      el = await fixture(noVal);
    });

    it('Correct structure', () => {
      expect(el).shadowDom.to.equalSnapshot();
      expect(el.primaryValue).to.equal(50);
      expect(el.secondaryValue).to.equal(50);
      expect(el.primaryLabel).to.equal('');
      expect(el.secondaryLabel).to.equal('');
      expect(el.duration).to.equal(1000);
      expect(`${el.getComputedVariable('--center-line', 'solid')}`.trim()).to.equal('solid');
    });

    it('Change primary value', async () => {
      el.primaryValue = 100;

      await elementUpdated(el);
      expect(el.primaryValue).to.equal(100);
      expect(el.secondaryValue).to.equal(50);
      expect(el.primaryLabel).to.equal('');
      expect(el.secondaryLabel).to.equal('');
    });

    it('Change primary label', () => {
      el.primaryLabel = 'In';

      expect(el.primaryValue).to.equal(50);
      expect(el.secondaryValue).to.equal(50);
      expect(el.primaryLabel).to.equal('In');
      expect(el.secondaryLabel).to.equal('');
    });

    it('Change secondary value', async () => {
      el.secondaryValue = 100;

      await elementUpdated(el);
      expect(el.primaryValue).to.equal(50);
      expect(el.secondaryValue).to.equal(100);
      expect(el.primaryLabel).to.equal('');
      expect(el.secondaryLabel).to.equal('');
    });

    it('Change secondary label', () => {
      el.secondaryLabel = 'Out';

      expect(el.primaryValue).to.equal(50);
      expect(el.secondaryValue).to.equal(50);
      expect(el.primaryLabel).to.equal('');
      expect(el.secondaryLabel).to.equal('Out');
    });

    it('Change all property on runtime', async () => {
      expect(el.primaryValue).to.equal(50);
      expect(el.secondaryValue).to.equal(50);
      expect(el.primaryLabel).to.equal('');
      expect(el.secondaryLabel).to.equal('');
      expect(el.duration).to.equal(1000);

      await elementUpdated(el);

      el.primaryValue = 25;
      el.secondaryValue = 95;
      el.primaryLabel = 'In';
      el.secondaryLabel = 'Out';

      await elementUpdated(el);

      expect(el.primaryValue).to.equal(25);
      expect(el.secondaryValue).to.equal(95);
      expect(el.primaryLabel).to.equal('In');
      expect(el.secondaryLabel).to.equal('Out');
      expect(el.duration).to.equal(1000);
    });

    it('Giving null to primary and secondary value', async () => {
      el = await fixture(nullVal);

      expect(el.primaryValue).to.be.NaN;
      expect(el.secondaryValue).to.be.NaN;
      expect(el.fillPercentage).to.equal(0.5);
    });
  });
  describe('Test primary-value Property', () => {
    beforeEach(async () => {
      el = await fixture(primaryVal);
    });

    it('Correct structure', () => {
      expect(el.primaryValue).to.equal(100);
      expect(el.secondaryValue).to.equal(50);
      expect(el.primaryLabel).to.equal('');
      expect(el.secondaryLabel).to.equal('');
      expect(el.duration).to.equal(1000);
    });
  });
  describe('Test secondary-value Property', () => {
    beforeEach(async () => {
      el = await fixture(secondaryVal);
    });

    it('Correct structure', () => {
      expect(el.primaryValue).to.equal(50);
      expect(el.secondaryValue).to.equal(100);
      expect(el.primaryLabel).to.equal('');
      expect(el.secondaryLabel).to.equal('');
      expect(el.duration).to.equal(1000);
    });
  });
  describe('Test primary-label Property', () => {
    beforeEach(async () => {
      el = await fixture(primaryLabel);
    });

    it('Primary label was set by default.', () => {
      expect(el.primaryValue).to.equal(50);
      expect(el.secondaryValue).to.equal(50);
      expect(el.primaryLabel).to.equal('In');
      expect(el.secondaryLabel).to.equal('');
      expect(el.duration).to.equal(1000);
    });

    it('Change secondary label', () => {
      el.secondaryLabel = 'Out';

      expect(el.primaryValue).to.equal(50);
      expect(el.secondaryValue).to.equal(50);
      expect(el.primaryLabel).to.equal('In');
      expect(el.secondaryLabel).to.equal('Out');
    });

    it('Use long text on primary label.', () => {
      el.primaryLabel = 'So long label here';
      el.secondaryLabel = 'Short';

      expect(el.primaryValue).to.equal(50);
      expect(el.secondaryValue).to.equal(50);
      expect(el.primaryLabel).to.equal('So long label here');
      expect(el.secondaryLabel).to.equal('Short');
      expect(el.duration).to.equal(1000);
    });
  });
  describe('Test secondary-label Property', () => {
    beforeEach(async () => {
      el = await fixture(secondaryLabel);
    });

    it('Secondary label was set by default', () => {
      expect(el.primaryValue).to.equal(50);
      expect(el.secondaryValue).to.equal(50);
      expect(el.primaryLabel).to.equal('');
      expect(el.secondaryLabel).to.equal('Out');
      expect(el.duration).to.equal(1000);
    });
  });
  describe('Test duration Property', () => {
    beforeEach(async () => {
      el = await fixture(duration);
    });

    it('Duration was set to 500 by default.', () => {
      expect(el.primaryValue).to.equal(50);
      expect(el.secondaryValue).to.equal(50);
      expect(el.primaryLabel).to.equal('');
      expect(el.secondaryLabel).to.equal('');
      expect(el.duration).to.equal(500);
    });
  });
  describe('Test Custom Styles', () => {
    it('Center line: dotted', async () => {
      el = await fixture(customStyleDotted);
      expect(`${el.getComputedVariable('--center-line', 'solid')}`.trim()).to.equal('solid');

      el.updateVariable('--center-line', 'dotted');
      await elementUpdated(el);
      expect(`${el.getComputedVariable('--center-line', 'solid')}`.trim()).to.equal('dotted');
    });

    it('Center line: dashed', async () => {
      el = await fixture(customStyleDashed);
      expect(`${el.getComputedVariable('--center-line', 'solid')}`.trim()).to.equal('solid');

      el.updateVariable('--center-line', 'dashed');
      await elementUpdated(el);
      expect(`${el.getComputedVariable('--center-line', 'solid')}`.trim()).to.equal('dashed');
    });

    it('Hide center line', async () => {
      el = await fixture(customStyleNone);
      expect(`${el.getComputedVariable('--center-line', 'solid')}`.trim()).to.equal('solid');

      el.updateVariable('--center-line', 'none');
      await elementUpdated(el);
      expect(`${el.getComputedVariable('--center-line', 'solid')}`.trim()).to.equal('none');
    });
  });
});
