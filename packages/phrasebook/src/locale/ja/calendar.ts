import { Phrasebook } from '../../translation.js';

const translations = {
  PREVIOUS_MONTH: '前月',
  NEXT_MONTH: '翌月',
  PREVIOUS_YEAR: '前年',
  NEXT_YEAR: '翌年',
  PREVIOUS_DECADE: '前10年',
  NEXT_DECADE: '翌10年',
  YEAR_SELECTOR: 'クリックして年を選択',
  DATE_SELECTOR: 'クリックして日付を選択',
  CELL_LABEL: '{view, select, year {{value, date, ::yyyy}} month {{value, date, ::MMMM-yyyy}} other {{value, date, full}}}',
  SELECTED: '選択済み: {view, select, year {{value, date, ::yyyy}} month {{value, date, ::MMMM-yyyy}} other {{value, date, full}}}',
  NOW: '{view, select, year {Current year, {value, date, ::yyyy}} month {Current month, {value, date, ::MMMM-yyyy}} other {Today, {value, date, full}}}',
  SELECTED_NOW: '選択済み: {view, select, year {current year, {value, date, ::yyyy}} month {current month, {value, date, ::MMMM-yyyy}} other {today, {value, date, full}}}',
  SELECTED_DATE: 'Selected {count, plural, =1 {date is {value, date, full}} other {# dates, {value, date, full} and others}}',
  SELECTED_RANGE: '選択された範囲は {from, date, full}{to, select, null {} other { to {to, date, full}}} からです',
  SELECTED_NONE: '選択されていません。{range, select, true {date range} other {{multiple, select, true {dates} other {date}}}} を選択してください'
};

Phrasebook.define('ja', 'ef-calendar', translations);

export default translations;
