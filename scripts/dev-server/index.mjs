#!/usr/bin/env node

import middlewareOverrideDemoPath from './middleware/override-demo-path.mjs';
import { startDevServer as server } from '@web/dev-server';

export { server, middlewareOverrideDemoPath };
