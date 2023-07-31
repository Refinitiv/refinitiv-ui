import { expect, fixture } from '@refinitiv-ui/test-helpers';

import '../lib/test/test-promise';

describe('Elf Translate Promise Test', function() {
  it('Check that promise can be resolved', async function () {
    const el = await fixture('<test-promise lang="en-GB"></test-inherited>');
    const message = await el.t('DEFAULT');
    expect(message).to.equal('This is en locale');
    expect(el.promiseResult).to.equal('This is en locale');
  });
});
