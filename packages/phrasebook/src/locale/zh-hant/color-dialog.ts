// Component docs https://elf.int.refinitiv.com/elements/color-dialog.html
import { Phrasebook } from '../../';
import './shared';
import dialogTranslations from './dialog';

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
