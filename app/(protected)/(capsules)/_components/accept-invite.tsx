'use client';

import { changeInviteStatus, deleteInvite } from '@/actions/invites';
import { EmptyCard } from '@/components/image-icon';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { getErrorMessage } from '@/lib/handle-error';
import { Capsule, CapsuleCollaborator, User } from '@prisma/client';
import { BellIcon, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface AcceptInviteProps {
  invites:
    | (CapsuleCollaborator & { capsule: Capsule & { user: User } })[]
    | null;
}

const AcceptInvite = ({ invites }: AcceptInviteProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    startTransition(() => {
      toast.promise(deleteInvite(id), {
        loading: 'Rejecting invite...',
        success: ({ success, error }) => {
          if (error) {
            throw new Error(error);
          }

          return success;
        },
        error: (err) => getErrorMessage(err),
      });
    });
  };

  const handleAccept = async (id: string) => {
    startTransition(() => {
      toast.promise(changeInviteStatus(id, 'ACCEPTED'), {
        loading: 'Accepting invite...',
        success: ({ success, error }) => {
          if (error) {
            throw new Error(error);
          }

          router.push(`/invite/${id}`);
          return success;
        },
        error: (err) => getErrorMessage(err),
      });
    });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={buttonVariants({
            variant: 'ghost',
            size: 'icon',
            className: 'rounded-full mr-2',
          })}
        >
          <BellIcon className='h-4 w-4' />
          <span className='sr-only'>Toggle notifications</span>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className='text-base font-semibold text-slate-700'>Invites</div>
        {invites &&
          invites.map((invite, i) => (
            <div key={invite.id} className='space-y-1'>
              <p className='text-sm'>{`@${invite.capsule.user.username} has invited you to join the capsule!`}</p>
              <div className='flex items-center gap-1'>
                <Button
                  onClick={() => handleAccept(invite.id)}
                  disabled={isPending}
                  variant='shine'
                >
                  Accept
                </Button>
                <Button
                  onClick={() => handleDelete(invite.id)}
                  disabled={isPending}
                  variant='destructive'
                >
                  Decline
                </Button>
              </div>
              {i === invites.length - 1 && <Separator />}
            </div>
          ))}
        {!invites?.length && (
          <EmptyCard title='No Invites' className='border-none' icon={Mail} />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default AcceptInvite;
