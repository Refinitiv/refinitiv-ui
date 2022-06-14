const osType = require('os').type();

const isWin = osType === 'Windows_NT';
const isDarwin = osType === 'Darwin'; /* macOS, iOS, iPadOS */

// Local browsers
const defaultBrowsers = ['chrome', 'firefox'];
const availableBrowsers = ['chrome', 'firefox', 'opera'];

// BrowserStack browsers
const defaultBSBrowsers = ['chrome', 'firefox', 'edge'];
const supportedBSBrowsers = [
  'chrome', 'firefox', 'edge',
  'chrome_previous', 'firefox_previous', 'edge_previous'
];
const availableBSBrowsers = [
  'supported', 'chrome', 'firefox', 'edge', 'safari', 'ios', 'android',
  'chrome_previous', 'firefox_previous', 'edge_previous', 'safari_previous'
];

// do not perform browser check as it is slow and never required

if (isWin) {
  availableBrowsers.push('ie');
}

if (isDarwin) {
  // defaultBrowsers.push('safari'); /* there is a bug https://github.com/karma-runner/karma-safari-launcher/issues/29, so do not include it by default  */
  availableBrowsers.push('safari');
}

 /**
   * Create a custom launcher config for BrowserStack
   * @param {string} name custom launcher name
   * @param {string} os OS name
   * @param {string} osVersion OS version
   * @param {string} browser Browser for run test
   * @param {string} browserVersion Browser version
   * @returns Karma BrowserStack lancher config
   */
  const BSBrowser = function (name, os, osVersion, browser, browserVersion) {
    return {
      [name]: { base: 'BrowserStack', os: os, os_version: osVersion, browser: browser, browser_version: browserVersion }
    }
  };

  /**
   * Create a custom launcher config for BrowserStack mobile device
   * @param {string} name custom launcher name
   * @param {string} os OS name
   * @param {string} osVersion OS version for run test
   * @param {string} device mobile device name
   * @returns Karma BrowserStack lancher config
   */
  const BSDevice = function (name, os, osVersion, device) {
    return {
      [name]: { base: 'BrowserStack', os: os, os_version: osVersion, device: device, real_mobile: 'true'}
    };
  };

module.exports = {
  defaultBrowsers,
  availableBrowsers,
  defaultBSBrowsers,
  supportedBSBrowsers,
  availableBSBrowsers,
  BSBrowser,
  BSDevice
};
