import { Phrasebook } from '../../translation.js';

const translations = {
  PICK_YEAR: 'Jahr auswählen',
  PICK_MONTH: 'Monat auswählen',
  PICK_DAY: 'Tag auswählen',
  PICK_HOUR: 'Stunden auswählen',
  PICK_MINUTE: 'Minuten auswählen',
  PICK_SECOND: 'Sekunden auswählen',
  PICK_WEEKDAY: 'Wochentag auswählen',
  PICK_FRACTIONALSECOND: 'Millisekunden auswählen',
  PICK_DAYPERIOD: 'Tageszeitraum auswählen',
  VALUE: 'Aktueller Wert ist {value}',
  NO_VALUE: 'Kein Wert'
};

Phrasebook.define('de', 'ef-datetime-field', translations);

export default translations;
