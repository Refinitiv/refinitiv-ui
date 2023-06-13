const fg = require('fast-glob');
const esbuild = require('esbuild');

const handler = async () => {
  const elements = fg('../packages/elements/lib/*/index.js');
  const themes = fg('../packages/elements/lib/*/themes/halo/*/index.js');

  const entryPoints = (await Promise.all([elements, themes])).flat();

  const bundleOptions = {
    format: 'esm',
    bundle: true,
    minify: true,
    treeShaking: true,
    logLevel: 'error',
  }

  await esbuild.build({
    entryPoints: entryPoints,
    outbase:'../packages/elements/lib',
    outdir: 'dist/resources/elements',
    ...bundleOptions,
  });

  const nativeThemes = await fg('../packages/halo-theme/*/imports/native-elements.js');
  await esbuild.build({
    entryPoints: nativeThemes,
    outdir: 'dist/resources/halo-theme',
    ...bundleOptions,
  });
};

handler();


