import { expect, fixture } from '@refinitiv-ui/test-helpers';
import { tickSvgBase64 } from './helpers/helpers.js'
import '@refinitiv-ui/elements/config';
import '@refinitiv-ui/elements/icon';
import '@refinitiv-ui/elemental-theme/light/ef-icon.js';

describe('config/Icon', () => {
  it('should pass config to icon correctly', async () => {
    const elConfig = await fixture('<ef-config><ef-icon></ef-icon></ef-config>');
    elConfig.icon = { map: { "tick": tickSvgBase64 }}
    const elIcon = elConfig.querySelector('ef-icon');
    elIcon.icon = 'tick';
    expect(elIcon.iconMap).to.equal(tickSvgBase64, 'icon map value should same as config icon value')
  });
});

