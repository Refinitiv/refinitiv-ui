import { Phrasebook } from '../../translation.js';

const translations = {
  LOADING: 'Vorgeschlagene Elemente werden geladen',
  MORE_RESULTS: 'Weitere Ergebnisse für <mark>{ query }</mark>'
};

Phrasebook.define('de', 'ef-autosuggest', translations);

export default translations;
