'use client';

import { changeInviteStatus } from '@/actions/invites';
import { uploadFiles } from '@/actions/upload-files';
import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useUploadFile } from '@/hooks/use-upload-file';
import { getErrorMessage } from '@/lib/handle-error';
import { uploadFilesSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Capsule, CapsuleCollaborator, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface InviteFormProps {
  invite: CapsuleCollaborator & { capsule: Capsule & { user: User } };
}

const InviteForm = ({ invite }: InviteFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { progresses, isUploading } = useUploadFile('FileUploader', {
    defaultUploadedFiles: [],
  });
  const form = useForm<z.infer<typeof uploadFilesSchema>>({
    resolver: zodResolver(uploadFilesSchema),
    defaultValues: {
      files: [],
    },
  });

  const uploadData = async (
    formData: FormData,
    capsuleId: string,
    inviteId: string
  ) => {
    try {
      await uploadFiles(formData, capsuleId);
      await changeInviteStatus(inviteId, 'DONE');
      return {
        success: 'Files uploaded!',
      };
    } catch (error) {
      return {
        error: 'Failed to upload files',
      };
    }
  };

  function onSubmit(_data: z.infer<typeof uploadFilesSchema>) {
    startTransition(() => {
      const formData = new FormData();

      for (const file of _data.files) {
        formData.append('files', file, file.name);
      }

      toast.promise(uploadData(formData, invite.capsule.id, invite.id), {
        loading: 'Uploading files...',
        success: ({ success, error }) => {
          if (error) {
            throw new Error(error);
          }
          form.reset();
          router.push(`/capsules/${invite.capsule.id}`);
          return success;
        },
        error: (err) => {
          return getErrorMessage(err);
        },
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-6 p-2'
      >
        <FormField
          control={form.control}
          name='files'
          render={({ field }) => (
            <div className='space-y-6'>
              <FormItem className='w-full'>
                <FormLabel>Files</FormLabel>
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                    maxFiles={8}
                    maxSize={4 * 1024 * 1024}
                    progresses={progresses}
                    // pass the onUpload function here for direct upload
                    // onUpload={uploadFiles}
                    disabled={isUploading || isPending}
                    accept={{
                      'image/*': [],
                      'video/*': [],
                      'audio/*': [],
                      'application/pdf': [],
                      'application/text': [],
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <div className='flex justify-end'>
                <Button disabled={isPending} type='submit' variant='gooeyRight'>
                  Submit
                </Button>
              </div>
            </div>
          )}
        />
      </form>
    </Form>
  );
};

export default InviteForm;
