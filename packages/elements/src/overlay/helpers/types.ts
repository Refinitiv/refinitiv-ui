type Position = ('top' | 'right' | 'bottom' | 'left' | 'center'
  | 'top-start' | 'top-middle' | 'top-end'
  | 'right-start' | 'right-middle' | 'right-end'
  | 'bottom-start' | 'bottom-middle' | 'bottom-end'
  | 'left-start' | 'left-middle' | 'left-end' | 'center-middle');

type PositionTarget = HTMLElement | 'top' | 'right' | 'bottom' | 'left' | 'center'
  | 'top right' | 'right top'
  | 'top center' | 'center top'
  | 'top left' | 'left top'
  | 'bottom right' | 'right bottom'
  | 'bottom center' | 'center bottom'
  | 'bottom left' | 'left bottom'
  | 'center left' | 'left center'
  | 'center right' | 'right center'
  | 'center center';

type TransitionStyle = 'slide' | 'fade' | 'zoom' | 'slide-down'
  | 'slide-up' | 'slide-right' | 'slide-left' | 'slide-right-down'
  | 'slide-right-up' | 'slide-left-down' | 'slide-left-up';

type Calculated = {
  position?: string;
};

type SizingInfoComputed = {
  minWidth: number | null;
  maxWidth: number | null;
  minHeight: number | null;
  maxHeight: number | null;
  marginLeft: number | null;
  marginRight: number | null;
  marginTop: number | null;
  marginBottom: number | null;
}

type SizingInfoStyle = {
  minWidth: string;
  maxWidth: string;
  minHeight: string;
  maxHeight: string;
}

type SizingInfoRect = {
  width: number;
  height: number;
}

type SizingInfo = {
  computed: SizingInfoComputed;
  style: SizingInfoStyle;
}

type PositionTargetStrategy = {
  rect: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    height: number;
    width: number;
  };
  position: Array<string[]>;
};

type NullOrUndefined = null | undefined;

/* align against the position. These are valid when position does not contain align information */
const DEFAULT_ALIGN = new Map([
  ['top', 'start'],
  ['bottom', 'start'],
  ['left', 'middle'],
  ['right', 'middle'],
  ['center', 'middle']
]);

/* strategies applied when positionTarget is HTML Element */
const DEFAULT_TARGET_STRATEGY = [
  ['bottom', 'start'],
  ['top', 'start'],
  ['right', 'middle'],
  ['left', 'middle']
];

type PositionStyle = {
  top?: number | NullOrUndefined;
  left?: number | NullOrUndefined;
  right?: number | NullOrUndefined;
  bottom?: number | NullOrUndefined;
};

type CalculatedPosition = {
  position: string;
  align: string;
  canPosition: boolean;
  canAlign: boolean;
  top: number | NullOrUndefined;
  left: number | NullOrUndefined;
  right: number | NullOrUndefined;
  bottom: number | NullOrUndefined;
  isVertical: boolean;
  area: number;
};

type ViewAreaInfo = {
  /**
   * Height of current viewport. Height is limited by screen size
   */
  viewHeight: number;
  /**
   * Width of current viewport. Width is limited by screen size
   */
  viewWidth: number;
  /**
   * Offset top that takes into account screen dimensions
   */
  offsetTop: number;
  /**
   * Offset left that takes into account screen dimensions
   */
  offsetLeft: number;
  /**
   * Offset bottom that takes into account screen dimensions
   */
  offsetBottom: number;
  /**
   * Offset right that takes into account screen dimensions
   */
  offsetRight: number;
  /**
   * Actual offset top of the viewport
   */
  viewOffsetTop: number;
  /**
   * Actual offset left of the viewport
   */
  viewOffsetLeft: number;
};

export {
  Calculated,
  PositionTargetStrategy,
  Position,
  PositionTarget,
  PositionStyle,
  TransitionStyle,
  DEFAULT_ALIGN,
  DEFAULT_TARGET_STRATEGY,
  NullOrUndefined,
  SizingInfo,
  CalculatedPosition,
  SizingInfoRect,
  ViewAreaInfo
};
