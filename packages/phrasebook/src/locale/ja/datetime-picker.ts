import { Phrasebook } from '../../translation.js';

const translations = {
  CHOOSE_DATE: '日付を選択',
  CHOOSE_DATE_TIME: '日付と時刻を選択',
  CHOOSE_TIME: '時刻を選択',
  CHOOSE_DATE_RANGE: '日付範囲を選択',
  CHOOSE_DATE_TIME_RANGE: '日付と時刻の範囲を選択',
  CHOOSE_TIME_RANGE: '時刻の範囲を選択',
  VALUE_FROM: '開始',
  VALUE_TO: '終了',
  OPEN_CALENDAR: 'カレンダーを開く'
};

Phrasebook.define('ja', 'ef-datetime-picker', translations);

export default translations;
