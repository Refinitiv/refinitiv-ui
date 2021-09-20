import { fixture, expect, nextFrame } from '@refinitiv-ui/test-helpers';
import { LangAttributeObserver } from '../lib/index';

describe('Lang attribute observer', () => {
  it('Public API are present', async () => {
    const documentElement = document.documentElement;
    expect(LangAttributeObserver.observe).to.exist;
    expect(LangAttributeObserver.disconnect).to.exist;
    expect(LangAttributeObserver.documentLang).to.exist;

    documentElement.lang = 'en';
    expect(LangAttributeObserver.documentLang).to.be.equal(documentElement.lang, 'documentLang getter does not get the value');
  });

  it('Can observe and stop observing lang changes', async () => {
    const el = await fixture('<div></div>');
    const documentElement = document.documentElement;

    let count = 0;
    LangAttributeObserver.observe(el, () => {
      count += 1;
    });

    el.lang = 'en';
    await nextFrame();
    expect(count).to.equal(1, 'lang change from "" to "en" should dispatch callback');

    el.setAttribute('lang', 'ru');
    await nextFrame();
    expect(count).to.equal(2, 'setAttribute lang should dispatch callback');

    el.lang = '';
    await nextFrame();
    expect(count).to.equal(3, 'Setting lang to "" should dispatch callback');

    documentElement.lang = 'en';
    await nextFrame();
    expect(count).to.equal(4, 'Changing document lang should dispatch callback');

    el.lang = 'ru'; // count = 5
    documentElement.lang = 'it'; // count must stay as 5
    await nextFrame();
    expect(count).to.equal(5, 'If element lang is set, changing document land should not call a callback');

    LangAttributeObserver.disconnect(el);
    documentElement.lang = 'lv';
    expect(count).to.equal(5, 'If an element is disconnected the callback should not be called');
  });

  it('Ensure that the same element cannot be observed twice', async () => {
    const el = await fixture('<div></div>');
    let firstObserver = false;
    let secondObserver = false;

    LangAttributeObserver.observe(el, () => {
      firstObserver = true;
    });

    LangAttributeObserver.observe(el, () => {
      secondObserver = true;
    });

    el.lang = 'en';
    await nextFrame();
    expect(firstObserver).to.equal(false, 'First observer callback should not execute');
    expect(secondObserver).to.equal(true, 'Second observer should execute');

    LangAttributeObserver.disconnect(el);
  });
});
