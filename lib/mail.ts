import { Resend } from 'resend';

const resend = new Resend('re_XZHKVspP_4t5eKdd1Wkbpe9rGsq5MbJq8');

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (_email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  /* Set the "to" field to use the recipient's email address */
  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: 'fiantsorav@gmail.com',
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
