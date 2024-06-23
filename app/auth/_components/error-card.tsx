import { BackButton } from '@/app/auth/_components/back-button';
import { Header } from '@/app/auth/_components/header';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';

export const ErrorCard = () => {
  return (
    <Card className='max-w-[400px] w-full shadow-md'>
      <CardHeader>
        <Header label='Oops! Something went wrong!' />
      </CardHeader>
      <CardFooter>
        <BackButton label='Return to Sign In' href='/auth/login' />
      </CardFooter>
    </Card>
  );
};
