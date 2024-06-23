'use server';

import { db } from '@/lib/db';

export const getAllCapsule = async () => {
  try {
    const capsules = await db.capsule.findMany({
      where: {
        private: false,
      },
      include: {
        user: true,
        collaborators: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    return capsules;
  } catch (err) {
    return null;
  }
};

export const getCapsuleById = async (id: string) => {
  try {
    const capsule = await db.capsule.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        collaborators: {
          include: {
            user: true,
          },
        },
      },
    });

    return capsule;
  } catch (err) {
    return null;
  }
};
