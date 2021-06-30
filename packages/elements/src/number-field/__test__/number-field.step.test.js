import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/number-field';
import '@refinitiv-ui/elemental-theme/light/ef-number-field';

const UP = 1;
const DOWN = -1;

const expectValues = async (el, values, direction, stepFactor) => {
  await elementUpdated(); // here to cover property changes
  const value = el.value;

  for (let i = 0; i < values.length; i += 1) {
    const expectedValue = values[i];
    if (direction === UP) {
      el.stepUp(stepFactor);
    }
    else if (direction === DOWN) {
      el.stepDown(stepFactor);
    }
    await elementUpdated(el);

    expect(el.value).to.be.equal(String(expectedValue), `Iteration: ${i}; incorrect value`);

    // do not check validity if value did not change
    if (value !== el.value) {
      expect(el.checkValidity()).to.be.equal(true, `Iteration: ${i}; Stepping must produce valid numbers`);
    }
  }
};

// All below tests were obtained manually from native number input in Google Chrome 90
// and are considered as the source of truth
describe('number-field/Step', () => {
  describe('Step', () => {
    it('Default (no arguments), Step Up', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      await expectValues(el, [1, 2, 3, 4, 5], UP);
    });
    it('Default (no arguments), Step Down', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      await expectValues(el, [-1, -2, -3, -4, -5], DOWN);
    });
    it('value (property) = 1, Step Up', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      el.value = '1';
      await expectValues(el, [2, 3, 4, 5, 6], UP);
    });
    it('value (property) = 1, Step Down', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      el.value = '1';
      await expectValues(el, [0, -1, -2, -3, -4], DOWN);
    });
    it('value (property) = 0.5, Step Up', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      el.value = '0.5';
      await expectValues(el, [1, 2, 3, 4, 5], UP);
    });
    it('value (property) = 0.5, Step Down', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      el.value = '0.5';
      await expectValues(el, [0, -1, -2, -3, -4], DOWN);
    });
    it('value (property) = 1.1, Step Up', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      el.value = '1.1';
      await expectValues(el, [2, 3, 4, 5, 6], UP);
    });
    it('value (property) = 1.1, Step Down', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      el.value = '1.1';
      await expectValues(el, [1, 0, -1, -2, -3], DOWN);
    });
    it('step = 0.3, Step Up', async () => {
      const el = await fixture('<ef-number-field step="0.3"></ef-number-field>');
      await expectValues(el, [0.3, 0.6, 0.9, 1.2, 1.5], UP);
    });
    it('step = 0.3, Step Down', async () => {
      const el = await fixture('<ef-number-field step="0.3"></ef-number-field>');
      await expectValues(el, [-0.3, -0.6, -0.9, -1.2, -1.5], DOWN);
    });
    it('step = 0.3, value (property) = 0.5, Step Up', async () => {
      const el = await fixture('<ef-number-field step="0.3"></ef-number-field>');
      el.value = '0.5';
      await expectValues(el, [0.6, 0.9, 1.2, 1.5, 1.8], UP);
    });
    it('step = 0.3, value (property) = 0.5, Step Down', async () => {
      const el = await fixture('<ef-number-field step="0.3"></ef-number-field>');
      el.value = '0.5';
      await expectValues(el, [0.3, 0, -0.3, -0.6, -0.9], DOWN);
    });
    it('min = 3, Step Up', async () => {
      const el = await fixture('<ef-number-field min="3"></ef-number-field>');
      await expectValues(el, [3, 4, 5, 6, 7], UP);
    });
    it('min = 3, Step Down', async () => {
      const el = await fixture('<ef-number-field min="3"></ef-number-field>');
      await expectValues(el, [3, 3, 3, 3, 3], DOWN);
    });
    it('min = 3, value (property) = 1, Step Up', async () => {
      const el = await fixture('<ef-number-field min="3"></ef-number-field>');
      el.value = '1';
      await expectValues(el, [3, 4, 5, 6, 7], UP);
    });
    it('min = 3, value (property) = 1, Step Down', async () => {
      const el = await fixture('<ef-number-field min="3"></ef-number-field>');
      el.value = '1';
      await expectValues(el, [1, 1, 1, 1, 1], DOWN);
    });
    it('max = 3, Step Up', async () => {
      const el = await fixture('<ef-number-field max="3"></ef-number-field>');
      await expectValues(el, [1, 2, 3, 3, 3], UP);
    });
    it('max = 3, Step Down', async () => {
      const el = await fixture('<ef-number-field max="3"></ef-number-field>');
      await expectValues(el, [-1, -2, -3, -4, -5], DOWN);
    });
    it('max = 3, value (property) = 5, Step Up', async () => {
      const el = await fixture('<ef-number-field max="3"></ef-number-field>');
      el.value = '5';
      await expectValues(el, [5, 5, 5, 5, 5], UP);
    });
    it('max = 3, value (property) = 5, Step Down', async () => {
      const el = await fixture('<ef-number-field max="3"></ef-number-field>');
      el.value = '5';
      await expectValues(el, [3, 2, 1, 0, -1], DOWN);
    });
    it('min = 1, max = 3, Step Up', async () => {
      const el = await fixture('<ef-number-field min="1" max="3"></ef-number-field>');
      await expectValues(el, [1, 2, 3, 3, 3], UP);
    });
    it('min = 1, max = 3, Step Down', async () => {
      const el = await fixture('<ef-number-field min="1" max="3"></ef-number-field>');
      await expectValues(el, [1, 1, 1, 1, 1], DOWN);
    });
    it('min = -0.3, step = 0.55, Step Up', async () => {
      const el = await fixture('<ef-number-field min="-0.3" step="0.55"></ef-number-field>');
      await expectValues(el, [0.25, 0.8, 1.35, 1.9, 2.45], UP);
    });
    it('min = -0.3, step = 0.55, Step Down', async () => {
      const el = await fixture('<ef-number-field min="-0.3" step="0.55"></ef-number-field>');
      await expectValues(el, [-0.3, -0.3, -0.3, -0.3, -0.3], DOWN);
    });
    it('min = -0.11, max = 0.45, step = 0.09, Step Up', async () => {
      const el = await fixture('<ef-number-field min="-0.11" max="0.45" step="0.09"></ef-number-field>');
      await expectValues(el, [0.07, 0.16, 0.25, 0.34, 0.43, 0.43], UP);
    });
    it('min = -0.11, max = 0.45, step = 0.09, Step Down', async () => {
      const el = await fixture('<ef-number-field min="-0.11" max="0.45" step="0.09"></ef-number-field>');
      await expectValues(el, [-0.02, -0.11, -0.11, -0.11, -0.11], DOWN);
    });
    it('step = 0.33, value (attribute) = 2, Step Up', async () => {
      const el = await fixture('<ef-number-field step="0.33" value="2"></ef-number-field>');
      el.value = ''; // here to keep base of 2 from value attribute
      await expectValues(el, [0.02, 0.35, 0.68, 1.01, 1.34], UP);
    });
    it('step = 0.33, value (attribute) = 2, Step Down', async () => {
      const el = await fixture('<ef-number-field step="0.33" value="2"></ef-number-field>');
      el.value = ''; // here to keep base of 2 from value attribute
      await expectValues(el, [-0.31, -0.64, -0.97, -1.3, -1.63], DOWN);
    });
  });

  describe('Invalid Values', () => {
    it('Invalid characters', async () => {
      const el = await fixture('<ef-number-field min="a" max="b" step="d"></ef-number-field>');
      await expectValues(el, [1, 2], UP);
    });
    it('Infinity should be covered', async () => {
      const el = await fixture('<ef-number-field min="Infinity" max="Infinity" step="Infinity"></ef-number-field>');
      await expectValues(el, [1, 2], UP);
    });
    it('Any step must never fail on validation', async () => {
      const el = await fixture('<ef-number-field step="any"></ef-number-field>');
      el.value = '0.1';
      expect(el.checkValidity()).to.be.equal(true);
      el.step = '';
      await elementUpdated(el);
      expect(el.checkValidity()).to.be.equal(false);
    });
    it('When min > max do nothing', async () => {
      const el = await fixture('<ef-number-field min="5" max="1" value="3"></ef-number-field>');
      el.stepUp();
      await elementUpdated(el);
      expect(el.value).to.be.equal('3');
      el.stepUp();
      await elementUpdated(el);
      expect(el.value).to.be.equal('3');
    });
  });

  describe('Step Factor', () => {
    it('factor="2", Step Up', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      await expectValues(el, [2, 4, 6, 8, 10], UP, 2);
    });
    it('factor="2", Step Down', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      await expectValues(el, [-2, -4, -6, -8, -10], DOWN, 2);
    });
    it('factor="1.5", Step Up', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      await expectValues(el, [1, 2, 3, 4, 5], UP, 1.5);
    });
    it('factor="1.5", Step Down', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      await expectValues(el, [-1, -2, -3, -4, -5], DOWN, 1.5);
    });
    it('factor="-1.5", Step Up', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      await expectValues(el, [-1, -2, -3, -4, -5], UP, -1.5);
    });
  });
});
