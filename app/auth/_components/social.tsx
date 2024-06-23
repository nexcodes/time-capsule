'use client';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export type Provider = 'google' | 'github';

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const socialOAuth = (provider: Provider) => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => socialOAuth('google')}
      >
        <FcGoogle size={20} />
      </Button>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => socialOAuth('github')}
      >
        <FaGithub size={20} />
      </Button>
    </div>
  );
};
