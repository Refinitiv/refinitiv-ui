import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const repositoryRoot = fileURLToPath(new URL('../../', import.meta.url));
const packageOutput = fileURLToPath(new URL('../../artifacts/shell-compat/', import.meta.url));
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
mkdirSync(packageOutput, { recursive: true });
for (const packageName of ['core', 'elements', 'halo-theme']) {
  execFileSync(
    'npm',
    ['pack', '--workspace', `@refinitiv-ui/${packageName}`, '--pack-destination', packageOutput],
    buildOptions
  );
}
