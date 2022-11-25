import { GenericError } from './GenericError.js';

const generateMessage = (name: string): string =>
/* eslint-disable-next-line indent */
`Only one version of a Custom Element can be registered in the browser

[${name}] has already been defined.

Potential causes:
1. No deduplication task has been performed
2. The same element definition has been loaded in multiple bundles
3. A single package has been upgraded, without upgrading other EF dependencies

Recommended fix:
1. Run 'npm dedupe' in you project folder
2. Rebuild your project`;

export class DuplicateElementError extends GenericError {
  constructor (name: string) {
    super(generateMessage(name), 'https://ui.refinitiv.com/kb/duplicate-element');
  }
}
