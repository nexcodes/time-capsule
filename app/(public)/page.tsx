import Logo from '@/components/logo';
import { currentUser } from '@/lib/auth';
import Link from 'next/link';
import Features from './_components/features';
import { Hero } from './_components/hero';
import Testimonials from './_components/testimonials';

export default async function Home() {
  const user = await currentUser();

  return (
    <div className='overflow-hidden'>
      <Hero user={user} />
      <Features />
      <Testimonials />

      <footer className='bg-white m-4'>
        <div className='w-full mx-auto max-w-screen-xl p-4 flex flex-col md:flex-row items-center justify-between'>
          <Logo />
          <span className='text-sm text-gray-500 sm:text-center '>
            © 2023{' '}
            <Link href='/' className='hover:underline'>
              TimeCapsule™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
