import Logo from '@/components/logo';

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
      <div className='flex items-start justify-center gap-2'>
        <Logo />
      </div>
      <p className='text-muted-foreground tex-sm'>{label}</p>
    </div>
  );
};
