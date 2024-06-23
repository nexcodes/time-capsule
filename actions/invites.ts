'use server';

import { db } from '@/lib/db';
import { InviteStatus } from '@prisma/client';

export const deleteInvite = async (inviteId: string) => {
  if (!inviteId) {
    return { error: 'Invite not found!' };
  }

  await db.capsuleCollaborator.delete({
    where: {
      id: inviteId,
    },
  });

  return {
    success: 'Invite rejected!',
  };
};

export const changeInviteStatus = async (
  inviteId: string,
  status: InviteStatus
) => {
  if (!inviteId) {
    return { error: 'Invite not found!' };
  }

  if (!status) {
    return { error: 'Status not found!' };
  }

  await db.capsuleCollaborator.update({
    where: {
      id: inviteId,
    },
    data: {
      status,
    },
  });

  return {
    success: 'Invite accepted!',
  };
};
