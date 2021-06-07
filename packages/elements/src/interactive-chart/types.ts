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

type SeriesOptionsInterface = AreaSeriesPartialOptions | BarSeriesPartialOptions | CandlestickSeriesPartialOptions | HistogramSeriesPartialOptions | LineSeriesPartialOptions;
type SeriesStyleOptionsInterface = LineStyleOptions & AreaStyleOptions & BarStyleOptions & CandlestickStyleOptions & HistogramStyleOptions;

type SeriesDataInterface = LineData[] | BarData[] | HistogramData[];
type SeriesListInterface = ISeriesApi<SeriesType>;
type SeriesDataItemInterface = BarData | LineData;

type RowLegendInterface = NodeListOf<Element> | HTMLElement | null;

interface TimeType {
  day: number;
  month: number;
  year: number;
}

interface ColorSeriesStyleInterface {
  barColor: string;
  barBorderColor: string;
  barWickColor: string;
}


interface ConfigChart {
  series: SeriesInterface[];
  options?: DeepPartial<ChartOptions>;
}

interface ThemeInterface {
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

interface SeriesInterface {
  type: string;
  symbol?: string;
  symbolName?: string;
  legendPriceFormatter?: Function;
  data: SeriesDataInterface;
  seriesOptions?: SeriesPartialOptions<SeriesOptionsInterface>;
}

export {
  TimeType,
  ConfigChart,
  ThemeInterface,
  SeriesInterface,
  RowLegendInterface,
  SeriesListInterface,
  SeriesDataItemInterface,
  SeriesOptionsInterface,
  ColorSeriesStyleInterface,
  SeriesStyleOptionsInterface,
  SeriesDataInterface
};
