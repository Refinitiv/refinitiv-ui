import { Phrasebook } from '../../translation.js';

const translations = {
  BEFORE_MIDDAY: '中午之前',
  AFTER_MIDDAY: '中午之后',
  TOGGLE_TIME_PERIOD: '切换时间期间',
  SELECT_HOURS: '{value, select, null {选择小时} other {{value, plural, =1 {# 个小时} other {# 个小时}}}}',
  SELECT_MINUTES: '{value, select, null {选择分钟} other {{value, plural, =1 {# 分钟} other {# 分钟}}}}',
  SELECT_SECONDS: '{value, select, null {选择秒钟} other {{value, plural, =1 {# 秒钟} other {# 秒钟}}}}',
  SELECTED: '{value, select, null {未选择。请选择时间} other {所选时间是: {showSeconds, select, true {{amPm, select, true {{value, time, ::hmsa}} other {{value, time, ::Hms}}}} other {{amPm, select, true {{value, time, ::hma}} other {{value, time, ::Hm}}}}}}}'
};

Phrasebook.define('zh', 'ef-time-picker', translations);

export default translations;
