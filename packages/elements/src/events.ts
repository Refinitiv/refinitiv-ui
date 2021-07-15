import {
  TapEvent,
  ResizeEvent
} from '@refinitiv-ui/core';

/**
 * Dispatched when `opened` state changes
 * Prevent default to stop opening/closing pipeline
 */
type OpenedChangedEvent = CustomEvent<{
  /**
   * `opened` value
   */
  value: boolean;
}>;

/**
 * Dispatched when `value` changes
 */
type ValueChangedEvent = CustomEvent<{
  /**
   * new `value`
   */
  value: string;
}>;

/**
 * Dispatched when `error` state changes
 */
type ErrorChangedEvent = CustomEvent<{
  /**
   * `error` value
   */
  value: boolean;
}>;

/**
 * Dispatched when `active` state changes
 */
type ActiveChangedEvent = CustomEvent<{
  /**
   * `active` value
   */
  value: boolean;
}>;

/**
 * Dispatched when `query` state changes
 */
type QueryChangedEvent = CustomEvent<{
  /**
   * `query` value
   */
  value: string;
}>;

/**
 * Dispatched when `view` state changes
 */
type ViewChangedEvent = CustomEvent<{
  /**
   * `view` value
   */
  value: string;
}>;

/**
 * Dispatched when `page` state changes
 */
type PageChangedEvent = CustomEvent<{
  /**
   * `page` value
   */
  value: string;
}>;

/**
 * Dispatched when `from` state changes
 */
type FromChangedEvent = CustomEvent<{
  /**
   * `from` value
   */
  value: string;
}>;

/**
 * Dispatched when `to` state changes
 */
type ToChangedEvent = CustomEvent<{
  /**
   * `to` value
   */
  value: string;
}>;

/**
 * Dispatched when `checked` state changes
 */
type CheckChangedEvent = CustomEvent<{
  /**
   * `checked` value
   */
  value: boolean;
}>;

/**
 * Dispatched when `offset` state changes
 */
type OffsetChangedEvent = CustomEvent<{
  /**
   * `offset` value
   */
  value: number;
}>;

/**
 * Dispatched when `expanded` state changes
 * Prevent default to stop expand/collapse pipeline
 */
type ExpandedChangedEvent = CustomEvent<{
  /**
   * `expanded` value
   */
  value: boolean;
}>;

/**
 * Dispatched when the user clicks on internal `item`
 */
type ItemTriggerEvent = CustomEvent<{
  /**
   * `item` value
   */
  value: string;
}>;

export {
  OpenedChangedEvent,
  ValueChangedEvent,
  ErrorChangedEvent,
  ActiveChangedEvent,
  ViewChangedEvent,
  ItemTriggerEvent,
  CheckChangedEvent,
  OffsetChangedEvent,
  ExpandedChangedEvent,
  QueryChangedEvent,
  PageChangedEvent,
  FromChangedEvent,
  ToChangedEvent,
  TapEvent,
  ResizeEvent
};
