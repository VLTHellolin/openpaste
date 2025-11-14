import { MagicLink, magicLinkSchema } from './magic-link';
import { OTP, otpSchema } from './otp';

export const templates = {
  otp: {
    Component: OTP,
    schema: otpSchema,
  },
  'magic-link': {
    Component: MagicLink,
    schema: magicLinkSchema,
  },
} as const;
