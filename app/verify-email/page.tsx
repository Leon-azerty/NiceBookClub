import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import SendMail from './sendMail';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.email) return <p>Error : no session</p>;

  if (session?.user.emailVerified) {
    return (
      <section>
        Votre adresse email est déjà vérifiée.
        <Link href="/profile">Return to profile</Link>
      </section>
    );
  }

  return (
    <section>
      Si le lien n&apos;est plus valide et qu&apos;il faut en renvoyer un
      nouveau
      <SendMail email={session?.user.email} />
    </section>
  );
}
