import { db } from '@openpaste/db';
import * as schema from '@openpaste/db/schema/auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { emailOTP, haveIBeenPwned, lastLoginMethod, openAPI } from 'better-auth/plugins';
import { Mailer } from './mail';

const mailer = new Mailer();

const mailTitleDict = {
  'email-verification': 'Verify Your Email Address',
  'forget-password': 'Reset Your Password',
  'sign-in': 'Your Sign-In Code',
};

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || ''],
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
          subject: `${mailTitleDict[type]} | OpenPaste`,
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
});

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
