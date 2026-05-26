import { serve } from '@hono/node-server';

import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

serve({ fetch: app.fetch, port: env.port }, (info) => {
  console.log(`API server listening on http://localhost:${info.port}`);
});
