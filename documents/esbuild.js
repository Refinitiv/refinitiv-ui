const fg = require('fast-glob');
const esbuild = require('esbuild');

const handler = async () => {
  const elements = await fg('../packages/elements/lib/*/index.js');
  await esbuild.build({
    entryPoints: elements,
    format: 'esm',
    bundle: true,
    minify: true,
    treeShaking: true,
    logLevel: 'error',
    outbase:'../packages/elements/lib',
    outdir: 'dist/resources/elements'
  });

  const themes = await fg('../packages/elements/lib/*/themes/halo/*/index.js');
  await esbuild.build({
    entryPoints: themes,
    format: 'esm',
    bundle: true,
    minify: true,
    treeShaking: true,
    logLevel: 'error',
    outbase:'../packages/elements/lib',
    outdir: 'dist/resources/themes'
  });

  const nativeThemes = await fg('../packages/halo-theme/*/imports/native-elements.js');
  await esbuild.build({
    entryPoints: nativeThemes,
    format: 'esm',
    bundle: true,
    minify: true,
    logLevel: 'error',
    outdir: 'dist/resources/native-themes'
  });
};

handler();


