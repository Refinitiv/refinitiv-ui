import { expect } from '@refinitiv-ui/test-helpers';

import { DuplicateStyleError } from '../../lib/errors/DuplicateStyleError.js';

describe('TestDuplicateStyleError', function () {
  it('Test generate simple message', async function () {
    try {
      throw new DuplicateStyleError('test error');
    } catch (error) {
      expect(error).instanceOf(DuplicateStyleError, 'Not a DuplicateStyleError instance');
      expect(error.message).to.include('test error', 'Wrong error message');
      await expect(error.message).to.equalSnapshot();
    }
  });
});
