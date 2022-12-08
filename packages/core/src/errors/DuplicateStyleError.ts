import { GenericError } from './GenericError.js';

const generateMessage = (name: string): string =>
/* eslint-disable-next-line indent */
`Only one theme file can be loaded per element

[${name}] has already been defined.

Potential causes:
1. You are trying to load a multiple variants of a theme
2. You have loaded multiple or duplicate themes in your application bundle`;

export class DuplicateStyleError extends GenericError {
  constructor (name: string) {
    super(generateMessage(name), 'https://ui.refinitiv.com/kb/duplicate-styles');
  }
}
