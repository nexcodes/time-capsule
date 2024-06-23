'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { createCapsule } from '@/actions/capsule';
import { uploadFiles } from '@/actions/upload-files';
import { FileUploader } from '@/components/file-uploader';
import { Step, StepItem, Stepper, useStepper } from '@/components/stepper';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useUploadFile } from '@/hooks/use-upload-file';
import { getErrorMessage } from '@/lib/handle-error';
import { cn } from '@/lib/utils';
import { createCapsuleSchema, uploadFilesSchema } from '@/schemas';
import { format } from 'date-fns';
import Lottie from 'lottie-react';
import { CalendarIcon, ImagePlus, Pill } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';

import CapsuleAnimation from '@/animations/capsule.json';
import { TimePickerDemo } from '@/components/time-picker/time-picker-demo';
import { Switch } from '@/components/ui/switch';
import { useCurrentUser } from '@/hooks/use-current-user';

const steps = [
  { label: 'Capsule', icon: Pill },
  { label: 'Memories', icon: ImagePlus },
] satisfies StepItem[];

export default function CreateCapsuleForm() {
  const [capsuleId, setCapsuleId] = useState('');
  const [completed, setCompleted] = useState(false);

  const user = useCurrentUser();
  const router = useRouter();

  return (
    <div className='flex w-full flex-col gap-4'>
      {completed && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex flex-col items-center justify-center p-4'>
          <Lottie
            animationData={CapsuleAnimation}
            loop={false}
            className='scale-150 sm:scale-105 md:scale-100'
            onComplete={() => {
              setCompleted(false);
              router.push(
                user?.username ? `/profile/${user.username}` : '/capsules'
              );
            }}
          />
        </div>
      )}

      <Stepper variant='circle-alt' initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <FirstStepForm setCapsuleId={setCapsuleId} />
              </Step>
            );
          }
          return (
            <Step key={stepProps.label} {...stepProps}>
              <SecondStepForm
                capsuleId={capsuleId}
                setCompleted={setCompleted}
              />
            </Step>
          );
        })}
        <MyStepperFooter />
      </Stepper>
    </div>
  );
}

function FirstStepForm({
  setCapsuleId,
}: {
  setCapsuleId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { nextStep } = useStepper();

  const [isPending, startTransition] = useTransition();

  const { progresses, isUploading } = useUploadFile('FileUploader', {
    defaultUploadedFiles: [],
  });

  const form = useForm<z.infer<typeof createCapsuleSchema>>({
    resolver: zodResolver(createCapsuleSchema),
    defaultValues: {
      title: '',
      description: '',
      private: false,
      OpenDate: undefined,
      coverImage: undefined,
    },
  });

  function onSubmit(_data: z.infer<typeof createCapsuleSchema>) {
    startTransition(() => {
      const formData = new FormData();

      for (const file of _data.coverImage) {
        formData.append('files', file, file.name);
      }

      toast.promise(createCapsule({ ..._data, coverImage: [] }, formData), {
        loading: 'Creating capsule...',
        success: ({ success, error, capsuleId }) => {
          if (error) {
            throw new Error(error);
          }

          if (success) {
            setCapsuleId(capsuleId);
            form.reset();
            nextStep();
            return success;
          }
        },
        error: (err) => getErrorMessage(err),
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 p-2'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  maxLength={110}
                  placeholder='Vacation memories...'
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormDescription>This is title of your capsule.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  maxLength={256}
                  placeholder='The adventure of tall mountains...'
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is description of your capsule.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='coverImage'
          render={({ field }) => (
            <div className='space-y-6'>
              <FormItem className='w-full'>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                    maxFiles={1}
                    maxSize={4 * 1024 * 1024}
                    progresses={progresses}
                    // pass the onUpload function here for direct upload
                    // onUpload={uploadFiles}
                    disabled={isUploading || isPending}
                    accept={{
                      'image/*': [],
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This is cover image of your capsule.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name='private'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
              <div className='space-y-0.5'>
                <FormLabel>Visibility of your capsule</FormLabel>
                <FormDescription>
                  Should your capsule be private?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  disabled={isPending}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='OpenDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel className='text-left'>Opening Date</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {field.value ? (
                        format(field.value, 'PPP HH:mm:ss')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    disabled={(date) =>
                      date.getTime() < new Date().getTime() - 86400000
                    }
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <div className='p-3 border-t border-border'>
                    <TimePickerDemo
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is date when you can open your capsule.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <StepperFormActions disabled={isPending} />
      </form>
    </Form>
  );
}

function SecondStepForm({
  capsuleId,
  setCompleted,
}: {
  capsuleId: string;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isPending, startTransition] = useTransition();
  const { nextStep } = useStepper();

  const { progresses, isUploading } = useUploadFile('FileUploader', {
    defaultUploadedFiles: [],
  });
  const form = useForm<z.infer<typeof uploadFilesSchema>>({
    resolver: zodResolver(uploadFilesSchema),
    defaultValues: {
      files: [],
    },
  });

  function onSubmit(_data: z.infer<typeof uploadFilesSchema>) {
    startTransition(() => {
      const formData = new FormData();

      for (const file of _data.files) {
        formData.append('files', file, file.name);
      }

      toast.promise(uploadFiles(formData, capsuleId), {
        loading: 'Uploading files...',
        success: ({ success, error }) => {
          if (error) {
            throw new Error(error);
          }
          nextStep();
          form.reset();
          setCompleted(true);
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
            </div>
          )}
        />
        <StepperFormActions disabled={isPending} />
      </form>
    </Form>
  );
}

function StepperFormActions({ disabled }: { disabled?: boolean }) {
  const {
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
  } = useStepper();

  return (
    <div className='w-full flex justify-end gap-2'>
      {hasCompletedAllSteps ? (
        <Button
          size='sm'
          type='button'
          variant='gooeyLeft'
          onClick={resetSteps}
        >
          Reset
        </Button>
      ) : (
        <>
          <Button
            disabled={disabled}
            variant='gooeyLeft'
            type='submit'
            className='px-8'
          >
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </>
      )}
    </div>
  );
}

function MyStepperFooter() {
  const { activeStep, resetSteps, steps } = useStepper();

  if (activeStep !== steps.length) {
    return null;
  }

  return (
    <div className='flex items-center justify-end gap-2'>
      <Button onClick={resetSteps}>Reset Stepper with Form</Button>
    </div>
  );
}
