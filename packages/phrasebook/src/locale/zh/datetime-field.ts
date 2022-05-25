import { Phrasebook } from '../../translation.js';

const translations = {
  PICK_YEAR: '选择年',
  PICK_MONTH: '选择月',
  PICK_DAY: '选择日',
  PICK_HOUR: '选择小时',
  PICK_MINUTE: '选择分钟',
  PICK_SECOND: '选择秒钟',
  PICK_WEEKDAY: '选择工作日',
  PICK_FRACTIONALSECOND: '选择毫秒',
  PICK_DAYPERIOD: '选择日期间',
  VALUE: '当前值是 {value}',
  NO_VALUE: '没有值'
};

Phrasebook.define('zh', 'ef-datetime-field', translations);

export default translations;
