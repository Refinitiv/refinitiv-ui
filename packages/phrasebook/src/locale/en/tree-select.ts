// Component docs https://elf.int.refinitiv.com/elements/tree-select.html
import { Phrasebook } from '../../';
import './shared';
import comboboxTranslations from './combo-box';

const translations = {
  ...comboboxTranslations,

  // used as a toggle control
  FULL_LIST: 'Full List',
  SELECTED: 'Selected',
  EXPAND_COLLAPSE: '{expansion, select, false {Expand All} true {Collapse All}}',
  SELECT_CONTROL: '{selected, select, false {Select All} true {Deselect All}}',
  // button control
  DONE: 'Done',
  // selection/filter feedback
  SELECTED_NUM: '{numSelected, plural, =0 {} =1 {One Selected.} other {# Selected.}}',
  MATCHES_NUM: '{numMatched, plural, =0 {No Matches.} =1 {One Match.} other {# Matches.}}'
};

Phrasebook.define('en', 'ef-tree-select', translations);

export default translations;
