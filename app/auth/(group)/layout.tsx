import React from 'react';

export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-slate-900'>
      <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gradient-blue-from to-gradient-blue-to dark:from-sky-900 dark:via-sky-950 dark:to-to-gray-900 min-h-screen'>
        {children}
      </div>
    </div>
  );
}
