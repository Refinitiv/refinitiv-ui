import { Phrasebook } from '../../translation.js';

const translations = {
  PICK_YEAR: '選擇年',
  PICK_MONTH: '選擇月',
  PICK_DAY: '選擇日',
  PICK_HOUR: '選擇小時',
  PICK_MINUTE: '選擇分鐘',
  PICK_SECOND: '選擇秒鐘',
  PICK_WEEKDAY: '選擇工作日',
  PICK_FRACTIONALSECOND: '選擇毫秒',
  PICK_DAYPERIOD: '選擇日期間',
  VALUE: '當前值是 {value}',
  NO_VALUE: '沒有值'
};

Phrasebook.define('zh-Hant', 'ef-datetime-field', translations);

export default translations;
