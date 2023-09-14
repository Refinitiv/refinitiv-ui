import { Phrasebook } from '../../translation.js';
import './color-dialog.js';
import './shared.js';

const translations = {
  VERY_LIGHT: 'Sehr hell',
  LIGHT: 'Hell',
  VERY_DARK: 'Sehr dunkel',
  DARK: 'Dunkel',
  BLACK: 'Schwarz',
  WHITE: 'Weiß',
  WITH: 'Mit {number}%',
  YELLOW: 'Gelb',
  GREEN: 'Grün',
  CYAN: 'Cyan',
  BLUE: 'Blau',
  MAGENTA: 'Magenta',
  RED: 'Rot'
};

Phrasebook.define('de', 'ef-color-picker', translations);

export default translations;
