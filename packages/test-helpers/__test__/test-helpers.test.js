import { fixture, expect, keyboardEvent, oneEvent } from '../lib/test-helpers';

describe('TestHelpersTest', () => {

  let el;

  beforeEach(async () => {
    el = await fixture('<div></div>');
  });

  describe('Test KeyboardEvent helper', () => {

    it('Create KeyboardEvent correctly', async () => {
      const type = 'keydown';
      const key = 'Space';
      setTimeout(() => el.dispatchEvent(keyboardEvent(type, { key: key })));
      const event = await oneEvent(el, type);
      expect(event.key).to.equal(key, 'keyboard event property "key" should be set to "Space"');
    });

    it('KeyboardEvent has default properties', async () => {
      const type = 'keydown';
      setTimeout(() => el.dispatchEvent(keyboardEvent(type)));
      const event = await oneEvent(el, type);
      expect(event.key).to.equal('', 'keyboard event property "key" the default value should be set to ""');
      expect(event.shiftKey).to.equal(false, 'keyboard event property "shiftKey" the default value should be set to false');
      expect(event.altKey).to.equal(false, 'keyboard event property "altKey" the default value should be set to false');
      expect(event.ctrlKey).to.equal(false, 'keyboard event property "ctrlKey" the default value should be set to false');
      expect(event.metaKey).to.equal(false, 'keyboard event property "metaKey" the default value should be set to false');
    });

    it('Set KeyboardEvent properties value correctly', async () => {
      const type = 'keyup';
      const initValues = {
        key: 'C',
        shiftKey: true,
        altKey: false,
        ctrlKey: true,
        metaKey: false
      };
      setTimeout(() => el.dispatchEvent(keyboardEvent(type, initValues)));
      const event = await oneEvent(el, type);
      expect(event.key).to.equal(initValues.key, 'keyboard event property "key" should be set to "C"');
      expect(event.shiftKey).to.equal(initValues.shiftKey, 'keyboard event property "shiftKey" should be set to true');
      expect(event.altKey).to.equal(initValues.altKey, 'keyboard event property "altKey" should be set to false');
      expect(event.ctrlKey).to.equal(initValues.ctrlKey, 'keyboard event property "ctrlKey" should be set to true');
      expect(event.metaKey).to.equal(initValues.metaKey, 'keyboard event property "metaKey" should be set to false');
    });
  });

});
