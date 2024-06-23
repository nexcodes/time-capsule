import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface UserAvatar {
  user: {
    name: string;
    image: string;
  };
  className?: string;
}

const UserAvatar = ({ user, className }: UserAvatar) => {
  return (
    <Avatar className={cn('h-8 w-8 border', className)}>
      <AvatarImage src={user.image} />
      <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
