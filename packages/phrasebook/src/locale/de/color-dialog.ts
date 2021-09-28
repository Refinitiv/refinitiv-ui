// Component docs https://elf.int.refinitiv.com/elements/color-dialog.html
import { Phrasebook } from '../../translation.js';
import './shared.js';
import dialogTranslations from './dialog';

const translations = {
  ...dialogTranslations,

  // Dialog title
  HEADER: 'Farbauswahl',
  // Color values for color mixer, has space for a single character
  RED: 'R',
  GREEN: 'G',
  BLUE: 'B'
};

Phrasebook.define('de', 'ef-color-dialog', translations);

export default translations;
