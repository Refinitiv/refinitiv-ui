import { elementUpdated, fixture, isIE, nextFrame } from '@refinitiv-ui/test-helpers';

export const openedUpdated = async (element) => {
  await elementUpdated(element);

  await nextFrame();
  await nextFrame();
  await nextFrame();
};
export const fireKeydownEvent = (element, key, shiftKey = false) => {
  let event;

  if (isIE()) {
    event = document.createEvent('Event');

    event.initEvent('keydown', true, true);

    event.view = document.defaultView;
    event.altKey = false;
    event.ctrlKey = false;
    event.shiftKey = shiftKey;
    event.metaKey = false;
    event.key = key;
  }
  else {
    event = new KeyboardEvent('keydown', { key, shiftKey });
  }
  element.dispatchEvent(event);
};
export const targetWidthBiggerThanPanelWidth = 'targetWidthBiggerThanPanelWidth';
export const targetWidthEqualToPanelWidth = 'targetWidthEqualToPanelWidth';
export const targetWidthLessThanPanelWidth = 'targetWidthLessThanPanelWidth';
export const targetHeightBiggerThanPanelHeight = 'targetHeightBiggerThanPanelHeight';
export const targetHeightEqualToPanelHeight = 'targetHeightEqualToPanelHeight';
export const targetHeightLessThanPanelHeight = 'targetHeightLessThanPanelHeight';
export const widthSizes = [targetWidthEqualToPanelWidth, targetWidthLessThanPanelWidth, targetWidthBiggerThanPanelWidth];
export const heightSizes = [targetHeightEqualToPanelHeight, targetHeightLessThanPanelHeight, targetHeightBiggerThanPanelHeight];
const defaultWidth = 100;
const defaultHeight = 100;
export const positionWords = ['top', 'bottom', 'left', 'right'];
export const alignWords = ['start', 'middle', 'end'];
export const possiblePositions = [];
export const getSizes = (widthSize = targetWidthLessThanPanelWidth, heightSize = targetHeightLessThanPanelHeight) => {
  let panelWidth = defaultWidth;
  let panelHeight = defaultHeight;

  let targetWidth = defaultWidth;
  let targetHeight = defaultHeight;

  if (widthSize === targetWidthLessThanPanelWidth) {
    panelWidth = targetWidth * 2;
  }
  else if (widthSize === targetWidthBiggerThanPanelWidth) {
    targetWidth = panelWidth * 2;
  }

  if (heightSize === targetHeightLessThanPanelHeight) {
    panelHeight = targetHeight * 2;
  }
  else if (heightSize === targetHeightBiggerThanPanelHeight) {
    targetHeight = panelHeight * 2;
  }

  return {
    targetSize: {
      width: targetWidth,
      height: targetHeight
    },
    panelSize: {
      width: panelWidth,
      height: panelHeight
    }
  };
};
export const createPositionTargetFixture = async (x, y, position, widthSize = targetWidthLessThanPanelWidth, heightSize = targetHeightLessThanPanelHeight, opened = true) => {
  const { panelSize, targetSize } = getSizes(widthSize, heightSize);

  const targetStyle = `style="position: fixed; top: ${y}px; left: ${x}px; width: ${targetSize.width}px; height: ${targetSize.height}px; margin: 0; padding: 0; border: 1px solid green; background: transparent;"`;
  const panelStyle = `style="width: ${panelSize.width}px; height: ${panelSize.height}px; border: 1px solid red; background: transparent;"`;

  const elements = {};

  elements.target = await fixture(`<button id="target-element" ${targetStyle}>test</button>`);
  elements.panel = await fixture(`<ef-overlay id="panel-element" ${panelStyle} position="${position}" position-target="#target-element">Panel</ef-overlay>`);

  elements.panel.positionTarget = elements.target;

  if (opened) {
    elements.panel.opened = true;

    await elementUpdated(elements.panel);

    await nextFrame();
    await nextFrame();
  }

  return elements;
};
export const matchExactPositionWord = (target, panel, singlePosition) => {
  const panelRect = panel.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const [positionWord] = singlePosition.split('-');

  if (positionWord === 'top') {
    if (Math.abs(panelRect.bottom - targetRect.top) >= 1) {
      return 'For `top` position panel should be exactly above target. PanelRect: ' + stringifyRect(panelRect) + ', TargetRect: ' + stringifyRect(targetRect);
    }
  }
  else if (positionWord === 'bottom') {
    if (Math.abs(panelRect.top - targetRect.bottom) >= 1) {
      return 'For `bottom` position panel should be exactly below target. PanelRect: ' + stringifyRect(panelRect) + ', TargetRect: ' + stringifyRect(targetRect);
    }
  }
  else if (positionWord === 'right') {
    if (Math.abs(panelRect.left - targetRect.right) >= 1) {
      return 'For `right` position panel should be exactly right side of target. PanelRect: ' + stringifyRect(panelRect) + ', TargetRect: ' + stringifyRect(targetRect);
    }
  }
  else if (positionWord === 'left') {
    if (Math.abs(panelRect.right - targetRect.left) >= 1) {
      return 'For `left` position panel should be exactly left side of target. PanelRect: ' + stringifyRect(panelRect) + ', TargetRect: ' + stringifyRect(targetRect);
    }
  }

  return '';
};
export const expectMatchExactPositionWord = (x, y, targetSize, panelSize, singlePosition) => {
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;

  const [positionWord] = singlePosition.split('-');

  if (positionWord === 'top') {
    if ((y - panelSize.height) < 0 || (y > screenHeight)) {
      return false;
    }
  }
  else if (positionWord === 'bottom') {
    if ((y + targetSize.height + panelSize.height) > screenHeight || (y + targetSize.height) < 0) {
      return false;
    }
  }
  else if (positionWord === 'right') {
    if ((x + targetSize.width + panelSize.width) > screenWidth || (x + targetSize.width) < 0) {
      return false;
    }
  }
  else if (positionWord === 'left') {
    if ((x - panelSize.width) < 0 || x > screenWidth) {
      return false;
    }
  }

  return true;
};
export const matchExactAlignWord = (target, panel, singlePosition) => {
  const panelRect = panel.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const [positionWord, alignWord] = singlePosition.split('-');

  if (positionWord === 'top' || positionWord === 'bottom') {
    if (alignWord === 'start') {
      if (panelRect.left !== targetRect.left) {
        return 'For `start` align panel should have same left coordinate as target. PanelRect: ' + stringifyRect(panelRect) + ', TargetRect: ' + stringifyRect(targetRect);
      }
    }
    else if (alignWord === 'middle') {
      if ((panelRect.left + (panelRect.right - panelRect.left) / 2) !== (targetRect.left + (targetRect.right - targetRect.left) / 2)) {
        return 'For `middle` align panel should have same x center coordinate as target. PanelRect: ' + stringifyRect(panelRect) + ', TargetRect: ' + stringifyRect(targetRect);
      }
    }
    else if (alignWord === 'end') {
      if (panelRect.right !== targetRect.right) {
        return 'For `end` align panel should have same right coordinate as target. PanelRect: ' + stringifyRect(panelRect) + ', TargetRect: ' + stringifyRect(targetRect);
      }
    }
  }
  else if (positionWord === 'right' || positionWord === 'left') {
    if (alignWord === 'start') {
      if (panelRect.top !== targetRect.top) {
        return 'For `start` align panel should have same top coordinate as target. PanelRect: ' + stringifyRect(panelRect) + ', TargetRect: ' + stringifyRect(targetRect);
      }
    }
    else if (alignWord === 'middle') {
      if ((panelRect.top + (panelRect.bottom - panelRect.top) / 2) !== (targetRect.top + (targetRect.bottom - targetRect.top) / 2)) {
        return 'For `middle` align panel should have same y center coordinate as target. PanelRect: ' + stringifyRect(panelRect) + ', TargetRect: ' + stringifyRect(targetRect);
      }
    }
    else if (alignWord === 'end') {
      if (panelRect.bottom !== targetRect.bottom) {
        return 'For `end` align panel should have same bottom coordinate as target. PanelRect: ' + stringifyRect(panelRect) + ', TargetRect: ' + stringifyRect(targetRect);
      }
    }
  }

  return '';
};
export const expectMatchExactAlignWord = (x, y, targetSize, panelSize, singlePosition) => {
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;

  const [positionWord, alignWord] = singlePosition.split('-');

  if (positionWord === 'top' || positionWord === 'bottom') {
    if (alignWord === 'start') {
      if (x < 0 || (x + panelSize.width) > screenWidth) {
        return false;
      }
    }
    else if (alignWord === 'middle') {
      if ((x + targetSize.width / 2 - panelSize.width / 2) < 0 || (x + targetSize.width / 2 + panelSize.width / 2) > screenWidth) {
        return false;
      }
    }
    else if (alignWord === 'end') {
      if ((x + targetSize.width - panelSize.width) < 0 || (x + targetSize.width) > screenWidth) {
        return false;
      }
    }
  }
  else if (positionWord === 'right' || positionWord === 'left') {
    if (alignWord === 'start') {
      if (y < 0 || (y + panelSize.height) > screenHeight) {
        return false;
      }
    }
    else if (alignWord === 'middle') {
      if ((y + targetSize.height / 2 - panelSize.height / 2) < 0 || (y + targetSize.height / 2 + panelSize.height / 2) > screenHeight) {
        return false;
      }
    }
    else if (alignWord === 'end') {
      if (panelSize.height > (y + targetSize.height) || (y + targetSize.height) > screenHeight) {
        return false;
      }
    }
  }

  return true;
};
export const matchExact = (target, panel, singlePosition) => {
  return matchExactPositionWord(target, panel, singlePosition) || matchExactAlignWord(target, panel, singlePosition);
};
const expectMatchExact = (x, y, targetSize, panelSize, singlePosition) => {
  return !!expectMatchExactPositionWord(x, y, targetSize, panelSize, singlePosition) && !!expectMatchExactAlignWord(x, y, targetSize, panelSize, singlePosition);
};
export const matchExactSize = (target, panel, widthSize = targetSizeLessThanPanelSize, heightSize = targetSizeLessThanPanelSize) => {
  const { panelSize, targetSize } = getSizes(widthSize, heightSize);

  const panelRect = panel.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const actualTargetWidth = targetRect.right - targetRect.left;
  const actualPanelHeight = panelRect.bottom - panelRect.top;

  const actualPanelWidth = panelRect.right - panelRect.left;
  const actualTargetHeight = targetRect.bottom - targetRect.top;

  if (actualTargetWidth !== targetSize.width) {
    return `real target width (${actualTargetWidth}) does not match projected target width (${targetSize.width})`;
  }
  if (actualTargetHeight !== targetSize.height) {
    return `real target height (${actualTargetHeight}) does not match projected target height (${targetSize.height})`;
  }
  if (actualPanelWidth !== panelSize.width) {
    return `real panel width (${actualPanelWidth}) does not match projected panel width (${panelSize.width})`;
  }
  if (actualPanelHeight !== panelSize.height) {
    return `real panel height (${actualPanelHeight}) does not match projected panel height (${panelSize.height})`;
  }

  return '';
};
export const getPossibleOffsets = (widthSize, heightSize) => {
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;

  const { targetSize, panelSize } = getSizes(widthSize, heightSize);

  const leftOffsets = new Set();
  const rightOffsets = new Set();
  const topOffsets = new Set();
  const bottomOffsets = new Set();

  leftOffsets.add(0);
  leftOffsets.add(screenWidth - targetSize.width);
  // leftOffsets.add(-targetSize.width);
  // leftOffsets.add((panelSize.width - targetSize.width) / 2);

  // for (let x of Array.from(leftOffsets)) {
  //   rightOffsets.add(x + screenWidth);
  // }

  // leftOffsets.add(-panelSize.width);
  // rightOffsets.add(screenWidth + targetSize.width);
  // rightOffsets.add(screenWidth + panelSize.width);

  topOffsets.add(0);
  topOffsets.add(screenHeight - targetSize.height);
  // topOffsets.add(-targetSize.height);
  // topOffsets.add((panelSize.height - targetSize.height) / 2);

  // for (let y of Array.from(topOffsets)) {
  //   bottomOffsets.add(y + screenHeight);
  // }

  // topOffsets.add(-panelSize.height);
  // bottomOffsets.add(targetSize.height + screenHeight);
  // bottomOffsets.add(panelSize.height + screenHeight);

  return {
    xOffsets: [...Array.from(leftOffsets), ...Array.from(rightOffsets), screenWidth / 2 - targetSize.width / 2],
    yOffsets: [...Array.from(topOffsets), ...Array.from(bottomOffsets), screenHeight / 2 - targetSize.height / 2]
  };
};
export const initPossiblePositions = () => {
  possiblePositions.length = 0;
  for (let positionWord of positionWords) {
    for (let alignWord of alignWords) {
      possiblePositions.push(`${positionWord}-${alignWord}`);
    }
  }
};
export const stringifyRect = (rect) => JSON.stringify(rectToJSON(rect));
export const rectToJSON = (rect) => {
  return {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left
  };
};
