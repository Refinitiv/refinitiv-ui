import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  MULTIPLE_ITEMS: '多项',
  NO_OPTIONS: '未找到结果。',
  SELECTED_NUM: '{numSelected, plural, =0 {} =1 {已选 1 项。} other {已选 # 项。}}'
};

Phrasebook.define('zh', 'ef-combo-box', translations);

export default translations;
