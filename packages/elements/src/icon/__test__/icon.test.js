import sinon from 'sinon';
import { elementUpdated, expect, isIE } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/icon';
import '@refinitiv-ui/elemental-theme/light/ef-icon.js';
import { preload } from '@refinitiv-ui/elements/icon';

// ignore changes in test.js

import {
  createAndWaitForLoad,
  createMockSrc,
  generateUniqueName,
  iconName,
  tickSvg,
  checkRequestedUrl
} from './helpers/helpers';

describe('icon/Icon', () => {
  describe('Should Have Correct DOM Structure', () => {
    it('without icon or src attributes', async () => {
      const el = await createAndWaitForLoad('<ef-icon></ef-icon>');
      const svg = el.shadowRoot.querySelector('svg');
      expect(svg).to.equal(null, 'No SVG element should not exist if there is nothing to load');
    });

    it('with valid icon attribute', async () => {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([200, { 'Content-Type': 'image/svg+xml' }, tickSvg]);
      const el = await createAndWaitForLoad(`<ef-icon icon="${iconName}"></ef-icon>`);
      const svg = el.shadowRoot.querySelector('svg');
      expect(svg).to.not.equal(null, 'SVG element should exist for valid icon attribute');
      // Unable to make snapshots of SVGs because of semantic-dom-dif: https://open-wc.org/testing/semantic-dom-diff.html
      // Avoiding this check on IE because it adds custom attributes which cant be ignored with `ignoreAttributes`
      if (!isIE) {
        expect(svg.outerHTML).to.equal(tickSvg, 'Should render SVG, from the server response');
      }
    });

    it('with valid src attribute', async () => {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([200, { 'Content-Type': 'image/svg+xml' }, tickSvg]);
      const el = await createAndWaitForLoad('<ef-icon src="https://mock.cdn.com/icons/ticks.svg"></ef-icon>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.not.equal(null, 'SVG element should exist for valid src attribute');
      if (!isIE) {
        expect(svg.outerHTML).to.equal(tickSvg, 'Should render SVG, from the server response');
      }
    });

    it('with invalid icon attribute', async () => {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([404, {}, '']);
      const el = await createAndWaitForLoad('<ef-icon icon="invalid"></ef-icon>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for invalid icon attribute');
    });

    it('with invalid src attribute', async () => {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([404, {}, '']);
      const el = await createAndWaitForLoad('<ef-icon src="https://mock.cdn.com/icons/invalid.svg"></ef-icon>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for invalid src attribute');
    });

    it('with empty icon attribute', async () => {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([404, {}, '']);
      const el = await createAndWaitForLoad('<ef-icon icon=""></ef-icon>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for empty icon attribute');
    });

    it('with empty src attribute', async () => {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([404, {}, '']);
      const el = await createAndWaitForLoad('<ef-icon src=""></ef-icon>');
      const svg = el.shadowRoot.querySelector('svg');

      expect(svg).to.equal(null, 'SVG element should not exist for empty src attribute');
    });

    it('with unsafe nodes in response', async () => {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([200, { 'Content-Type': 'image/svg+xml' }, '<script></script>']);
      const el = await createAndWaitForLoad('<ef-icon icon="malicious"></ef-icon>');
      const script = el.shadowRoot.querySelector('script');

      expect(script).to.equal(null, 'should strip unsafe nodes');
    });
  });

  describe('Should Have Correct Properties', () => {
    it('icon', async () => {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([200, { 'Content-Type': 'image/svg+xml' }, tickSvg]);
      const el = await createAndWaitForLoad('<ef-icon></ef-icon>');

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

    it('src', async () => {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([200, { 'Content-Type': 'image/svg+xml' }, tickSvg]);
      const el = await createAndWaitForLoad('<ef-icon></ef-icon>');
      const srcValue = createMockSrc(iconName);

      expect(el.hasAttribute('src')).to.equal(false, 'Icon should not have the src attribute by default');
      expect(el.src).to.equal(null, 'Icon should not have the src property by default');

      el.setAttribute('src', srcValue);
      await elementUpdated(el);

      expect(el.hasAttribute('src')).to.equal(true, 'Icon should have the src attribute when set');
      expect(el.getAttribute('src')).to.equal(srcValue, 'Icon should have the same src attribute as was set');
      expect(el.src).to.equal(srcValue, 'Icon should reflect the src attribute to property');

      el.removeAttribute('src');
      await elementUpdated(el);

      expect(el.hasAttribute('src')).to.equal(false, 'Icon should not have the src attribute after it was removed');
      expect(el.src).to.equal(null, 'Icon should not have the src property after attribute was removed');

      el.src = srcValue;
      await elementUpdated(el);

      expect(el.src).to.equal(srcValue, 'Icon should have the same src property as was set');
      expect(el.hasAttribute('src')).to.equal(false, 'Icon should not reflect the src property to the attribute');
    });
  });

  describe('Functional Tests', () => {
    it('should set the src property based on the icon and CDN prefix', async () => {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([200, { 'Content-Type': 'image/svg+xml' }, tickSvg]);
      const el = await createAndWaitForLoad(`<ef-icon icon="${iconName}"></ef-icon>`);
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDNPrefix should exist to create the src based on the icon').to.exist;
      const expectedSrc = `${CDNPrefix}${iconName}.svg`;

      expect(el.src).to.equal(expectedSrc, `The src property should be ${expectedSrc} for the icon ${iconName}`);

      el.removeAttribute('icon');
      await elementUpdated(el);

      expect(el.src).to.equal(null, 'The src property should be null when icon removed');
    });

    it('should make a correct server request based on cdn prefix and the icon if icon is specified', async () => {
      const server = sinon.createFakeServer({ respondImmediately: true });
      server.respondWith([200, { 'Content-Type': 'image/svg+xml' }, tickSvg]);
      const uniqueIconName = generateUniqueName(iconName); // to avoid caching
      const el = await createAndWaitForLoad(`<ef-icon icon="${uniqueIconName}"></ef-icon>`);
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDN prefix should exist to create the src based on the icon').to.exist;
      const expectedSrc = `${CDNPrefix}${uniqueIconName}.svg`;

      expect(server.requests.length).to.equal(1, 'Should make one request');
      expect(server.requests[0].url).to.equal(expectedSrc, `requested URL should be ${expectedSrc} for the icon ${uniqueIconName}`);
    });

    it('should make a correct server request based on src', async () => {
      const server = sinon.createFakeServer({ respondImmediately: true });
      const uniqueIconName = generateUniqueName(iconName); // to avoid caching
      const uniqueSrc = createMockSrc(uniqueIconName);
      server.respondWith('GET', uniqueSrc, [200, { 'Content-Type': 'image/svg+xml' }, tickSvg]);

      await createAndWaitForLoad(`<ef-icon src="${uniqueSrc}"></ef-icon>`);
      expect(server.requests.length).to.equal(1, 'Should make one request');
      expect(server.requests[0].url).to.equal(uniqueSrc, `requested URL should be ${uniqueSrc}`);
    });

    it('should preload icons', async () => {
      let server = sinon.createFakeServer({ respondImmediately: true });

      const el = await createAndWaitForLoad('<ef-icon></ef-icon>');
      const CDNPrefix = el.getComputedVariable('--cdn-prefix');

      expect(CDNPrefix, 'CDN prefix should exist in order for preload to work properly with icon name').to.exist;
      expect(server.requests.length).to.equal(0, 'No request should be sent for empty icon');

      const firstUniqueIcon = generateUniqueName(iconName);
      const secondUniqueIcon = generateUniqueName(iconName);
      const uniqueInvalidIcon = generateUniqueName(iconName);

      const firstUniqueIconSrc = `${CDNPrefix}${firstUniqueIcon}.svg`;
      const secondUniqueIconSrc = createMockSrc(secondUniqueIcon);
      const uniqueInvalidIconSrc = `${CDNPrefix}${uniqueInvalidIcon}.svg`;

      server.respondWith('GET', firstUniqueIconSrc, [200, { 'Content-Type': 'image/svg+xml' }, tickSvg]);
      server.respondWith('GET', secondUniqueIconSrc, [200, { 'Content-Type': 'image/svg+xml' }, tickSvg]);
      server.respondWith('GET', uniqueInvalidIconSrc, [404, {}, '']);

      const preloadedIcons = await Promise.all(
        preload(firstUniqueIcon, secondUniqueIconSrc, uniqueInvalidIcon)
      );
      expect(server.requests.length).to.equal(3, 'Server requests for all preloaded icons should be made');
      expect(checkRequestedUrl(server.requests, firstUniqueIconSrc)).to.equal(true, 'should request icons by name with CDN prefix');
      expect(checkRequestedUrl(server.requests, secondUniqueIconSrc)).to.equal(true, 'should request icons with src');
      expect(checkRequestedUrl(server.requests, uniqueInvalidIconSrc)).to.equal(true, 'should try to request invalid icon');
      expect(preloadedIcons[0].length > 0).to.equal(true, 'Should successfully preload icon by name with CDN prefix');
      expect(preloadedIcons[1].length > 0).to.equal(true, 'Should successfully preload icons with src');
      expect(preloadedIcons[2], 'Should not preload invalid icon').to.be.undefined;
      el.setAttribute('icon', firstUniqueIcon);
      await elementUpdated(el);

      expect(server.requests.length).to.equal(3, 'no new requests should be made since icons are already preloaded');
    });
  });
});

