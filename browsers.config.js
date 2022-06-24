const osType = require('os').type();

const isWin = osType === 'Windows_NT';
const isDarwin = osType === 'Darwin'; /* macOS, iOS, iPadOS */

// Local browsers
const defaultBrowsers = ['chrome', 'firefox'];
const availableBrowsers = ['chrome', 'firefox', 'opera'];

// BrowserStack browsers
const defaultBSBrowsers = ['chrome', 'firefox', 'edge', 'safari'];
const previousBSBrowser = ['chrome_previous', 'firefox_previous', 'edge_previous', 'safari_previous'];
const supportedBSBrowsers = [...defaultBSBrowsers, ...previousBSBrowser];
const availableBSBrowsers = [
  'default', // default browsers alias
  'supported', // supported browsers alias
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

// BrowserStack Base Config
const defaultBSConfig = { base: 'BrowserStack' };
const defaultBSDevice = { ...defaultBSConfig, real_mobile: 'true'};
const defaultWindows = { ...defaultBSConfig, os: 'Windows', os_version: '11' };
const defaultOSX = { ...defaultBSConfig, os: 'OS X', os_version: 'Monterey' };

// BrowserStack Browsers Config
let BSConfig = {
  // Latest versions
  chrome: { ...defaultWindows, browser: 'chrome', browser_version: 'latest' },
  firefox: { ...defaultWindows, browser: 'firefox', browser_version: 'latest' },
  edge:   { ...defaultWindows, browser: 'edge',   browser_version: 'latest' },
  safari: { ...defaultOSX,     browser: 'safari' },

  // Previous versions
  chrome_previous: { ...defaultWindows, browser: 'chrome', browser_version: 'latest-1' },
  firefox_previous: { ...defaultWindows, browser: 'firefox', browser_version: 'latest-1' },
  edge_previous:   { ...defaultWindows, browser: 'edge',   browser_version: 'latest-1' },
  safari_previous: { ...defaultOSX,     browser: 'safari', os_version: 'Big Sur' },

  // Mobile Devices
  ios:     { ...defaultBSDevice, device : 'iPhone 13',      os: 'ios',     os_version : '15.0' },
  android: { ...defaultBSDevice, device : 'Google Pixel 6', os: 'android', os_version : '12.0' }
};

module.exports = {
  defaultBrowsers,
  availableBrowsers,
  defaultBSBrowsers,
  supportedBSBrowsers,
  availableBSBrowsers,
  BSConfig
};
