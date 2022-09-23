/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */
export class Logger {

  public static showLog = true;

  public static showTime = true;

  public static log (...args: any[]) {
    if (!Logger.showLog) {
      return;
    }

    console.log(...args);
  }

  public static time (...args: any[]) {
    if (!Logger.showTime) {
      return;
    }

    console.time(...args);
  }

  public static timeEnd (...args: any[]) {
    if (!Logger.showTime) {
      return;
    }

    console.timeEnd(...args);
  }
}
