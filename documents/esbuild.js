const fg = require('fast-glob');
const esbuild = require('esbuild');
const path = require('path');

/**
 * This plugin does 2 things,
 *
 *  - Keep `import '../icon/index.js';` external - meaning that these import will not be bundled.
 *  - Replaces `import '@refinitiv-ui/elements/button/themes/halo/dark' with relative paths.
 *
 * This is to prevent element and theme duplicate definition.
 */
const replaceElementsImportsPlugin = {
  name: 'replace-elements-imports-plugin',
  setup(build) {
    build.onResolve(
      {
        filter:
          /^\..\/(panel|header|icon|collapse|accordion|appstate-bar|overlay|tooltip|checkbox|item|loader|autosuggest|button|button-bar|calendar|canvas|overlay-menu|label|card|layout|chart|clock|text-field|number-field|dialog|color-dialog|color-picker|list|counter|combo-box|time-picker|datetime-picker|email-field|flag|heatmap|interactive-chart|led-gauge|pill|multi-input|notification|pagination|password-field|progress-bar|radio-button|rating|search-field|select|sidebar-layout|slider|sparkline|swing-gauge|tab|tab-bar|toggle|tornado-chart|tree|tree-select|datetime-field)\/index.js/,
      },
      (args) => {
        return {
          path: args.path,
          external: true,
        };
      }
    );
    build.onResolve(
      { filter: /^@refinitiv-ui\/elements\/.*\/themes/ },
      (args) => {
        const newPath = args.path.replace('@refinitiv-ui/elements','../../../..');
        return {
          path: path.join(newPath, 'index.js'),
          external: true,
        };
      }
    );
  },
};

const DIST = 'dist/resources';

const OPTIONS = {
  format: 'esm',
  bundle: true,
  minify: true,
  target: 'esnext',
  treeShaking: true,
  logLevel: 'error',
};

const handler = async () => {
  await esbuild.build({
    entryPoints: ['src/theme-loader.js'],
    outdir: 'dist',
    ...OPTIONS,
  });

  const elements = fg('../packages/elements/lib/*/index.js');
  const elementsThemes = fg('../packages/elements/lib/*/themes/halo/*/index.js');
  await esbuild.build({
    entryPoints: (await Promise.all([elements, elementsThemes])).flat(),
    outbase: '../packages/elements/lib',
    outdir: `${DIST}/elements`,
    plugins: [replaceElementsImportsPlugin],
    ...OPTIONS,
  });

  const nativeThemes = await fg('../packages/halo-theme/*/imports/native-elements.js');
  await esbuild.build({
    entryPoints: nativeThemes,
    outdir: `${DIST}/halo-theme`,
    ...OPTIONS,
  });

  const core = await fg('../packages/core/lib/**/*.js');
  await esbuild.build({
    entryPoints: core,
    outdir: `${DIST}/core`,
    ...OPTIONS,
  });

  const utils = await fg('../packages/utils/lib/**/*.js');
  await esbuild.build({
    entryPoints: utils,
    outdir: `${DIST}/utils`,
    ...OPTIONS,
  });
};

handler();
