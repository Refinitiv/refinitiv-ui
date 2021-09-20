import { isIE, fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/tornado-chart';
import '@refinitiv-ui/elemental-theme/light/ef-tornado-chart.js';

describe('tornado-chart/TornadoChartItem', () => {
  describe('TornadoItem', () => {
    describe('Snapshots', () => {
      const IGNORE = {
        ignoreAttributes: [
          { tags: ['ef-progress-bar'], attributes: ['class'] },
          { tags: ['ef-layout'], attributes: ['class', 'style'] }
        ]
      };

      it('DOM structure is correct', async () => {
        const el = await fixture('<ef-tornado-item></ef-tornado-item>');

        if(isIE()) {
          expect(el).shadowDom.to.equalSnapshot(IGNORE);
        }
        else {
          expect(el).shadowDom.to.equalSnapshot({
            ignoreAttributes: [{
              tags: ['ef-layout'], attributes: ['style']
            }]
          });
        }
      });
      it('DOM structure with vertical property is correct', async () => {
        const el = await fixture('<ef-tornado-item vertical></ef-tornado-item>');
        if(isIE()) {
          expect(el).shadowDom.to.equalSnapshot(IGNORE);
        }
        else {
          expect(el).shadowDom.to.equalSnapshot({
            ignoreAttributes: [{
              tags: ['ef-layout'], attributes: ['style']
            }]
          });
        }
      });
      it('DOM structure with values and labels is correct', async () => {
        const el = await fixture(`
      <ef-tornado-item
        primary-value="5"
        primary-label="5%"
        secondary-value="95"
        secondary-label="95%"
      >
        Finland
      </ef-tornado-item>`);
        if(isIE()) {
          expect(el).shadowDom.to.equalSnapshot(IGNORE);
        }
        else {
          expect(el).shadowDom.to.equalSnapshot({
            ignoreAttributes: [{
              tags: ['ef-layout'], attributes: ['style']
            }]
          });
        }
      });
      it('DOM structure with values, labels and highlighted state is correct', async () => {
        const el = await fixture(`
      <ef-tornado-item
        primary-value="5"
        primary-label="5%"
        secondary-value="95"
        secondary-label="95%"
        highlighted
      >
        Finland
      </ef-tornado-item>`);
        if(isIE()) {
          expect(el).shadowDom.to.equalSnapshot(IGNORE);
        }
        else {
          expect(el).shadowDom.to.equalSnapshot({
            ignoreAttributes: [{
              tags: ['ef-layout'], attributes: ['style']
            }]
          });
        }
      });
    });

    describe('Vertical mode', () => {
      let el;

      beforeEach(async () => {
        el = await fixture('<ef-tornado-item></ef-tornado-item>');
      });

      it('Should set bar alignment property correctly in default mode', async () => {
        el.vertical = false;

        await elementUpdated();

        const container = el.shadowRoot.querySelector('[part="container"]');
        const primaryBar = el.shadowRoot.querySelector('[part="primary-bar"]');
        const secondaryBar = el.shadowRoot.querySelector('[part="secondary-bar"]');

        expect(container.container).to.equal(false);
        expect(primaryBar.alignment).to.equal('right');
        expect(secondaryBar.alignment).to.equal('left');
      });
      it('Should set sppahire-bar alignment property correctly in vertical mode', async () => {
        el.vertical = true;

        await elementUpdated();

        const container = el.shadowRoot.querySelector('[part="container"]');
        const primaryBar = el.shadowRoot.querySelector('[part="primary-bar"]');
        const secondaryBar = el.shadowRoot.querySelector('[part="secondary-bar"]');

        expect(container.container).to.equal(true);
        expect(primaryBar.alignment).to.equal('left');
        expect(secondaryBar.alignment).to.equal('left');
      });
    });
  });
});
