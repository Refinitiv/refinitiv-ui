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
  await esbuild.build({
    entryPoints: ['src/theme-loader.js'],
    outdir: 'dist',
    ...OPTIONS,
  });

  await esbuild.build({
    entryPoints: ['src/elements.js', 'src/light.js', 'src/dark.js'],
    outdir: `${DIST}`,
    ...OPTIONS,
  });
};

handler();
