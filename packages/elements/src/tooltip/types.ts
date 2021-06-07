import { Position as OverlayPosition } from '../overlay';

export type Condition = (target: HTMLElement, paths: EventTarget[]) => boolean;
export type Renderer = (target: HTMLElement) => undefined | null | string | HTMLElement | DocumentFragment;
export type Position = 'auto' | 'above' | 'right' | 'below' | 'left';
export type PositionMap = { [K in Position]: OverlayPosition[] };

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
