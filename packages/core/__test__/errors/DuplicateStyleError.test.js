import { expect } from '@refinitiv-ui/test-helpers';

import { DuplicateStyleError } from '../../lib/errors/DuplicateStyleError';

describe('TestDuplicateStyleError', () => {
  it('Test generate simple message', async () => {
    try {
      throw new DuplicateStyleError('test error');
    } catch (error) {
      expect(error).instanceOf(DuplicateStyleError, 'Not a DuplicateStyleError instance');
      expect(error.message).to.include('test error', 'Wrong error message');
      await expect(error.message).to.equalSnapshot();
    }
  });
});
