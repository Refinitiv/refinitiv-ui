import { expect } from '@refinitiv-ui/test-helpers';
import { DuplicateStyleError } from '../../lib/errors/DuplicateStyleError';

describe('TestDuplicateStyleError', () => {
  it('Test generate simple message', () => {
    try {
      throw new DuplicateStyleError('test error');

    }
    catch (error) {
      expect(error).instanceOf(DuplicateStyleError, 'Not a DuplicateStyleError instance');
      expect(error.message).to.include('test error', 'Wrong error message');
      expect(error.message).to.equalSnapshot();
    }
  });

});
