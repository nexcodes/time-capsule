'use client';

import { User as UserType } from '@prisma/client';

import { Plus, SendHorizontal, User } from 'lucide-react';

import { inviteUserToCapsule } from '@/actions/capsule';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { getErrorMessage } from '@/lib/handle-error';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

const InviteCollaborators = ({
  users,
  capsuleId,
}: {
  users: UserType[];
  capsuleId: string;
}) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleInvite = async (userId: string) => {
    startTransition(() => {
      toast.promise(inviteUserToCapsule(userId, capsuleId), {
        loading: 'Inviting user...',
        success: ({ success, error }) => {
          if (error) {
            throw new Error(error);
          }

          if (success) {
            return success;
          }
        },
        error: (err) => getErrorMessage(err),
      });
    });
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className='p-1 border border-slate-900 rounded-full cursor-pointer'
      >
        <Plus />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Users'>
            {users.map((user) => (
              <CommandItem
                className='flex items-center justify-between'
                key={user.id}
              >
                <div className='flex items-center'>
                  <User className='mr-2 h-4 w-4' />
                  <span>{`@${user.username}`}</span>
                </div>
                <Button
                  size='sm'
                  variant='expandIcon'
                  iconPlacement='right'
                  Icon={SendHorizontal}
                  disabled={isPending}
                  onClick={() => handleInvite(user.id)}
                >
                  Invite
                </Button>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default InviteCollaborators;
