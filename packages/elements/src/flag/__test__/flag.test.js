// import element and theme
import sinon from 'sinon';

import '@refinitiv-ui/elements/flag';
import { preload } from '@refinitiv-ui/elements/flag';

import '@refinitiv-ui/halo-theme/light/ef-flag.js';
import { elementUpdated, expect } from '@refinitiv-ui/test-helpers';

import {
  checkRequestedUrl,
  createAndWaitForLoad,
  createFakeResponse,
  createMockSrc,
  flagName,
  gbSvg,
  generateUniqueName,
  isEqualSvg,
  responseConfigError,
  responseConfigSuccess
} from './helpers/helpers.js';

describe('flag/Flag', function () {
  let fetch;
  beforeEach(function () {
    fetch = sinon.stub(window, 'fetch');
  });
  afterEach(function () {
    window.fetch.restore(); // remove stub
  });
  describe('Should Have Correct DOM Structure', function () {
    it('without flag or src attributes', async function () {
      const el = await createAndWaitForLoad('<ef-flag></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');
      expect(svg).to.equal(null, 'No SVG element should not exist if there is nothing to load');
    });

    it('with valid flag attribute', async function () {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const el = await createAndWaitForLoad(`<ef-flag flag="${flagName}"></ef-flag>`);
      const svg = el.shadowRoot.querySelector('svg');
      expect(svg).to.not.equal(null, 'SVG element should exist for valid flag attribute');
      // Unable to make snapshots of SVGs because of semantic-dom-dif: https://open-wc.org/testing/semantic-dom-diff.html
      // Avoiding this check on IE because it adds custom attributes which cant be ignored with `ignoreAttributes`
      expect(svg.outerHTML).to.equal(gbSvg, 'Should render SVG, from the server response');
    });

    it('with valid src attribute', async function () {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const el = await createAndWaitForLoad('<ef-flag src="https://mock.cdn.com/flags/ticks.svg"></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.not.equal(null, 'SVG element should exist for valid src attribute');
      expect(svg.outerHTML).to.equal(gbSvg, 'Should render SVG, from the server response');
    });

    it('with invalid flag attribute', async function () {
      createFakeResponse('', responseConfigError);
      const el = await createAndWaitForLoad('<ef-flag flag="invalid"></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for invalid flag attribute');
    });

    it('with invalid src attribute', async function () {
      createFakeResponse('', responseConfigError);
      const el = await createAndWaitForLoad(
        '<ef-flag src="https://mock.cdn.com/flags/invalid.svg"></ef-flag>'
      );
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for invalid src attribute');
    });

    it('with empty flag attribute', async function () {
      createFakeResponse('', responseConfigError);
      const el = await createAndWaitForLoad('<ef-flag flag=""></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for empty flag attribute');
    });

    it('with empty src attribute', async function () {
      createFakeResponse('', responseConfigError);
      const el = await createAndWaitForLoad('<ef-flag src=""></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for empty src attribute');
    });

    it('With valid flag attribute to invalid one', async function () {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const el = await createAndWaitForLoad(`<ef-flag flag="${flagName}"></ef-flag>`);
      let svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.not.equal(null, 'SVG element should exist for valid flag attribute');
      expect(isEqualSvg(svg.outerHTML, gbSvg)).to.equal(true, 'Should render SVG, from the server response');

      el.setAttribute('flag', 'invalid');
      await elementUpdated(el);
      svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for invalid flag attribute');
    });

    it('with unsafe nodes in response', async function () {
      createFakeResponse('<script></script>', responseConfigSuccess);
      const el = await createAndWaitForLoad('<ef-flag flag="malicious"></ef-flag>');
      const script = el.shadowRoot.querySelector('script');

      expect(script).to.equal(null, 'should strip unsafe nodes');
    });
  });

  describe('Should have correct attributes and properties', function () {
    describe('flag attribute/property', function () {
      // let server;
      let el;
      // let fetch;

      // before(function () {
      //   server = sinon.createFakeServer({ respondImmediately: true });
      //   server.respondWith([200, { 'Content-Type': 'image/svg+xml' }, gbSvg]);
      // });

      before(async function () {
        el = await createAndWaitForLoad('<ef-flag></ef-flag>');
        // fetch = sinon.stub(window, 'fetch');
        // createFakeResponse(gbSvg, responseConfigSuccess);
      });
      // afterEach(function () {
      //   window.fetch.restore(); // remove stub
      // });

      it('should not have flag attribute by default', function () {
        createFakeResponse(gbSvg, responseConfigSuccess);
        expect(el.hasAttribute('flag')).to.equal(false, 'Flag should not have the flag attribute by default');
        expect(el.flag).to.equal(null, 'Flag should not have the flag property by default');
      });

      it('should have flag attribute when set', async function () {
        createFakeResponse(gbSvg, responseConfigSuccess);
        el.setAttribute('flag', flagName);
        await elementUpdated(el);

        expect(el.hasAttribute('flag')).to.equal(true, 'Flag should have the flag attribute when set');
        expect(el.getAttribute('flag')).to.equal(
          flagName,
          'Flag should have the same flag attribute as was set'
        );
        expect(el.flag).to.equal(flagName, 'Flag should reflect the flag attribute to property');
      });

      it('should have flag attribute reflected when flag property is set', async function () {
        createFakeResponse(gbSvg, responseConfigSuccess);
        el.flag = flagName;
        await elementUpdated(el);

        expect(el.hasAttribute('flag')).to.equal(true, 'Flag should have the flag attribute reflected');
        expect(el.getAttribute('flag')).to.equal(
          flagName,
          'Flag should not have the flag property after attribute was removed'
        );
      });
    });

    describe('src attribute/property', function () {
      let srcValue;
      let el;

      beforeEach(async function () {
        srcValue = createMockSrc(flagName);
        el = await createAndWaitForLoad('<ef-flag></ef-flag>');
        createFakeResponse(gbSvg, responseConfigSuccess);
      });

      it('should not have src attribute by default', function () {
        expect(el.hasAttribute('src')).to.equal(false, 'Flag should not have the src attribute by default');
        expect(el.src).to.equal(null, 'Flag should not have the src property by default');
      });

      it('should have src attribute when set', async function () {
        el.setAttribute('src', srcValue);
        await elementUpdated(el);

        expect(el.hasAttribute('src')).to.equal(true, 'Flag should have the src attribute when set');
        expect(el.getAttribute('src')).to.equal(
          srcValue,
          'Flag should have the same src attribute as was set'
        );
        expect(el.src).to.equal(srcValue, 'Flag should reflect the src attribute to property');
      });

      it('should not reflect src attribute when src property is set', async function () {
        el.src = srcValue;
        await elementUpdated(el);

        expect(el.src).to.equal(srcValue, 'Flag should have the same src property as was set');
        expect(el.hasAttribute('src')).to.equal(
          false,
          'Flag should not reflect the src property to the attribute'
        );
      });
    });
  });

  describe('Functional Tests', function () {
    it('should set the src property based on the flag and CDN prefix', async function () {
      const el = await createAndWaitForLoad(`<ef-flag flag="${flagName}"></ef-flag>`);
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDNPrefix should exist to create the src based on the flag').to.exist;
      const expectedSrc = `${CDNPrefix}${flagName}.svg`;

      expect(el.src).to.equal(
        expectedSrc,
        `The src property should be ${expectedSrc} for the flag ${flagName}`
      );

      el.removeAttribute('flag');
      await elementUpdated(el);

      expect(el.src).to.equal(null, 'The src property should be null when flag removed');
    });

    it('should make a correct server request based on cdn prefix and the flag if flag is specified', async function () {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const uniqueFlagName = generateUniqueName(flagName); // to avoid caching
      const el = await createAndWaitForLoad(`<ef-flag flag="${uniqueFlagName}"></ef-flag>`);
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDN prefix should exist to create the src based on the flag').to.exist;
      const expectedSrc = `${CDNPrefix}${uniqueFlagName}.svg`;

      expect(fetch.callCount).to.equal(1, 'Should make one request');
      expect(checkRequestedUrl(fetch.args, expectedSrc)).to.equal(
        true,
        `Requested URL should be ${expectedSrc} for the flag ${uniqueFlagName}`
      );
    });

    it('should make a correct server request based on src', async function () {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const uniqueFlagName = generateUniqueName(flagName); // to avoid caching
      const uniqueSrc = createMockSrc(uniqueFlagName);

      await createAndWaitForLoad(`<ef-flag src="${uniqueSrc}"></ef-flag>`);
      expect(fetch.callCount).to.equal(1, 'Should make one request');
      expect(checkRequestedUrl(fetch.args, uniqueSrc)).to.equal(true, `Requested URL should be ${uniqueSrc}`);
    });

    it('should preload flags', async function () {
      const el = await createAndWaitForLoad('<ef-flag></ef-flag>');
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDN prefix should exist in order for preload to work properly with flag name').to
        .exist;
      expect(fetch.callCount).to.equal(0, 'No request should be sent for empty flag');

      const firstUniqueFlag = generateUniqueName(flagName);
      const secondUniqueFlag = generateUniqueName(flagName);
      const uniqueInvalidFlag = generateUniqueName(flagName);

      const firstUniqueFlagSrc = `${CDNPrefix}${firstUniqueFlag}.svg`;
      const secondUniqueFlagSrc = createMockSrc(secondUniqueFlag);
      const uniqueInvalidFlagSrc = `${CDNPrefix}${uniqueInvalidFlag}.svg`;

      fetch.withArgs(firstUniqueFlagSrc).resolves(
        new Response(gbSvg, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' }
        })
      );
      fetch.withArgs(secondUniqueFlagSrc).resolves(
        new Response(gbSvg, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' }
        })
      );
      fetch.withArgs(uniqueInvalidFlagSrc).resolves(
        new Response('', {
          status: 404,
          headers: {}
        })
      );

      const preloadedFlags = await Promise.all(
        preload(firstUniqueFlag, secondUniqueFlagSrc, uniqueInvalidFlag)
      );
      expect(fetch.callCount).to.equal(3, 'Server requests for all preloaded flags should be made');
      expect(preloadedFlags[0].length > 0).to.equal(
        true,
        'Should successfully preload flag by name with CDN prefix'
      );
      expect(preloadedFlags[1].length > 0).to.equal(true, 'Should successfully preload flags with src');
      expect(preloadedFlags[2], 'Should not preload invalid flag').to.be.undefined;
      el.setAttribute('flag', firstUniqueFlag);
      await elementUpdated(el);

      expect(fetch.callCount).to.equal(3, 'no new requests should be made since flags are already preloaded');
    });
  });
});
