import type { BetterAuthOptions } from 'better-auth';
import { db } from '@openpaste/db';
import { Redis } from '@openpaste/db/redis';
import * as schema from '@openpaste/db/schema/auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { emailOTP, haveIBeenPwned, lastLoginMethod, openAPI } from 'better-auth/plugins';
import { Mailer } from './mail';

const appName = process.env.APP_NAME || 'OpenPaste';
const mailer = new Mailer();

const mailTitleDict = {
  'email-verification': 'Verify Your Email Address',
  'forget-password': 'Reset Your Password',
  'sign-in': 'Your Sign-In Code',
};

export const auth = betterAuth({
  appName,
  baseURL: process.env.APP_URL || 'http://localhost:3000',
  trustedOrigins: [process.env.CORS_ORIGIN || ''],
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  secondaryStorage: new Redis(),
  emailAndPassword: {
    enabled: true,
    disableSignUp: process.env.DISABLE_SIGNUP === 'true',
  },
  plugins: [
    haveIBeenPwned(),
    emailOTP({
      sendVerificationOnSignUp: true,
      sendVerificationOTP: async ({ email, otp, type }) => {
        await mailer.send({
          to: email,
          subject: `${mailTitleDict[type]} | ${appName}`,
          html: `<p>Your one-time password (OTP) is: <strong>${otp}</strong></p>`,
        });
      },
    }),
    lastLoginMethod(),
    openAPI({
      disableDefaultReference: true,
    }),
  ],
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    },
  },
  telemetry: {
    enabled: false,
  },
} satisfies BetterAuthOptions);

export type AuthOpenAPISchema = ReturnType<typeof auth.api.generateOpenAPISchema>;
export class AuthOpenAPI {
  private prefix = '/api';
  private schema: AuthOpenAPISchema;

  components: Promise<Awaited<AuthOpenAPISchema>['components']>;

  constructor() {
    this.schema = auth.api.generateOpenAPISchema();
    this.components = this.schema.then(({ components }) => components);
  }
  async getPaths() {
    const { paths } = await this.schema;
    const result: typeof paths = {};

    for (const path of Object.keys(paths)) {
      const key = this.prefix + path;
      result[key] = paths[path]!;

      for (const method of Object.keys(paths[path]!)) {
        const operation = result[key][method as keyof typeof result[typeof key]];
        if (operation && !operation.tags) {
          operation.tags = ['Better Auth'];
        }
      }
    }
    return result;
  }
}
