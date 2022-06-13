import { Phrasebook } from '../../translation.js';

const translations = {
  LOADING: '正在加载推荐项',
  MORE_RESULTS: '更多结果关于 <mark>{ query }</mark>'
};

Phrasebook.define('zh', 'ef-autosuggest', translations);

export default translations;
