export class DriftTimer {
  interval: number;
  timer: NodeJS.Timer | undefined;
  countMs: number;
  maxTime: number;
  constructor (timerMs: number) {
    this.interval = 1000; // 1 second
    this.countMs = timerMs;
    this.maxTime = Date.now() + this.countMs;
  }

  remainingMs (): number {
    return this.maxTime - Date.now();
  }

  start (tick: () => void) {
    if (this.countMs <= 0) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      if (this.countMs <= 0) {
        return;
      }
      try {
        const maxTime = Date.now() + this.countMs;
        let expected = Date.now() + this.interval;
        const step = () => {
          const drift = Date.now() - expected;
          expected += this.interval;
          if (expected <= maxTime) {
            this.timer = setTimeout(step, Math.max(0, this.interval - drift)); // take into account drift
            tick();
          }
          else {
            tick();
            resolve();
          }
        };
        this.timer = setTimeout(step, this.interval);
      }
      catch (e) {
        reject(e);
      }
    });
  }

  reset () {
    clearTimeout(this.timer);
    this.timer = undefined;
  }
}
