import { GenericError } from './GenericError';

const generateMessage = (name: string): string =>
/* eslint-disable-next-line indent */
`Only one version of a Custom Element can be registered in the browser

[${name}] has already been defined.

Recommended fix:
1. Run 'npm dedupe' in you project folder
2. Rebuild your project`;

export class DuplicateElementError extends GenericError {
  constructor (name: string) {
    super(generateMessage(name), 'https://elf.int.refinitiv.com/error/duplicate-element');
  }
}
