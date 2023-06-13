const fg = require('fast-glob');
const esbuild = require('esbuild');

const OPTIONS = {
  format: 'esm',
  bundle: true,
  minify: true,
  treeShaking: true,
  logLevel: 'error',
};

const handler = async () => {
  const elements = fg('../packages/elements/lib/*/index.js');
  const themes = fg('../packages/elements/lib/*/themes/halo/*/index.js');

  const entryPoints = (await Promise.all([elements, themes])).flat();

  await esbuild.build({
    entryPoints: entryPoints,
    outbase: '../packages/elements/lib',
    outdir: 'dist/resources/elements',
    ...OPTIONS,
  });

  const nativeThemes = await fg('../packages/halo-theme/*/imports/native-elements.js');
  await esbuild.build({
    entryPoints: nativeThemes,
    outdir: 'dist/resources/halo-theme',
    ...OPTIONS,
  });
};

handler();
