import { expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';
import { tickSvgBase64, tickSvg, isEqualSvg } from './helpers/helpers.js'
import '@refinitiv-ui/elements/configuration';
import '@refinitiv-ui/elements/icon';
import '@refinitiv-ui/elemental-theme/light/ef-icon.js';

describe('configuration/Configuration', () => {
  it('should pass config to icon correctly', async () => {
    const elConfig = await fixture('<ef-configuration><ef-icon></ef-icon></ef-configuration>');
    elConfig.icon = { map: { "tick-base64": tickSvgBase64 }};
    const elIcon = elConfig.querySelector('ef-icon');
    elIcon.icon = 'tick-base64';
    await nextFrame(2);
    const svg = elIcon.shadowRoot.querySelector('svg');
   await expect(isEqualSvg(svg.outerHTML, tickSvg)).to.equal(true, 'Should render SVG, from the server response');
  });
});
