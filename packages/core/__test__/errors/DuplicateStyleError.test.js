import { expect } from '@refinitiv-ui/test-helpers';

import { DuplicateStyleError } from '../../lib/errors/DuplicateStyleError.js';

const duplicateStyleErrorMessage = `Only one theme file can be loaded per element

[test error] has already been defined.

Potential causes:
1. You are trying to load a multiple variants of a theme
2. You have loaded multiple or duplicate themes in your application bundle

https://ui.refinitiv.com/kb/duplicate-styles
`;

describe('TestDuplicateStyleError', function () {
  it('Test generate simple message', function () {
    try {
      throw new DuplicateStyleError('test error');
    } catch (error) {
      expect(error).instanceOf(DuplicateStyleError, 'Not a DuplicateStyleError instance');
      expect(error.message).to.include('test error', 'Wrong error message');
      expect(error.message).to.equal(duplicateStyleErrorMessage);
    }
  });
});
