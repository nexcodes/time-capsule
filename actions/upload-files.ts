'use server';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { utapi } from '@/lib/utapi';
import { uploadFilesSchema } from '@/schemas';

export const uploadFiles = async (formData: FormData, capsuleId: string) => {
  const user = await currentUser();

  if (!user || !user?.id)
    return {
      error: 'Unauthorized',
    };

  if (!capsuleId) {
    return {
      error: 'Capsule ID is required.',
    };
  }

  const files = formData.getAll('files');

  const validatedFields = uploadFilesSchema.safeParse({ files });

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { files: uploadedFiles } = validatedFields.data;

  const response = await utapi.uploadFiles(uploadedFiles);

  const uploadedFilesUrls = response
    .map((item) => item.data && item.data.url)
    .filter((url) => !!url) as string[];

  await db.capsule.update({
    where: {
      id: capsuleId,
    },
    data: {
      files: {
        push: uploadedFilesUrls,
      },
    },
  });

  return {
    success: 'Files uploaded!',
  };
};
