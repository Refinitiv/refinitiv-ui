import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: ['test/*.test.js'],
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
};
