import { Phrasebook } from '../../translation.js';

const translations = {
  LOADING: 'Loading suggestion items',
  MORE_RESULTS: 'More results for <mark>{ query }</mark>'
};

Phrasebook.define('en', 'ef-autosuggest', translations);

export default translations;
