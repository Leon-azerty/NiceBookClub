import {
  EmailVerificationTemplate,
  ResetPasswordTemplate,
} from '@/components/email/template';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { Resend } from 'resend';
import { prisma } from './prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  databaseHooks: {
    user: {
      create: {
        after: async (user, context) => {
          const availableCard = await prisma.memberCard.findFirst({
            where: { status: 'FREE', user: null },
          });

          if (availableCard) {
            await prisma.memberCard.update({
              where: { id: availableCard.id },
              data: {
                status: 'IN_USE',
                user: { connect: { id: user.id } },
              },
            });
          }
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

    sendResetPassword: async ({ user, url, token }, request) => {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Reset your password',
        react: ResetPasswordTemplate({
          firstName: user.name,
          url: url,
          token,
        }),
      });
      if (error) {
        console.error('error', error);
      }
      console.log('data', data);
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 2, // 2 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Hello world',
        react: EmailVerificationTemplate({
          firstName: user.name,
          url: url,
          token,
        }),
      });
      if (error) {
        console.error('error', error);
      }
      console.log('data', data);
    },
  },
});
