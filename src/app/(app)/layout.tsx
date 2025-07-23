
'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { MainNav } from '@/components/main-nav';

export default function AppLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Wait until the component is mounted on the client to check for the user
    if (isMounted && user === null) {
      router.push('/login');
    }
  }, [user, router, isMounted]);

  // While checking for user or during redirection, we can show a loader
  // This also ensures the initial render on the client matches the server
  if (!isMounted || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // If user is authenticated, render the main layout with navigation
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
