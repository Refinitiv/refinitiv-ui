import { fixture, elementUpdated, expect } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/icon';
import '@refinitiv-ui/elemental-theme/light/ef-icon.js';
import { preload } from '@refinitiv-ui/elements/icon';

import {
  generateUniqueName,
  iconName,
  tickSvg,
  checkRequestedUrl,
  createFakeResponse,
  responseConfigSuccess,
  responseConfigError,
  isEqualSvg
} from './helpers/helpers.js';
import sinon from 'sinon';

describe('icon/Icon', () => {
  let fetch;
  beforeEach(() => {
    fetch = sinon.stub(window, 'fetch');
  });
  afterEach(() => {
    window.fetch.restore();  //remove stub
  });
  describe('Should Have Correct DOM Structure', () => {
    it('without icon attribute', async () => {
      const el = await fixture('<ef-icon></ef-icon>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'No SVG element should not exist if there is nothing to load');
    });

    it('with valid icon attribute', async () => {
      createFakeResponse(tickSvg, responseConfigSuccess);
      const el = await fixture(`<ef-icon icon="${iconName}"></ef-icon>`);
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.not.equal(null, 'SVG element should exist for valid icon attribute');
      expect(isEqualSvg(svg.outerHTML, tickSvg)).to.equal(true, 'Should render SVG, from the server response');
    });

    it('with invalid icon attribute', async () => {
      createFakeResponse('', responseConfigError);
      const el = await fixture('<ef-icon icon="invalid"></ef-icon>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for invalid icon attribute');
    });

    it('with empty icon attribute', async () => {
      createFakeResponse('', responseConfigError);
      const el = await fixture('<ef-icon icon=""></ef-icon>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for empty icon attribute');
    });

    it('with valid icon attribute to invalid one', async function () {
      createFakeResponse(tickSvg, responseConfigSuccess);
      const el = await fixture(`<ef-icon icon="${iconName}"></ef-icon>`);
      let svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.not.equal(null, 'SVG element should exist for valid icon attribute');
      expect(isEqualSvg(svg.outerHTML, tickSvg)).to.equal(true, 'Should render SVG, from the server response');

      el.setAttribute('icon', 'invalid');
      await elementUpdated(el);
      svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for invalid icon attribute');
    });

    it('with unsafe nodes in response', async () => {
      createFakeResponse('<script></script>', responseConfigSuccess);
      const el = await fixture('<ef-icon icon="malicious"></ef-icon>');
      const script = el.shadowRoot.querySelector('script');

      expect(script).to.equal(null, 'should strip unsafe nodes');
    });
  });

  describe('Should Have Correct Properties', () => {
    it('icon', async () => {
      createFakeResponse(tickSvg, responseConfigSuccess);
      const el = await fixture('<ef-icon></ef-icon>');

      expect(el.hasAttribute('icon')).to.equal(false, 'Icon should not have the icon attribute by default');
      expect(el.icon).to.equal(null, 'Icon should not have the icon property by default');

      el.setAttribute('icon', iconName);
      await elementUpdated(el);

      expect(el.hasAttribute('icon')).to.equal(true, 'Icon should have the icon attribute when set');
      expect(el.getAttribute('icon')).to.equal(iconName, 'Icon should have the same icon attribute as was set');
      expect(el.icon).to.equal(iconName, 'Icon should reflect the icon attribute to property');

      el.removeAttribute('icon');
      await elementUpdated(el);

      expect(el.hasAttribute('icon')).to.equal(false, 'Icon should not have the icon attribute after it was removed');
      expect(el.icon).to.equal(null, 'Icon should not have the icon property after attribute was removed');

      el.icon = iconName;
      await elementUpdated(el);

      expect(el.getAttribute('icon')).to.equal(iconName, 'Icon should reflect the icon attribute to property');

      el.icon = '';
      await elementUpdated(el);

      expect(el.getAttribute('icon')).to.equal('', 'Icon attribute should be empty (boolean state)');

      el.icon = null;
      await elementUpdated(el);

      expect(el.hasAttribute('icon')).to.equal(false, 'Attribute should be removed when null is passed');
    });
  });

  describe('Functional Tests', () => {
    it('should make a correct server request based on cdn prefix and the icon if icon is specified', async () => {
      createFakeResponse(tickSvg, responseConfigSuccess);
      const uniqueIconName = generateUniqueName(iconName); // to avoid caching
      const el = await fixture(`<ef-icon icon="${uniqueIconName}"></ef-icon>`);
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDN prefix should exist to create the src based on the icon').to.exist;
      const expectedSrc = `${CDNPrefix}${uniqueIconName}.svg`;

      expect(fetch.callCount).to.equal(1, 'Should make one request');
      expect(checkRequestedUrl(fetch.args, expectedSrc)).to.equal(true, `requested URL should be ${expectedSrc} for the icon ${uniqueIconName}`);
    });

    it('should preload icons', async () => {
      const el = await fixture('<ef-icon></ef-icon>');
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDN prefix should exist in order for preload to work properly with icon name').to.exist;
      expect(fetch.callCount).to.equal(0, 'No request should be sent for empty icon');

      const uniqueValidIcon = generateUniqueName(iconName);
      const uniqueInvalidIcon = generateUniqueName(iconName);

      const uniqueValidIconSrc = `${CDNPrefix}${uniqueValidIcon}.svg`;
      const uniqueInvalidIconSrc = `${CDNPrefix}${uniqueInvalidIcon}.svg`;

      createFakeResponse(tickSvg, responseConfigSuccess);
      let preloadedIcons = await Promise.all(
        preload(uniqueValidIcon)
      );
      createFakeResponse('', responseConfigError);
      preloadedIcons = [...preloadedIcons, ...await Promise.all(
        preload(uniqueInvalidIcon)
      )];


      expect(fetch.callCount).to.equal(2, 'Server requests for all preloaded icons should be made');
      expect(checkRequestedUrl(fetch.args, uniqueValidIconSrc)).to.equal(true, 'should request icons by name with CDN prefix');
      expect(checkRequestedUrl(fetch.args, uniqueInvalidIconSrc)).to.equal(true, 'should try to request invalid icon');
      expect(preloadedIcons[0].length > 0).to.equal(true, 'Should successfully preload icon by name with CDN prefix');
      expect(preloadedIcons[1], 'Should not preload invalid icon').to.be.undefined;
      el.setAttribute('icon', uniqueValidIcon);
      await elementUpdated(el);

      expect(fetch.callCount).to.equal(2, 'no new requests should be made since icons are already preloaded');
    });
  });
});

