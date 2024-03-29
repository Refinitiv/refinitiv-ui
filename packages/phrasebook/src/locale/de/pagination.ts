import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  // page: current page #
  PAGE: 'Seite {page}',
  // page: current page #
  // pageTotal: total number of pages
  PAGE_OF: 'Seite {page} von {pageTotal}'
};

Phrasebook.define('de', 'ef-pagination', translations);

export default translations;
