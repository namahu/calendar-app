import { serve } from '@hono/node-server';

import { createApp } from './app.js';

const DEFAULT_PORT = 3000;

const resolvePort = (value: string | undefined): number => {
  if (value === undefined) {
    return DEFAULT_PORT;
  }

  const port = Number(value);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  return port;
};

const app = createApp();
const port = resolvePort(process.env.PORT);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`API server listening on http://localhost:${info.port}`);
});
