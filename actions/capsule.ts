'use server';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { utapi } from '@/lib/utapi';
import { createCapsuleSchema } from '@/schemas';
import { CapsuleStatus } from '@prisma/client';
import { z } from 'zod';

export const createCapsule = async (
  values: z.infer<typeof createCapsuleSchema>,
  formData: FormData
) => {
  const user = await currentUser();

  if (!user || !user?.id)
    return {
      error: 'Unauthorized',
    };

  const files = formData.getAll('files');

  const validatedFields = createCapsuleSchema.safeParse({
    ...values,
    coverImage: files,
  });

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const {
    title,
    description,
    OpenDate,
    coverImage,
    private: Private,
  } = validatedFields.data;

  const response = await utapi.uploadFiles(coverImage);

  const uploadedFilesUrls = response
    .map((item) => item.data && item.data.url)
    .filter((url) => !!url) as string[];

  const capsule = await db.capsule.create({
    data: {
      title,
      description,
      dateToOpen: OpenDate,
      userId: user.id,
      private: Private,
      coverImage: uploadedFilesUrls[0],
    },
  });

  return { success: 'Capsule created!', capsuleId: capsule.id };
};

export const updateCapsuleStatus = async (
  capsuleId: string,
  status: CapsuleStatus
) => {
  const user = await currentUser();

  if (!user || !user?.id)
    return {
      error: 'Unauthorized',
    };

  const capsule = await db.capsule.findUnique({
    where: {
      id: capsuleId,
    },
  });

  if (!capsule || capsule.userId !== user.id) {
    return {
      error: 'Not authorized to update this capsule!',
    };
  }

  await db.capsule.update({
    where: {
      id: capsuleId,
    },
    data: {
      Status: status,
    },
  });

  return { success: 'Capsule status updated!' };
};

export const inviteUserToCapsule = async (
  userId: string,
  capsuleId: string
) => {
  const user = await currentUser();

  if (!user || !user?.id)
    return {
      error: 'Unauthorized',
    };

  const capsule = await db.capsule.findUnique({
    where: {
      id: capsuleId,
    },
  });

  if (!capsule || capsule.userId !== user.id) {
    return {
      error: 'Not authorized to invite users to this capsule!',
    };
  }

  const result = await db.capsuleCollaborator.create({
    data: {
      userId,
      capsuleId,
    },
    include: {
      user: true,
    },
  });

  return { success: `@${result.user.username} invited!` };
};
