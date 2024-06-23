import { ErrorCard } from '@/app/auth/_components/error-card';

export default function AuthErrorPage() {
  return (
    <div className='max-w-xl mx-auto'>
      <div className='flex items-center justify-center min-h-screen px-4 py-8'>
        <ErrorCard />
      </div>
    </div>
  );
}
