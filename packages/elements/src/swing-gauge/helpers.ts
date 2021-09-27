import { CenterLineStyle, DefaultStyle } from './const';
import { SwingGaugeCanvasSize, SwingGaugeData, SwingGaugeStyle } from './types';

let ctx: CanvasRenderingContext2D;
let data: SwingGaugeData;
let style: SwingGaugeStyle;

const clear = (
  canvasSize: SwingGaugeCanvasSize,
  drawCtx: CanvasRenderingContext2D
): void => {
  drawCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
};

const drawSegment = (start: number, end: number, color: string): void => {
  ctx.strokeStyle = color;
  ctx.lineWidth = data.size * data.gaugeWidthScale;
  ctx.beginPath();
  ctx.arc(
    data.width / 2,
    data.height,
    data.size * data.gaugeHeightScale,
    (start + 1) * Math.PI,
    (end + 1) * Math.PI
  );
  ctx.stroke();
};

const drawDot = (x: number, y: number): void => {
  ctx.fillStyle = DefaultStyle.CENTER_LINE_COLOR;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x, y - 5, 4, 0, 2 * Math.PI);
  ctx.fill();
};

const drawLine = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  offset: number
): void => {
  ctx.strokeStyle = DefaultStyle.CENTER_LINE_COLOR;
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 3]);
  ctx.beginPath();
  ctx.moveTo(startX, startY - 5);
  ctx.lineTo(endX, endY - 5);
  ctx.lineTo(endX + offset, endY - 5);
  ctx.stroke();
  ctx.setLineDash([]);
};

const drawLinePointer = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  offset: number
): void => {
  drawDot(startX, startY);
  drawLine(startX, startY, endX, endY, offset);
};

const draw = (
  drawData: SwingGaugeData,
  drawCtx: CanvasRenderingContext2D,
  drawParams: SwingGaugeStyle
): void => {
  data = drawData;
  ctx = drawCtx;
  style = drawParams;

  const primaryStart = 0;
  let secondaryStart = data.fillPercentage as number;
  const primaryEnd = 1;
  const secondaryEnd = 1;
  secondaryStart = secondaryStart < 0.01 ? 0.01 : secondaryStart;
  secondaryStart = secondaryStart > 0.99 ? 0.99 : secondaryStart;
  
  // Draw segments
  drawSegment(primaryStart, primaryEnd, style.primaryColor);
  drawSegment(secondaryStart, secondaryEnd, style.secondaryColor);

  // Draw Line pointer
  drawLinePointer(
    data.offsetLeftPrimaryPoint,
    data.offsetTopPrimaryPoint,
    data.offsetLeftPrimaryLine,
    data.offsetTopPrimaryLine,
    -data.lineLength
  );
  drawLinePointer(
    data.offsetLeftSecondaryPoint,
    data.offsetTopSecondaryPoint,
    data.offsetLeftSecondaryLine,
    data.offsetTopSecondaryLine,
    data.lineLength
  );

  // Draw inner circle and lines
  ctx.lineWidth = style.strokeWidth;
  ctx.strokeStyle = style.borderColor;
  ctx.beginPath();
  ctx.arc(
    data.width / 2,
    data.height,
    data.size * data.gaugeUpperBound,
    0,
    2 * Math.PI
  );
  ctx.strokeStyle = style.borderColor;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(data.width / 2, data.height, data.size * data.gaugeLowerBound, 0, 2 * Math.PI);
  ctx.strokeStyle = style.borderColor;
  ctx.stroke();

  // Should we draw a center line?
  if (Object.values(CenterLineStyle).includes(style.centerline as CenterLineStyle)) {
    ctx.save();
    ctx.beginPath();
    if (style.centerline === CenterLineStyle.SOLID) {
      ctx.globalAlpha = Number(style.centerlineOpacity);
    }
    else if (style.centerline === CenterLineStyle.DOTTED) {
      ctx.setLineDash([2, 2]);
    }
    else {
      ctx.setLineDash([5, 3]);
    }
    ctx.moveTo(data.width / 2, data.height - data.size * data.gaugeLowerBound);
    ctx.lineTo(data.width / 2, data.height - (data.size * data.gaugeUpperBound) + style.strokeWidth);
    ctx.strokeStyle = style.centerlineColor;
    ctx.stroke();
    ctx.restore();
  }
};

// Helper function for elastic easing
const elasticOut = ((amplitude: number, period: number): (time: number) => number => {
  const pi2 = Math.PI * 2;
  return function (time: number): number {
    if (time === 0 || time === 1) {
      return time;
    }
    const s = (period / pi2) * Math.asin(1 / amplitude);
    return (
      amplitude * Math.pow(2, -10 * time) * Math.sin(((time - s) * pi2) / period) + 1
    );
  };
})(1.2, 0.5);

const textWidth = (drawCtx: CanvasRenderingContext2D, text: string, fontSize: number, fontFamily: string): number => {
  drawCtx.font = `${fontSize}px ${fontFamily}`;
  return drawCtx.measureText(text).width;
};

const helpers = {
  draw,
  clear,
  elasticOut,
  textWidth
};

export { helpers };
