'use client';

import { SunDim } from 'lucide-react';
import { useTheme } from 'next-themes';
import { IconMoon } from './icons';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className='bg-[#D9D9D9]/50 dark:bg-[#D9D9D93B]/25 py-2 px-2.5 rounded-full flex justify-between gap-2 w-fit'>
      <button
        onClick={() => setTheme('light')}
        className='p-1.5 rounded-full bg-yellow-400 text-black dark:bg-transparent dark:text-white'
      >
        <SunDim className='w-5 h-5' />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className='p-1.5 rounded-full text-black dark:bg-[#9CC6C7] dark:text-white'
      >
        <IconMoon className='w-5 h-5 dark:invert stroke-2' />
      </button>
    </div>
  );
}
