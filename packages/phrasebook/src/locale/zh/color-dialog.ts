import { Phrasebook } from '../../translation.js';
import dialogTranslations from './dialog.js';
import './shared.js';

const translations = {
  ...dialogTranslations,

  // Dialog title
  HEADER: '颜色选择',
  // Color values for color mixer, has space for a single character
  RED: 'R',
  GREEN: 'G',
  BLUE: 'B'
};

Phrasebook.define('zh', 'ef-color-dialog', translations);

export default translations;
