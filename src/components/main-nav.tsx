
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { UtensilsCrossed, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';
import { UserNav } from './user-nav';
import { Button } from './ui/button';
import { useCart } from '@/hooks/use-cart';
import { CartSheet } from './cart-sheet';

const navLinks = [
  { href: '/delivery', label: 'Delivery' },
  { href: '/abigram', label: 'Abigram' },
];

export function MainNav() {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  
  const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="hidden font-bold sm:inline-block font-headline">Abhiko</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
               {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors hover:text-foreground/80',
                    pathname?.startsWith(link.href) ? 'text-foreground' : 'text-foreground/60'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
             <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {cartItemCount}
                  </span>
                )}
                <span className="sr-only">Open cart</span>
              </Button>
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
