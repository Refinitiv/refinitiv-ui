import { Position as OverlayPosition } from '../../overlay';

export type TooltipCondition = (target: HTMLElement, paths: EventTarget[]) => boolean;
export type TooltipRenderer = (target: HTMLElement) => undefined | null | string | HTMLElement | DocumentFragment;
export type TooltipPosition = 'auto' | 'above' | 'right' | 'below' | 'left';
export type TooltipPositionMap = { [K in TooltipPosition]: OverlayPosition[] };

// Manager Types
type MouseMoveCallback = (event: MouseEvent, paths: EventTarget[]) => void;
type MouseCallback = (event: MouseEvent) => void;
type WheelCallback = (event: WheelEvent) => void;
type FocusCallback = (event: FocusEvent) => void;
type KeyboardCallback = (event: KeyboardEvent) => void;

export type DocumentCallbacks = {
  mousemove: MouseMoveCallback;
  mousemoveThrottled: MouseMoveCallback;
  click: MouseCallback;
  mouseout: MouseCallback;
  mouseleave: MouseCallback;
  wheel: WheelCallback;
  keydown: KeyboardCallback;
  blur: FocusCallback;
};
