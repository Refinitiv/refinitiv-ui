import sinon from 'sinon';

import '@refinitiv-ui/elements/configuration';
import '@refinitiv-ui/elements/icon';

import '@refinitiv-ui/elemental-theme/light/ef-icon.js';
import { expect, fixture } from '@refinitiv-ui/test-helpers';

import {
  checkRequestedUrl,
  createFakeResponse,
  generateUniqueName,
  iconName,
  responseConfigSuccess,
  tickSvgSprite
} from './helpers/helpers.js';

describe('icon/cdn-prefix', function () {
  let fetch;
  beforeEach(function () {
    fetch = sinon.stub(window, 'fetch');
  });
  afterEach(function () {
    window.fetch.restore(); // remove stub
  });
  it('Should make a correct server request based on cdn prefix and the icon if icon is specified', async function () {
    createFakeResponse(tickSvgSprite, responseConfigSuccess);
    const uniqueIconName = generateUniqueName(iconName); // to avoid caching
    const MockCDNPrefix = 'https://mock.cdn.com/icons/';
    const el = await fixture(
      `<ef-icon style="--cdn-prefix:'${MockCDNPrefix}'" icon="${uniqueIconName}"></ef-icon>`
    );
    const CDNPrefix = el.getComputedVariable('--cdn-prefix');
    const expectedSrc = `${CDNPrefix}${uniqueIconName}.svg`;

    expect(fetch.callCount).to.equal(1, 'Should make one request');
    expect(checkRequestedUrl(fetch.args, expectedSrc)).to.equal(
      true,
      `Requested URL should be ${expectedSrc} for the icon ${uniqueIconName}`
    );
  });

  it('Should contain cdn sprite prefix', async function () {
    createFakeResponse(tickSvgSprite, responseConfigSuccess);
    const uniqueIconName = generateUniqueName(iconName); // to avoid caching
    const el = await fixture(`<ef-icon icon="${uniqueIconName}"></ef-icon>`);
    const CDNPrefix = el.getComputedVariable('--cdn-sprite-prefix');

    expect(CDNPrefix).to.not.equal('', 'CDN prefix should not be empty string');
  });
});
