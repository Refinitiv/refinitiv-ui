// import element and theme
import sinon from 'sinon';

import '@refinitiv-ui/elements/flag';
import { preload } from '@refinitiv-ui/elements/flag';

import '@refinitiv-ui/elemental-theme/light/ef-flag';
import { elementUpdated, expect, isIE } from '@refinitiv-ui/test-helpers';

import {
  checkRequestedUrl,
  createAndWaitForLoad,
  createMockSrc,
  flagName,
  gbSvg,
  generateUniqueName
} from './helpers/helpers';

describe('flag/Flag', function() {
  describe('Should Have Correct DOM Structure', function() {
    it('without flag or src attributes', async function() {
      const el = await createAndWaitForLoad('<ef-flag></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');
      expect(svg).to.equal(null, 'No SVG element should not exist if there is nothing to load');
    });

    it('with valid flag attribute', async function() {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([200, { 'Content-Type': 'image/svg+xml' }, gbSvg]);
      const el = await createAndWaitForLoad(`<ef-flag flag="${flagName}"></ef-flag>`);
      const svg = el.shadowRoot.querySelector('svg');
      expect(svg).to.not.equal(null, 'SVG element should exist for valid flag attribute');
      // Unable to make snapshots of SVGs because of semantic-dom-dif: https://open-wc.org/testing/semantic-dom-diff.html
      // Avoiding this check on IE because it adds custom attributes which cant be ignored with `ignoreAttributes`
      if (!isIE) {
        expect(svg.outerHTML).to.equal(gbSvg, 'Should render SVG, from the server response');
      }
    });

    it('with valid src attribute', async function() {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([200, { 'Content-Type': 'image/svg+xml' }, gbSvg]);
      const el = await createAndWaitForLoad('<ef-flag src="https://mock.cdn.com/flags/ticks.svg"></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.not.equal(null, 'SVG element should exist for valid src attribute');
      if (!isIE) {
        expect(svg.outerHTML).to.equal(gbSvg, 'Should render SVG, from the server response');
      }
    });

    it('with invalid flag attribute', async function() {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([404, {}, '']);
      const el = await createAndWaitForLoad('<ef-flag flag="invalid"></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for invalid flag attribute');
    });

    it('with invalid src attribute', async function() {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([404, {}, '']);
      const el = await createAndWaitForLoad(
        '<ef-flag src="https://mock.cdn.com/flags/invalid.svg"></ef-flag>'
      );
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for invalid src attribute');
    });

    it('with empty flag attribute', async function() {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([404, {}, '']);
      const el = await createAndWaitForLoad('<ef-flag flag=""></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for empty flag attribute');
    });

    it('with empty src attribute', async function() {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([404, {}, '']);
      const el = await createAndWaitForLoad('<ef-flag src=""></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for empty src attribute');
    });

    it('with unsafe nodes in response', async function() {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([200, { 'Content-Type': 'image/svg+xml' }, '<script></script>']);
      const el = await createAndWaitForLoad('<ef-flag flag="malicious"></ef-flag>');
      const script = el.shadowRoot.querySelector('script');

      expect(script).to.equal(null, 'should strip unsafe nodes');
    });
  });

  describe('Should have correct attributes and properties', function() {
    describe('flag attribute/property', function() {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([200, { 'Content-Type': 'image/svg+xml' }, gbSvg]);

      let el;
      beforeEach(async function() {
        el = await createAndWaitForLoad('<ef-flag></ef-flag>');
      });

      it('should not have flag attribute by default', function() {
        expect(el.hasAttribute('flag')).to.equal(false, 'Flag should not have the flag attribute by default');
        expect(el.flag).to.equal(null, 'Flag should not have the flag property by default');
      });

      it('should have flag attribute when set', async function() {
        el.setAttribute('flag', flagName);
        await elementUpdated(el);

        expect(el.hasAttribute('flag')).to.equal(true, 'Flag should have the flag attribute when set');
        expect(el.getAttribute('flag')).to.equal(
          flagName,
          'Flag should have the same flag attribute as was set'
        );
        expect(el.flag).to.equal(flagName, 'Flag should reflect the flag attribute to property');
      });

      it('should have flag attribute reflected when flag property is set', async function() {
        el.flag = flagName;
        await elementUpdated(el);

        expect(el.hasAttribute('flag')).to.equal(true, 'Flag should have the flag attribute reflected');
        expect(el.getAttribute('flag')).to.equal(
          flagName,
          'Flag should not have the flag property after attribute was removed'
        );
      });
    });

    describe('src attribute/property', function() {
      const srcValue = createMockSrc(flagName);
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([200, { 'Content-Type': 'image/svg+xml' }, gbSvg]);

      let el;
      beforeEach(async function() {
        el = await createAndWaitForLoad('<ef-flag></ef-flag>');
      });

      it('should not have src attribute by default', function() {
        expect(el.hasAttribute('src')).to.equal(false, 'Flag should not have the src attribute by default');
        expect(el.src).to.equal(null, 'Flag should not have the src property by default');
      });

      it('should have src attribute when set', async function() {
        el.setAttribute('src', srcValue);
        await elementUpdated(el);

        expect(el.hasAttribute('src')).to.equal(true, 'Flag should have the src attribute when set');
        expect(el.getAttribute('src')).to.equal(
          srcValue,
          'Flag should have the same src attribute as was set'
        );
        expect(el.src).to.equal(srcValue, 'Flag should reflect the src attribute to property');
      });

      it('should not reflect src attribute when src property is set', async function() {
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

  describe('Functional Tests', function() {
    it('should set the src property based on the flag and CDN prefix', async function() {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([200, { 'Content-Type': 'image/svg+xml' }, gbSvg]);
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

    it('should make a correct server request based on cdn prefix and the flag if flag is specified', async function() {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([200, { 'Content-Type': 'image/svg+xml' }, gbSvg]);
      const uniqueFlagName = generateUniqueName(flagName); // to avoid caching
      const el = await createAndWaitForLoad(`<ef-flag flag="${uniqueFlagName}"></ef-flag>`);
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDN prefix should exist to create the src based on the flag').to.exist;
      const expectedSrc = `${CDNPrefix}${uniqueFlagName}.svg`;

      expect(server.requests.length).to.equal(1, 'Should make one request');
      expect(server.requests[0].url).to.equal(
        expectedSrc,
        `requested URL should be ${expectedSrc} for the flag ${uniqueFlagName}`
      );
    });

    it('should make a correct server request based on src', async function() {
      const server = sinon.createFakeServer({ respondImmediately: true });
      const uniqueFlagName = generateUniqueName(flagName); // to avoid caching
      const uniqueSrc = createMockSrc(uniqueFlagName);
      server.respondWith('GET', uniqueSrc, [200, { 'Content-Type': 'image/svg+xml' }, gbSvg]);

      await createAndWaitForLoad(`<ef-flag src="${uniqueSrc}"></ef-flag>`);
      expect(server.requests.length).to.equal(1, 'Should make one request');
      expect(server.requests[0].url).to.equal(uniqueSrc, `requested URL should be ${uniqueSrc}`);
    });

    it('should preload flags', async function() {
      let server = sinon.createFakeServer({ respondImmediately: true });

      const el = await createAndWaitForLoad('<ef-flag></ef-flag>');
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDN prefix should exist in order for preload to work properly with flag name').to
        .exist;
      expect(server.requests.length).to.equal(0, 'No request should be sent for empty flag');

      const firstUniqueFlag = generateUniqueName(flagName);
      const secondUniqueFlag = generateUniqueName(flagName);
      const uniqueInvalidFlag = generateUniqueName(flagName);

      const firstUniqueFlagSrc = `${CDNPrefix}${firstUniqueFlag}.svg`;
      const secondUniqueFlagSrc = createMockSrc(secondUniqueFlag);
      const uniqueInvalidFlagSrc = `${CDNPrefix}${uniqueInvalidFlag}.svg`;

      server.respondWith('GET', firstUniqueFlagSrc, [200, { 'Content-Type': 'image/svg+xml' }, gbSvg]);
      server.respondWith('GET', secondUniqueFlagSrc, [200, { 'Content-Type': 'image/svg+xml' }, gbSvg]);
      server.respondWith('GET', uniqueInvalidFlagSrc, [404, {}, '']);

      const preloadedFlags = await Promise.all(
        preload(firstUniqueFlag, secondUniqueFlagSrc, uniqueInvalidFlag)
      );
      expect(server.requests.length).to.equal(3, 'Server requests for all preloaded flags should be made');
      expect(checkRequestedUrl(server.requests, firstUniqueFlagSrc)).to.equal(
        true,
        'should request flags by name with CDN prefix'
      );
      expect(checkRequestedUrl(server.requests, secondUniqueFlagSrc)).to.equal(
        true,
        'should request flags with src'
      );
      expect(checkRequestedUrl(server.requests, uniqueInvalidFlagSrc)).to.equal(
        true,
        'should try to request invalid flag'
      );
      expect(preloadedFlags[0].length > 0).to.equal(
        true,
        'Should successfully preload flag by name with CDN prefix'
      );
      expect(preloadedFlags[1].length > 0).to.equal(true, 'Should successfully preload flags with src');
      expect(preloadedFlags[2], 'Should not preload invalid flag').to.be.undefined;
      el.setAttribute('flag', firstUniqueFlag);
      await elementUpdated(el);

      expect(server.requests.length).to.equal(
        3,
        'no new requests should be made since flags are already preloaded'
      );
    });
  });
});
