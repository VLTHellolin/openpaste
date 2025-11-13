import type { BetterAuthClientOptions } from 'better-auth';
import { emailOTPClient, lastLoginMethodClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

const options = {
  baseURL:
    process.env.SERVER_URL
    || `http://localhost:${process.env.SERVER_PORT || 3000}`,
  basePath: '/auth',
  plugins: [
    emailOTPClient(),
    lastLoginMethodClient(),
  ],
} satisfies BetterAuthClientOptions;

// eslint-disable-next-line ts/no-unnecessary-type-assertion
export const auth = createAuthClient(options) as ReturnType<typeof createAuthClient<typeof options>>;
