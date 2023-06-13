const fg = require('fast-glob');
const esbuild = require('esbuild');

const handler = async () => {
  const elements = fg('../packages/elements/lib/*/index.js');
  const themes = fg('../packages/elements/lib/*/themes/halo/*/index.js');
  const entryPoints = (await Promise.all([elements, themes])).flat();

  await esbuild.build({
    entryPoints: entryPoints,
    format: 'esm',
    bundle: true,
    logLevel: 'error',
    outbase:'../packages/elements/lib',
    outdir: 'dist/resources/elements'
  });

  const nativeThemes = await fg('../packages/halo-theme/*/imports/native-elements.js');
  await esbuild.build({
    entryPoints: nativeThemes,
    format: 'esm',
    bundle: true,
    minify: true,
    logLevel: 'error',
    outdir: 'dist/resources/halo-theme'
  });
};

handler();


