import { Phrasebook } from '../../translation.js';

const translations = {
  CHOOSE_DATE: 'Choose date',
  CHOOSE_DATE_TIME: 'Choose date and time',
  CHOOSE_TIME: 'Choose time',
  CHANGE_DATE: 'Change date: {from}',
  CHANGE_DATE_TIME: 'Change date and time: {from}',
  CHANGE_TIME: 'Change time: {from}',
  CHOOSE_DATE_RANGE: 'Choose date range',
  CHOOSE_DATE_TIME_RANGE: 'Choose date and time range',
  CHOOSE_TIME_RANGE: 'Choose time range',
  CHANGE_DATE_RANGE: 'Change date range: from {from} to {to}',
  CHANGE_DATE_TIME_RANGE: 'Change date and time range: from {from} to {to}',
  CHANGE_TIME_RANGE: 'Change time range: from {from} to {to}'
};

Phrasebook.define('en', 'ef-datetime-picker', translations);

export default translations;
