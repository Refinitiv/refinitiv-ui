// Component docs https://elf.int.refinitiv.com/elements/tree-select.html
import { Phrasebook } from '../../';
import './shared';
import comboboxTranslations from './combo-box';

const translations = {
  ...comboboxTranslations,

  // used as a toggle control
  FULL_LIST: '一覧を表示',
  SELECTED: '選択項目のみ表示',
  EXPAND_COLLAPSE: '{expansion, select, true {すべてを折りたたむ} other {すべてを展開}}',
  SELECT_CONTROL: '{selected, select, true {選択をすべて解除} other {すべて選択}}',
  // button control
  DONE: '完了',
  // selection/filter feedback
  SELECTED_NUM: '{numSelected, plural, =0 {} =1 {1 件選択済み} other {# 件選択済み}}',
  MATCHES_NUM: '{numMatched, plural, =0 {該当なし} =1 {1件見つかりました} other {# 件見つかりました}}'
};

Phrasebook.define('ja', 'ef-tree-select', translations);

export default translations;
