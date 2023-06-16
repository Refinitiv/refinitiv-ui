import { fixture, elementUpdated, expect } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/configuration';
import '@refinitiv-ui/elements/icon';
import '@refinitiv-ui/elemental-theme/light/ef-icon.js';
import { preload } from '@refinitiv-ui/elements/icon';

import {
  createMockSrc,
  generateUniqueName,
  iconName,
  tickSvg,
  tickSvgBase64,
  checkRequestedUrl,
  createFakeResponse,
  responseConfigSuccess,
  responseConfigError,
  isEqualSvg
} from './helpers/helpers.js';
import sinon from 'sinon';

describe('icon/Icon', () => {
  describe('Should have correct result with CDN resource', () => {
    let fetch;
    beforeEach(() => {
      fetch = sinon.stub(window, 'fetch');
    });
    afterEach(() => {
      window.fetch.restore();  //remove stub
    });
    describe('Should Have Correct DOM Structure', () => {
      it('Without icon attribute', async () => {
        const el = await fixture('<ef-icon></ef-icon>');
        const svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.equal(null, 'No SVG element should not exist if there is nothing to load');
      });

      it('With valid icon attribute', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await fixture(`<ef-icon icon="${iconName}"></ef-icon>`);
        const svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.not.equal(null, 'SVG element should exist for valid icon attribute');
        expect(isEqualSvg(svg.outerHTML, tickSvg)).to.equal(true, 'Should render SVG, from the server response');
      });

      it('With invalid icon attribute', async () => {
        createFakeResponse('', responseConfigError);
        const el = await fixture('<ef-icon icon="invalid"></ef-icon>');
        const svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.equal(null, 'SVG element should not exist for invalid icon attribute');
      });

      it('With empty icon attribute', async () => {
        createFakeResponse('', responseConfigError);
        const el = await fixture('<ef-icon icon=""></ef-icon>');
        const svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.equal(null, 'SVG element should not exist for empty icon attribute');
      });

      it('With unsafe nodes in response', async () => {
        createFakeResponse('<script></script>', responseConfigSuccess);
        const el = await fixture('<ef-icon icon="malicious"></ef-icon>');
        const script = el.shadowRoot.querySelector('script');

        expect(script).to.equal(null, 'should strip unsafe nodes');
      });

      it('With valid icon attribute to invalid one', async function () {
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
      it('Should support src link in icon attribute', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const srcValue = createMockSrc(iconName);
        const el = await fixture(`<ef-icon icon="${srcValue}"></ef-icon>`);
        const svg = el.shadowRoot.querySelector('svg');

        expect(isEqualSvg(svg.outerHTML, tickSvg)).to.equal(true, 'Should render SVG, from the server response');
      });

      it('Should support src link in icon property', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await fixture(`<ef-icon></ef-icon>`);
        el.icon = createMockSrc(iconName);

        await elementUpdated(el);
        const svg = el.shadowRoot.querySelector('svg');

        expect(isEqualSvg(svg.outerHTML, tickSvg)).to.equal(true, 'Should render SVG, from the server response');
      });

      it('Should cdn prefix exist', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const uniqueIconName = generateUniqueName(iconName); // to avoid caching
        const el = await fixture(`<ef-icon icon="${uniqueIconName}"></ef-icon>`);
        const CDNPrefix = el.getComputedVariable('--cdn-prefix');

        expect(CDNPrefix, 'CDN prefix should exist to create the src based on the icon').to.exist;
      });

      it('Should not make request for empty icon', async () => {
        await fixture('<ef-icon></ef-icon>');
        expect(fetch.callCount).to.equal(0, 'No request should be sent for empty icon');
      });

      it('Should make a correct server request based on cdn prefix and the icon if icon is specified', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const uniqueIconName = generateUniqueName(iconName); // to avoid caching
        const el = await fixture(`<ef-icon icon="${uniqueIconName}"></ef-icon>`);
        const CDNPrefix = el.getComputedVariable('--cdn-prefix');
        const expectedSrc = `${CDNPrefix}${uniqueIconName}.svg`;

        expect(fetch.callCount).to.equal(1, 'Should make one request');
        expect(checkRequestedUrl(fetch.args, expectedSrc)).to.equal(true, `Requested URL should be ${expectedSrc} for the icon ${uniqueIconName}`);
      });

      it('Should preload single icon', async () => {
        const el = await fixture('<ef-icon></ef-icon>');
        const CDNPrefix = el.getComputedVariable('--cdn-prefix');
        const uniqueIconName = generateUniqueName(iconName);
        const uniqueIconSrc = `${CDNPrefix}${uniqueIconName}.svg`;

        createFakeResponse(tickSvg, responseConfigSuccess);
        let preloadedIcons = await Promise.all(
          preload(uniqueIconName)
        );

        expect(fetch.callCount).to.equal(1, 'Server requests for preloaded icon should be made');
        expect(checkRequestedUrl(fetch.args, uniqueIconSrc)).to.equal(true, 'Should request first icon by name with CDN prefix');
        expect(preloadedIcons[0].length > 0).to.equal(true, 'Should successfully preload icon by name with CDN prefix');

        el.setAttribute('icon', uniqueIconName);
        await elementUpdated(el);

        expect(fetch.callCount).to.equal(1, 'No new requests should be made since icon is already preloaded');
      });

      it('Should preload multiple icons', async () => {
        const el1 = await fixture('<ef-icon></ef-icon>');
        const el2 = await fixture('<ef-icon></ef-icon>');
        const CDNPrefix = el1.getComputedVariable('--cdn-prefix');
        const firstUniqueIconName = generateUniqueName(iconName);
        const secondUniqueIconName = generateUniqueName(iconName);
        const firstUniqueIconSrc = `${CDNPrefix}${firstUniqueIconName}.svg`;
        const secondUniqueIconSrc = `${CDNPrefix}${secondUniqueIconName}.svg`;

        createFakeResponse(tickSvg, responseConfigSuccess);
        let preloadedIcons = await Promise.all(
          preload(firstUniqueIconName, secondUniqueIconName)
        );

        expect(fetch.callCount).to.equal(2, 'Server requests for all preloaded icons should be made');
        expect(checkRequestedUrl(fetch.args, firstUniqueIconSrc)).to.equal(true, 'Should request first icon by name with CDN prefix');
        expect(checkRequestedUrl(fetch.args, secondUniqueIconSrc)).to.equal(true, 'Should request second icon by name with CDN prefix');
        expect(preloadedIcons[0].length > 0).to.equal(true, 'Should successfully preload first icon by name with CDN prefix');
        expect(preloadedIcons[1].length > 0).to.equal(true, 'Should successfully preload second icon by name with CDN prefix');

        el1.setAttribute('icon', firstUniqueIconName);
        el2.setAttribute('icon', secondUniqueIconName);
        await elementUpdated(el1);
        await elementUpdated(el2);

        expect(fetch.callCount).to.equal(2, 'No new requests should be made since icons are already preloaded');
      });

      it('Should not preload invalid icon', async () => {
        const el = await fixture('<ef-icon></ef-icon>');
        const CDNPrefix = el.getComputedVariable('--cdn-prefix');
        const uniqueInvalidIconName = generateUniqueName(iconName);
        const uniqueInvalidIconSrc = `${CDNPrefix}${uniqueInvalidIconName}.svg`;

        createFakeResponse('', responseConfigError);
        let preloadedIcons = await Promise.all(
          preload(uniqueInvalidIconName)
        );

        expect(fetch.callCount).to.equal(1, 'Server requests for preloaded icon should be made');
        expect(checkRequestedUrl(fetch.args, uniqueInvalidIconSrc)).to.equal(true, 'Should try to request invalid icon');
        expect(preloadedIcons[0], 'Should not preload invalid icon').to.be.undefined;
      });
    });
  });

  describe('Should have correct result with configuration resource', () => {
    it('Should pass config to icon correctly', async () => {
      const elConfig = await fixture('<ef-configuration><ef-icon></ef-icon></ef-configuration>');
      elConfig.config.icon.map = {"tick-base64": tickSvgBase64 };
      const elIcon = elConfig.querySelector('ef-icon');
      elIcon.icon = 'tick-base64';
      await elementUpdated(elIcon);
      const svg = elIcon.shadowRoot.querySelector('svg');
      await expect(isEqualSvg(svg.outerHTML, tickSvg)).to.equal(true, 'Should render SVG, from the server response');
    });

    it('Should not render icon when pass config to icon incorrectly', async () => {
      const elConfig = await fixture('<ef-configuration><ef-icon></ef-icon></ef-configuration>');
      elConfig.config.icon.map = {"tick-base64": 'invalid' + tickSvgBase64 };
      const elIcon = elConfig.querySelector('ef-icon');
      elIcon.icon = 'tick-base64';
      await elementUpdated(elIcon);
      const svg = elIcon.shadowRoot.querySelector('svg');
      await expect(svg).to.equal(null, 'SVG element should not exist for invalid icon attribute');
    });
  });
});

