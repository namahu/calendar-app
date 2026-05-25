import type { Hono } from 'hono';

export const registerRoutes = (app: Hono): void => {
  app.get('/', (c) => {
    return c.json({
      message: 'API server is running.',
    });
  });
};
