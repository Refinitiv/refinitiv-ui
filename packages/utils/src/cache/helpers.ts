/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { MESSENGER_NO_MESSAGE_DELAY } from './constants.js';

type LoggerTime = {
  startAt: number
  endAt?: number
}
export class Logger {

  public static showLog = true;

  public static showTime = true;

  private timers: Record<string, LoggerTime> = {};

  public static log (...args: any[]) {
    if (!Logger.showLog) {
      return;
    }

    console.log(...args);
  }


  public timeStart (message: string) {
    if (!Logger.showTime) {
      return;
    }

    this.timers[message] = {
      startAt: performance.now()
    };
  }

  public timeEnd (message: string) {
    if (!Logger.showTime) {
      return;
    }

    const timer = this.timers[message];
    if (timer.startAt !== 0) {
      timer.endAt = performance.now();
      console.log(`${window.name} End Time: `, timer.endAt);
      console.log(`${message} Time: Complete End:  ${(timer.endAt - timer.startAt) - MESSENGER_NO_MESSAGE_DELAY}`);
    }

    // Clear
    this.timers[message] = {
      startAt: 0,
      endAt: 0
    };
  }
}
