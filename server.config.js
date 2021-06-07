const path = require('path');
const pluginCommonJs = require('./transform-commonjs-plugin'); //  support to use import @formatjs in __demo__
const packagesPath = `packages/${path.basename(process.cwd())}`;

module.exports = {
  open: true,
  watch: false,
  nodeResolve: true,
  preserveSymlinks: true,
  rootDir: '../../',
  polyfillsLoader: {
    polyfills: {
      shadyCssCustomStyle: true
    }
  },
  plugins: [
    pluginCommonJs(),
  ],
  middleware: [
    function rewriteDemoIndex (context, next) {
      const url = context.url;
      if (url === '/' || url === '/index.html') {
        context.url = `${packagesPath}/__demo__/index.html`;
      }
      else if (url.startsWith('/lib')) {
        context.url = `${packagesPath}${url}`;
      }
      return next();
    },
    function rewriteDemoResources(context, next) {
      const url = context.url;
      if (url.startsWith('/') && !url.startsWith('/node_modules')) {
        context.url = `${packagesPath}/${url}`;
      }
      return next();
    }
  ]
};
