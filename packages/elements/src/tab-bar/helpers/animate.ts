interface Configs {
  target: HTMLElement;
  startPosition: number;
  endPosition: number;
  duration?: number;
  easing?: string;
  complete?: Function;
}

const ANIMATION_DURATION = 100; // specifies the length of time an animation should take to complete
const DEFAULT_EASING = 'easeOutQuad';

/**
 * Common easing equations from https://easings.net
 * @param name type of easing
 * @returns easing function
 */
const functionEasings: {[name: string]: Function} = {
  /**
   * Decelerating to zero velocity
   * @param time current time or position
   * @returns easing value
   */
  easeOutQuad: (time: number): number => {
    return time * (2 - time);
  }
};

/**
 * Common easing equations from https://easings.net
 * @param configs animate config
 * @returns {void}
 */
const tweenAnimate = (configs: Configs): void => {
  let animate: number;

  const {
    target,
    startPosition,
    endPosition,
    duration = ANIMATION_DURATION,
    easing = DEFAULT_EASING,
    complete
  } = configs;

  if(!target) {
    throw new TypeError('No target argument passed');
  }

  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  const delta = endPosition - startPosition;

  const tweenLoop = (): void => {
    const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    const step = Math.min(1, ((currentTime - startTime) / duration));
    const factor = functionEasings[easing](step); // factor can be a decimal

    configs.target.scrollLeft = startPosition + delta * factor;
  
    if (step < 1 && configs.target.scrollLeft !== endPosition) {
      animate = requestAnimationFrame(tweenLoop);
    }
    else {
      cancelAnimationFrame(animate);
      if(typeof complete === 'function') {
        complete();
      }
      return;
    }
  };

  tweenLoop();
};

export {
  tweenAnimate,
  ANIMATION_DURATION
};
