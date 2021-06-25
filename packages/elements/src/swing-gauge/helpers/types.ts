interface SwingGaugeData {
  size: number;
  w: number;
  h: number;
  duration: number;
  fillPercentage?: number;
  primaryValue: number;
  primaryLabel: string;
  secondaryValue: number;
  secondaryLabel: string;
}

interface CanvasOption {
  strokeWidth: number;
  primaryColor: string;
  secondaryColor: string;
  fillStyle: string;
  fontFamily: string;
  fontSize: number;
  maxFontSize: number;
  borderColor: string;
  centerline: string;
  centerlineOptions: string[];
  centerlineOpacity: string;
  centerlineColor: string;
}

interface SwingGaugeDrawOption {
  ctxOptions: CanvasOption;
}

interface Coordinate {
  x: number;
  y: number;
}

export { SwingGaugeData, CanvasOption, SwingGaugeDrawOption, Coordinate };
