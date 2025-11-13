import type { App } from '@openpaste/server';
import { treaty } from '@elysiajs/eden';

export const { api } = treaty<App>(
  process.env.SERVER_URL
  || `http://localhost:${process.env.SERVER_PORT || 3000}`,
);
