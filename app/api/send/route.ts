import { auth } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await auth.api.sendVerificationEmail({
      body: {
        email: body.email,
        callbackURL: '/error',
      },
    });
    console.log('res', res);

    if (!res.status) {
      return Response.json(
        { error: true, message: 'error when sending email' },
        { status: 500 }
      );
    }

    return Response.json({}, { status: 200 });
  } catch (error) {
    console.error('Error sending verification mail', error);
    return Response.json({ error }, { status: 500 });
  }
}
