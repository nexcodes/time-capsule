import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (err) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (err) {
    return null;
  }
};

export const getUserByUserName = async (username: string, userId?: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      include: {
        Capsule: {
          where: {
            OR: [
              {
                private: false,
              },
              {
                userId,
              },
            ],
          },
          include: {
            collaborators: {
              include: {
                user: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    return user;
  } catch (err) {
    return null;
  }
};

export const getAllUsers = async (id?: string) => {
  try {
    const user = await db.user.findMany({
      where: {
        NOT: {
          id,
        },
      },
    });
    return user;
  } catch (err) {
    return null;
  }
};
