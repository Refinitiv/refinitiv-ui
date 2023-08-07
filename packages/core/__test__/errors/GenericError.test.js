import { expect } from '@refinitiv-ui/test-helpers';

import { GenericError } from '../../lib/errors/GenericError.js';

describe('TestGenericError', function () {
  it('Test generate simple message', function () {
    try {
      throw new GenericError('test error');
    } catch (error) {
      expect(error).instanceOf(GenericError, 'Not a GenericError instance');
      expect(error.message).to.equal('test error', 'Wrong error message');
    }
  });
  it('Test generate message with url', function () {
    try {
      throw new GenericError('test error', 'test-url');
    } catch (error) {
      expect(error).instanceOf(GenericError, 'Not a GenericError instance');
      expect(error.message).to.equal('test error\n\ntest-url\n', 'Wrong error message with url');
    }
  });
});
