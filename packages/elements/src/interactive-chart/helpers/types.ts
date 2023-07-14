import type { HSLColor, RGBColor } from '@refinitiv-ui/utils/color.js';
import type {
  AreaSeriesPartialOptions,
  AreaStyleOptions,
  BarData,
  BarSeriesPartialOptions,
  BarStyleOptions,
  CandlestickSeriesPartialOptions,
  CandlestickStyleOptions,
  ChartOptions,
  DeepPartial,
  HistogramData,
  HistogramSeriesPartialOptions,
  HistogramStyleOptions,
  ISeriesApi,
  LineData,
  LineSeriesPartialOptions,
  LineStyleOptions,
  SeriesPartialOptions,
  SeriesType
} from 'lightweight-charts';

type SeriesOptions =
  | AreaSeriesPartialOptions
  | BarSeriesPartialOptions
  | CandlestickSeriesPartialOptions
  | HistogramSeriesPartialOptions
  | LineSeriesPartialOptions;
type SeriesStyleOptions = LineStyleOptions &
  AreaStyleOptions &
  BarStyleOptions &
  CandlestickStyleOptions &
  HistogramStyleOptions;

type SeriesData = LineData[] | BarData[] | HistogramData[];
type SeriesList = ISeriesApi<SeriesType>;
type SeriesDataItem = BarData | LineData;

type RowLegend = NodeListOf<Element> | HTMLElement | null;

type ColorToStringFunction = (
  param: string,
  ...arg: (string | number | undefined)[]
) => RGBColor | HSLColor | null;

enum LegendStyle {
  vertical = 'vertical',
  horizontal = 'horizontal'
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
  legendVisible?: boolean;
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
  SeriesData,
  SeriesDataItem,
  SeriesOptions,
  SeriesStyleOptions,
  ColorToStringFunction,
  LegendStyle
};
