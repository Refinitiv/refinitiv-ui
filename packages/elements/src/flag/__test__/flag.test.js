import { elementUpdated, expect, aTimeout } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/flag';
import '@refinitiv-ui/elemental-theme/light/ef-flag';
import { preload } from '@refinitiv-ui/elements/flag';

import {
  createAndWaitForLoad,
  createMockSrc,
  generateUniqueName,
  flagName,
  gbSvg,
  checkRequestedUrl,
  createFakeResponse,
  responseConfigSuccess,
  responseConfigError,
  isEqualSvg
} from './helpers/helpers';
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
    it('without flag or src attributes', async () => {
      const el = await createAndWaitForLoad('<ef-flag></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');
      expect(svg).to.equal(null, 'No SVG element should not exist if there is nothing to load');
    });

    it('with valid flag attribute', async () => {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const el = await createAndWaitForLoad(`<ef-flag flag="${flagName}"></ef-flag>`);
      const svg = el.shadowRoot.querySelector('svg');
      expect(svg).to.not.equal(null, 'SVG element should exist for valid flag attribute');
      expect(isEqualSvg(svg.outerHTML, gbSvg)).to.equal(true, 'Should render SVG, from the server response');
    });

    it('with valid src attribute', async () => {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const el = await createAndWaitForLoad('<ef-flag src="https://mock.cdn.com/flags/ticks.svg"></ef-flag>');
      await aTimeout(1000); // BrowserStack need more time
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.not.equal(null, 'SVG element should exist for valid src attribute');
      expect(isEqualSvg(svg.outerHTML, gbSvg)).to.equal(true, 'Should render SVG, from the server response');
    });

    it('with invalid flag attribute', async () => {
      createFakeResponse('', responseConfigError);
      const el = await createAndWaitForLoad('<ef-flag flag="invalid"></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for invalid flag attribute');
    });

    it('with invalid src attribute', async () => {
      createFakeResponse('', responseConfigError);
      const el = await createAndWaitForLoad('<ef-flag src="https://mock.cdn.com/flags/invalid.svg"></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for invalid src attribute');
    });

    it('with empty flag attribute', async () => {
      createFakeResponse('', responseConfigError);
      const el = await createAndWaitForLoad('<ef-flag flag=""></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for empty flag attribute');
    });

    it('with empty src attribute', async () => {
      createFakeResponse('', responseConfigError);
      const el = await createAndWaitForLoad('<ef-flag src=""></ef-flag>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for empty src attribute');
    });

    it('with unsafe nodes in response', async () => {
      createFakeResponse('<script></script>', responseConfigSuccess);
      const el = await createAndWaitForLoad('<ef-flag flag="malicious"></ef-flag>');
      const script = el.shadowRoot.querySelector('script');

      expect(script).to.equal(null, 'should strip unsafe nodes');
    });
  });

  describe('Should Have Correct Properties', () => {
    it('flag', async () => {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const el = await createAndWaitForLoad('<ef-flag></ef-flag>');

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

    it('src', async () => {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const el = await createAndWaitForLoad('<ef-flag></ef-flag>');
      const srcValue = createMockSrc(flagName);

      expect(el.hasAttribute('src')).to.equal(false, 'Flag should not have the src attribute by default');
      expect(el.src).to.equal(null, 'Flag should not have the src property by default');

      el.setAttribute('src', srcValue);
      await elementUpdated(el);

      expect(el.hasAttribute('src')).to.equal(true, 'Flag should have the src attribute when set');
      expect(el.getAttribute('src')).to.equal(srcValue, 'Flag should have the same src attribute as was set');
      expect(el.src).to.equal(srcValue, 'Flag should reflect the src attribute to property');

      el.removeAttribute('src');
      await elementUpdated(el);

      expect(el.hasAttribute('src')).to.equal(false, 'Flag should not have the src attribute after it was removed');
      expect(el.src).to.equal(null, 'Flag should not have the src property after attribute was removed');

      el.src = srcValue;
      await elementUpdated(el);

      expect(el.src).to.equal(srcValue, 'Flag should have the same src property as was set');
      expect(el.hasAttribute('src')).to.equal(false, 'Flag should not reflect the src property to the attribute');
    });
  });

  describe('Functional Tests', () => {
    it('should set the src property based on the flag and CDN prefix', async () => {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const el = await createAndWaitForLoad(`<ef-flag flag="${flagName}"></ef-flag>`);
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDNPrefix should exist to create the src based on the flag').to.exist;
      const expectedSrc = `${CDNPrefix}${flagName}.svg`;

      expect(el.src).to.equal(expectedSrc, `The src property should be ${expectedSrc} for the flag ${flagName}`);

      el.removeAttribute('flag');
      await elementUpdated(el);

      expect(el.src).to.equal(null, 'The src property should be null when flag removed');
    });

    it('should make a correct server request based on cdn prefix and the flag if flag is specified', async () => {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const uniqueFlagName = generateUniqueName(flagName); // to avoid caching
      const el = await createAndWaitForLoad(`<ef-flag flag="${uniqueFlagName}"></ef-flag>`);
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDN prefix should exist to create the src based on the flag').to.exist;
      const expectedSrc = `${CDNPrefix}${uniqueFlagName}.svg`;

      expect(fetch.callCount).to.equal(1, 'Should make one request');
      expect(checkRequestedUrl(fetch.args, expectedSrc)).to.equal(true, `requested URL should be ${expectedSrc} for the flag ${uniqueFlagName}`);
    });

    it('should make a correct server request based on src', async () => {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const uniqueFlagName = generateUniqueName(flagName); // to avoid caching
      const uniqueSrc = createMockSrc(uniqueFlagName);

      await createAndWaitForLoad(`<ef-flag src="${uniqueSrc}"></ef-flag>`);
      expect(fetch.callCount).to.equal(1, 'Should make one request');
      expect(checkRequestedUrl(fetch.args, uniqueSrc)).to.equal(true, `requested URL should be ${uniqueSrc}`);
    });

    it('should preload flags', async () => {
      createFakeResponse(gbSvg, responseConfigSuccess);
      const el = await createAndWaitForLoad('<ef-flag></ef-flag>');
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDN prefix should exist in order for preload to work properly with flag name').to.exist;
      expect(fetch.callCount).to.equal(0, 'No request should be sent for empty flag');

      const firstUniqueFlag = generateUniqueName(flagName);
      const secondUniqueFlag = generateUniqueName(flagName);
      const uniqueInvalidFlag = generateUniqueName(flagName);

      const firstUniqueFlagSrc = `${CDNPrefix}${firstUniqueFlag}.svg`;
      const secondUniqueFlagSrc = createMockSrc(secondUniqueFlag);
      const uniqueInvalidFlagSrc = `${CDNPrefix}${uniqueInvalidFlag}.svg`;

      createFakeResponse(gbSvg, responseConfigSuccess);
      let preloadedFlags = await Promise.all(
        preload(firstUniqueFlag, secondUniqueFlagSrc)
      );
      createFakeResponse('', responseConfigError);
      preloadedFlags = [...preloadedFlags, ...await Promise.all(
        preload(uniqueInvalidFlag)
      )];

      expect(fetch.callCount).to.equal(3, 'Server requests for all preloaded flags should be made');
      expect(checkRequestedUrl(fetch.args, firstUniqueFlagSrc)).to.equal(true, 'should request flags by name with CDN prefix');
      expect(checkRequestedUrl(fetch.args, secondUniqueFlagSrc)).to.equal(true, 'should request flags with src');
      expect(checkRequestedUrl(fetch.args, uniqueInvalidFlagSrc)).to.equal(true, 'should try to request invalid flag');
      expect(preloadedFlags[0].length > 0).to.equal(true, 'Should successfully preload flag by name with CDN prefix');
      expect(preloadedFlags[1].length > 0).to.equal(true, 'Should successfully preload flags with src');
      expect(preloadedFlags[2], 'Should not preload invalid flag').to.be.undefined;
      el.setAttribute('flag', firstUniqueFlag);
      await elementUpdated(el);

      expect(fetch.callCount).to.equal(3, 'no new requests should be made since flags are already preloaded');
    });
  });
});

