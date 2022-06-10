import { Phrasebook } from '../../translation.js';

const translations = {
  LOADING: '正在加載推薦項目',
  MORE_RESULTS: '更多結果關於 <mark>{ query }</mark>'
};

Phrasebook.define('zh-Hant', 'ef-autosuggest', translations);

export default translations;
