import { expect, fixture } from '@refinitiv-ui/test-helpers';
import '@refinitiv-ui/elements/configuration';

describe('configuration/Configuration', () => {
  it('should have defalut configuration', async () => {
    const elConfig = await fixture('<ef-configuration></ef-configuration>');
    await expect(elConfig.config).to.deep.equal({ icon: { map: {} } }, 'Should render SVG, from the server response');
  });
});
