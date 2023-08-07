import type { HSLColor, RGBColor } from '@refinitiv-ui/utils/color.js';
import type {
  ChartOptions,
  DeepPartial,
  ISeriesApi,
  SeriesDataItemTypeMap,
  SeriesOptionsMap,
  SeriesType
} from 'lightweight-charts';

// https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

type SeriesOptions = UnionToIntersection<SeriesOptionsMap[keyof SeriesOptionsMap]>;

type SeriesList = ISeriesApi<SeriesType>;

type SeriesDataItem = SeriesDataItemTypeMap[keyof SeriesDataItemTypeMap];

type RowLegend = NodeListOf<Element> | HTMLElement | null;

type ColorToStringFunction = (
  param: string,
  ...arg: (string | number | undefined)[]
) => RGBColor | HSLColor | null;

enum LegendStyle {
  vertical = 'vertical',
  horizontal = 'horizontal'
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
  data: SeriesDataItem[];
  seriesOptions?: SeriesOptions;
}

export {
  InteractiveChartConfig,
  InteractiveChartSeries,
  Theme,
  RowLegend,
  SeriesList,
  SeriesDataItem,
  SeriesOptions,
  ColorToStringFunction,
  LegendStyle
};
