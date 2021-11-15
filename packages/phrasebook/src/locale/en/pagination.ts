// Component docs https://elf.int.refinitiv.com/elements/pagination.html
import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  // page: current page #
  PAGE: 'Page {page}',
  // page: current page #
  // pageTotal: total number of pages
  PAGE_OF: 'Page {page} of {pageTotal}'
};

Phrasebook.define('en', 'ef-pagination', translations);

export default translations;
