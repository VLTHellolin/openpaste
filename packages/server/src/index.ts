import { cors } from '@elysiajs/cors';
import { openapi } from '@elysiajs/openapi';
import { auth, AuthOpenAPI } from '@openpaste/auth';
import { Elysia } from 'elysia';

const authOpenAPI = new AuthOpenAPI();

export const app = new Elysia({ prefix: '/api' })
  .use(cors({
    origin: process.env.CORS_ORIGIN || '',
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }))
  .use(openapi({
    provider: null,
    documentation: {
      components: await authOpenAPI.components as any,
      paths: await authOpenAPI.getPaths() as any,
    },
  }))
  .get('/ping', () => 'pong')
  .all('/auth', async ({ request, status }) => {
    if (!['GET', 'POST'].includes(request.method)) {
      return status(405);
    }
    return auth.handler(request);
  });

export type App = typeof app;
