export interface ControlProperties {
  /**
   * Name of the element
   */
  name: string;
  /**
   * Value which will be displayed in the element
   */
  value: string;
  /**
   * If true, the user cannot interact with this element.
   */
  disabled: boolean;
  /**
   * If true, makes the element not mutable.
   */
  readonly: boolean;
}
