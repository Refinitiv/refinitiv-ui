const fg = require('fast-glob');
const esbuild = require('esbuild');

const DIST = 'dist/resources';

const OPTIONS = {
  format: 'esm',
  bundle: true,
  minify: true,
  treeShaking: true,
  target: 'esnext',
  logLevel: 'error',
};

const handler = async () => {
  await esbuild.build({
    entryPoints: ['src/theme-loader.js'],
    outdir: 'dist',
    ...OPTIONS,
  });

  const elements = [
    'src/elements/index.js',
    'src/elements/light.js',
    'src/elements/dark.js',
  ];
  await esbuild.build({
    entryPoints: elements,
    outdir: `${DIST}/elements`,
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
