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

export type CalendarFilter = (value: string) => boolean;

export type Comparator = (
  value: string,
  compare: string
) => boolean

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
