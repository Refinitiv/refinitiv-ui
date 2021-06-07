import { fixture, expect, oneEvent, elementUpdated } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/tornado-chart';
import '@refinitiv-ui/elemental-theme/light/ef-tornado-chart.js';

describe('TornadoChart', () => {

  describe('Snapshots', () => {
    it('DOM structure is correct', async () => {
      const el = await fixture('<ef-tornado-chart primary="7+ hours" secondary="less than 7 hours"></ef-tornado-chart>');
      expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Labels', () => {
    let element;

    const PRIMARY_LABEL = 'I am primary label';
    const SECONDARY_LABEL = 'I am secondary label';

    beforeEach(async () =>{
      element = await fixture(`<ef-tornado-chart primary="${PRIMARY_LABEL}" secondary="${SECONDARY_LABEL}"></ef-tornado-chart>`);
    });

    it('Should display primary label correctly', () => {
      expect(element.primary).to.equal(PRIMARY_LABEL);
    });
    it('Should display secondary label correctly', () => {
      expect(element.secondary).to.equal(SECONDARY_LABEL);
    });
  });

  describe('Responsive', () => {
    it('Should not have vertical attribute on legend part when in default mode', async () => {
      const element = await fixture(`
        <ef-tornado-chart primary="Primary Text" secondary="Secondary Text">
        </ef-tornado-chart>`
      );
      const legend = element.shadowRoot.querySelector('[part="legend"]');
      expect(legend.getAttribute('vertical')).to.equal(null);
    });
    it('Should add vertical attribute to legend when it is in responsive mode', async () => {
      const element = await fixture(`
        <ef-tornado-chart style="width: 200px;">
        </ef-tornado-chart>`
      );

      const legend = element.shadowRoot.querySelector('[part="legend"]');

      await oneEvent(element, 'resize');
      await elementUpdated();

      expect(legend.hasAttribute('vertical')).to.equal(true);
    });

    it('Should add vertical attribute to ef-tornado-item when it is in responsive mode', async () => {
      const element = await fixture(`
        <ef-tornado-chart style="width: 200px;">
          <ef-tornado-item primary-value="35" primary-label="35%" secondary-value="65" secondary-label="65%">China</ef-tornado-item>
          <ef-tornado-item primary-value="28" primary-label="28%" secondary-value="72" secondary-label="72%">Singapore</ef-tornado-item>
        </ef-tornado-chart>`
      );

      await oneEvent(element, 'resize');
      await elementUpdated();

      const items = element.querySelectorAll('ef-tornado-item');
      items.forEach((item) => {
        expect(item.hasAttribute('vertical')).to.equal(true);
      });
    });
  });
});

