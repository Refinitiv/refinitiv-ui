import { Phrasebook } from '../../translation.js';

const translations = {
  BEFORE_MIDDAY: 'Vormittags',
  AFTER_MIDDAY: 'Nachmittags',
  TOGGLE_TIME_PERIOD: ' Zeitraum wechseln',
  SELECT_HOURS: '{value, select, null {Select hours} other {{value, plural, =1 {# hour} other {# hours}}}}',
  SELECT_MINUTES: '{value, select, null {Select minutes} other {{value, plural, =1 {# minute} other {# minutes}}}}',
  SELECT_SECONDS: '{value, select, null {Select seconds} other {{value, plural, =1 {# second} other {# seconds}}}}',
  SELECTED: '{value, select, null {Selected none. Choose time} other {Selected time is: {showSeconds, select, true {{amPm, select, true {{value, time, ::hmsa}} other {{value, time, ::Hms}}}} other {{amPm, select, true {{value, time, ::hma}} other {{value, time, ::Hm}}}}}}}'
};

Phrasebook.define('de', 'ef-time-picker', translations);

export default translations;
