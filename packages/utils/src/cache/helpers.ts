/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { MESSENGER_NO_MESSAGE_DELAY } from './constants.js';

/* eslint-disable no-console */
export class Logger {

  public static showLog = false;

  public static showTime = true;

  private startAt = 0;

  private endAt = 0;

  public static log (...args: any[]) {
    if (!Logger.showLog) {
      return;
    }

    console.log(...args);
  }

  public timeStart (message?: string) {
    if (!Logger.showTime) {
      return;
    }
    this.startAt = performance.now();
    if (message) {
      console.log(`${message} Time: Complete Start`);
    }
  }

  public timeEnd (message: string) {
    if (!Logger.showTime) {
      return;
    }
    if (this.startAt !== 0) {
      this.endAt = performance.now() - MESSENGER_NO_MESSAGE_DELAY;
      console.log(`${message} Time: Complete End:  ${this.endAt - this.startAt}`);
    }

    // Clear
    this.startAt = 0;
    this.endAt = 0;
  }
}
