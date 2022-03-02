import {
  DateTimeFormatPartTypes,
  DateTimeFormatPart,
  InputSelection
} from './types';
import { Direction } from './constants.js';

const IterablePartTypes: DateTimeFormatPartTypes[] = ['year', 'day', 'month', 'hour', 'minute', 'second', 'weekday', 'dayPeriod', 'fractionalSecond'];
export const isAllowedPart = (part: DateTimeFormatPart): boolean => IterablePartTypes.includes(part.type);

/**
 * Get a part index based on the selection
 * @param selection Selection, containing selectionStart and selectionEnd
 * @param parts The list of parts
 * @returns index
 */
export const getSelectedPartIndex = (selection: InputSelection, parts: DateTimeFormatPart[]): number => {
  const selectionEnd = selection.selectionEnd || 0;
  let accumulator = 0;

  // Get the closest part to selectionEnd
  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    accumulator += part.value.length;
    if (accumulator >= selectionEnd && isAllowedPart(part)) {
      return i;
    }
  }
  return 0;
};

/**
 * Get next available part index based on the selection, direction and input value
 * @param selection Selection, containing selectionStart and selectionEnd
 * @param parts The list of parts
 * @param inputValue The date time string value
 * @param direction Get the previous or the next part index
 * @returns index
 */
export const getNextSelectedPartIndex = (selection: InputSelection, parts: DateTimeFormatPart[], inputValue: string, direction: Direction = Direction.Up): number => {
  let selectedIndex: number;
  if (selection.selectionEnd === 0) {
    selectedIndex = -1;
    direction = Direction.Up;
  }
  else if (selection.selectionEnd === inputValue.length && selection.selectionEnd === selection.selectionStart) {
    selectedIndex = parts.length;
    direction = Direction.Down;
  }
  else {
    selectedIndex = getSelectedPartIndex(selection, parts);
  }
  for (let i = selectedIndex + direction; direction === Direction.Up ? i < parts.length : i >= 0; i += direction) {
    if (isAllowedPart(parts[i])) {
      return i;
    }
  }
  return selectedIndex;
};

/**
 * Get part selectionStart and selectionEnd indexes
 * @param index Part index
 * @param parts The list of parts
 * @returns selection
 */
export const selectPart = (index = 0, parts: DateTimeFormatPart[]): InputSelection => {
  let selectionStart = 0;
  let selectionEnd = 0;
  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    selectionEnd += part.value.length;
    if (i === index) {
      break;
    }
    selectionStart = selectionEnd;
  }
  return {
    selectionStart,
    selectionEnd
  };
};


