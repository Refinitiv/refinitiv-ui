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

type SeriesOptions = AreaSeriesPartialOptions | BarSeriesPartialOptions | CandlestickSeriesPartialOptions | HistogramSeriesPartialOptions | LineSeriesPartialOptions;
type SeriesStyleOptions = LineStyleOptions & AreaStyleOptions & BarStyleOptions & CandlestickStyleOptions & HistogramStyleOptions;

type SeriesData = LineData[] | BarData[] | HistogramData[];
type SeriesList = ISeriesApi<SeriesType>;
type SeriesDataItem = BarData | LineData;

type RowLegend = NodeListOf<Element> | HTMLElement | null;

interface Time {
  day: number;
  month: number;
  year: number;
}

interface ColorSeriesStyle {
  barColor: string;
  barBorderColor: string;
  barWickColor: string;
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
  legendPriceFormatter?: Function;
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
  SeriesStyleOptions
};
