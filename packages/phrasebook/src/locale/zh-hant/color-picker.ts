// Component docs https://ui.refinitiv.com/elements/color-picker
import { Phrasebook } from '../../translation.js';
import './shared.js';
import './color-dialog.js';

const translations = {
  VERY_LIGHT: '極淺',
  LIGHT: '淺',
  VERY_DARK: '極深',
  DARK: '深',
  BLACK: '黑色',
  WHITE: '白色',
  WITH: '，{number}%',
  YELLOW: '黃色',
  GREEN: '綠色',
  CYAN: '藍綠色',
  BLUE: '藍色',
  MAGENTA: '洋紅色',
  RED: '紅色'
};

Phrasebook.define('zh-hant', 'ef-color-picker', translations);

export default translations;
