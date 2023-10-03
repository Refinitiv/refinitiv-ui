import { CellIndex } from '@refinitiv-ui/utils/navigation.js';

import { CalendarRenderView } from './constants.js';
import type { Calendar } from './index.js';

export interface CellSelectionModel {
  selected?: boolean;
  range?: boolean;
  rangeFrom?: boolean;
  rangeTo?: boolean;
  firstDate?: boolean;
  lastDate?: boolean;
}

export interface Cell extends CellSelectionModel {
  view: CalendarRenderView;
  text?: string;
  active?: boolean;
  value?: string;
  disabled?: boolean;
  idle?: boolean;
  now?: boolean;
  index: CellIndex;
}

// public API
export type CalendarFilter = (value: string) => boolean;

export type Comparator = (value: string, compare: string) => boolean;

export interface DateButtonElement extends HTMLDivElement {
  value: string;
  index: CellIndex;
}

export type NavigationDirection = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown' | 'Home' | 'End';

export type Row = Cell[];

export type WeekdayName = {
  narrow: string;
  long: string;
};

// public API
export type CalendarCell = {
  active: boolean;
  disabled: boolean;
  firstDate: boolean;
  idle: boolean;
  index: CellIndex;
  lastDate: boolean;
  now: boolean;
  range: boolean;
  rangeFrom: boolean;
  rangeTo: boolean;
  selected: boolean;
  text: string;
  value: string;
  view: CalendarRenderView;
};

// public API
export type BeforeCellRenderEvent = CustomEvent<{
  cell: CalendarCell;
  calendar: Calendar;
}>;
