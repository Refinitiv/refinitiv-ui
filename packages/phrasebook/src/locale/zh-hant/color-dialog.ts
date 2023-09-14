import { Phrasebook } from '../../translation.js';
import dialogTranslations from './dialog.js';
import './shared.js';

const translations = {
  ...dialogTranslations,

  // Dialog title
  HEADER: '顏色選擇',
  // Color values for color mixer, has space for a single character
  RED: 'R',
  GREEN: 'G',
  BLUE: 'B'
};

Phrasebook.define('zh-Hant', 'ef-color-dialog', translations);

export default translations;
