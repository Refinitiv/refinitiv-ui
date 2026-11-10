import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const repositoryRoot = fileURLToPath(new URL('../../', import.meta.url));
const packageOutput = fileURLToPath(new URL('../../artifacts/shell-compat/', import.meta.url));
const elementsRoot = fileURLToPath(new URL('../../packages/elements/', import.meta.url));
const buildOptions = {
  cwd: repositoryRoot,
  stdio: 'inherit',
  env: { ...process.env, NX_DAEMON: 'false' }
};

execFileSync(
  'npx',
  [
    'nx',
    'run-many',
    '--target=build',
    '--projects=@refinitiv-ui/core,@refinitiv-ui/elements,@refinitiv-ui/halo-theme',
    '--parallel=1'
  ],
  buildOptions
);

// npm pack does not run the release step that stamps the element version.
execFileSync('node', [fileURLToPath(new URL('../release/versioning.js', import.meta.url))], {
  ...buildOptions,
  env: { ...buildOptions.env, PACKAGE_ROOT: elementsRoot }
});
const { version: elementsVersion } = JSON.parse(
  readFileSync(new URL('../../packages/elements/package.json', import.meta.url), 'utf8')
);
if (typeof elementsVersion !== 'string' || !elementsVersion) {
  throw new Error('The elements package version is missing.');
}
for (const filename of ['version.js', 'version.d.ts']) {
  const versionFile = new URL(`../../packages/elements/lib/${filename}`, import.meta.url);
  const originalContent = readFileSync(versionFile, 'utf8');
  const stampedContent = originalContent.replace('PUBLISH_VERSION', elementsVersion);
  const versionDeclaration = stampedContent.match(/^export (?:declare )?const VERSION = ['"]([^'"]+)['"];$/m);
  if (versionDeclaration?.[1] !== elementsVersion) {
    throw new Error(`Could not stamp the elements version in ${filename}.`);
  }
  if (stampedContent !== originalContent) {
    writeFileSync(versionFile, stampedContent);
  }
}

mkdirSync(packageOutput, { recursive: true });
for (const packageName of ['core', 'elements', 'halo-theme']) {
  execFileSync(
    'npm',
    ['pack', '--workspace', `@refinitiv-ui/${packageName}`, '--pack-destination', packageOutput],
    buildOptions
  );
}
