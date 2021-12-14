import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  MULTIPLE_ITEMS: '複数項目',
  NO_OPTIONS: '該当する結果はありません。',
  CLEAR: 'Clear'
};

Phrasebook.define('ja', 'ef-combo-box', translations);

export default translations;
