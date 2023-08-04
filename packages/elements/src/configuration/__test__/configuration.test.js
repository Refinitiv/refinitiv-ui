import '@refinitiv-ui/elements/configuration';

import { expect, fixture } from '@refinitiv-ui/test-helpers';

describe('configuration/Configuration', function () {
  it('should have defalut configuration', async function () {
    const elConfig = await fixture('<ef-configuration></ef-configuration>');
    await expect(elConfig.config).to.deep.equal(
      { icon: { map: {} } },
      'Should render SVG, from the server response'
    );
  });
});
