import { cors } from '@elysiajs/cors';
import { fromTypes, openapi } from '@elysiajs/openapi';
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
    references: fromTypes(),
    documentation: {
      components: await authOpenAPI.components as any,
      paths: await authOpenAPI.getPaths() as any,
    },
  }))
  .get('/ping', () => 'pong')
  .mount(auth.handler)
  .listen({
    hostname: process.env.SERVER_HOST || '0.0.0.0',
    port: process.env.SERVER_PORT || '3100',
  });

export type App = typeof app;
