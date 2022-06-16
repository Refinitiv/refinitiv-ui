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

const defaultWindowLauncher = {
  base: 'BrowserStack',
  os: 'Windows',
  os_version: '11',
}

const defaultOSLauncher = {
  base: 'BrowserStack',
  os: 'OS X',
  os_version: 'Monterey',
}

const BSLaunchersConfig = {
  chrome: defaultWindowLauncher,
  firefox: defaultWindowLauncher,
  edge: defaultWindowLauncher,
  safari: defaultOSLauncher,
  chrome_previous: { ...defaultWindowLauncher, browser_version: 'latest-1' },
  firefox_previous: { ...defaultWindowLauncher, browser_version: 'latest-1' },
  edge_previous: { ...defaultWindowLauncher, browser_version: 'latest-1' },
  safari_previous: { ...defaultOSLauncher, os_version: 'Big Sur' },
  ios: {
    device : 'iPhone 13',
    os_version : '15.0',
    real_mobile: 'true'
  },
  android: {
    device : 'Google Pixel 6',
    os_version : '12.0',
    real_mobile: 'true'
  },
}

module.exports = {
  defaultBrowsers,
  availableBrowsers,
  defaultBSBrowsers,
  supportedBSBrowsers,
  availableBSBrowsers,
  BSLaunchersConfig
};
