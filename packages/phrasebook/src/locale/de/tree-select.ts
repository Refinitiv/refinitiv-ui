// Component docs https://elf.int.refinitiv.com/elements/tree-select.html
import { Phrasebook } from '../../';
import './shared';
import comboboxTranslations from './combo-box';

const translations = {
  ...comboboxTranslations,

  // used as a toggle control
  FULL_LIST: 'Vollständige Liste',
  SELECTED: 'Ausgewählt',
  EXPAND_COLLAPSE: '{expansion, select, true {Alle einklappen} other {Alle ausklappen}}',
  SELECT_CONTROL: '{selected, select, true {Auswahl aufheben} other {Alle auswählen}}',
  // button control
  DONE: 'Fertig',
  // selection/filter feedback
  SELECTED_NUM: '{numSelected, plural, =0 {} =1 {Eine Auswahl.} other {# ausgewählt.}}',
  MATCHES_NUM: '{numMatched, plural, =0 {Keine Ergebnisse gefunden.} =1 {1 Ergebnis gefunden.} other {# Ergebnisse gefunden.}}'
};

Phrasebook.define('de', 'ef-tree-select', translations);

export default translations;
