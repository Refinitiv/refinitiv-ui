// Default browsers
const DefaultBrowsers = ['chrome', 'firefox', 'safari'];

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
    'android',
    'samsung',
    'ios_previous',
    'android_previous',
    'samsung_previous'
  ]
};
// Copy supported browsers to available browsers
BrowserStack.availableBrowsers = [
  ...BrowserStack.supportedBrowsers,
  ...BrowserStack.availableBrowsers,
];

// BrowserStack Base Config
const defaultDevice = { real_mobile: 'true'};
const defaultWindows = { os: 'Windows', os_version: '11' };
const defaultOSX = { os: 'OS X', os_version: 'Monterey' };

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
  ios:     { ...defaultDevice, browser: 'iphone',  device : 'iPhone 14',          os: 'ios',     os_version : '16' },
  android: { ...defaultDevice, browser: 'android', device : 'Google Pixel 6',     os: 'android', os_version : '12.0' },
  samsung: { ...defaultDevice, browser: 'samsung', device : 'Samsung Galaxy S22', os: 'android', os_version : '12.0' },

  // Mobile Devices Previous versions
  ios_previous:     { ...defaultDevice, browser: 'iphone',  device : 'iPhone 13',          os: 'ios',     os_version : '15' },
  android_previous: { ...defaultDevice, browser: 'android', device : 'Google Pixel 5',     os: 'android', os_version : '11.0' },
  samsung_previous: { ...defaultDevice, browser: 'samsung', device : 'Samsung Galaxy S21', os: 'android', os_version : '11.0' }
};

export {
  DefaultBrowsers,
  BrowserStack
}
