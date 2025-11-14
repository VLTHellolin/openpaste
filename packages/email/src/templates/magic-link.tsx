/* eslint-disable react-refresh/only-export-components */
import { Button, Preview, Text } from '@react-email/components';
import { z } from 'zod';
import { Layout } from '@/components/Layout';

export const magicLinkSchema = z.object({
  url: z.url(),
  message: z.string().optional(),
  previewMessage: z.string().optional(),
  buttonMessage: z.string().optional(),
});

export const MagicLink = ({
  url = 'https://example.com/magic-link',
  message = 'Here is your magic link: ',
  previewMessage = 'Here is your magic link',
  buttonMessage = 'Click here to proceed',
}: z.infer<typeof magicLinkSchema>) => {
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
      <Button
        href={url}
        style={{
          fontSize: '16px',
          backgroundColor: '#3e3e3e',
          borderRadius: '5px',
          color: '#ffffff',
          textDecoration: 'none',
          padding: '10px 12px',
        }}
      >
        {buttonMessage}
      </Button>
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

export default MagicLink;
