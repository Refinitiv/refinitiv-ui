import { expect } from '@refinitiv-ui/test-helpers';
import { getItemId } from '../../../lib/list/helpers/item-id.js';

describe('Item id', () => {
  it('Should combine prefix and value', () => {
    const prefix = 'prefix';
    const value = 'value';
    const id = getItemId(prefix, value);
    expect(id).to.equal(`${prefix}-${value}`);
  })
  it('Should return empty string when either parameter is invalid', () => {
    const prefix = 'prefix';
    const value = '';
    const id = getItemId(prefix, value);
    expect(id).to.equal('');
  })
})
