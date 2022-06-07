import { Phrasebook } from '../../translation.js';

const translations = {
  PICK_YEAR: '年を選択',
  PICK_MONTH: 'Pick Month',
  PICK_DAY: '日を選択',
  PICK_HOUR: '時間を選択',
  PICK_MINUTE: '分を選択',
  PICK_SECOND: '秒を選択',
  PICK_WEEKDAY: '週を選択',
  PICK_FRACTIONALSECOND: 'ミリ秒を選択',
  PICK_DAYPERIOD: '時刻区分を選択',
  VALUE: '現在の値は{value}です',
  NO_VALUE: '値がありません'
};

Phrasebook.define('ja', 'ef-datetime-field', translations);

export default translations;
