const fg = require('fast-glob');
const esbuild = require('esbuild');

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
  const elements = fg('../packages/elements/lib/*/index.js');
  const elementsThemes = fg('../packages/elements/lib/*/themes/halo/*/index.js');

  const entryPoints = (await Promise.all([elements, elementsThemes])).flat();

  await esbuild.build({
    entryPoints: entryPoints,
    outbase: '../packages/elements/lib',
    outdir: `${DIST}/elements`,
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
