import type React from 'react';
import {
  Body,
  Container,
  Heading,
  Hr,
  Html,
  Section,
  Text,
} from '@react-email/components';

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <Html>
    <Body
      style={{
        margin: 'auto',
        backgroundColor: '#f4f4f4',
      }}
    >
      <Container
        style={{
          margin: 'auto 30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'baseline',
          gap: '25px',
          padding: '10px 0',
        }}
      >
        <Section>
          <Heading
            style={{
              color: '#333333',
              fontSize: '22px',
              lineHeight: '32px',
              fontWeight: '700',
            }}
          >
            {process.env.APP_NAME || 'OpenPaste'}
          </Heading>
        </Section>
        <Section>
          {children}
        </Section>
        <Section>
          <Hr />
          <Text
            style={{
              color: '#888888',
              fontSize: '12px',
              lineHeight: '20px',
            }}
          >
            © {new Date().getFullYear()} {process.env.APP_NAME || 'OpenPaste'}. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);
