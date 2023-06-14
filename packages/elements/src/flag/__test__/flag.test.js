import { fixture, elementUpdated, expect } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/flag';
import '@refinitiv-ui/elemental-theme/light/ef-flag';
import { preload } from '@refinitiv-ui/elements/flag';

import {
  generateUniqueName,
  flagName,
  gbSvg,
  checkRequestedUrl,
  createFakeResponse,
  responseConfigSuccess,
  responseConfigError,
  isEqualSvg
} from './helpers/helpers.js';
import sinon from 'sinon';

describe('flag/Flag', () => {
  let fetch;
  beforeEach(() => {
    fetch = sinon.stub(window, 'fetch');
  });
  afterEach(() => {
    window.fetch.restore();  //remove stub
  });
  describe('Should Have Correct DOM Structure', () => {
    it('without flag attribute', async () => {
      const el = await fixture('<ef-flag></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'No SVG element should not exist if there is nothing to load');
    });

    it('with valid flag attribute', async () => {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const el = await fixture(`<ef-flag flag="${flagName}"></ef-flag>`);
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.not.equal(null, 'SVG element should exist for valid flag attribute');
      expect(isEqualSvg(svg.outerHTML, gbSvg)).to.equal(true, 'Should render SVG, from the server response');
    });

    it('with invalid flag attribute', async () => {
      createFakeResponse('', responseConfigError);
      const el = await fixture('<ef-flag flag="invalid"></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for invalid flag attribute');
    });

    it('with empty flag attribute', async () => {
      createFakeResponse('', responseConfigError);
      const el = await fixture('<ef-flag flag=""></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for empty flag attribute');
    });

    it('with valid flag attribute to invalid one', async function () {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const el = await fixture(`<ef-flag flag="${flagName}"></ef-flag>`);
      let svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.not.equal(null, 'SVG element should exist for valid flag attribute');
      expect(isEqualSvg(svg.outerHTML, gbSvg)).to.equal(true, 'Should render SVG, from the server response');

      el.setAttribute('flag', 'invalid');
      await elementUpdated(el);
      svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for invalid flag attribute');
    });

    it('with unsafe nodes in response', async () => {
      createFakeResponse('<script></script>', responseConfigSuccess);
      const el = await fixture('<ef-flag flag="malicious"></ef-flag>');
      const script = el.shadowRoot.querySelector('script');

      expect(script).to.equal(null, 'should strip unsafe nodes');
    });
  });

  describe('Should Have Correct Properties', () => {
    it('flag', async () => {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const el = await fixture('<ef-flag></ef-flag>');

      expect(el.hasAttribute('flag')).to.equal(false, 'Flag should not have the flag attribute by default');
      expect(el.flag).to.equal(null, 'Flag should not have the flag property by default');

      el.setAttribute('flag', flagName);
      await elementUpdated(el);

      expect(el.hasAttribute('flag')).to.equal(true, 'Flag should have the flag attribute when set');
      expect(el.getAttribute('flag')).to.equal(flagName, 'Flag should have the same flag attribute as was set');
      expect(el.flag).to.equal(flagName, 'Flag should reflect the flag attribute to property');

      el.removeAttribute('flag');
      await elementUpdated(el);

      expect(el.hasAttribute('flag')).to.equal(false, 'Flag should not have the flag attribute after it was removed');
      expect(el.flag).to.equal(null, 'Flag should not have the flag property after attribute was removed');

      el.flag = flagName;
      await elementUpdated(el);

      expect(el.flag).to.equal(flagName, 'Flag should have the same flag property as was set');
      expect(el.hasAttribute('flag')).to.equal(false, 'Flag should not reflect the flag property to the attribute');
    });
  });

  describe('Functional Tests', () => {
    it('should make a correct server request based on cdn prefix and the flag if flag is specified', async () => {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const uniqueFlagName = generateUniqueName(flagName); // to avoid caching
      const el = await fixture(`<ef-flag flag="${uniqueFlagName}"></ef-flag>`);
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDN prefix should exist to create the src based on the flag').to.exist;
      const expectedSrc = `${CDNPrefix}${uniqueFlagName}.svg`;

      expect(fetch.callCount).to.equal(1, 'Should make one request');
      expect(checkRequestedUrl(fetch.args, expectedSrc)).to.equal(true, `requested URL should be ${expectedSrc} for the flag ${uniqueFlagName}`);
    });

    it('should preload flags', async () => {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const el = await fixture('<ef-flag></ef-flag>');
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDN prefix should exist in order for preload to work properly with flag name').to.exist;
      expect(fetch.callCount).to.equal(0, 'No request should be sent for empty flag');

      const uniqueValidFlag = generateUniqueName(flagName);
      const uniqueInvalidFlag = generateUniqueName(flagName);

      const uniqueValidFlagSrc = `${CDNPrefix}${uniqueValidFlag}.svg`;
      const uniqueInvalidFlagSrc = `${CDNPrefix}${uniqueInvalidFlag}.svg`;

      createFakeResponse(gbSvg, responseConfigSuccess);
      let preloadedFlags = await Promise.all(
        preload(uniqueValidFlag)
      );
      createFakeResponse('', responseConfigError);
      preloadedFlags = [...preloadedFlags, ...await Promise.all(
        preload(uniqueInvalidFlag)
      )];

      expect(fetch.callCount).to.equal(2, 'Server requests for all preloaded flags should be made');
      expect(checkRequestedUrl(fetch.args, uniqueValidFlagSrc)).to.equal(true, 'should request flags by name with CDN prefix');
      expect(checkRequestedUrl(fetch.args, uniqueInvalidFlagSrc)).to.equal(true, 'should try to request invalid flag');
      expect(preloadedFlags[0].length > 0).to.equal(true, 'Should successfully preload flag by name with CDN prefix');
      expect(preloadedFlags[1], 'Should not preload invalid flag').to.be.undefined;
      el.setAttribute('flag', uniqueValidFlag);
      await elementUpdated(el);

      expect(fetch.callCount).to.equal(2, 'no new requests should be made since flags are already preloaded');
    });
  });
});

