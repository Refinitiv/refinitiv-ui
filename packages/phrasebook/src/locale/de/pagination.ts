// Component docs https://elf.int.refinitiv.com/elements/pagination.html
import { Phrasebook } from '../../';
import './shared';

const translations = {
  // page: current page #
  // pageTotal: total number of pages
  PAGE_OF: 'Seite {page} von {pageTotal}',
  /*
   * totalCount: total number of items
   * pageSize: Number of items per page
   * ** To translate
   * No items
   * of = eg page 1 of 2
   * item
   * items
   */
  ITEM_INFO: '{totalCount, plural, =0 {Keine Elemente} other {{ totalCount, plural, other { {pageSize, plural, =1 {#} other {{from} - {to}}} von {totalCount} {totalCount, plural, =1 {item} other {items}}} }} }'
};

Phrasebook.define('de', 'ef-pagination', translations);

export default translations;
