import { expect } from '@refinitiv-ui/test-helpers';

import { DuplicateElementError } from '../../lib/errors/DuplicateElementError.js';

const duplicateElementErrorMessage = `Only one version of a Custom Element can be registered in the browser

[test error] has already been defined.

Potential causes:
1. No deduplication task has been performed
2. The same element definition has been loaded in multiple bundles
3. A single package has been upgraded, without upgrading other EF dependencies

Recommended fix:
1. Run 'npm dedupe' in you project folder
2. Rebuild your project

https://ui.refinitiv.com/kb/duplicate-element
`;
describe('TestDuplicateElementError', function () {
  it('Test generate simple message', async function () {
    try {
      throw new DuplicateElementError('test error');
    } catch (error) {
      expect(error).instanceOf(DuplicateElementError, 'Not a DuplicateElementError instance');
      expect(error.message).to.include('test error', 'Wrong error message');
      await expect(error.message).to.equal(duplicateElementErrorMessage);
    }
  });
});
