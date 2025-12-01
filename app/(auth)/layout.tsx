import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="flex justify-center">
        <div className="w-40 space-x-4">
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
          <Link href="/" className="hover:underline">
            Livres
          </Link>
          <Link href="/loans" className="hover:underline">
            Emprunts
          </Link>
        </div>
      </div>
      {children}
    </section>
  );
}
