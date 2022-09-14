import { Phrasebook } from '../../translation.js';

const translations = {
  CHOOSE_DATE: '选择日期',
  CHOOSE_DATE_TIME: '选择日期与时间',
  CHOOSE_TIME: '选择时间',
  CHOOSE_DATE_RANGE: '选择日期范围',
  CHOOSE_DATE_TIME_RANGE: '选择日期与时间范围',
  CHOOSE_TIME_RANGE: '选择时间范围',
  VALUE_FROM: '从',
  VALUE_TO: '至',
  OPEN_CALENDAR: '打开日历'
};

Phrasebook.define('zh', 'ef-datetime-picker', translations);

export default translations;
