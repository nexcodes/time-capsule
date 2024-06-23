'use server';

import { db } from '@/lib/db';

export const getInvitesByUser = async (userId: string) => {
  try {
    const invites = await db.capsuleCollaborator.findMany({
      where: {
        userId,
      },
      include: {
        capsule: {
          include: {
            user: true,
          },
        },
      },
    });

    return invites;
  } catch {
    return null;
  }
};

export const getInviteById = async (inviteId: string) => {
  try {
    const invite = await db.capsuleCollaborator.findUnique({
      where: {
        id: inviteId,
      },
      include: {
        capsule: {
          include: {
            user: true,
          },
        },
      },
    });

    return invite;
  } catch {
    return null;
  }
};
