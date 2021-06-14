type HeatmapConfiguration = {
  data: Array<HeatmapCell[]>;
  yAxis?: HeatmapYAxis;
  xAxis?: HeatmapXAxis;
}

type HeatmapXAxis = {
  labels: string[];
  shortLabels: string[];
  position: 'top' | 'bottom';
}

type HeatmapYAxis = {
  labels: string[];
  position: 'left' | 'right';
}

type HeatmapCell = {
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

type HeatmapCustomisableProperties = {
  label?: string;
  backgroundColor?: string;
  foregroundColor?: string;
}

type HeatmapTooltipCallback = (activeCell: HeatmapCell) => HTMLElement | undefined;

type HeatmapRenderCallback = (cell: HeatmapCell) => HeatmapCustomisableProperties;

export {
  HeatmapCell, HeatmapXAxis, HeatmapYAxis, HeatmapConfiguration, HeatmapTooltipCallback, HeatmapRenderCallback, HeatmapCustomisableProperties
};
