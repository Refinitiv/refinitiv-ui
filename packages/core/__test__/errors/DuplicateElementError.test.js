import { expect } from '@refinitiv-ui/test-helpers';

import { DuplicateElementError } from '../../lib/errors/DuplicateElementError.js';

describe('TestDuplicateElementError', () => {
  it('Test generate simple message', async () => {
    try {
      throw new DuplicateElementError('test error');
    } catch (error) {
      expect(error).instanceOf(DuplicateElementError, 'Not a DuplicateElementError instance');
      expect(error.message).to.include('test error', 'Wrong error message');
      await expect(error.message).to.equalSnapshot();
    }
  });
});
