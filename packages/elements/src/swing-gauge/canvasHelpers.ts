interface DataInterface {
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

interface CtxOptionsType {
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

interface DrawParamInterface {
  ctxOptions: CtxOptionsType;
}

interface PointInterface {
  x: number;
  y: number;
}

export interface CanvasSizeType {
  width: number;
  height: number;
}

let ctx: CanvasRenderingContext2D;
let data: DataInterface;
let params: DrawParamInterface;
let fillPercentage = 0.5;

const clear = (canvasSize: CanvasSizeType, drawCtx: CanvasRenderingContext2D): void => {
  drawCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
};

// Helper to get arc x and y points
const getPoints = (radians: number): PointInterface => {
  return {
    x: Math.round(data.w / 2 + Math.cos(radians) * (data.size * 0.7)),
    y: Math.round(data.h + Math.sin(radians) * (data.size * 0.7))
  };
};

const drawSegment = (start: number, end: number, color: string): void => {
  ctx.strokeStyle = color;
  ctx.lineWidth = data.size * 0.6 - params.ctxOptions.strokeWidth;
  ctx.beginPath();
  ctx.arc(data.w / 2, data.h, data.size * 0.7, Math.PI + start * Math.PI, Math.PI + end * Math.PI);
  ctx.stroke();
};

// Helper to print centered text
const drawAndCenterText = (text: string, x: number, y: number): void => {
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillText(text, x, y);
  ctx.restore();
};

const draw = (drawData: DataInterface, drawCtx: CanvasRenderingContext2D, canvasSize: CanvasSizeType, drawParams: DrawParamInterface): void => {
  ctx = drawCtx;
  data = drawData;
  params = drawParams;

  fillPercentage = (data.fillPercentage as number);

  // Draw segments
  drawSegment(0, 1, params.ctxOptions.primaryColor);
  drawSegment(fillPercentage > 1 ? 1 : fillPercentage, 1, params.ctxOptions.secondaryColor);

  // Draw text
  ctx.save();
  ctx.fillStyle = params.ctxOptions.fillStyle;

  // Get the center positions of each arc
  const leftPos = getPoints((1 + fillPercentage / 2) * Math.PI);
  const rightPos = getPoints((1 + fillPercentage + (1 - fillPercentage) / 2) * Math.PI);

  // Has text
  if (!!data.primaryLabel && !!data.secondaryLabel) {

    // Calculate responsive font size
    ctx.font = params.ctxOptions.fontSize + 'px ' + params.ctxOptions.fontFamily;
    let fontSize1 = ctx.measureText(data.primaryLabel).width;
    const fontSize2 = ctx.measureText(data.secondaryLabel).width;
    fontSize1 = fontSize1 > fontSize2 ? fontSize1 : fontSize2;
    params.ctxOptions.fontSize *= (data.size * 0.6 * 0.8 / fontSize1);
    params.ctxOptions.fontSize = Math.round(params.ctxOptions.fontSize > params.ctxOptions.maxFontSize ? params.ctxOptions.maxFontSize : params.ctxOptions.fontSize);
    ctx.font = params.ctxOptions.fontSize + 'px ' + params.ctxOptions.fontFamily;
    ctx.textBaseline = 'top';

    // Write the labels
    drawAndCenterText(data.primaryLabel, leftPos.x, leftPos.y - params.ctxOptions.fontSize);
    drawAndCenterText(data.secondaryLabel, rightPos.x, rightPos.y - params.ctxOptions.fontSize);
  }
  else {
    ctx.textBaseline = 'middle';
  }

  // Calculate the responsive font size for values
  ctx.font = Math.round(Math.round(data.size * 0.12)) + 'px ' + params.ctxOptions.fontFamily;

  // Write that values
  drawAndCenterText((fillPercentage * 100).toFixed(2) + '%', leftPos.x, leftPos.y + 1);
  drawAndCenterText(((1 - fillPercentage) * 100).toFixed(2) + '%', rightPos.x, rightPos.y + 1);

  ctx.restore();

  // Draw inner circle and lines
  ctx.lineWidth = params.ctxOptions.strokeWidth;
  ctx.strokeStyle = params.ctxOptions.borderColor;
  ctx.beginPath();
  ctx.arc(data.w / 2, data.h, data.size - params.ctxOptions.strokeWidth / 2, 0, 2 * Math.PI);
  ctx.strokeStyle = params.ctxOptions.borderColor;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(data.w / 2, data.h, data.size * 0.4, 0, 2 * Math.PI);
  ctx.strokeStyle = params.ctxOptions.borderColor;
  ctx.stroke();

  // Should we draw a center line?
  if (params.ctxOptions.centerlineOptions.includes(params.ctxOptions.centerline)) {
    ctx.save();
    ctx.beginPath();
    if (params.ctxOptions.centerline === 'solid') {
      ctx.globalAlpha = Number(params.ctxOptions.centerlineOpacity);
    }
    else if(params.ctxOptions.centerline === 'dotted') {
      ctx.setLineDash([params.ctxOptions.strokeWidth, params.ctxOptions.strokeWidth < 2 ? 2 : params.ctxOptions.strokeWidth]);
    }
    else {
      ctx.setLineDash([params.ctxOptions.strokeWidth * 3, (params.ctxOptions.strokeWidth < 2 ? 2 : params.ctxOptions.strokeWidth) * 2]);
    }
    ctx.moveTo(data.w / 2, data.h - data.size * 0.4);
    ctx.lineTo(data.w / 2, data.h - data.size);
    ctx.strokeStyle = params.ctxOptions.centerlineColor;
    ctx.stroke();
    ctx.restore();
  }
};

// Helper function for elastic easing
const elasticOut = ((amplitude: number, period: number): Function => {
  const pi2 = Math.PI * 2;
  return function (t: number): number {
    if (t === 0 || t === 1) {
      return t;
    }
    const s = period / pi2 * Math.asin(1 / amplitude);
    return (amplitude * Math.pow(2, -10 * t) * Math.sin((t - s) * pi2 / period) + 1);
  };
})(1.2, 0.5);

const helpers = {
  draw,
  clear,
  elasticOut
};

export { helpers };
