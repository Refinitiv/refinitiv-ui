// Component docs https://ui.refinitiv.com/elements/color-picker
import { Phrasebook } from '../../translation.js';
import './shared.js';
import './color-dialog.js';

const translations = {
  VERY_LIGHT: '非常に薄い',
  LIGHT: '薄い',
  VERY_DARK: '非常に濃い',
  DARK: '濃い',
  BLACK: '黒',
  WHITE: '白',
  WITH: '、{number}%',
  YELLOW: '黄色',
  GREEN: '緑',
  CYAN: '水色',
  BLUE: '青',
  MAGENTA: '赤紫',
  RED: '赤'
};

Phrasebook.define('ja', 'ef-color-picker', translations);

export default translations;
