// Component docs https://ui.refinitiv.com/elements/color-picker
import { Phrasebook } from '../../translation.js';
import './shared.js';
import './color-dialog.js';

const translations = {
  VERY_LIGHT: '极浅',
  LIGHT: '浅',
  VERY_DARK: '极深',
  DARK: '深',
  BLACK: '黑色',
  WHITE: '白色',
  WITH: '，{number}%',
  YELLOW: '黄色',
  GREEN: '绿色',
  CYAN: '蓝绿色',
  BLUE: '蓝色',
  MAGENTA: '洋红色',
  RED: '红色'
};

Phrasebook.define('zh', 'ef-color-picker', translations);

export default translations;
