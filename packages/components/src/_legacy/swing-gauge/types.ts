type SwingGaugeValueFormatter = (value: number, rawValue?: number) => string | number | undefined;

interface SwingGaugeData {
  size: number;
  width: number;
  height: number;
  fillPercentage?: number;
  gaugeWidthScale: number;
  gaugeHeightScale: number;
  gaugeUpperBound: number;
  gaugeLowerBound: number;
  lineLength: number;
  offsetLeftPrimaryLine: number;
  offsetTopPrimaryLine: number;
  offsetLeftPrimaryPoint: number;
  offsetTopPrimaryPoint: number;
  offsetLeftSecondaryLine: number;
  offsetTopSecondaryLine: number;
  offsetLeftSecondaryPoint: number;
  offsetTopSecondaryPoint: number;
}

interface SwingGaugeStyle {
  strokeWidth: number;
  primaryColor: string;
  secondaryColor: string;
  borderColor: string;
  centerline: string;
  centerlineOpacity: string;
  centerlineColor: string;
}

interface SwingGaugeCanvasSize {
  width: number;
  height: number;
}

export { SwingGaugeData, SwingGaugeStyle, SwingGaugeCanvasSize, SwingGaugeValueFormatter };
