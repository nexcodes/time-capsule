import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { EmptyCard } from './image-icon';
import { Button } from './ui/button';

interface UploadedFilesCardProps {
  uploadedFiles: string[];
}

const getUrl = (url: string) => {
  const extension = url.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'pdf':
      return {
        path: '/images/pdf.svg',
        type: 'PDF',
      };
    case 'txt':
      return {
        path: '/images/text.svg',
        type: 'TEXT',
      };
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return {
        path: url,
        type: 'IMAGE',
      };
    case 'mp4':
    case 'webm':
      return {
        path: '/images/video.svg',
        type: 'VIDEO',
      };
    case 'mp3':
    case 'wav':
      return {
        path: '/images/audio.svg',
        type: 'AUDIO',
      };
    default:
      return {
        path: '/images/unknown.png',
        type: 'UNKNOWN',
      };
  }
};

export function UploadedFilesCard({ uploadedFiles }: UploadedFilesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded files</CardTitle>
        <CardDescription>View the uploaded files here</CardDescription>
      </CardHeader>
      <CardContent>
        {uploadedFiles.length > 0 ? (
          <ScrollArea className='pb-4'>
            <div className='flex w-max space-x-2.5'>
              {uploadedFiles.map((URL) => {
                const { path, type } = getUrl(URL);
                return (
                  <div key={URL} className='relative aspect-video w-64'>
                    <Link
                      href={URL}
                      target='_blank'
                      className='group hover:bg-black/30 absolute inset-0 flex items-center justify-center z-50 transition-all'
                    >
                      <Button className='opacity-0 group-hover:opacity-100 transition-all'>
                        View
                      </Button>
                    </Link>
                    <Image
                      src={path}
                      alt={type}
                      fill
                      sizes='(min-width: 640px) 640px, 100vw'
                      loading='lazy'
                      className={cn(
                        'rounded-md',
                        type === 'IMAGE' ? 'object-cover' : 'object-fit'
                      )}
                    />
                  </div>
                );
              })}
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        ) : (
          <EmptyCard
            title='No files uploaded'
            description='Upload some files to see them here'
            className='w-full'
          />
        )}
      </CardContent>
    </Card>
  );
}
