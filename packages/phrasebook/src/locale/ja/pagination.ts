// Component docs https://elf.int.refinitiv.com/elements/pagination.html
import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  // page: current page #
  // pageTotal: total number of pages
  PAGE_OF: '{pageTotal} ページ中 {page} ページ目 '
};

Phrasebook.define('ja', 'ef-pagination', translations);

export default translations;
