/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */
export class Loggger {

  public static showLog = true;

  public static log (...args: any[]) {
    if (!Loggger.showLog) {
      return;
    }

    console.log(...args);
  }

  public static time (...args: any[]) {
    if (!Loggger.showLog) {
      return;
    }

    console.time(...args);
  }

  public static timeEnd (...args: any[]) {
    if (!Loggger.showLog) {
      return;
    }

    console.timeEnd(...args);
  }
}
