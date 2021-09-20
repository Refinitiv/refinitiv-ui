import { fixture, expect, html, elementUpdated } from '@refinitiv-ui/test-helpers';
import { convertToCompactNotation } from '../../../lib/counter/utils';

// import element and theme
import '@refinitiv-ui/elements/counter';
import '@refinitiv-ui/elemental-theme/light/ef-counter';

describe('counter/Counter', () => {
  it('Should have correct default Shadow DOM structure', async () => {
    const el = await fixture(html`<ef-counter></ef-counter>`);
    expect(el).shadowDom.to.equalSnapshot();
  });

  describe('Value attributes and properties', () => {
    
    it('Should display 0 and return its value as empty string if value is not set', async () => {
      const el = await fixture(html`<ef-counter></ef-counter>`);
      expect(el.value).to.equal('');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("0");
    });

    it('Should display 0 and return its value as empty string if value is invalid', async () => {
      const el = await fixture(html`<ef-counter value="XYZ"></ef-counter>`);
      expect(el.value).to.equal('');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("0");

      el.value = null;
      await elementUpdated(el);
      expect(el.value).to.equal('');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("0");
    });

    it('Should truncate decimal value', async () => {
      const el = await fixture(html`<ef-counter value="25.25"></ef-counter>`);
      expect(el.value).to.equal('25.25');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("25");
    });

    it('Should display 0 and return its value as empty string if value is negative', async () => {
      const el = await fixture(html`<ef-counter value="-10"></ef-counter>`);
      expect(el.value).to.equal('');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("0");
    });

    it('Should display and return its value correctly if value is zero or positive', async () => {
      const el = await fixture(html`<ef-counter value="0"></ef-counter>`);
      expect(el.value).to.equal('0');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("0");
      
      el.value = 10;
      await elementUpdated(el);
      expect(el.value).to.equal('10');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("10");
    });    
  });

  describe('Max attributes and properties', () => {
    it('Should display correctly if max is unset', async () => {
      const el = await fixture(html`<ef-counter value="100"></ef-counter>`);
      expect(el.max).to.equal('');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("100");
    });

    it('Should display correctly if max is invalid', async () => {
      const el = await fixture(html`<ef-counter max="ABC" value="100"></ef-counter>`);
      expect(el.max).to.equal('');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("100");
    });

    it('Should truncate decimal for max value', async () => {
      const el = await fixture(html`<ef-counter max="199.9" value="200"></ef-counter>`);
      expect(el.max).to.equal('199.9');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("199+");
    });

    it('Should display correctly if max is negative', async () => {
      const el = await fixture(html`<ef-counter max="-100" value="200"></ef-counter>`);
      expect(el.max).to.equal('');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("200");
    });

    describe('Should display correctly if max is positive', () => {
      it('Value is equal to max', async () => {
        const el = await fixture(html`<ef-counter max="100" value="100"></ef-counter>`);
        expect(el.max).to.equal('100');
        expect(el.value).to.equal('100');
        expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("100");
  
        el.value = 200;
        el.max = 200;
        await elementUpdated(el);
        expect(el.value).to.equal('200');
        expect(el.max).to.equal('200');
        expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("200");
      });
  
      it('Value is less than max', async () => {
        const el = await fixture(html`<ef-counter max="200" value="100"></ef-counter>`);
        expect(el.max).to.equal('200');
        expect(el.value).to.equal('100');
        expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("100");
      });
  
      it('Value is greater than max', async () => {
        const el = await fixture(html`<ef-counter max="100" value="200"></ef-counter>`);
        expect(el.max).to.equal('100');
        expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("100+");
  
        el.max = 150;
        await elementUpdated(el);
        expect(el.max).to.equal('150');
        expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("150+");
      });
    });
  });

  describe('Compact notation', () => {
    it('Should display notation of Thousands correctly', async () => {
      const el = await fixture(html`<ef-counter value="1000"></ef-counter>`);
      expect(el.value).to.equal('1000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("1K");

      el.value = "10000";
      await elementUpdated(el);
      expect(el.value).to.equal('10000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("10K");

      el.value = "100000";
      await elementUpdated(el);
      expect(el.value).to.equal('100000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("100K");
    });

    it('Should display notation of Millions correctly', async () => {
      const el = await fixture(html`<ef-counter value="1000000"></ef-counter>`);
      expect(el.value).to.equal('1000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("1M");

      el.value = "10000000";
      await elementUpdated(el);
      expect(el.value).to.equal('10000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("10M");

      el.value = "100000000";
      await elementUpdated(el);
      expect(el.value).to.equal('100000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("100M");
    });

    it('Should display notation of Billions correctly', async () => {
      const el = await fixture(html`<ef-counter value="1000000000"></ef-counter>`);
      expect(el.value).to.equal('1000000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("1B");

      el.value = "10000000000";
      await elementUpdated(el);
      expect(el.value).to.equal('10000000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("10B");

      el.value = "100000000000";
      await elementUpdated(el);
      expect(el.value).to.equal('100000000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("100B");
    });

    it('Should display notation of Trillions correctly', async () => {
      const el = await fixture(html`<ef-counter value="1000000000000"></ef-counter>`);
      expect(el.value).to.equal('1000000000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("1T");

      el.value = "10000000000000";
      await elementUpdated(el);
      expect(el.value).to.equal('10000000000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("10T");

      el.value = "100000000000000";
      await elementUpdated(el);
      expect(el.value).to.equal('100000000000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("100T");
    });
  });

  describe('Compact notation when max is set', () => {
    it('Should display notation of Thousands correctly', async () => {
      const el = await fixture(html`<ef-counter max="1000" value="1500"></ef-counter>`);
      expect(el.value).to.equal('1500');
      expect(el.max).to.equal('1000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("1K+");

      el.value = "15000";
      el.max = "10000";
      await elementUpdated(el);
      expect(el.value).to.equal('15000');
      expect(el.max).to.equal('10000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("10K+");

      el.value = "150000";
      el.max = "100000";
      await elementUpdated(el);
      expect(el.value).to.equal('150000');
      expect(el.max).to.equal('100000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("100K+");
    });

    it('Should display notation of Millions correctly', async () => {
      const el = await fixture(html`<ef-counter max="1000000" value="1500000"></ef-counter>`);
      expect(el.value).to.equal('1500000');
      expect(el.max).to.equal('1000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("1M+");

      el.value = "15000000";
      el.max = "10000000";
      await elementUpdated(el);
      expect(el.value).to.equal('15000000');
      expect(el.max).to.equal('10000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("10M+");

      el.value = "150000000"
      el.max = "100000000"
      await elementUpdated(el);
      expect(el.value).to.equal('150000000');
      expect(el.max).to.equal('100000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("100M+");
    });

    it('Should display notation of Billions correctly', async () => {
      const el = await fixture(html`<ef-counter max="1000000000" value="1500000000"></ef-counter>`);
      expect(el.value).to.equal('1500000000');
      expect(el.max).to.equal('1000000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("1B+");

      el.value = "15000000000";
      el.max = "10000000000";
      await elementUpdated(el);
      expect(el.value).to.equal('15000000000');
      expect(el.max).to.equal('10000000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("10B+");

      el.value = "150000000000";
      el.max = "100000000000";
      await elementUpdated(el);
      expect(el.value).to.equal('150000000000');
      expect(el.max).to.equal('100000000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("100B+");
    });

    it('Should display notation of Trillions correctly', async () => {
      const el = await fixture(html`<ef-counter max="1000000000000" value="1500000000000"></ef-counter>`);
      expect(el.value).to.equal('1500000000000');
      expect(el.max).to.equal('1000000000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("1T+");

      el.value = "15000000000000";
      el.max = "10000000000000";
      await elementUpdated(el);
      expect(el.value).to.equal('15000000000000');
      expect(el.max).to.equal('10000000000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("10T+");

      el.value = "150000000000000";
      el.max = "100000000000000";
      await elementUpdated(el);
      expect(el.value).to.equal('150000000000000');
      expect(el.max).to.equal('100000000000000');
      expect(el.shadowRoot.querySelector('[part=number]').textContent.trim()).to.equal("100T+");
    });
  });
});

describe('CompactNotation Util Test', () => {
  it('Should not format value if it is negative', async () => {
    let value = convertToCompactNotation(-100);
    expect(value).to.equal('-100');

    value = convertToCompactNotation(-1000000);
    expect(value).to.equal('-1000000');

    value = convertToCompactNotation(-1000000000);
    expect(value).to.equal('-1000000000');

    value = convertToCompactNotation(-1000000000000);
    expect(value).to.equal('-1000000000000');    
  });

  describe('Should format value correctly if it is positive', () => {
      it('Value less than 1K', async () => {
        let value = convertToCompactNotation(100);
        expect(value).to.equal('100');

        value = convertToCompactNotation(999);
        expect(value).to.equal('999');
      });

      it('Value equal or greater than 1K but less than 10K', async () => {
        let value = convertToCompactNotation(1000);
        expect(value).to.equal('1K');

        value = convertToCompactNotation(1099);
        expect(value).to.equal('1K');

        value = convertToCompactNotation(9999);
        expect(value).to.equal('9.9K');
      });

      it('Value equal or greater than 10K but less than 100K', async () => {
        let value = convertToCompactNotation(10000);
        expect(value).to.equal('10K');

        value = convertToCompactNotation(10050);
        expect(value).to.equal('10K');

        value = convertToCompactNotation(99999);
        expect(value).to.equal('99K');
      });
      
      it('Value equal or greater than 100K but less than 1M', async () => {
        let value = convertToCompactNotation(100000);
        expect(value).to.equal('100K');

        value = convertToCompactNotation(100500);
        expect(value).to.equal('100K');

        value = convertToCompactNotation(999999);
        expect(value).to.equal('999K');
      });

      it('Value equal or greater than 1M but less than 10M', async () => {
        let value = convertToCompactNotation(1000000);
        expect(value).to.equal('1M');

        value = convertToCompactNotation(1099000);
        expect(value).to.equal('1M');

        value = convertToCompactNotation(9999999);
        expect(value).to.equal('9.9M');
      });

      it('Value equal or greater than 10M but less than 100M', async () => {
        let value = convertToCompactNotation(10000000);
        expect(value).to.equal('10M');

        value = convertToCompactNotation(10050000);
        expect(value).to.equal('10M');

        value = convertToCompactNotation(99999999);
        expect(value).to.equal('99M');
      });

      it('Value equal or greater than 100M but less than 1B', async () => {
        let value = convertToCompactNotation(100000000);
        expect(value).to.equal('100M');

        value = convertToCompactNotation(100500000);
        expect(value).to.equal('100M');

        value = convertToCompactNotation(999999999);
        expect(value).to.equal('999M');
      });

      it('Value equal or greater than 1B but less than 10B', async () => {
        let value = convertToCompactNotation(1000000000);
        expect(value).to.equal('1B');

        value = convertToCompactNotation(1099000000);
        expect(value).to.equal('1B');

        value = convertToCompactNotation(9999999999);
        expect(value).to.equal('9.9B');
      });

      it('Value equal or greater than 10B but less than 100B', async () => {
        let value = convertToCompactNotation(10000000000);
        expect(value).to.equal('10B');

        value = convertToCompactNotation(10050000000);
        expect(value).to.equal('10B');

        value = convertToCompactNotation(99999999999);
        expect(value).to.equal('99B');
      });

      it('Value equal or greater than 100B but less than 1T', async () => {
        let value = convertToCompactNotation(100000000000);
        expect(value).to.equal('100B');

        value = convertToCompactNotation(100500000000);
        expect(value).to.equal('100B');

        value = convertToCompactNotation(999999999999);
        expect(value).to.equal('999B');
      });

      it('Value equal or greater than 1T but less than 10T', async () => {
        let value = convertToCompactNotation(1000000000000);
        expect(value).to.equal('1T');

        value = convertToCompactNotation(1099000000000);
        expect(value).to.equal('1T');

        value = convertToCompactNotation(9999999999999);
        expect(value).to.equal('9.9T');
      });

      it('Value equal or greater than 10T but less than 100T', async () => {
        let value = convertToCompactNotation(10000000000000);
        expect(value).to.equal('10T');

        value = convertToCompactNotation(10050000000000);
        expect(value).to.equal('10T');

        value = convertToCompactNotation(99999999999999);
        expect(value).to.equal('99T');
      });

      it('Value equal or greater than 100T', async () => {
        let value = convertToCompactNotation(100000000000000);
        expect(value).to.equal('100T');

        value = convertToCompactNotation(100500000000000);
        expect(value).to.equal('100T');

        value = convertToCompactNotation(999999999999999);
        expect(value).to.equal('999T');
      });
  });
});

