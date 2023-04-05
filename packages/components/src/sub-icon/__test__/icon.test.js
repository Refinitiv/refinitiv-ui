import { aTimeout, elementUpdated, expect } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/sub-icon';
import { preload } from '@refinitiv-ui/components/sub-icon';

import {
  createAndWaitForLoad,
  createMockSrc,
  generateUniqueName,
  iconName,
  tickSvg,
  checkRequestedUrl,
  createFakeResponse,
  responseConfigSuccess,
  responseConfigError,
  isEqualSvg
} from './helpers/helpers';
import sinon from 'sinon';

describe('ui-sub-icon', () => {
  let fetch;
  beforeEach(() => {
    fetch = sinon.stub(window, 'fetch');
  });
  afterEach(() => {
    window.fetch.restore();  //remove stub
  });
  describe('DOM Structure', () => {
    it('without icon or src attributes', async () => {
      const el = await createAndWaitForLoad('<ui-sub-icon></ui-sub-icon>');
      const svg = el.shadowRoot.querySelector('svg');
      expect(svg).to.equal(null, 'No SVG element should not exist if there is nothing to load');
    });
    it('with invalid icon attribute', async () => {
      createFakeResponse('', responseConfigError);
      const el = await createAndWaitForLoad('<ui-sub-icon icon="invalid"></ui-sub-icon>');
      const svg = el.shadowRoot.querySelector('svg');
      expect(svg).to.equal(null, 'SVG element should not exist for invalid icon attribute');
    });
    it('with invalid src attribute', async () => {
      createFakeResponse('', responseConfigError);
      const el = await createAndWaitForLoad('<ui-sub-icon src="https://mock.cdn.com/icons/invalid.svg"></ui-sub-icon>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for invalid src attribute');
    });
    it('with empty icon attribute', async () => {
      createFakeResponse('', responseConfigError);
      const el = await createAndWaitForLoad('<ui-sub-icon icon=""></ui-sub-icon>');
      const svg = el.shadowRoot.querySelector('svg');
      expect(svg).to.equal(null, 'SVG element should not exist for empty icon attribute');
    });
    it('with empty src attribute', async () => {
      createFakeResponse('', responseConfigError);
      const el = await createAndWaitForLoad('<ui-sub-icon src=""></ui-sub-icon>');
      const svg = el.shadowRoot.querySelector('svg');
      expect(svg).to.equal(null, 'SVG element should not exist for empty src attribute');
    });

    it('with unsafe nodes in response', async () => {
      createFakeResponse('<script></script>', responseConfigSuccess);
      const el = await createAndWaitForLoad('<ui-sub-icon icon="malicious"></ui-sub-icon>');
      const script = el.shadowRoot.querySelector('script');

      expect(script).to.equal(null, 'should strip unsafe nodes');
    });
  });

  describe('Attributes', () => {
    describe('icon', () => {
      it('should not be presented by default', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await createAndWaitForLoad('<ui-sub-icon></ui-sub-icon>');
  
        expect(el.hasAttribute('icon')).to.equal(false);
      });
      it('should have the icon attribute when set', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await createAndWaitForLoad('<ui-sub-icon></ui-sub-icon>');

        el.setAttribute('icon', iconName);
        await elementUpdated(el);

        expect(el.hasAttribute('icon')).to.equal(true);
      });
      it('should have correct icon name when set', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await createAndWaitForLoad('<ui-sub-icon></ui-sub-icon>');

        el.setAttribute('icon', iconName);
        await elementUpdated(el);

        expect(el.icon).to.equal(iconName);
      });
      it('should not presented after it was removed', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await createAndWaitForLoad(`<ui-sub-icon icon="${iconName}"></ui-sub-icon>`);

        el.removeAttribute('icon');
        await elementUpdated(el);

        expect(el.hasAttribute('icon')).to.equal(false);
      });
      it('should be reflected when property value has change', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await createAndWaitForLoad(`<ui-sub-icon icon="${iconName}"></ui-sub-icon>`);

        el.icon = ''
        await elementUpdated(el);

        expect(el.getAttribute('icon')).to.equal('');
      });
      it('should not presented when property value has change to null', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await createAndWaitForLoad(`<ui-sub-icon icon="${iconName}"></ui-sub-icon>`);

        el.icon = null;
        await elementUpdated(el);

        expect(el.hasAttribute('icon')).to.equal(false);
      });
    });
    describe('src', () => {
      it('should not be presented by default', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await createAndWaitForLoad('<ui-sub-icon></ui-sub-icon>');
  
        expect(el.hasAttribute('src')).to.equal(false);
      });
      it('should have the src attribute when set', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await createAndWaitForLoad('<ui-sub-icon></ui-sub-icon>');
        const srcValue = createMockSrc(iconName);

        el.setAttribute('src', srcValue);
        await elementUpdated(el);

        expect(el.hasAttribute('src')).to.equal(true);
      });
      it('should have correct icon when set', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await createAndWaitForLoad('<ui-sub-icon></ui-sub-icon>');
        const srcValue = createMockSrc(iconName);

        el.setAttribute('src', srcValue);
        await elementUpdated(el);

        expect(el.getAttribute('src')).to.equal(srcValue);
      });
      it('should not presented after it was removed', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const srcValue = createMockSrc(iconName);
        const el = await createAndWaitForLoad(`<ui-sub-icon src="${srcValue}"></ui-sub-icon>`);

        el.removeAttribute('src');
        await elementUpdated(el);

        expect(el.hasAttribute('src')).to.equal(false);
      });
    });
  });

  describe('Properties', () => {
    describe('icon', () => {
      it('should not be presented by default', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await createAndWaitForLoad('<ui-sub-icon></ui-sub-icon>');

        expect(el.icon).to.equal(null);
      });
      it('should have the icon property when set', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await createAndWaitForLoad('<ui-sub-icon></ui-sub-icon>');

        el.icon = iconName;
        await elementUpdated(el);

        expect(el.icon).to.equal(iconName);
      });
    });
    describe('src', () => {
      it('should not be presented by default', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await createAndWaitForLoad('<ui-sub-icon></ui-sub-icon>');
  
        expect(el.src).to.equal(null);
      });
      it('should have the src property when set', async () => {
        createFakeResponse(tickSvg, responseConfigSuccess);
        const el = await createAndWaitForLoad('<ui-sub-icon></ui-sub-icon>');
        const srcValue = createMockSrc(iconName);

        el.setAttribute('src', srcValue);
        await elementUpdated(el);

        expect(el.src).to.equal(srcValue);
      });
    });
  });

  describe('Functional', () => {
    it('should set the src property based on the icon and CDN prefix', async () => {
      createFakeResponse(tickSvg, responseConfigSuccess);
      const el = await createAndWaitForLoad(`<ui-sub-icon icon="${iconName}"></ui-sub-icon>`);
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDNPrefix should exist to create the src based on the icon').to.exist;
      const expectedSrc = `${CDNPrefix}${iconName}.svg`;

      expect(el.src).to.equal(expectedSrc, `The src property should be ${expectedSrc} for the icon ${iconName}`);

      el.removeAttribute('icon');
      await elementUpdated(el);

      expect(el.src).to.equal(null, 'The src property should be null when icon removed');
    });

    it('should make a correct server request based on cdn prefix and the icon if icon is specified', async () => {
      createFakeResponse(tickSvg, responseConfigSuccess);
      const uniqueIconName = generateUniqueName(iconName); // to avoid caching
      const el = await createAndWaitForLoad(`<ui-sub-icon icon="${uniqueIconName}"></ui-sub-icon>`);
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDN prefix should exist to create the src based on the icon').to.exist;
      const expectedSrc = `${CDNPrefix}${uniqueIconName}.svg`;

      expect(fetch.callCount).to.equal(1, 'Should make one request');
      expect(checkRequestedUrl(fetch.args, expectedSrc)).to.equal(true, `requested URL should be ${expectedSrc} for the icon ${uniqueIconName}`);
    });

    it('should make a correct server request based on src', async () => {
      const uniqueIconName = generateUniqueName(iconName); // to avoid caching
      const uniqueSrc = createMockSrc(uniqueIconName);
      createFakeResponse(tickSvg, responseConfigSuccess);
      await createAndWaitForLoad(`<ui-sub-icon src="${uniqueSrc}"></ui-sub-icon>`);

      expect(fetch.callCount).to.equal(1, 'Should make one request');
      expect(checkRequestedUrl(fetch.args, uniqueSrc)).to.equal(true, `requested URL should be ${uniqueSrc}`);
    });

    it('should preload icons', async () => {
      const el = await createAndWaitForLoad('<ui-sub-icon></ui-sub-icon>');
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDN prefix should exist in order for preload to work properly with icon name').to.exist;
      expect(fetch.callCount).to.equal(0, 'No request should be sent for empty icon');

      const firstUniqueIcon = generateUniqueName(iconName);
      const secondUniqueIcon = generateUniqueName(iconName);
      const uniqueInvalidIcon = generateUniqueName(iconName);

      const firstUniqueIconSrc = `${CDNPrefix}${firstUniqueIcon}.svg`;
      const secondUniqueIconSrc = createMockSrc(secondUniqueIcon);
      const uniqueInvalidIconSrc = `${CDNPrefix}${uniqueInvalidIcon}.svg`;

      createFakeResponse(tickSvg, responseConfigSuccess);
      let preloadedIcons = await Promise.all(
        preload(firstUniqueIcon, secondUniqueIconSrc)
      );
      createFakeResponse('', responseConfigError);
      preloadedIcons = [...preloadedIcons, ...await Promise.all(
        preload(uniqueInvalidIcon)
      )];

      expect(fetch.callCount).to.equal(3, 'Server requests for all preloaded icons should be made');
      expect(checkRequestedUrl(fetch.args, firstUniqueIconSrc)).to.equal(true, 'should request icons by name with CDN prefix');
      expect(checkRequestedUrl(fetch.args, secondUniqueIconSrc)).to.equal(true, 'should request icons with src');
      expect(checkRequestedUrl(fetch.args, uniqueInvalidIconSrc)).to.equal(true, 'should try to request invalid icon');
      expect(preloadedIcons[0].length > 0).to.equal(true, 'Should successfully preload icon by name with CDN prefix');
      expect(preloadedIcons[1].length > 0).to.equal(true, 'Should successfully preload icons with src');
      expect(preloadedIcons[2], 'Should not preload invalid icon').to.be.undefined;
      el.setAttribute('icon', firstUniqueIcon);
      await elementUpdated(el);

      expect(fetch.callCount).to.equal(3, 'no new requests should be made since icons are already preloaded');
    });
  });
});