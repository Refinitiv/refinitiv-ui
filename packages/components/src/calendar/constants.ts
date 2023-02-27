import { uuid } from '@refinitiv-ui/utils/uuid.js';

export enum RenderView {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year'
}
export const FIRST_DAY_OF_WEEK = 0; // 0 for Sunday
export const YEARS_PER_YEAR_VIEW = 16; /* must be a square number */
export const DAY_VIEW = {
  rowCount: 6,
  columnCount: 7,
  totalCount: 6 * 7
};
export const YEAR_VIEW = {
  rowCount: 4,
  columnCount: 4,
  totalCount: 4 * 4
};
export const MONTH_VIEW = {
  rowCount: 4,
  columnCount: 4,
  totalCount: 4 * 4
};
/**
 * A symbol to ensure these locales cannot be overridden
 */
export const CalendarLocaleScope = uuid();
