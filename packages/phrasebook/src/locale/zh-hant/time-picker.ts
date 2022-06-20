import { Phrasebook } from '../../translation.js';

const translations = {
  BEFORE_MIDDAY: '中午之前',
  AFTER_MIDDAY: '中午之後',
  TOGGLE_TIME_PERIOD: '切換時間期間',
  SELECT_HOURS: '{value, select, null {選擇小時} other {{value, plural, =1 {# 個小時} other {# 個小時}}}}',
  SELECT_MINUTES: '{value, select, null {選擇分鐘} other {{value, plural, =1 {# 分鐘} other {# 分鐘}}}}',
  SELECT_SECONDS: '{value, select, null {選擇秒鐘} other {{value, plural, =1 {# 秒鐘} other {# 秒鐘}}}}',
  SELECTED: '{value, select, null {未選擇。請選擇時間} other {所選時間是: {showSeconds, select, true {{amPm, select, true {{value, time, ::hmsa}} other {{value, time, ::Hms}}}} other {{amPm, select, true {{value, time, ::hma}} other {{value, time, ::Hm}}}}}}}'
};

Phrasebook.define('zh-hant', 'ef-time-picker', translations);

export default translations;
