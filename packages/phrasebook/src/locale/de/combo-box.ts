import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  MULTIPLE_ITEMS: 'Mehrere Objekte',
  NO_OPTIONS: 'Keine Ergebnisse',
  SELECTED_NUM: '{numSelected, plural, =0 {} =1 {Eine Auswahl.} other {# ausgewählt.}}'
};

Phrasebook.define('de', 'ef-combo-box', translations);

export default translations;
