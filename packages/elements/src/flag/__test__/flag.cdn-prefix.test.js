import sinon from 'sinon';

// import element and theme
import '@refinitiv-ui/elements/flag';
import { FlagLoader } from '@refinitiv-ui/elements/flag';

import '@refinitiv-ui/halo-theme/light/ef-flag.js';
import { expect, nextFrame } from '@refinitiv-ui/test-helpers';

import {
  checkRequestedUrl,
  createAndWaitForLoad,
  createFakeResponse,
  flagName,
  gbSvg,
  generateUniqueName,
  isEqualSvg,
  responseConfigSuccess
} from './helpers/helpers.js';

// Must match DefaultStyle.CDN_PREFIX in src/flag/const.ts
const DEFAULT_CDN_PREFIX = 'https://cdn.refinitiv.net/public/libs/elf/assets/elf-theme-halo/resources/flags/';

// CDN prefix is resolved once per page by the FlagLoader singleton, so this case needs its own test file
describe('flag/cdn-prefix', function () {
  let fetch;
  const resetLoaders = async () => {
    FlagLoader.reset();
    await nextFrame(5);
  };
  beforeEach(async function () {
    await resetLoaders();
    fetch = sinon.stub(window, 'fetch');
  });
  afterEach(async function () {
    window.fetch.restore(); // remove stub
    await resetLoaders();
  });

  it('Should fall back to the hardcoded CDN prefix when --cdn-prefix resolves to an empty value', async function () {
    createFakeResponse(gbSvg, responseConfigSuccess);
    const uniqueFlagName = generateUniqueName(flagName); // to avoid caching
    // `initial` makes the custom property guaranteed-invalid, so getComputedStyle returns an empty value
    const el = await createAndWaitForLoad(
      `<ef-flag style="--cdn-prefix: initial" flag="${uniqueFlagName}"></ef-flag>`
    );
    const expectedSrc = `${DEFAULT_CDN_PREFIX}${uniqueFlagName}.svg`;

    expect(el.getComputedVariable('--cdn-prefix')).to.equal(
      '',
      'CSS variable should resolve to an empty value'
    );
    expect(fetch.callCount).to.equal(1, 'Should make one request');
    expect(checkRequestedUrl(fetch.args, expectedSrc)).to.equal(
      true,
      `Requested URL should use the fallback prefix: ${expectedSrc}`
    );

    const svg = el.shadowRoot.querySelector('svg');

    expect(svg).to.not.equal(null, 'SVG element should exist when falling back to the default prefix');
    expect(isEqualSvg(svg.outerHTML, gbSvg)).to.equal(true, 'Should render SVG, from the mock response');
  });
});
