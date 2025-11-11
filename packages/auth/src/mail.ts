import type { Transporter } from 'nodemailer';
import { createTransport } from 'nodemailer';

export interface MailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export class Mailer {
  private sender = process.env.SMTP_SENDER || '';
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
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
    });
  }

  async send(options: MailOptions) {
    return this.transporter.sendMail({
      ...options,
      from: this.sender,
    });
  }
}
