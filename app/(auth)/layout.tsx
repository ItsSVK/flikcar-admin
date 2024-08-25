import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your account',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-column min-h-screen justify-center items-center">
        {children}
      </div>
    </Suspense>
  );
}
