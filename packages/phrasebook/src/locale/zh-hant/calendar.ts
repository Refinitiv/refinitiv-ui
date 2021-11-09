import { Phrasebook } from '../../translation.js';

const translations = {
  PREVIOUS_MONTH: 'Previous month',
  NEXT_MONTH: 'Next month',
  PREVIOUS_YEAR: 'Previous year',
  NEXT_YEAR: 'Next year',
  PREVIOUS_DECADE: 'Previous decade',
  NEXT_DECADE: 'Next decade',
  YEAR_SELECTOR: 'Click to select year',
  DATE_SELECTOR: 'Click to select date',
  CELL_LABEL: '{view, select, year {{value, date, ::yyyy}} month {{value, date, ::MMMM-yyyy}} other {{value, date, full}}}',
  SELECTED: 'Selected: {view, select, year {{value, date, ::yyyy}} month {{value, date, ::MMMM-yyyy}} other {{value, date, full}}}',
  NOW: '{view, select, year {Current year} month {Current month} other {Today}}',
  SELECTED_NOW: 'Selected: {view, select, year {current year} month {current month} other {today}}',
  SELECTED_DATE: 'Selected {count, plural, =1 {date is {value, date, full}} other {# dates, {value, date, full} and others}}',
  SELECTED_RANGE: 'Selected range is from {from, date, full}{to, select, null {} other { to {to, date, full}}}',
  SELECTED_NONE: 'Selected none. Choose {range, select, true {date range} other {{multiple, select, true {dates} other {date}}}}'
};

Phrasebook.define('zh-Hant', 'ef-calendar', translations);

export default translations;
