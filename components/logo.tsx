import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { Pill } from 'lucide-react';
import Link from 'next/link';
import SparklesText from './magicui/sparkeles-text';

const Logo = () => {
  return (
    <div className='flex h-16 items-center justify-between px-4'>
      <Link
        href={DEFAULT_LOGIN_REDIRECT}
        className='flex items-center gap-2 font-semibold'
      >
        <Pill />
        <SparklesText
          text='Time Capsule'
          className='text-lg font-normal'
          colors={{
            first: '#000',
            second: '#000',
          }}
          sparklesCount={4}
        />
        {/* <span className='text-lg'></span> */}
      </Link>
    </div>
  );
};

export default Logo;
