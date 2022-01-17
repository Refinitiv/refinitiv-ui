import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  MULTIPLE_ITEMS: '多項',
  NO_OPTIONS: '未找到結果。',
  SELECTED_NUM: '{numSelected, plural, =0 {} =1 {已選 1 項。} other {已選 # 項。}}'
};

Phrasebook.define('zh-Hant', 'ef-combo-box', translations);

export default translations;
