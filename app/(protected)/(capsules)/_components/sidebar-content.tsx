import Logo from '@/components/logo';
import { LogoutButton } from '@/components/logout-button';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import UserAvatar from '@/components/user-avatar';
import { getInvitesByUser } from '@/data/invites';
import { currentUser } from '@/lib/auth';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import AcceptInvite from './accept-invite';
import SidebarLinks from './sidebar-links';

export default async function SidebarContent() {
  const user = await currentUser();

  const invites = await getInvitesByUser(user?.id || '');

  return (
    <div className='flex h-full flex-col lg:border-r-2 border-border'>
      <div className='flex items-center justify-between'>
        <Logo />
        <AcceptInvite invites={invites} />
      </div>
      <Separator className='bg-border' />
      <SidebarLinks />
      <Separator className='bg-border h-[2px]' />
      {user === undefined ? (
        <div className='p-2 lg:p-4'>
          <Skeleton className='h-14 w-full' />
        </div>
      ) : (
        <div className='p-2 lg:p-4'>
          <DropdownMenu>
            <DropdownMenuTrigger className='w-full'>
              <div
                className={buttonVariants({
                  className: 'gap-3 !justify-start w-full h-12 text-left',
                  variant: 'ghost',
                })}
              >
                <UserAvatar
                  user={{
                    name: user?.name || 'U',
                    image: user?.image || '',
                  }}
                />
                <div className='flex-1 truncate'>
                  <div className='font-medium'>{user?.name}</div>
                  <div className='text-gray-400'>{`@${user?.username}`}</div>
                </div>
                <ChevronRight className='h-5 w-5' />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side='right'
              className='w-48 -translate-y-12 -translate-x-full lg:translate-x-0'
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/profile/${user.username}`}>
                <DropdownMenuItem className='cursor-pointer'>
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer'>
                <LogoutButton> Sign Out</LogoutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
