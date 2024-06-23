'use client';

import Logo from '@/components/logo';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Social } from './social';

interface FormWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const FormWrapper = ({
  children,
  backButtonHref,
  backButtonLabel,
  headerLabel,
  showSocial,
}: FormWrapperProps) => {
  return (
    <Card className='bg-inherit border-none shadow-none'>
      <CardHeader>
        <div className='flex items-start justify-center gap-2'>
          <Logo />
        </div>
        <div className='text-center py-4'>
          <h1 className='text-black dark:text-white  text-2xl font-semibold'>
            {headerLabel}
          </h1>
        </div>
        <Separator />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter className='pt-2 justify-center'>
        <p className='text-sm font-light'>
          <Link
            href={backButtonHref}
            className='hover:underline underline-offset-2'
          >
            {backButtonLabel}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
