const osType = require('os').type();

const isWin = osType === 'Windows_NT';
const isDarwin = osType === 'Darwin'; /* macOS, iOS, iPadOS */

// Local browsers
const defaultBrowsers = ['chrome', 'firefox'];
const availableBrowsers = ['chrome', 'firefox', 'opera'];

// BrowserStack browsers
const defaultBSBrowsers = ['chrome', 'firefox', 'edge'];
const previousBSBrowser = ['chrome_previous', 'firefox_previous', 'edge_previous'];
const supportedBSBrowsers = [...defaultBSBrowsers, ...previousBSBrowser];
const availableBSBrowsers = [
  'default', // alias default browsers
  'supported', // alias supported browsers
  ...supportedBSBrowsers,
  'safari', 'safari_previous',
  'ios', 'android'
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
 * @returns Karma BrowserStack launcher config
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
 * @returns Karma BrowserStack launcher config
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
