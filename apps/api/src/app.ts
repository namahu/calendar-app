import { Hono } from 'hono';

import { registerRoutes } from './routes/index.js';

export const createApp = (): Hono<Record<string, never>> => {
  const app = new Hono();

  registerRoutes(app);

  return app;
};
