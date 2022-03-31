import { Phrasebook } from '../../translation.js';

const translations = {
  PICK_YEAR: 'Pick Year',
  PICK_MONTH: 'Pick Month',
  PICK_DAY: 'Pick Day',
  PICK_HOUR: 'Pick Hours',
  PICK_MINUTE: 'Pick Minutes',
  PICK_SECOND: 'Pick Seconds',
  PICK_WEEKDAY: 'Pick Weekday',
  PICK_FRACTIONALSECOND: 'Pick Milliseconds',
  PICK_DAYPERIOD: 'Pick Day Period',
  VALUE: 'Current value is {value}',
  NO_VALUE: 'No value'
};

Phrasebook.define('zh-Hant', 'ef-datetime-field', translations);

export default translations;
