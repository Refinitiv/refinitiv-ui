import { NavigationGrid, CellIndex } from '@refinitiv-ui/utils/lib/navigation.js';
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
}

export type CalendarFilter = (value: string) => boolean;

export type Comparator = (
  value: string,
  compare: string
) => boolean

export interface CellDivElement extends HTMLDivElement, Cell {
  value?: string;
  disabled?: boolean;
  idle?: boolean;
  selected?: boolean;
  range?: boolean;
}

export type NavigationMap = {
  grid: NavigationGrid;
  map: { [key: string]: CellDivElement; }
  active?: CellIndex;
};

export type NavigationDirection = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown' | 'Home' | 'End';

export type Row = {
  cells: Cell[];
}
