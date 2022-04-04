export type NavigationKeys = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown' | 'Escape';

// Fractional seconds are not supported in TypeScript Intl as of 2021
// TODO: use Intl.DateTimeFormatPartTypes and Intl.DateTimeFormatPart in the future versions of TypeScript
export type DateTimeFormatPartTypes = Intl.DateTimeFormatPartTypes | 'fractionalSecond';
export interface DateTimeFormatPart {
  type: DateTimeFormatPartTypes;
  value: string;
}

export type InputSelection = {
  selectionStart: number | null;
  selectionEnd: number | null;
};
