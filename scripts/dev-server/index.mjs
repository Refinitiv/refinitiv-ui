#!/usr/bin/env node

import middlewareOverrideDemoPath from './middleware/override-demo-path.mjs';
import { pluginJsBufferToString } from './plugins/js-buffer-to-string.config.mjs';
import { startDevServer as server } from '@web/dev-server';

export { server, middlewareOverrideDemoPath, pluginJsBufferToString };
