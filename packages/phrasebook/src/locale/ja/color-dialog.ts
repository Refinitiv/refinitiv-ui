// Component docs https://elf.int.refinitiv.com/elements/color-dialog.html
import { Phrasebook } from '../../translation.js';
import './shared.js';
import dialogTranslations from './dialog.js';

const translations = {
  ...dialogTranslations,

  // Dialog title
  HEADER: '色を選択',
  // Color values for color mixer, has space for a single character
  RED: 'R',
  GREEN: 'G',
  BLUE: 'B'
};

Phrasebook.define('ja', 'ef-color-dialog', translations);

export default translations;
