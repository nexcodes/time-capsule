import { EmptyCard } from '@/components/image-icon';
import TypingAnimation from '@/components/magicui/typing-animation';
import UserAvatar from '@/components/user-avatar';
import { getUserByUserName } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { Pill } from 'lucide-react';
import { notFound } from 'next/navigation';
import CapsuleCard from '../../(capsules)/_components/capsule-card';

interface ProfilePageProps {
  params: {
    [key: string]: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const authenticatedUser = await currentUser();

  const user = await getUserByUserName(params.username, authenticatedUser?.id);

  if (!user) notFound();

  return (
    <div className='space-y-2'>
      <div className='flex flex-col items-center '>
        <UserAvatar
          user={{ name: user.name || 'U', image: user.image || '' }}
          className='h-16 w-16'
        />
        <h2 className='text-xl sm:text-2xl font-semibold text-slate-900 capitalize'>
          {user.name} {user.name}
        </h2>
        <p className='text-sm sm:text-base text-slate-600'>{`@${user.username}`}</p>
      </div>
      <div className='max-w-7xl mx-auto space-y-4'>
        <TypingAnimation
          className='text-3xl sm:text-4xl font-bold text-slate-900'
          text={`${user.name}'s Capsules`}
        />
        <div className='space-y-4'>
          {user.Capsule.length > 0 ? (
            user.Capsule.map((capsule) => (
              <CapsuleCard
                key={capsule.id}
                capsule={{
                  ...capsule,
                  user,
                }}
              />
            ))
          ) : (
            <EmptyCard
              title='No Capsule to display'
              className='border-none'
              icon={Pill}
            />
          )}
        </div>
      </div>
    </div>
  );
}
