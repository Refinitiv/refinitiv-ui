import { ElementSize } from '@refinitiv-ui/core';
import { SwingGaugeData, SwingGaugeDrawOption, Coordinate } from './types';

let ctx: CanvasRenderingContext2D;
let data: SwingGaugeData;
let params: SwingGaugeDrawOption;
let fillPercentage = 0.5;

const clear = (canvasSize: ElementSize, drawCtx: CanvasRenderingContext2D): void => {
  drawCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
};

// Helper to get arc x and y points
const getCoordinate = (radians: number): Coordinate => {
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

const draw = (drawData: SwingGaugeData, drawCtx: CanvasRenderingContext2D, canvasSize: ElementSize, drawParams: SwingGaugeDrawOption): void => {
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
  const leftPos = getCoordinate((1 + fillPercentage / 2) * Math.PI);
  const rightPos = getCoordinate((1 + fillPercentage + (1 - fillPercentage) / 2) * Math.PI);

  // Has text
  if (!!data.primaryLabel && !!data.secondaryLabel) {

    // Calculate responsive font size
    ctx.font = `${params.ctxOptions.fontSize}px${params.ctxOptions.fontFamily}`;
    let fontSize1 = ctx.measureText(data.primaryLabel).width;
    const fontSize2 = ctx.measureText(data.secondaryLabel).width;
    fontSize1 = fontSize1 > fontSize2 ? fontSize1 : fontSize2;
    params.ctxOptions.fontSize *= (data.size * 0.6 * 0.8 / fontSize1);
    params.ctxOptions.fontSize = Math.round(params.ctxOptions.fontSize > params.ctxOptions.maxFontSize ? params.ctxOptions.maxFontSize : params.ctxOptions.fontSize);
    ctx.font = `${params.ctxOptions.fontSize}px${params.ctxOptions.fontFamily}`;
    ctx.textBaseline = 'top';

    // Write the labels
    drawAndCenterText(data.primaryLabel, leftPos.x, leftPos.y - params.ctxOptions.fontSize);
    drawAndCenterText(data.secondaryLabel, rightPos.x, rightPos.y - params.ctxOptions.fontSize);
  }
  else {
    ctx.textBaseline = 'middle';
  }

  // Calculate the responsive font size for values
  ctx.font = `${Math.round(Math.round(data.size * 0.12))}px${params.ctxOptions.fontFamily}`;

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
    else if (params.ctxOptions.centerline === 'dotted') {
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
const elasticOut = ((amplitude: number, period: number): (time: number) => number => {
  const pi2 = Math.PI * 2;

  return function (time: number): number {
    if (time === 0 || time === 1) {
      return time;
    }
    const s = period / pi2 * Math.asin(1 / amplitude);
    return (amplitude * Math.pow(2, -10 * time) * Math.sin((time - s) * pi2 / period) + 1);
  };
})(1.2, 0.5);

const helpers = {
  draw,
  clear,
  elasticOut
};

export { helpers };
