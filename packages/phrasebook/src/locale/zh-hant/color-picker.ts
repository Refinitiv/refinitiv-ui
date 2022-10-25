// Component docs https://elf.int.refinitiv.com/elements/color-picker.html
import { Phrasebook } from '../../translation.js';
import './shared.js';
import './color-dialog.js';

const translations = {
  VERY_LIGHT: 'Very light',
  LIGHT: 'Light',
  VERY_DARK: 'Very dark',
  DARK: 'Dark',
  BLACK: 'Black',
  WHITE: 'White',
  WITH: 'With {number}%',
  YELLOW: 'Yellow',
  GREEN: 'Green',
  CYAN: 'Cyan',
  BLUE: 'Blue',
  MAGENTA: 'Magenta',
  RED: 'Red'
};

Phrasebook.define('zh-hant', 'ef-color-picker', translations);

export default translations;
