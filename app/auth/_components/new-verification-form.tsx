'use client';

import { newVerification } from '@/actions/new-verification';
import { CardWrapper } from '@/app/auth/_components/card-wrapper';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { useTheme } from 'next-themes';

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const { resolvedTheme } = useTheme();

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('No Token!');
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [token, onSubmit]);

  return (
    <CardWrapper
      headerLabel='Verifying your email'
      backButtonLabel='Return to Sign In'
      backButtonHref='/auth/login'
    >
      <div className='flex items-center w-full justify-center pb-6'>
        {!success && !error && (
          <div className='bg-[#29DDDC]/20 px-5 py-3 rounded-full flex items-center justify-center'>
            <BeatLoader color='#29DDDC' />
          </div>
        )}

        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
