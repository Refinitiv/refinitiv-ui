import { elementUpdated, expect, fixture, html, nextFrame, oneEvent, isIE } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/multi-input';
import '@refinitiv-ui/elemental-theme/light/ef-multi-input';

import { getData, getNewItem } from './values.mock';

/**
 * Get private search element property
 */
export const getSearchEl = select => select.searchRef.value;

const createBackspaceEvent = () => {
  const event = document.createEvent('Events');
  event.initEvent('keydown', true, true);
  event.keyCode = 8;
  event.which = 8;
  event.charCode = 8;
  event.key = 'Backspace';
  event.code = 'Backspace';
  return event;
};

const createEnterEvent = () => {
  const event = document.createEvent('Events');
  event.initEvent('keydown', true, true);
  event.keyCode = 13;
  event.which = 13;
  event.charCode = 13;
  event.key = 'Enter';
  event.code = 'Enter';
  return event;
};

describe('multi-input/MultiInput', () => {
  let data;
  beforeEach(() => {
    data = getData();
  });

  it('should be created', async () => {
    const el = await fixture(html`<ef-multi-input></ef-multi-input>`);
    expect(el).shadowDom.to.equalSnapshot({ ignoreAttributes: ['class', 'size', 'style'] });
  });

  describe('Test Properties and Attributes', () => {
    it('Should have correct property pillsOnly', async () => {
      const el = await fixture('<ef-multi-input></ef-multi-input>');

      expect(el.pillsOnly).to.equal(false);
      expect(el.getAttribute('pills-only')).to.equal(null, 'attribute "pills-only" should equal null');
      expect(el.hasAttribute('pills-only')).to.equal(false, 'attribute "pills-only" should not be exists');

      el.setAttribute('pills-only', '');
      await elementUpdated(el);

      expect(el.pillsOnly).to.equal(true);
      expect(el.hasAttribute('pills-only')).to.equal(true, 'attribute "pills-only" should be exists');
      expect(el.getAttribute('pills-only')).to.equal('', 'attribute "pills-only" should equal ""');

      el.pillsOnly = false;
      await elementUpdated(el);

      expect(el.pillsOnly).to.equal(false);
      expect(el.getAttribute('pills-only')).to.equal(null, 'property "pillsOnly" should reflected');
      expect(el.hasAttribute('pills-only')).to.equal(false, 'property "pillsOnly" should reflected');
    });

    it('Should have correct property icon', async () => {
      const el = await fixture('<ef-multi-input icon="calendar"></ef-multi-input>');

      expect(el.icon).to.equal('calendar');
      expect(el.hasAttribute('icon')).to.equal(true, 'attribute "icon" should be exists');
      expect(el.getAttribute('icon')).to.equal('calendar', 'attribute "icon" should equal "calendar');

      el.removeAttribute('icon');
      await elementUpdated(el);

      expect(el.icon).to.equal(null);
      expect(el.hasAttribute('icon')).to.equal(false, 'attribute "icon" should not be exists');
      expect(el.getAttribute('icon')).to.equal(null, 'attribute "icon" should equal null');

      el.icon = 'menu';
      await elementUpdated(el);

      expect(el.icon).to.equal('menu');
      expect(el.hasAttribute('icon')).to.equal(false, 'property "icon" should not be reflected');
      expect(el.getAttribute('icon')).to.equal(null, 'property "icon" should not be reflected');
    });

    it('Should have correct property placeholder', async () => {
      const el = await fixture('<ef-multi-input placeholder="Placeholder"></ef-multi-input>');

      expect(el.placeholder).to.equal('Placeholder');
      expect(el.hasAttribute('placeholder')).to.equal(true, 'attribute "placeholder" should be exists');
      expect(el.getAttribute('placeholder')).to.equal('Placeholder', 'attribute "placeholder" should equal "Placeholder');

      el.removeAttribute('placeholder');
      await elementUpdated(el);

      expect(el.placeholder).to.equal(null);
      expect(el.hasAttribute('placeholder')).to.equal(false, 'attribute "placeholder" should not be exists');
      expect(el.getAttribute('placeholder')).to.equal(null, 'attribute "placeholder" should equal null');

      el.placeholder = 'New placeholder';
      await elementUpdated(el);

      expect(el.placeholder).to.equal('New placeholder');
      expect(el.hasAttribute('placeholder')).to.equal(false, 'property "placeholder" should not reflected');
      expect(el.getAttribute('placeholder')).to.equal(null, 'property "placeholder" should not reflected');
    });

    it('Should have correct property error', async () => {
      const el = await fixture('<ef-multi-input></ef-multi-input>');

      expect(el.error).to.equal(false);
      expect(el.getAttribute('error')).to.equal(null, 'attribute "error" should equal null');
      expect(el.hasAttribute('error')).to.equal(false, 'attribute "error" should not be exists');

      el.setAttribute('error', '');
      await elementUpdated(el);

      expect(el.error).to.equal(true);
      expect(el.hasAttribute('error')).to.equal(true, 'attribute "error" should be exists');
      expect(el.getAttribute('error')).to.equal('', 'attribute "error" should equal ""');

      el.error = false;
      await elementUpdated(el);

      expect(el.error).to.equal(false);
      expect(el.getAttribute('error')).to.equal(null, 'property "error" should reflected');
      expect(el.hasAttribute('error')).to.equal(false, 'property "error" should reflected');

    });

    it('Should have correct property warning', async () => {
      const el = await fixture('<ef-multi-input></ef-multi-input>');

      expect(el.warning).to.equal(false);
      expect(el.getAttribute('warning')).to.equal(null, 'attribute "warning" should equal null');
      expect(el.hasAttribute('warning')).to.equal(false, 'attribute "warning" should not be exists');

      el.setAttribute('warning', '');
      await elementUpdated(el);

      expect(el.warning).to.equal(true);
      expect(el.hasAttribute('warning')).to.equal(true, 'attribute "warning" should be exists');
      expect(el.getAttribute('warning')).to.equal('', 'attribute "warning" should equal ""');

      el.warning = false;
      await elementUpdated(el);

      expect(el.warning).to.equal(false);
      expect(el.getAttribute('warning')).to.equal(null, 'property "warning" should reflected');
      expect(el.hasAttribute('warning')).to.equal(false, 'property "warning" should reflected');

    });

    it('Should have correct property maxLength', async () => {
      const el = await fixture('<ef-multi-input maxlength="10"></ef-multi-input>');

      expect(el.maxLength).to.equal(10);
      expect(el.hasAttribute('maxlength')).to.equal(true, 'attribute "maxlength" should be exists');
      expect(el.getAttribute('maxlength')).to.equal('10', 'attribute "maxlength" should equal "10');

      el.removeAttribute('maxlength');
      await elementUpdated(el);

      expect(el.maxLength).to.equal(null);
      expect(el.hasAttribute('maxlength')).to.equal(false, 'attribute "maxlength" should not be exists');
      expect(el.getAttribute('maxlength')).to.equal(null, 'attribute "maxlength" should equal null');

      el.maxLength = 15;
      await elementUpdated(el);

      expect(el.maxLength).to.equal(15);
      expect(el.hasAttribute('maxlength')).to.equal(true, 'property "maxlength" should reflected');
      expect(el.getAttribute('maxlength')).to.equal('15', 'property "maxlength" should reflected');
    });

    it('Should have correct property minLength', async () => {
      const el = await fixture('<ef-multi-input minlength="10"></ef-multi-input>');

      expect(el.minLength).to.equal(10);
      expect(el.hasAttribute('minlength')).to.equal(true, 'attribute "minlength" should be exists');
      expect(el.getAttribute('minlength')).to.equal('10', 'attribute "minlength" should equal "10');

      el.removeAttribute('minlength');
      await elementUpdated(el);

      expect(el.minLength).to.equal(null);
      expect(el.hasAttribute('minlength')).to.equal(false, 'attribute "minlength" should not be exists');
      expect(el.getAttribute('minlength')).to.equal(null, 'attribute "minlength" should equal null');

      el.minLength = 15;
      await elementUpdated(el);

      expect(el.minLength).to.equal(15);
      expect(el.hasAttribute('minlength')).to.equal(true, 'property "minlength" should reflected');
      expect(el.getAttribute('minlength')).to.equal('15', 'property "minlength" should reflected');
    });

    describe('Data Field', async () => {
      it('Test data attribute and reflecting to property', async () => {
        const el = await fixture('<ef-multi-input></ef-multi-input>');
        expect(el.getAttribute('data')).to.equal(null, 'Attribute data should not exists');

        el.setAttribute('data', 'some-super-text');
        await elementUpdated(el);

        expect(el.getAttribute('data')).to.equal('some-super-text');
        expect(el.data).to.be.eql(null, 'Attribute data should not reflect value to property');
      });

      it('Test data property and reflecting to attribute', async () => {
        const el = await fixture('<ef-multi-input></ef-multi-input>');
        expect(el.data).to.eql(null, 'By default data property should be equal []]');

        const data = [{ value: 'value', label: 'label' }];
        el.data = data;

        await elementUpdated(el);

        expect(el.hasAttribute('data')).to.equal(false, 'Property data should not reflect value to attribute');
        expect(el.data).to.eql(data);
      });
    });

    it('Should have correct property value', async () => {
      const el = await fixture('<ef-multi-input></ef-multi-input>');
      const searchEl = el.shadowRoot.querySelector('[part=search]');

      expect(el.value).to.equal('');
      expect(el.getAttribute('value')).to.equal(null, 'attribute "value" should equal empty string');
      expect(el.hasAttribute('value')).to.equal(false, 'attribute "value" should not be exists');

      el.setAttribute('value', '');
      await elementUpdated(el);

      expect(el.value).to.equal('');
      expect(el.hasAttribute('value')).to.equal(true, 'attribute "value" should be exists');
      expect(el.getAttribute('value')).to.equal('', 'attribute "value" should equal ""');

      el.value = 'value';
      await elementUpdated(el);

      expect(el.value).to.equal('value');
      expect(el.getAttribute('value')).to.equal('', 'property "value" should not reflected');
      expect(el.hasAttribute('value')).to.equal(true, 'property "value" should not reflected');

      expect(searchEl.value).to.equal('value');
    });

    describe('Values Property', () => {
      it('Should set values as an attribute', async () => {
        const el = await fixture(html`<ef-multi-input .data="${data}"></ef-multi-input>`);
        await elementUpdated(el);

        expect(el.values).to.eql(data.map(({ value }) => value));
      });

      it('Should set values as a property', async () => {
        const el = await fixture(html`<ef-multi-input></ef-multi-input>`);
        el.data = data;
        await elementUpdated(el);

        expect(el.values).to.eql(data.map(({ value }) => value));
      });
    });
  });

  describe('Methods', async () => {
    describe('Data Initialization', async () => {
      let el;

      beforeEach(async () => {
        el = await fixture(html`<ef-multi-input></ef-multi-input>`);
      });

      it('Test default data', async () => {
        expect(el.data).to.eql(null);
        expect(el.values).to.eql([]);
      });

      it('Test init data with same value', async () => {
        el.data = data;
        expect(el.data).to.equal(data);

        el.data = data;
        expect(el.data).to.equal(data);
      });

      it('Test init data with non array', async () => {
        const data = '123';

        el.data = data;
        expect(el.data).to.equal(data);
        expect(el.values).to.not.eql(data);
        expect(el.values).to.eql([]);
      });
    });
  });

  describe('removeByValue Method', () => {
    it('Should remove the item by value', async () => {
      const el = await fixture(html`<ef-multi-input .data="${data}"></ef-multi-input>`);
      const item = data[1];
      const mData = [...data];
      mData.splice(1, 1);
      const mValues = mData.map(({ value }) => value);
      el.removeByValue(item.value);
      await elementUpdated(el);

      expect(el.values).to.eql(mValues);
    });

    it('Shouldn\'t remove the item by value', async () => {
      const el = await fixture(html`<ef-multi-input .data="${data}"></ef-multi-input>`);
      const mValues = [...data].map(({ value }) => value);

      el.removeByValue('fake-value');
      await elementUpdated(el);

      expect(el.values).to.eql(mValues);
    });
  });

  describe('removeByIndex Method', () => {
    it('Should remove the item by index', async () => {
      const el = await fixture(html`<ef-multi-input .data="${data}"></ef-multi-input>`);
      const item = data[1];
      const mData = [...data];
      mData.splice(1, 1);
      const mValues = mData.map(({ value }) => value);

      const removedItem = el.removeByIndex(1);
      await elementUpdated(el);

      expect(el.values).to.eql(mValues);
      expect(item).to.eql(removedItem);
    });

    it('Shouldn\'t remove the item by index', async () => {
      const el = await fixture(html`<ef-multi-input .data="${data}"></ef-multi-input>`);
      const mValues = [...data].map(({ value }) => value);

      el.removeByIndex(data.length);
      await elementUpdated(el);

      expect(el.values).to.eql(mValues);
    });
  });

  describe('add Method', () => {
    it('Should add the item to values and dispatch events', async () => {
      const newItem = getNewItem();
      const el = await fixture(html`<ef-multi-input .data="${data}"></ef-multi-input>`);
      el.add(newItem);
      await elementUpdated(el);

      const addedValue = el.values[el.values.length - 1];
      expect(addedValue).to.equal(newItem.value);
    });

    it('Shouldn\'t add the item to values and dispatch events', async () => {
      const clonesValues = [...data].map(({ value }) => value);
      const el = await fixture(html`<ef-multi-input .data="${data}"></ef-multi-input>`);

      const fakeItem = { value: 'some value' };
      setTimeout(() => el.add(fakeItem));

      const { detail } = await oneEvent(el, 'item-error');

      expect(detail.item).to.eql(fakeItem);
      expect(detail.items).to.eql(data);

      expect(el.values).to.eql(clonesValues);
    });

    it('Test add item from keyboard', async () => {
      const el = await fixture(html`<ef-multi-input></ef-multi-input>`);
      const searchEl = el.shadowRoot.querySelector('[part=search]');

      const value = 'super data';
      el.value = value;

      await elementUpdated(el);

      expect(searchEl.value).to.equal(value);

      const event = createEnterEvent();

      setTimeout(() => {
        searchEl.dispatchEvent(event);
      });

      const { detail } = await oneEvent(el, 'item-added');

      expect(detail.item.value).to.equal(value);
      expect(detail.item.label).to.equal(value);
      expect(detail.items).to.eql([]);

      expect(el.value).to.equal('');
      expect(el.values.length).to.equal(1);
    });

    it('Test preventing add item from keyboard', async () => {
      const el = await fixture(html`<ef-multi-input></ef-multi-input>`);
      const searchEl = el.shadowRoot.querySelector('[part=search]');

      const value = 'super data';
      el.value = value;

      await elementUpdated(el);

      expect(searchEl.value).to.equal(value);

      const event = createEnterEvent();

      el.addEventListener('item-added', (event) => {
        event.preventDefault();
        return false;
      });

      setTimeout(() => {
        searchEl.dispatchEvent(event);
      });

      const itemAddedEvent = await oneEvent(el, 'item-added');

      expect(itemAddedEvent.detail.item.value).to.equal(value);
      expect(itemAddedEvent.detail.item.label).to.equal(value);
      expect(itemAddedEvent.detail.items).to.eql([]);

      expect(itemAddedEvent.defaultPrevented).to.eql(true);

      expect(el.value).to.equal(value);
      expect(el.values.length).to.equal(0);
    });

    it('Test check item-added event from keyboard with empty value', async () => {
      const el = await fixture(html`<ef-multi-input></ef-multi-input>`);
      const searchEl = el.shadowRoot.querySelector('[part=search]');

      expect(searchEl.value).to.equal('');

      const event = createEnterEvent();

      let fired = false;

      el.addEventListener('item-added', () => {
        fired = true;
      });

      setTimeout(() => {
        searchEl.dispatchEvent(event);
      });

      expect(fired).to.equal(false);
      expect(el.values.length).to.equal(0);
    });
  });

  describe('removeLastItem Method', () => {
    it('Shouldn\'t remove last item', async () => {
      const data = [];
      const el = await fixture(html`<ef-multi-input .data="${data}"></ef-multi-input>`);

      const item = el.removeLastItem();
      await elementUpdated(el);

      expect(item).to.equal(null);
      expect(el.values.length).to.equal(0);
    });

    it('Should remove last item', async () => {
      const el = await fixture(html`<ef-multi-input .data="${data}"></ef-multi-input>`);
      const lastItem = data[data.length - 1];
      const mData = [...data];
      mData.splice(data.length - 1, 1);
      const mValues = mData.map(({ value }) => value);
      const removedItem = el.removeLastItem();

      await elementUpdated(el);

      expect(mValues).to.eql(el.values);
      expect(removedItem).to.eql(lastItem);
    });
  });

  describe('Keyboard Item Removing', () => {
    it('Test remove item from keyboard', async () => {
      const el = await fixture(html`<ef-multi-input .data="${data}"></ef-multi-input>`);
      const searchEl = el.shadowRoot.querySelector('[part=search]');

      const item = data[data.length - 1];
      const length = data.length;

      expect(searchEl.value).to.equal('');

      const event = createBackspaceEvent();

      setTimeout(() => {
        searchEl.dispatchEvent(event);
      });

      const { detail } = await oneEvent(el, 'item-removed');

      await nextFrame();

      expect(detail.item.value).to.equal(item.value);
      expect(detail.item.label).to.equal(item.label);
      expect(detail.items).to.eql(data);

      expect(el.value).to.equal('');
      expect(el.values.length).to.equal(length - 1);
    });

    it('Test preventing remove item from keyboard', async () => {
      const el = await fixture(html`<ef-multi-input .data="${data}"></ef-multi-input>`);
      const searchEl = el.shadowRoot.querySelector('[part=search]');

      const item = data[data.length - 1];
      const length = data.length;

      expect(searchEl.value).to.equal('');

      const event = createBackspaceEvent();

      el.addEventListener('item-removed', (event) => {
        event.preventDefault();
        return false;
      });

      setTimeout(() => {
        searchEl.dispatchEvent(event);
      });

      const itemAddedEvent = await oneEvent(el, 'item-removed');

      expect(itemAddedEvent.detail.item.value).to.equal(item.value);
      expect(itemAddedEvent.detail.item.label).to.equal(item.label);
      expect(itemAddedEvent.detail.items).to.eql(data);

      expect(itemAddedEvent.defaultPrevented).to.eql(true);

      expect(el.value).to.equal('');
      expect(el.values.length).to.equal(length);
    });

    it('Test check item-removed event from keyboard for empty data', async () => {
      const el = await fixture(html`<ef-multi-input></ef-multi-input>`);
      const searchEl = el.shadowRoot.querySelector('[part=search]');

      expect(searchEl.value).to.equal('');
      const event = createBackspaceEvent();

      let fired = false;

      el.addEventListener('item-removed', () => {
        fired = true;
      });

      setTimeout(() => {
        searchEl.dispatchEvent(event);
      });

      await nextFrame();
      await nextFrame();

      expect(fired).to.equal(false);
    });

    it('Test check item-removed event from keyboard for filled value', async () => {
      const el = await fixture(html`<ef-multi-input .data="${data}"></ef-multi-input>`);
      const searchEl = el.shadowRoot.querySelector('[part=search]');

      const value = 'super data';
      el.value = value;

      await elementUpdated(el);

      expect(searchEl.value).to.equal(value);
      const event = createBackspaceEvent();

      let fired = false;

      el.addEventListener('item-removed', () => {
        fired = true;
      });

      setTimeout(() => {
        searchEl.dispatchEvent(event);
      });

      await nextFrame();
      await nextFrame();

      expect(fired).to.equal(false);
    });
  });

  describe('onPillClearsHandler Method', () => {
    it('Should handle pill clear event', async () => {
      const data = getData();
      const el = await fixture(html`<ef-multi-input .data="${data}"></ef-multi-input>`);
      const pill = el.shadowRoot.querySelector('ef-pill');
      setTimeout(() => pill.dispatchEvent(new CustomEvent('clear', { bubbles: true, composed: true })));
      await oneEvent(pill, 'clear');
      await elementUpdated(el);

      expect(el.values.length).to.equal(data.length - 1);
    });
  });

  describe('Selection Range', () => {

    it('Applies selectionStart', async function () {
      if (isIE()) {
        this.skip();
      }
      const el = await fixture('<ef-multi-input value="1234567890abcd"></ef-multi-input>');
      el.focus();
      const selectionStart = 3;
      el.selectionStart = selectionStart;
      await elementUpdated(el);
      expect(getSearchEl(el).selectionStart).to.equal(selectionStart);
      expect(getSearchEl(el).selectionStart).to.equal(el.selectionStart);
    });

    it('Applies selectionEnd', async function () {
      if (isIE()) {
        this.skip();
      }
      const el = await fixture('<ef-multi-input value="1234567890abcd"></ef-multi-input>');
      el.focus();
      const selectionEnd = 5;
      el.selectionEnd = selectionEnd;
      await elementUpdated(el);
      expect(getSearchEl(el).selectionEnd).to.equal(selectionEnd);
      expect(getSearchEl(el).selectionEnd).to.equal(el.selectionEnd);
    });

    it('Applies selectionStart and selectionEnd', async function () {
      if (isIE()) {
        this.skip();
      }
      const el = await fixture('<ef-multi-input value="1234567890abcd"></ef-multi-input>');
      el.focus();
      const selectionStart = 2;
      const selectionEnd = 8;
      el.selectionStart = selectionStart;
      el.selectionEnd = selectionEnd;
      await elementUpdated(el);
      expect(getSearchEl(el).selectionStart).to.equal(selectionStart);
      expect(getSearchEl(el).selectionStart).to.equal(el.selectionStart);
      expect(getSearchEl(el).selectionEnd).to.equal(selectionEnd);
      expect(getSearchEl(el).selectionEnd).to.equal(el.selectionEnd);
    });

    it('Applies selection range using API', async function () {
      if (isIE()) {
        this.skip();
      }
      const el = await fixture('<ef-multi-input value="1234567890abcd"></ef-multi-input>');
      el.focus();
      const selectionStart = 4;
      const selectionEnd = 4;
      el.setSelectionRange(selectionStart, selectionEnd);
      await elementUpdated(el);
      expect(getSearchEl(el).selectionStart).to.equal(el.selectionStart);
      expect(getSearchEl(el).selectionEnd).to.equal(el.selectionEnd);
    });

    it('test select method select all content of text-field', async function () {
      if (isIE()) {
        this.skip();
      }
      const el = await fixture('<ef-multi-input value="1234567890abcd"></ef-multi-input>');
      el.focus();
      el.select();
      await elementUpdated(el);
      expect(getSearchEl(el).selectionStart).to.equal(el.selectionStart);
      expect(getSearchEl(el).selectionEnd).to.equal(el.selectionEnd);
    });
  });

  describe('Input Validation', () => {
    it('validation minlength when via value', async () => {
      const el = await fixture('<ef-multi-input minlength="5"></ef-multi-input>');
      el.value = '123';
      await elementUpdated(el);
      expect(el.error).to.equal(true);

      el.value = '123456';
      await elementUpdated(el);
      expect(el.error).to.equal(false);
    });
    it('validation maxlength when via value', async () => {
      const el = await fixture('<ef-multi-input maxlength="10"></ef-multi-input>');
      const value = '123';
      el.value = value; // value valid
      await elementUpdated(el);
      expect(el.value).to.equal(value);

      el.value = '1234567891012345678910'; // value invalid  when value more than maxlength
      await elementUpdated(el);
      expect(el.value).to.equal(value); // reset to old value;


      el.value = '123456789'; // value valid
      await elementUpdated(el);
      expect(el.value).to.equal('123456789');
    });
  });
});
