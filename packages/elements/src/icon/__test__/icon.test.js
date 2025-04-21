import sinon from 'sinon';

import '@refinitiv-ui/elements/configuration';
import '@refinitiv-ui/elements/icon';

import '@refinitiv-ui/halo-theme/light/ef-icon.js';
import { elementUpdated, expect } from '@refinitiv-ui/test-helpers';

import {
  createAndWaitForLoad,
  createFakeResponse,
  createMockSrc,
  iconName,
  isEqualSvg,
  responseConfigError,
  responseConfigSuccess,
  spriteSvg,
  tickCDN,
  tickSvgBase64,
  tickSvgCDN,
  tickSvgSprite
} from './helpers/helpers.js';

describe('icon/Icon', function () {
  describe('Should have correct result with CDN resource', function () {
    let fetch;
    beforeEach(function () {
      fetch = sinon.stub(window, 'fetch');
    });

    afterEach(function () {
      window.fetch.restore(); // remove stub
    });

    describe('Should Have Correct DOM Structure', function () {
      it('without icon or src attributes', async function () {
        const el = await createAndWaitForLoad('<ef-icon></ef-icon>');
        const svg = el.shadowRoot.querySelector('svg');
        expect(svg).to.equal(null, 'No SVG element should not exist if there is nothing to load');
      });

      it('with valid icon attribute', async function () {
        createFakeResponse(tickSvgSprite, responseConfigSuccess);
        const el = await createAndWaitForLoad(`<ef-icon icon="${iconName}"></ef-icon>`);
        const svg = el.shadowRoot.querySelector('svg');
        expect(svg).to.not.equal(null, 'SVG element should exist for valid icon attribute');
        // Unable to make snapshots of SVGs because of semantic-dom-dif: https://open-wc.org/testing/semantic-dom-diff.html
        // Avoiding this check on IE because it adds custom attributes which cant be ignored with `ignoreAttributes`
        expect(isEqualSvg(svg.outerHTML, tickSvgSprite)).to.equal(
          true,
          'Should render SVG, from the server response'
        );
      });

      it('with valid src attribute', async function () {
        createFakeResponse(tickSvgCDN, responseConfigSuccess);
        const el = await createAndWaitForLoad(
          '<ef-icon src="https://mock.cdn.com/icons/ticks.svg"></ef-icon>'
        );
        const svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.not.equal(null, 'SVG element should exist for valid src attribute');
        expect(isEqualSvg(svg.outerHTML, tickSvgCDN)).to.equal(
          true,
          'Should render SVG, from the server response'
        );
      });

      it('with invalid icon attribute', async function () {
        createFakeResponse('', responseConfigError);
        const el = await createAndWaitForLoad('<ef-icon icon="invalid"></ef-icon>');
        const svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.equal(null, 'SVG element should not exist for invalid icon attribute');
      });

      it('with invalid src attribute', async function () {
        createFakeResponse('', responseConfigError);
        const el = await createAndWaitForLoad(
          '<ef-icon src="https://mock.cdn.com/icons/invalid.svg"></ef-icon>'
        );
        const svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.equal(null, 'SVG element should not exist for invalid src attribute');
      });

      it('with empty icon attribute', async function () {
        createFakeResponse('', responseConfigError);
        const el = await createAndWaitForLoad('<ef-icon icon=""></ef-icon>');
        const svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.equal(null, 'SVG element should not exist for empty icon attribute');
      });

      it('with empty src attribute', async function () {
        createFakeResponse('', responseConfigError);
        const el = await createAndWaitForLoad('<ef-icon src=""></ef-icon>');
        const svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.equal(null, 'SVG element should not exist for empty src attribute');
      });

      it('with unsafe nodes in response', async function () {
        createFakeResponse('<script></script>', responseConfigSuccess);
        const el = await createAndWaitForLoad('<ef-icon icon="malicious"></ef-icon>');
        const script = el.shadowRoot.querySelector('script');

        expect(script).to.equal(null, 'should strip unsafe nodes');
      });

      it('With valid icon attribute to invalid one', async function () {
        createFakeResponse(tickSvgSprite, responseConfigSuccess);
        const el = await createAndWaitForLoad(`<ef-icon icon="${iconName}"></ef-icon>`);
        let svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.not.equal(null, 'SVG element should exist for valid icon attribute');
        expect(isEqualSvg(svg.outerHTML, tickSvgSprite)).to.equal(
          true,
          'Should render SVG, from the server response'
        );

        el.setAttribute('icon', 'invalid');
        await elementUpdated(el);
        svg = el.shadowRoot.querySelector('svg');

        expect(svg).to.equal(null, 'SVG element should not exist for invalid icon attribute');
      });
    });

    describe('Functional Tests', function () {
      it('Should support src link in icon attribute', async function () {
        createFakeResponse(tickSvgSprite, responseConfigSuccess);
        const srcValue = createMockSrc(iconName);
        const el = await createAndWaitForLoad(`<ef-icon icon="${srcValue}"></ef-icon>`);
        const svg = el.shadowRoot.querySelector('svg');

        expect(isEqualSvg(svg.outerHTML, tickSvgSprite)).to.equal(
          true,
          'Should render SVG, from the server response'
        );
      });

      it('Should support src link in icon property', async function () {
        createFakeResponse(tickSvgSprite, responseConfigSuccess);
        const el = await createAndWaitForLoad('<ef-icon></ef-icon>');
        el.icon = createMockSrc(iconName);

        await elementUpdated(el);
        const svg = el.shadowRoot.querySelector('svg');

        expect(isEqualSvg(svg.outerHTML, tickSvgSprite)).to.equal(
          true,
          'Should render SVG, from the server response'
        );
      });

      it('Should not make request for empty icon', async function () {
        await createAndWaitForLoad('<ef-icon></ef-icon>');
        expect(fetch.callCount).to.equal(0, 'No request should be sent for empty icon');
      });
    });

    describe('Should Have Correct Properties', function () {
      it('icon', async function () {
        createFakeResponse(spriteSvg, responseConfigSuccess);
        const el = await createAndWaitForLoad('<ef-icon></ef-icon>');

        expect(el.hasAttribute('icon')).to.equal(false, 'Icon should not have the icon attribute by default');
        expect(el.icon).to.equal(null, 'Icon should not have the icon property by default');

        el.setAttribute('icon', iconName);
        await elementUpdated(el);

        expect(el.hasAttribute('icon')).to.equal(true, 'Icon should have the icon attribute when set');
        expect(el.getAttribute('icon')).to.equal(
          iconName,
          'Icon should have the same icon attribute as was set'
        );
        expect(el.icon).to.equal(iconName, 'Icon should reflect the icon attribute to property');

        el.removeAttribute('icon');
        await elementUpdated(el);

        expect(el.hasAttribute('icon')).to.equal(
          false,
          'Icon should not have the icon attribute after it was removed'
        );
        expect(el.icon).to.equal(null, 'Icon should not have the icon property after attribute was removed');

        el.icon = iconName;
        await elementUpdated(el);

        expect(el.getAttribute('icon')).to.equal(
          iconName,
          'Icon should reflect the icon attribute to property'
        );

        el.icon = '';
        await elementUpdated(el);

        expect(el.getAttribute('icon')).to.equal('', 'Icon attribute should be empty (boolean state)');

        el.icon = null;
        await elementUpdated(el);

        expect(el.hasAttribute('icon')).to.equal(false, 'Attribute should be removed when null is passed');
      });

      it('src', async function () {
        createFakeResponse(spriteSvg, responseConfigSuccess);
        const el = await createAndWaitForLoad('<ef-icon></ef-icon>');
        const srcValue = createMockSrc(iconName);

        expect(el.hasAttribute('src')).to.equal(false, 'Icon should not have the src attribute by default');
        expect(el.src).to.equal(null, 'Icon should not have the src property by default');

        el.setAttribute('src', srcValue);
        await elementUpdated(el);

        expect(el.hasAttribute('src')).to.equal(true, 'Icon should have the src attribute when set');
        expect(el.getAttribute('src')).to.equal(
          srcValue,
          'Icon should have the same src attribute as was set'
        );
        expect(el.src).to.equal(srcValue, 'Icon should reflect the src attribute to property');

        el.removeAttribute('src');
        await elementUpdated(el);

        expect(el.hasAttribute('src')).to.equal(
          false,
          'Icon should not have the src attribute after it was removed'
        );
        expect(el.src).to.equal(null, 'Icon should not have the src property after attribute was removed');

        el.src = srcValue;
        await elementUpdated(el);

        expect(el.src).to.equal(srcValue, 'Icon should have the same src property as was set');
        expect(el.hasAttribute('src')).to.equal(
          false,
          'Icon should not reflect the src property to the attribute'
        );
      });
    });
  });

  describe('Should have correct result with configuration resource', function () {
    it('Should pass base64 config to icon correctly', async function () {
      const elConfig = await createAndWaitForLoad('<ef-configuration><ef-icon></ef-icon></ef-configuration>');
      elConfig.config.icon.map = { 'tick-base64': tickSvgBase64 };
      const elIcon = elConfig.querySelector('ef-icon');
      elIcon.icon = 'tick-base64';
      await elementUpdated(elIcon);
      const svg = elIcon.shadowRoot.querySelector('svg');
      await expect(isEqualSvg(svg.outerHTML, tickSvgSprite)).to.equal(
        true,
        'Should render SVG, from the server response'
      );
    });

    it('Should pass url config to icon correctly', async function () {
      const elConfig = await createAndWaitForLoad('<ef-configuration><ef-icon></ef-icon></ef-configuration>');
      elConfig.config.icon.map = { 'tick-url': tickCDN };
      const elIcon = elConfig.querySelector('ef-icon');
      elIcon.icon = 'tick-url';
      await elementUpdated(elIcon);
      const svg = elIcon.shadowRoot.querySelector('svg');
      await expect(isEqualSvg(svg.outerHTML, tickSvgCDN)).to.equal(
        true,
        'Should render SVG, from the server response'
      );
    });

    it('Should not render icon when pass config to icon incorrectly', async function () {
      const elConfig = await createAndWaitForLoad('<ef-configuration><ef-icon></ef-icon></ef-configuration>');
      elConfig.config.icon.map = { 'tick-base64': 'invalid' + tickSvgBase64 };
      const elIcon = elConfig.querySelector('ef-icon');
      elIcon.icon = 'tick-base64';
      await elementUpdated(elIcon);
      const svg = elIcon.shadowRoot.querySelector('svg');
      await expect(svg).to.equal(null, 'SVG element should not exist for invalid icon attribute');
    });
  });
});
