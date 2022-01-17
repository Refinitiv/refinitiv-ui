import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  MULTIPLE_ITEMS: '複数項目',
  NO_OPTIONS: '該当する結果はありません。',
  SELECTED_NUM: '{numSelected, plural, =0 {} =1 {1 件選択済み} other {# 件選択済み}}'
};

Phrasebook.define('ja', 'ef-combo-box', translations);

export default translations;
