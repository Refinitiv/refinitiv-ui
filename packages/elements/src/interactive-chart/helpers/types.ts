import {
  LineData,
  BarData,
  HistogramData,
  DeepPartial,
  ChartOptions,
  SeriesPartialOptions,
  LineSeriesPartialOptions,
  AreaSeriesPartialOptions,
  BarSeriesPartialOptions,
  CandlestickSeriesPartialOptions,
  HistogramSeriesPartialOptions,
  LineStyleOptions,
  AreaStyleOptions,
  BarStyleOptions,
  CandlestickStyleOptions,
  HistogramStyleOptions,
  ISeriesApi,
  SeriesType
} from 'lightweight-charts';

import type { RGBColor, HSLColor } from '@refinitiv-ui/utils';

type SeriesOptions = AreaSeriesPartialOptions | BarSeriesPartialOptions | CandlestickSeriesPartialOptions | HistogramSeriesPartialOptions | LineSeriesPartialOptions;
type SeriesStyleOptions = LineStyleOptions & AreaStyleOptions & BarStyleOptions & CandlestickStyleOptions & HistogramStyleOptions;

type SeriesData = LineData[] | BarData[] | HistogramData[];
type SeriesList = ISeriesApi<SeriesType>;
type SeriesDataItem = BarData | LineData;

type RowLegend = NodeListOf<Element> | HTMLElement | null;

type ColorToStringFunction = (param: string, ...arg: (string|number|undefined)[]) => RGBColor | HSLColor | null;

type MergeObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow any type of value
};

interface Time {
  day: number;
  month: number;
  year: number;
}

interface InteractiveChartConfig {
  series: InteractiveChartSeries[];
  options?: DeepPartial<ChartOptions>;
}

interface Theme {
  color?: string;
  backgroundColor: string;
  textColor: string;
  scalePriceBorderColor: string;
  scaleTimesBorderColor: string;
  gridVertLineColor: string;
  gridHorzLineColor: string;
  crossHairColor: string;
  chartUpColor: string;
  chartDownColor: string;
  fillOpacity: number | undefined;
  lineWidth: number | undefined;
}

interface InteractiveChartSeries {
  type: string;
  symbol?: string;
  symbolName?: string;
  legendPriceFormatter?: CallableFunction;
  data: SeriesData;
  seriesOptions?: SeriesPartialOptions<SeriesOptions>;
}

export {
  InteractiveChartConfig,
  InteractiveChartSeries,
  Time,
  Theme,
  RowLegend,
  SeriesList,
  SeriesDataItem,
  SeriesStyleOptions,
  ColorToStringFunction,
  MergeObject
};
