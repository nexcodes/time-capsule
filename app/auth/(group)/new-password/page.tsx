import { NewPasswordForm } from '@/app/auth/_components/new-password-form';

export default function NewPasswordPage() {
  return (
    <div className='max-w-xl mx-auto'>
      <div className='flex items-center justify-center min-h-screen px-4 py-8'>
        <NewPasswordForm />
      </div>
    </div>
  );
}
