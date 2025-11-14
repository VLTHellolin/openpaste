/* eslint-disable react-refresh/only-export-components */
import { Preview, Text } from '@react-email/components';
import { z } from 'zod';
import { Layout } from '@/components/Layout';

export const otpSchema = z.object({
  otp: z.string().length(6),
  message: z.string().optional(),
  previewMessage: z.string().optional(),
});

export const OTP = ({
  otp = '123456',
  message = 'Here is your one-time password (OTP): ',
  previewMessage = `Your code is ${otp}`,
}: z.infer<typeof otpSchema>) => {
  return (
    <Layout>
      <Preview>{previewMessage}</Preview>
      <Text
        style={{
          fontSize: '16px',
          color: '#333333',
        }}
      >
        {message}
      </Text>
      <code
        style={{
          fontSize: '20px',
          borderRadius: '5px',
          color: '#333333',
          border: '1px solid #eeeeee',
          margin: 'auto',
          padding: '10px 15px',
          backgroundColor: '#f9f9f9',
          letterSpacing: '4px',
        }}
      >
        {otp}
      </code>
      <Text
        style={{
          fontSize: '16px',
          color: '#333333',
        }}
      >
        Did not request this? You can ignore this email safely
        and contact us if you believe this was an error.
      </Text>
    </Layout>
  );
};

export default OTP;
