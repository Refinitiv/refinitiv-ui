import { Phrasebook } from '../../translation.js';

const translations = {
  LOADING: '候補を読み込んでいます',
  MORE_RESULTS: '<mark>{ query }</mark> のその他の検索結果'
};

Phrasebook.define('ja', 'ef-autosuggest', translations);

export default translations;
