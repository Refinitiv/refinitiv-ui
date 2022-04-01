import type { HeatmapCell } from './types';

const MIN_FONT_SIZE = 10;
const MAX_FONT_SIZE = 16;

/**
 * Calculate responsive font size according to the screen width
 * @param ratio font ratio
 * @param cellHeight cell's height
 * @param cellWidth cell's width
 * @returns font size
 */
const getResponsiveFontSize = (ratio: number, cellHeight: number, cellWidth: number): number => {
  let fontSize = Math.round(Math.min(cellHeight, cellWidth) * ratio);

  if (fontSize < MIN_FONT_SIZE) {
    fontSize = MIN_FONT_SIZE;
  }
  else if (fontSize > MAX_FONT_SIZE) {
    fontSize = MAX_FONT_SIZE;
  }

  return fontSize;
};

/**
 * Get maximum text width out of all the cell by sampling
 * @param ctx canvas context
 * @param cells list of cells
 * @param hasCellHeader if header property is present in the cell
 * @returns label width measured in canvas
 */
const getMaximumTextWidth = (ctx: CanvasRenderingContext2D, cells: HeatmapCell[], hasCellHeader: boolean): number => {
  let maxHeaderLength = 0;
  let maxLabelLength = 0;

  const SAMPLE_AMOUNT = 5;

  for (let i = 0; i < cells.length; i++) {
    const header = cells[i].header || '';
    const label = cells[i].customLabel || cells[i].label || '';

    if (label.length > maxLabelLength) {
      maxLabelLength = label.length;
    }

    if (header && header.length > maxHeaderLength) {
      maxHeaderLength = header.length;
    }
  }

  const textSamples = [];

  const labelMap: Record<number, number> = {};
  const headerMap: Record<number, number> = {};

  for (let i = 0; i < cells.length; i++) {
    const header = cells[i].header || '';
    const label = cells[i].customLabel || cells[i].label || '';

    const headerLength = header.length;
    const labelLength = label.length;

    if (labelLength >= maxLabelLength - 1) {
      // Count number of times per label length
      labelMap[labelLength] = labelMap[labelLength] ? labelMap[labelLength] + 1 : 1;

      if (labelMap[labelLength] < SAMPLE_AMOUNT) {
        textSamples.push(label);
      }
    }

    if (hasCellHeader && headerLength >= maxHeaderLength - 1) {
      // Count number of times per header length
      headerMap[headerLength] = headerMap[headerLength] ? headerMap[headerLength] + 1 : 1;

      if (headerMap[headerLength] < SAMPLE_AMOUNT) {
        textSamples.push(header);
      }
    }
  }

  // Find maximum label width
  let maxTextWidth = 0;

  for (let i = 0; i < textSamples.length; i++) {
    const textWidth = ctx.measureText(textSamples[i]).width;

    if (textWidth > maxTextWidth) {
      maxTextWidth = textWidth;
    }
  }

  return maxTextWidth;
};

/**
 * Get text with maximum length to render Axis size
 * @param labels array string text for calculate
 * @returns Text with maximum length
 */
const getMaximumLabelTextWidth = (labels: string[]): string => {
  return labels.reduce((previousText, currentText) => previousText.length > currentText.length ? previousText : currentText);
};

export { getResponsiveFontSize, getMaximumTextWidth, getMaximumLabelTextWidth, MIN_FONT_SIZE, MAX_FONT_SIZE };
