import { Phrasebook } from '../../translation.js';

const translations = {
  CHOOSE_DATE: 'Choose date',
  CHOOSE_DATE_TIME: 'Choose date and time',
  CHOOSE_TIME: 'Choose time',
  CHOOSE_DATE_RANGE: 'Choose date range',
  CHOOSE_DATE_TIME_RANGE: 'Choose date and time range',
  CHOOSE_TIME_RANGE: 'Choose time range',
  VALUE_FROM: 'From',
  VALUE_TO: 'To',
  OPEN_CALENDAR: 'Open calendar'
};

Phrasebook.define('ja', 'ef-datetime-picker', translations);

export default translations;
