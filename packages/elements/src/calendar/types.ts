import { CellIndex } from '@refinitiv-ui/utils/navigation.js';

import { RenderView } from './constants.js';

export interface CellSelectionModel {
  selected?: boolean;
  range?: boolean;
  rangeFrom?: boolean;
  rangeTo?: boolean;
  firstDate?: boolean;
  lastDate?: boolean;
}

export interface Cell extends CellSelectionModel {
  view: RenderView;
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
export type CellModel = {
  active?: boolean;
  disabled?: boolean;
  firstDate?: boolean;
  idle?: boolean;
  index: CellIndex;
  lastDate?: boolean;
  now?: boolean;
  range?: boolean;
  rangeFrom?: boolean;
  rangeTo?: boolean;
  selected?: boolean;
  text?: string;
  value?: string;
  view: RenderView;
};

// public API
export type BeforeCellRenderEvent = CustomEvent<{
  cell: CellModel;
}>;
