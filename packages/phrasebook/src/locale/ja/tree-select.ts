// Component docs https://elf.int.refinitiv.com/elements/tree-select.html
import { Phrasebook } from '../../translation.js';
import './shared.js';
import comboboxTranslations from './combo-box.js';

const translations = {
  ...comboboxTranslations,

  // used as a toggle control
  FULL_LIST: 'すべて',
  SELECTED: '選択項目のみ',
  EXPAND_COLLAPSE: '{expansion, select, false {すべてを展開} other {すべてを折りたたむ}}',
  SELECT_CONTROL: '{selected, select, false {すべて選択} other {選択をすべて解除}}',
  // button control
  DONE: '完了',
  // selection/filter feedback
  SELECTED_NUM: '{numSelected, plural, =0 {} =1 {1 件選択済み} other {# 件選択済み}}',
  MATCHES_NUM: '{numMatched, plural, =0 {該当項目はありません} =1 {検索結果 – 1件} other {検索結果 – #件}}'
};

Phrasebook.define('ja', 'ef-tree-select', translations);

export default translations;
