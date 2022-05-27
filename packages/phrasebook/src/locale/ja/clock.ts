import { Phrasebook } from '../../translation.js';

const translations = {
  TIME: 'Time: {showSeconds, select, true {{amPm, select, true {{value, time, ::hmsa}} other {{value, time, ::Hms}}}} other {{amPm, select, true {{value, time, ::hma}} other {{value, time, ::Hm}}}}}'
};

Phrasebook.define('ja', 'ef-clock', translations);

export default translations;
