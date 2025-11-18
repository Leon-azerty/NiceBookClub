import { ModeToggle } from '@/components/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { auth } from '@/lib/auth';
import { CircleCheck } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Signout from '../signout';
import Password from './password';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.emailVerified) {
    redirect(`/verify?email=${session?.user.email}`);
  }
  return (
    <main className="flex size-full items-center justify-center">
      <section className="flex flex-col">
        <Avatar>
          <AvatarImage src={session?.user.image ?? undefined} />
          <AvatarFallback>{session?.user.name[0]}</AvatarFallback>
        </Avatar>
        <p>Profile : {session?.user.name}</p>
        <div className="flex gap-2">
          <p>email : {session?.user.email}</p>
          {session.user.emailVerified && <CircleCheck />}
        </div>
        <Password />
        <ModeToggle />
        <Signout />
      </section>
    </main>
  );
}
