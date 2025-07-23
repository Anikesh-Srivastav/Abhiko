
'use client';

import { type ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { AuthProvider } from './auth-provider';
import { QueryProvider } from './query-provider';
import { CartProvider } from './cart-provider';
import { PostsProvider } from './posts-provider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <PostsProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </PostsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
