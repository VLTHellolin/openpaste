import type { z } from 'zod';
import { createLogger } from '@openpaste/logger';
import { render, toPlainText } from '@react-email/components';
import { createTransport } from 'nodemailer';
import { templates } from './templates';

const logger = createLogger({
  name: 'email',
});

const sender = process.env.SMTP_SENDER;
const mailOptions = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    ciphers: 'TLSv1.2',
  },
};
const transporter = createTransport(mailOptions);

export const sendEmail = async <T extends keyof typeof templates>(
  template: T,
  data: {
    to: string | string[];
    subject: string;
  } & z.infer<typeof templates[T]['schema']>,
) => {
  const { to, subject, ...rawProps } = data;
  const { Component, schema } = templates[template];

  const props = schema.safeParse(rawProps);
  if (!props.success) {
    logger.error('Email template data validation failed:', props.error);
    return;
  }

  const component = Component(props.data as any);
  const html = await render(component);

  if (!sender || !mailOptions.host || !mailOptions.auth.user || !mailOptions.auth.pass) {
    logger.warn('SMTP configuration is missing.');
    logger.info('Here is the data:');
    logger.info(html);
    return;
  }

  try {
    await transporter.sendMail({
      from: sender,
      to,
      subject,
      text: toPlainText(html),
      html,
    });
  } catch (error) {
    logger.error('Failed to send email:', error);
  }
};
