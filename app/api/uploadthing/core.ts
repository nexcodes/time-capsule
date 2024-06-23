import { auth } from '@/auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

// Fake auth function
async function handleAuth() {
  const session = await auth();
  if (!session?.user.id) throw new UploadThingError('Unauthorized');
  return { userId: session.user.id };
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  FileUploader: f({
    image: { maxFileSize: '4MB', maxFileCount: 4 },
    video: { maxFileSize: '16MB', maxFileCount: 1 },
    audio: { maxFileSize: '8MB', maxFileCount: 1 },
    pdf: { maxFileSize: '16MB', maxFileCount: 2 },
    text: { maxFileSize: '1MB', maxFileCount: 2 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const userId = await handleAuth();

      // If you throw, the user will not be able to upload
      if (!userId) throw new UploadThingError('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('metadata', metadata);

      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);

      console.log('file url', file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
