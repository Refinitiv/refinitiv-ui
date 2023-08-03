import { expect, fixture } from '@refinitiv-ui/test-helpers';

import { matches } from '../../lib/utils/matches.js';

describe('Matches Helper', function () {
  it('Matches the element', async function () {
    const el = await fixture('<div test="true"></div>');
    expect(matches(el, 'div[test=true]')).to.equal(true);
    expect(matches(el, 'div[test=false]')).to.equal(false);
  });
});
