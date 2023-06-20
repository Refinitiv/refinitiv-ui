import { fixture, elementUpdated, expect } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/configuration';
import '@refinitiv-ui/elements/icon';
import '@refinitiv-ui/elemental-theme/light/ef-icon.js';

import {
  createMockSrc,
  generateUniqueName,
  iconName,
  tickCDN,
  tickSvgSprite,
  tickSvgCDN,
  tickSvgBase64,
  spriteSvg,
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
        createFakeResponse(tickSvgSprite, responseConfigSuccess);
        const el = await fixture(`<ef-icon icon="${iconName}"></ef-icon>`);
        const svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.not.equal(null, 'SVG element should exist for valid icon attribute');
        expect(isEqualSvg(svg.outerHTML, tickSvgSprite)).to.equal(true, 'Should render SVG, from the server response');
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
        createFakeResponse(tickSvgSprite, responseConfigSuccess);
        const el = await fixture(`<ef-icon icon="${iconName}"></ef-icon>`);
        let svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.not.equal(null, 'SVG element should exist for valid icon attribute');
        expect(isEqualSvg(svg.outerHTML, tickSvgSprite)).to.equal(true, 'Should render SVG, from the server response');

        el.setAttribute('icon', 'invalid');
        await elementUpdated(el);
        svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.equal(null, 'SVG element should not exist for invalid icon attribute');
      });
    });

    describe('Should Have Correct Properties', () => {
      it('icon', async () => {
        createFakeResponse(spriteSvg, responseConfigSuccess);
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
        createFakeResponse(tickSvgSprite, responseConfigSuccess);
        const srcValue = createMockSrc(iconName);
        const el = await fixture(`<ef-icon icon="${srcValue}"></ef-icon>`);
        const svg = el.shadowRoot.querySelector('svg');

        expect(isEqualSvg(svg.outerHTML, tickSvgSprite)).to.equal(true, 'Should render SVG, from the server response');
      });

      it('Should support src link in icon property', async () => {
        createFakeResponse(tickSvgSprite, responseConfigSuccess);
        const el = await fixture(`<ef-icon></ef-icon>`);
        el.icon = createMockSrc(iconName);

        await elementUpdated(el);
        const svg = el.shadowRoot.querySelector('svg');

        expect(isEqualSvg(svg.outerHTML, tickSvgSprite)).to.equal(true, 'Should render SVG, from the server response');
      });

      it('Should cdn prefix exist', async () => {
        createFakeResponse(tickSvgSprite, responseConfigSuccess);
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
        createFakeResponse(tickSvgSprite, responseConfigSuccess);
        const uniqueIconName = generateUniqueName(iconName); // to avoid caching
        const MockCDNPrefix = 'https://mock.cdn.com/icons/';
        const el = await fixture(`<ef-icon style="--cdn-prefix:'${MockCDNPrefix}'" icon="${uniqueIconName}"></ef-icon>`);
        const CDNPrefix = el.getComputedVariable('--cdn-prefix');
        const expectedSrc = `${CDNPrefix}${uniqueIconName}.svg`;

        expect(fetch.callCount).to.equal(1, 'Should make one request');
        expect(checkRequestedUrl(fetch.args, expectedSrc)).to.equal(true, `Requested URL should be ${expectedSrc} for the icon ${uniqueIconName}`);
      });
    });
  });

  describe('Should have correct result with configuration resource', () => {
    it('Should pass base64 config to icon correctly', async () => {
      const elConfig = await fixture('<ef-configuration><ef-icon></ef-icon></ef-configuration>');
      elConfig.config.icon.map = {"tick-base64": tickSvgBase64 };
      const elIcon = elConfig.querySelector('ef-icon');
      elIcon.icon = 'tick-base64';
      await elementUpdated(elIcon);
      const svg = elIcon.shadowRoot.querySelector('svg');
      await expect(isEqualSvg(svg.outerHTML, tickSvgSprite)).to.equal(true, 'Should render SVG, from the server response');
    });
    it('Should pass url config to icon correctly', async () => {
      const elConfig = await fixture('<ef-configuration><ef-icon></ef-icon></ef-configuration>');
      elConfig.config.icon.map = {"tick-url": tickCDN };
      const elIcon = elConfig.querySelector('ef-icon');
      elIcon.icon = 'tick-url';
      await elementUpdated(elIcon);
      const svg = elIcon.shadowRoot.querySelector('svg');
      await expect(isEqualSvg(svg.outerHTML, tickSvgCDN)).to.equal(true, 'Should render SVG, from the server response');
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

