// Component docs https://elf.int.refinitiv.com/elements/color-dialog.html
import { Phrasebook } from '../../translation.js';
import dialogTranslations from './dialog.js';
import './shared.js';

const translations = {
  ...dialogTranslations,

  // Dialog title
  HEADER: 'Color Picker',
  // Color values for color mixer, has space for a single character
  RED: 'R',
  GREEN: 'G',
  BLUE: 'B'
};

Phrasebook.define('en', 'ef-color-dialog', translations);

export default translations;
