/**
 * Used for lists and selects
 * that support multiple selections
 */
export interface MultiValue {
  /**
   * First selected value
   */
  value: string;

  /**
   * A list of selected values
   */
  values: string[];

  /**
   * True if the user is allowed to enter more than one value
   */
  multiple: boolean;
}
