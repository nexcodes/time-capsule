'use client';

import { AuroraBackground } from '@/components/aceternityui/aura-background';
import Logo from '@/components/logo';
import { ExtendedUser } from '@/next-auth';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

function Navbar({ user }: { user?: ExtendedUser }) {
  return (
    <div className='relative max-w-7xl mx-auto w-full px-4 py-8'>
      <div className='relative'>
        <header>
          <div className={`md:hidden mx-2 pb-5`}>
            <Logo />
          </div>
          <nav
            className={`pb-5 md:text-sm absolute top-0 inset-x-0 shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-0 md:mt-0 md:relative md:bg-transparent`}
          >
            <div className='gap-x-14 items-center px-4 md:flex justify-between md:px-8'>
              <Logo />

              <div className='items-center justify-end mt-6 space-y-6 md:flex md:mt-0 group'>
                <Link
                  href={!!user ? '/capsules' : '/auth/login'}
                  className='flex items-center justify-center gap-x-1 py-3 px-4 text-slate-900 font-medium transform-gpu rounded-full md:inline-flex '
                >
                  {!!user ? 'View Capsules' : 'Sign In'}
                  <ChevronRight
                    size={24}
                    className='group-hover:translate-x-0.5 transition-transform'
                  />
                </Link>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}

export function Hero({ user }: { user?: ExtendedUser }) {
  return (
    <AuroraBackground>
      <Navbar user={user} />
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className='relative flex flex-col min-h-[50vh] gap-4 items-center justify-center px-4 max-w-7xl mx-auto text-center'
      >
        <div className='text-3xl md:text-7xl font-bold text-center'>
          Bury Your Story. Unearth the Future{' '}
        </div>
        <div className='font-extralight text-base md:text-4xl py-4'>
          Send a message in a bottle... digitally! Capture your life today and
          share it with the future. Create a time capsule with photos, videos,
          and memories - all from your phone.
        </div>
        <Link
          href='/capsules'
          className='bg-black rounded-full w-fit text-white px-4 py-2 transition-all duration-300 hover:bg-black/90 hover:ring-2 hover:ring-black/90 hover:ring-offset-2'
        >
          Get Started
        </Link>
      </motion.div>
    </AuroraBackground>
  );
}
