import { fixture, elementUpdated, expect } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/configuration';
import '@refinitiv-ui/elements/icon';
import '@refinitiv-ui/elemental-theme/light/ef-icon.js';

import {
  createMockSrc,
  generateUniqueName,
  iconName,
  tickSvg,
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

      it('without icon or src attributes', async () => {
        const el = await fixture('<ef-icon></ef-icon>');
        const svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.equal(null, 'No SVG element should not exist if there is nothing to load');
      });

      it('with valid icon attribute', async () => {
        createFakeResponse(spriteSvg, responseConfigSuccess);
        const el = await fixture(`<ef-icon icon="${iconName}"></ef-icon>`);
        const svg = el.shadowRoot.querySelector('svg');
        // const CDNPrefix = el.getComputedVariable('--cdn-prefix');

        // expect(el.src).to.equal(`${CDNPrefix}${iconName}.svg`);
        expect(svg).to.not.equal(null, 'SVG element should exist for valid icon attribute');
        expect(isEqualSvg(svg.outerHTML, tickSvg)).to.equal(true, 'Should render SVG, from the server response');
      });

      it('with valid src attribute', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await fixture('<ef-icon icon="https://mock.cdn.com/icons/ticks.svg"></ef-icon>');
        const svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.not.equal(null, 'SVG element should exist for valid src attribute');
        expect(isEqualSvg(svg.outerHTML, tickSvg)).to.equal(true, 'Should render SVG, from the server response');
      });

      it('with invalid icon attribute', async () => {
        createFakeResponse('', responseConfigError);
        const el = await fixture('<ef-icon icon="invalid"></ef-icon>');
        const svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.equal(null, 'SVG element should not exist for invalid icon attribute');
      });

      it('with invalid src attribute', async () => {
        createFakeResponse('', responseConfigError);
        const el = await fixture('<ef-icon src="https://mock.cdn.com/icons/invalid.svg"></ef-icon>');
        const svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.equal(null, 'SVG element should not exist for invalid src attribute');
      });

      it('with empty icon attribute', async () => {
        createFakeResponse('', responseConfigError);
        const el = await fixture('<ef-icon icon=""></ef-icon>');
        const svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.equal(null, 'SVG element should not exist for empty icon attribute');
      });

      it('with empty src attribute', async () => {
        createFakeResponse('', responseConfigError);
        const el = await fixture('<ef-icon src=""></ef-icon>');
        const svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.equal(null, 'SVG element should not exist for empty src attribute');
      });

      it('with unsafe nodes in response', async () => {
        createFakeResponse('<script></script>', responseConfigSuccess);
        const el = await fixture('<ef-icon icon="malicious"></ef-icon>');
        const script = el.shadowRoot.querySelector('script');

        expect(script).to.equal(null, 'should strip unsafe nodes');
      });

      it('with valid icon attribute to invalid one', async function () {
        createFakeResponse(spriteSvg, responseConfigSuccess);
        const el = await fixture(`<ef-icon icon="${iconName}"></ef-icon>`);
        let svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.not.equal(null, 'SVG element should exist for valid icon attribute');
        expect(isEqualSvg(svg.outerHTML, tickSvg)).to.equal(true, 'Should render SVG, from the server response');

        el.setAttribute('icon', 'invalid');
        await elementUpdated(el);
        svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.equal(null, 'SVG element should not exist for invalid icon attribute');
      });

      it('with valid icon attribute to invalid one', async function () {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await fixture('<ef-icon icon="https://mock.cdn.com/icons/ticks.svg"></ef-icon>');
        let svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.not.equal(null, 'SVG element should exist for valid src attribute');
        expect(isEqualSvg(svg.outerHTML, tickSvg)).to.equal(true, 'Should render SVG, from the server response');

        createFakeResponse('', responseConfigError);
        el.setAttribute('icon', 'https://mock.cdn.com/invalid');
        await elementUpdated(el);
        svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.equal(null, 'SVG element should not exist for invalid src attribute');
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
      it('should not have CDN prefix by default', async () => {
        createFakeResponse(spriteSvg, responseConfigSuccess);
        const el = await fixture(`<ef-icon icon="${iconName}"></ef-icon>`);
        const CDNPrefix = el.getComputedVariable('--cdn-prefix');
        expect(CDNPrefix, 'CDNPrefix should not exist').to.empty;
      });
      // it('should set the src property based on the icon and CDN prefix', async () => {
      //   createFakeResponse(spriteSvg, responseConfigSuccess);
      //   const cdnPrefix = 'https://cdn.refinitiv.net/public/libs/elf/assets/elf-theme-halo/resources/icons/';
      //   const el = await fixture(`<ef-icon style="--cdn-prefix:${cdnPrefix}" icon="${iconName}"></ef-icon>`);
      //   const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      //   expect(CDNPrefix).to.equal(cdnPrefix, 'CDNPrefix should exist');
      // });

      // it('should make a correct server request based on cdn prefix and the icon if icon is specified', async () => {
      //   createFakeResponse(spriteSvg, responseConfigSuccess);
      //   const uniqueIconName = generateUniqueName(iconName); // to avoid caching
      //   const el = await fixture(`<ef-icon icon="${uniqueIconName}"></ef-icon>`);
        // const CDNPrefix = el.getComputedVariable('--cdn-prefix');

        // expect(CDNPrefix, 'CDN prefix should exist to create the src based on the icon').to.exist;
        // const expectedSrc = `${CDNPrefix}${uniqueIconName}.svg`;

        // expect(fetch.callCount).to.equal(1, 'Should make one request');
        // expect(checkRequestedUrl(fetch.args, expectedSrc)).to.equal(true, `requested URL should be ${expectedSrc} for the icon ${uniqueIconName}`);
      // });

      it('should make a correct server request based on icon url', async () => {
        const uniqueIconName = generateUniqueName(iconName); // to avoid caching
        const uniqueSrc = createMockSrc(uniqueIconName);
        createFakeResponse(spriteSvg, responseConfigSuccess);
        await fixture(`<ef-icon icon="${uniqueSrc}"></ef-icon>`);

        expect(fetch.callCount).to.equal(1, 'Should make one request');
        expect(checkRequestedUrl(fetch.args, uniqueSrc)).to.equal(true, `requested URL should be ${uniqueSrc}`);
      });

    });
  });

  describe('Should have correct result with configuration resource', () => {

    it('should pass config to icon correctly', async () => {
      const elConfig = await fixture('<ef-configuration><ef-icon></ef-icon></ef-configuration>');
      elConfig.config.icon.map = {"tick-base64": tickSvgBase64 };
      const elIcon = elConfig.querySelector('ef-icon');
      elIcon.icon = 'tick-base64';
      await elementUpdated(elIcon);
      const svg = elIcon.shadowRoot.querySelector('svg');
      await expect(isEqualSvg(svg.outerHTML, tickSvg)).to.equal(true, 'Should render SVG, from the server response');
    });
    it('should not render icon when pass config to icon incorrectly', async () => {
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

