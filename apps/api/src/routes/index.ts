import type { Hono } from 'hono';

export const registerRoutes = (app: Hono): void => {
  app.get('/', (c) => {
    return c.json({
      message: 'API server is running.',
    });
  });
  app.get('/health', (c) => {
    return c.json({
      status: 'ok',
      message: 'API health check is ok.'
    });
  });
};
