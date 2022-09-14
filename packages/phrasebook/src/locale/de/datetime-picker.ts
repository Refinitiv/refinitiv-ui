import { Phrasebook } from '../../translation.js';

const translations = {
  CHOOSE_DATE: 'Datum auswählen',
  CHOOSE_DATE_TIME: 'Datum und Uhrzeit auswählen',
  CHOOSE_TIME: 'Uhrzeit auswählen',
  CHOOSE_DATE_RANGE: 'Zeitraum auswählen',
  CHOOSE_DATE_TIME_RANGE: 'Datum und Zeitraum auswählen',
  CHOOSE_TIME_RANGE: 'Zeitraum auswählen',
  VALUE_FROM: ' Von',
  VALUE_TO: ' Bis',
  OPEN_CALENDAR: 'Kalender öffnen'
};

Phrasebook.define('de', 'ef-datetime-picker', translations);

export default translations;
