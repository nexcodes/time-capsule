import Meteors from '@/components/magicui/meteors';
import React from 'react';
import SidebarDesktop from './_components/sidebar-desktop';
import SidebarMobile from './_components/sidebar-mobile';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='grid min-h-screen w-full lg:grid-cols-[360px_1fr]'>
      <SidebarDesktop />
      <main className='relative overflow-hidden flex flex-col'>
        {/* <header className='flex h-16 items-center justify-between border-b px-2 lg:px-6'>
          <div className='flex items-center gap-4'>
            <Input type='search' placeholder='Search capsules...' />
          </div>
        </header> */}
        <SidebarMobile />
        {children}
        <div className='overflow-hidden'>
          <Meteors number={30} />
        </div>
      </main>
    </div>
  );
}
