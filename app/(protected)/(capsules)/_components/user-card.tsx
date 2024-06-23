import { BorderBeam } from '@/components/magicui/border-beam';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import UserAvatar from '@/components/user-avatar';
import { User } from '@prisma/client';
import Link from 'next/link';

const UserCard = ({ user }: { user: User }) => {
  return (
    <Card className='p-4 relative z-20'>
      <BorderBeam />
      <div className='flex flex-col items-center space-y-2 '>
        <UserAvatar
          user={{ name: user.name || 'U', image: user.image || '' }}
          className='h-16 w-16'
        />
        <h2 className='text-xl sm:text-2xl font-semibold text-slate-900 capitalize'>
          {user.name}
        </h2>
        <p className='text-sm sm:text-base text-slate-600'>{`@${user.username}`}</p>
        <Link
          href={`/profile/${user.username}`}
          className={buttonVariants({
            variant: 'ringHover',
            className: 'relative z-30',
          })}
        >
          View Profile
        </Link>
      </div>
    </Card>
  );
};

export default UserCard;
