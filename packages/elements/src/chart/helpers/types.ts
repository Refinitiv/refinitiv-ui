import type { ElementSize } from '@refinitiv-ui/core';

export interface ResizeEvent extends CustomEvent {
  detail: ElementSize;
}

export type MergeObject = {
  [key: string]: any; // Allow any type of value
};

export type DatasetColors = {
  solid: string | string[];
  opaque: string | string[];
};

export type ChartDataSetsColor = Chart.ChartColor | Chart.ChartColor[] | Chart.Scriptable<Chart.ChartColor> | undefined;

export type ChartConfiguration = Chart.ChartConfiguration;

export type ChartUpdateProps = Chart.ChartUpdateProps;

export interface MetaData {
  _chart: Chart;
  _datasetIndex: number;
  _index: number;
  _view: any; // Allow any type of value
}

export interface ChartHelpers {
  draw(): void;
}

export interface ChartJS extends Chart {
  new(
    context: string | CanvasRenderingContext2D | HTMLCanvasElement | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>,
    options: ChartConfiguration
  ): Chart;
  defaults: {
    global: Chart.ChartOptions & Chart.ChartFontOptions & {
      tooltips: Chart.ChartTooltipOptions;
      defaultColor: string;
      defaultLineHeight: number;
    };
    [key: string]: any; // Allow any type of value
  };
  helpers: {
    [key: string]: any; // Allow any type of value
  };
  isDatasetVisible(isDatasetVisible: number): boolean;
}
