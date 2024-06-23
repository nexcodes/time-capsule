import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Toaster } from '../ui/sonner';
import ProgressBarProvider from './progressbar-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster />
      <ProgressBarProvider />
      {children}
    </SessionProvider>
  );
}
