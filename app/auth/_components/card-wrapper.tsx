'use client';

import { BackButton } from '@/app/auth/_components/back-button';
import { Header } from '@/app/auth/_components/header';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({
  children,
  backButtonHref,
  backButtonLabel,
  headerLabel,
}: CardWrapperProps) => {
  return (
    <Card className='max-w-[400px] w-full shadow-md'>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
