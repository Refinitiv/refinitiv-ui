import type {
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

import type { RGBColor, HSLColor } from '@refinitiv-ui/utils/color.js';

type SeriesOptions = AreaSeriesPartialOptions | BarSeriesPartialOptions | CandlestickSeriesPartialOptions | HistogramSeriesPartialOptions | LineSeriesPartialOptions;
type SeriesStyleOptions = LineStyleOptions & AreaStyleOptions & BarStyleOptions & CandlestickStyleOptions & HistogramStyleOptions;

type SeriesData = LineData[] | BarData[] | HistogramData[];
type SeriesList = ISeriesApi<SeriesType>;
type SeriesDataItem = BarData | LineData;

type RowLegend = NodeListOf<Element> | HTMLElement | null;

type ColorToStringFunction = (param: string, ...arg: (string|number|undefined)[]) => RGBColor | HSLColor | null;

enum LegendStyle {
  vertical='vertical',
  horizontal='horizontal'
}

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
  fillOpacity?: number;
  lineWidth?: number;
}

interface InteractiveChartSeries {
  type: string;
  symbol?: string;
  symbolName?: string;
  legendPriceFormatter?: (price: string | number) => string | number;
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
  LegendStyle
};
