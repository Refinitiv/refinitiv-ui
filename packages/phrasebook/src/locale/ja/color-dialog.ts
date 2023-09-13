// Component docs https://ui.refinitiv.com/elements/color-dialog
import { Phrasebook } from '../../translation.js';
import dialogTranslations from './dialog.js';
import './shared.js';

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
