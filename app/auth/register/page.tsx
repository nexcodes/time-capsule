import { RegisterForm } from '@/app/auth/_components/register-form';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    <div className='lg:flex lg:justify-between lg:space-x-4 lg:h-full lg:min-h-screen'>
      <div className='hidden relative bg-muted lg:block lg:w-2/5'>
        <Image
          src='/images/register.jpg'
          alt='Image'
          fill
          className='object-cover dark:brightness-[0.4] dark:grayscale'
        />
      </div>
      <div className='flex items-center justify-center lg:w-3/5'>
        <div className='max-w-xl mx-auto w-full'>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
