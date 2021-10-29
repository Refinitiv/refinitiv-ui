/**
 * Dispatched when `focused` state changes
 */
export type FocusedChangedEvent = CustomEvent<{
  /**
   * `focused` value
   */
  value: boolean;
}>;
