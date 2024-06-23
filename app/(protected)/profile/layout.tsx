import Logo from '@/components/logo';
import React from 'react';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='p-4'>
      <Logo />
      {children}
    </div>
  );
}
