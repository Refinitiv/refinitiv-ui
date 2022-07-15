const osType = require('os').type();

const isWin = osType === 'Windows_NT';
const isDarwin = osType === 'Darwin'; /* macOS, iOS, iPadOS */

// Local browsers
const defaultBrowsers = ['chrome', 'firefox'];
const availableBrowsers = ['chrome', 'firefox', 'opera'];

// do not perform browser check as it is slow and never required
if (isWin) {
  availableBrowsers.push('ie');
}

if (isDarwin) {
  // defaultBrowsers.push('safari'); /* there is a bug https://github.com/karma-runner/karma-safari-launcher/issues/29, so do not include it by default  */
  availableBrowsers.push('safari');
}

// BrowserStack browsers
const BrowserStack = {
  defaultBrowsers: ['chrome', 'firefox', 'safari'],
  supportedBrowsers: [
    'chrome', 'firefox', 'safari', 'edge',
    'chrome_previous', 'firefox_previous', 'safari_previous', 'edge_previous'
  ],
  availableBrowsers: [
    'default', // default browsers alias
    'supported', // supported browsers alias
    'ios',
    'android'
  ]
};
// Copy supported browsers to available browsers
BrowserStack.availableBrowsers = [
  ...BrowserStack.supportedBrowsers,
  ...BrowserStack.availableBrowsers,
];

// BrowserStack Base Config
const defaultDevice = { base: 'BrowserStack', real_mobile: 'true'};
const defaultWindows = { base: 'BrowserStack', os: 'Windows', os_version: '11' };
const defaultOSX = { base: 'BrowserStack', os: 'OS X', os_version: 'Monterey' };

// BrowserStack Browsers Config
BrowserStack.config = {
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
  ios:     { ...defaultDevice, device : 'iPhone 13',      os: 'ios',     os_version : '15.0' },
  android: { ...defaultDevice, device : 'Google Pixel 6', os: 'android', os_version : '12.0' }
};

module.exports = {
  defaultBrowsers,
  availableBrowsers,
  BrowserStack
};
