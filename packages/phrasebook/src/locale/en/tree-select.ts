// Component docs https://elf.int.refinitiv.com/elements/tree-select.html
import { Phrasebook } from '../../';
import './shared';
import comboboxTranslations from './combo-box';

const translations = {
  ...comboboxTranslations,

  // used as a toggle control
  FULL_LIST: 'Full List',
  SELECTED: 'Selected',
  EXPAND_COLLAPSE: '{expansion, select, true {Collapse All} other {Expand All}}',
  SELECT_CONTROL: '{selected, select, true {Deselect All} other {Select All}}',
  // button control
  DONE: 'Done',
  // selection/filter feedback
  SELECTED_NUM: '{numSelected, plural, =0 {} =1 {One Selected.} other {# Selected.}}',
  MATCHES_NUM: '{numMatched, plural, =0 {No results found.} =1 {1 result found.} other {# results found.}}'
};

Phrasebook.define('en', 'ef-tree-select', translations);

export default translations;
