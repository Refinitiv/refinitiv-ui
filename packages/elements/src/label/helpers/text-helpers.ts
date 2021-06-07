type TruncateOffset = {
  endLeft: number;
  startRight: number;
};

/**
 * A helper functions that assist in working with Text.
 */
export class TextHelpers {
  /**
   * Removes white space and line terminator characters from a string.
   * @param str string to be trimmed
   * @returns Trimmed string
   */
  public static trim (str: string): string {
    return (str.replace(/(\r\n|\n|\r)/gm, '')).trim().replace(/\s+/g, ' ');
  }

  /**
   * Keep truncating character until textNode width is not larger than container width
   * @param textNode text node
   * @param containerWidth parent width
   * @param fullText text to be truncated
   * @returns {void}
   */
  public static middleEllipsis (textNode: HTMLElement, containerWidth: number, fullText: string): void {
    let { endLeft, startRight } = this.estimateTruncateOffset(fullText, containerWidth, textNode.offsetWidth);
    while(textNode.offsetWidth > containerWidth && textNode.innerHTML.length > 5) {
      textNode.innerHTML = TextHelpers.insertMiddleEllipsis(fullText, endLeft, startRight);
      textNode.innerHTML.length % 2 === 1 ? endLeft-- : startRight++;
    }
  }

  /**
   * Insert Middle ellipsis to truncated string
   * @param text string
   * @param endLeft last index of left side
   * @param startRight start index of right side
   * @returns Middle ellipsis string
   */
  private static insertMiddleEllipsis (text: string, endLeft: number, startRight: number): string {
    return `${text.substr(0, endLeft)} ... ${text.substr(startRight)}`;
  }

  /**
   * Return the closest indexes for middle ellipsis
   * @param fullText text to be truncated
   * @param containerWidth parent width
   * @param actualWidth text node width that contains text to be truncated
   * @returns TruncateOffset
   */
  private static estimateTruncateOffset (fullText: string, containerWidth: number, actualWidth: number): TruncateOffset {
    const textChars = fullText.length;
    const avgLetterSize = actualWidth / textChars;
    const canFit = containerWidth / avgLetterSize; // number of letters that can fit to container
    const deltaEachSide = (textChars - canFit) / 2; // index that used to truncate for left and right sides

    const endLeft = Math.floor(textChars / 2 - deltaEachSide);
    const startRight = Math.ceil(textChars / 2 + deltaEachSide);

    return {
      endLeft,
      startRight
    };
  }
}
