
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { UtensilsCrossed, QrCode } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { UserNav } from '@/components/user-nav';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="text-xl font-headline font-bold">Abhiko</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
             <Link href="/abigram">Abigram</Link>
          </Button>
          <ThemeToggle />
          {user ? (
            <UserNav />
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                Savor the Flavor, <br />
                Share the <span className="text-primary">Joy</span>.
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Your one-stop platform for delicious Indian cuisine, whether you're dining in or ordering out. Discover, order, and share your favorite food moments with Abigram.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="font-bold text-lg" asChild>
                  <Link href="/delivery">
                    <UtensilsCrossed className="mr-2 h-5 w-5" />
                    Order From Home
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" className="font-bold text-lg" asChild>
                  <Link href="/dine-in">
                    <QrCode className="mr-2 h-5 w-5" />
                    Dine-In
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
               <Image
                 src="https://placehold.co/600x400.png"
                 alt="Delicious Indian food platter"
                 data-ai-hint="indian food platter"
                 layout="fill"
                 objectFit="cover"
                 className="transform hover:scale-105 transition-transform duration-500 ease-in-out"
               />
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Abhiko. All rights reserved.</p>
      </footer>
    </div>
  );
}
