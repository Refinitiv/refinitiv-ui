import { Phrasebook } from '../../translation.js';

const translations = {
  PREVIOUS_MONTH: '前一个月',
  NEXT_MONTH: '下一个月',
  PREVIOUS_YEAR: '前一年',
  NEXT_YEAR: '下一年',
  PREVIOUS_DECADE: '前十年',
  NEXT_DECADE: '下一个十年',
  YEAR_SELECTOR: '点击来选择年份',
  DATE_SELECTOR: '点击来选择日期',
  CELL_LABEL: '{view, select, year {{value, date, ::yyyy}} month {{value, date, ::MMMM-yyyy}} other {{value, date, full}}}',
  SELECTED: '已选: {view, select, year {{value, date, ::yyyy}} month {{value, date, ::MMMM-yyyy}} other {{value, date, full}}}',
  NOW: '{view, select, year {Current year, {value, date, ::yyyy}} month {Current month, {value, date, ::MMMM-yyyy}} other {Today, {value, date, full}}}',
  SELECTED_NOW: '已选: {view, select, year {current year, {value, date, ::yyyy}} month {current month, {value, date, ::MMMM-yyyy}} other {today, {value, date, full}}}',
  SELECTED_DATE: '已选 {count, plural, =1 {date is {value, date, full}} other {# dates, {value, date, full} and others}}',
  SELECTED_RANGE: '所选范围开始于 {from, date, full}{to, select, null {} other { to {to, date, full}}}',
  SELECTED_NONE: '未选择。请选择 {range, select, true {date range} other {{multiple, select, true {dates} other {date}}}}'
};

Phrasebook.define('zh', 'ef-calendar', translations);

export default translations;
