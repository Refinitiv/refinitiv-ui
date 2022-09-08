import { Phrasebook } from '../../translation.js';

const translations = {
  CHOOSE_DATE: '選擇日期',
  CHOOSE_DATE_TIME: '選擇日期與時間',
  CHOOSE_TIME: '選擇時間',
  CHOOSE_DATE_RANGE: '選擇日期範圍',
  CHOOSE_DATE_TIME_RANGE: '選擇日期與時間範圍',
  CHOOSE_TIME_RANGE: '選擇時間範圍',
  VALUE_FROM: '從',
  VALUE_TO: '至',
  OPEN_CALENDAR: '打開日曆'
};

Phrasebook.define('zh-Hant', 'ef-datetime-picker', translations);

export default translations;
