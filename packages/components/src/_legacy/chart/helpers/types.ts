export type DatasetColors = {
  solid: string | string[];
  opaque: string | string[];
};

export type ChartDataSetsColor = Chart.ChartColor | Chart.ChartColor[] | Chart.Scriptable<Chart.ChartColor> | undefined;

export type ChartConfig = Chart.ChartConfiguration
export type ChartUpdateProps = Chart.ChartUpdateProps

export interface MetaData {
  _chart: Chart;
  _datasetIndex: number;
  _index: number;
  _model: Model;
  _view: Model;
  _xScale: Chart.ChartScales;
  _yScale: Chart.ChartScales;
  hidden?: boolean;
}

// NOTE: This model is generic with a bunch of optional properties to represent all types of chart models.
// Each chart type defines their own unique model structure so some of these optional properties
// might always have values depending on the chart type.
interface Model {
  backgroundColor: string;
  borderAlign?: Chart.BorderAlignment;
  borderColor: string;
  borderWidth?: number;
  circumference?: number;
  controlPointNextX: number;
  controlPointNextY: number;
  controlPointPreviousX: number;
  controlPointPreviousY: number;
  endAngle?: number;
  hitRadius: number;
  innerRadius?: number;
  outerRadius?: number;
  pointStyle: string;
  radius: string;
  skip?: boolean;
  startAngle?: number;
  steppedLine?: undefined;
  tension: number;
  x: number;
  y: number;
  base: number;
  head: number;
}

export interface ChartHelpers {
  draw(): void;
}

export interface ChartJS extends Chart {
  new(
    context: string | CanvasRenderingContext2D | HTMLCanvasElement | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>,
    options: ChartConfig
  ): Chart;
  defaults: {
    global: Chart.ChartOptions & Chart.ChartFontOptions & {
      tooltips: Chart.ChartTooltipOptions;
      defaultColor: string;
      defaultLineHeight: number;
    };
    scale: {
      gridLines: {
        color: string;
        zeroLineColor: string;
      };
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Allow any type of value
  };
  helpers: {
    getHoverColor(value: string): string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Allow any type of value
  };
  isDatasetVisible(isDatasetVisible: number): boolean;
}
