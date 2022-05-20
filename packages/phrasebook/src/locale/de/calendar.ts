import { Phrasebook } from '../../translation.js';

const translations = {
  PREVIOUS_MONTH: 'Vorheriger Monat',
  NEXT_MONTH: 'Nächster Monat',
  PREVIOUS_YEAR: 'Vorheriges Jahr',
  NEXT_YEAR: 'Nächstes Jahr',
  PREVIOUS_DECADE: 'Vorheriges Jahrzehnt',
  NEXT_DECADE: 'Nächstes Jahrzehnt',
  YEAR_SELECTOR: 'Click to select year',
  DATE_SELECTOR: 'Click to select date',
  CELL_LABEL: '{view, select, year {{value, date, ::yyyy}} month {{value, date, ::MMMM-yyyy}} other {{value, date, full}}}',
  SELECTED: 'Selected: {view, select, year {{value, date, ::yyyy}} month {{value, date, ::MMMM-yyyy}} other {{value, date, full}}}',
  NOW: '{view, select, year {Current year, {value, date, ::yyyy}} month {Current month, {value, date, ::MMMM-yyyy}} other {Today, {value, date, full}}}',
  SELECTED_NOW: 'Ausgewählt: {view, select, year {current year, {value, date, ::yyyy}} month {current month, {value, date, ::MMMM-yyyy}} other {today, {value, date, full}}}',
  SELECTED_DATE: 'Selected {count, plural, =1 {date is {value, date, full}} other {# dates, {value, date, full} and others}}',
  SELECTED_RANGE: 'Selected range is from {from, date, full}{to, select, null {} other { to {to, date, full}}}',
  SELECTED_NONE: 'Selected none. Choose {range, select, true {date range} other {{multiple, select, true {dates} other {date}}}}'
};

Phrasebook.define('de', 'ef-calendar', translations);

export default translations;
