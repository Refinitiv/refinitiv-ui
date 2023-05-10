const isEdge = (/Edge\/\d./i).test(navigator.userAgent);
const isIE = (/Trident/g).test(navigator.userAgent) || (/MSIE/g).test(navigator.userAgent);
const isMobile = (/iPhone|iPad|iPod|Android/i).test(window.navigator.userAgent);

/**
 * Compare target version of browser with current version of browser
 * @param targetVersion target version of browser that can include operator(<,>,>=,<=,=) to compare e.g. '>15.4'
 * @param browserVersion current version of browser that use to render the component
 * @returns boolean
 */
const compareVersion = (targetVersion: string, browserVersion: string): boolean => {
  // Need to extract the operator in the targetVersion
  const operator = targetVersion.match(/^(>=?|<=?|[<>])/);
  targetVersion = targetVersion.replace(/[^0-9.]/g, '');
  if (operator) {
    switch (operator[0]) {
      case '<':
        return Number(browserVersion) < Number(targetVersion);
      case '>':
        return Number(browserVersion) > Number(targetVersion);
      case '<=':
        return Number(browserVersion) <= Number(targetVersion);
      case '>=':
        return Number(browserVersion) >= Number(targetVersion);
      default:
        return Number(browserVersion) === Number(targetVersion);
    }
  }
  return false;
};

/**
 * Check browser is Safari and compare version of Safari
 * @param targetVersion version of Safari that  can include an operator(<,>,>=,<=,=) to compare e.g. '<15.4'
 * @returns boolean
 */
const isSafari = (targetVersion: string): boolean => {
  const safari = (/Safari/).test(navigator.userAgent) && !(/Chrome/).test(navigator.userAgent);
  if (!safari) {
    return false;
  }
  if (targetVersion) {
    const safariVersion = navigator.userAgent.match(/Version\/([\d.]+)/);
    if (safariVersion) {
      return compareVersion(targetVersion, safariVersion[1]);
    }
    return false;
  }
  return true;
};

export {
  isEdge,
  isIE,
  isMobile,
  isSafari
};
