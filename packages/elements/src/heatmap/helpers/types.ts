type TooltipCallback = (activeCell: Cell) => HTMLElement | undefined;

type CustomisableProperties = {
  label?: string;
  backgroundColor?: string;
  foregroundColor?: string;
}

type RenderCallback = (cell: Cell) => CustomisableProperties;

type Config = {
  data: Array<Cell[]>;
  yAxis?: YAxis;
  xAxis?: XAxis;
}

type XAxis = {
  labels: string[];
  shortLabels: string[];
  position: 'top' | 'bottom';
}

type YAxis = {
  labels: string[];
  position: 'left' | 'right';
}

type Cell = {
  rowIndex: number;
  colIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  value: number | null;
  header?: string;
  label?: string;
  foregroundColor: string;
  defaultBackground: string;
  backgroundColor: string;
  animationFrame?: number;
  customLabel?: string;
  customBackgroundColor?: string;
  customForegroundColor?: string;
}


export {
  Cell, XAxis, YAxis, Config, TooltipCallback, RenderCallback
};
