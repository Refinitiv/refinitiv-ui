import sinon from 'sinon';

// import element and theme
import '@refinitiv-ui/elements/configuration';
import '@refinitiv-ui/elements/icon';

import '@refinitiv-ui/halo-theme/light/ef-icon.js';
import { expect, fixture } from '@refinitiv-ui/test-helpers';

import {
  checkRequestedUrl,
  createFakeResponse,
  iconName,
  isEqualSvg,
  responseConfigSuccess,
  tickSvgSprite
} from './helpers/helpers.js';

// Must match DefaultStyle.CDN_SPRITE_PREFIX in src/icon/const.ts
const DEFAULT_CDN_SPRITE_PREFIX =
  'https://cdn.refinitiv.net/public/libs/elf/assets/elf-theme-halo/resources/sprites/icons.svg';

// CDN prefixes are resolved once per page by the loader singletons, so this case needs its own test file
describe('icon/cdn-prefix-fallback', function () {
  let fetch;
  beforeEach(function () {
    fetch = sinon.stub(window, 'fetch');
  });
  afterEach(function () {
    window.fetch.restore(); // remove stub
  });

  it('Should fall back to the sprite when CDN prefixes resolve to empty values', async function () {
    createFakeResponse(tickSvgSprite, responseConfigSuccess);
    // `initial` makes the custom properties guaranteed-invalid, so getComputedStyle returns empty values
    const el = await fixture(
      `<ef-icon style="--cdn-prefix: initial; --cdn-sprite-prefix: initial" icon="${iconName}"></ef-icon>`
    );

    expect(el.getComputedVariable('--cdn-prefix')).to.equal(
      '',
      'CSS variable should resolve to an empty value'
    );
    expect(el.getComputedVariable('--cdn-sprite-prefix')).to.equal(
      '',
      'CSS variable should resolve to an empty value'
    );
    expect(fetch.callCount).to.equal(1, 'Should make one request');
    expect(checkRequestedUrl(fetch.args, DEFAULT_CDN_SPRITE_PREFIX)).to.equal(
      true,
      `Requested URL should use the fallback sprite prefix: ${DEFAULT_CDN_SPRITE_PREFIX}`
    );

    const svg = el.shadowRoot.querySelector('svg');

    expect(svg).to.not.equal(null, 'SVG element should exist when falling back to the sprite');
    expect(isEqualSvg(svg.outerHTML, tickSvgSprite)).to.equal(
      true,
      'Should render SVG, from the mock response'
    );
  });
});
