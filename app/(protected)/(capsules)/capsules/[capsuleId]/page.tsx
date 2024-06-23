import { UploadedFilesCard } from '@/components/uploaded-files-card';
import UserAvatar from '@/components/user-avatar';
import { getCapsuleById } from '@/data/capsules';
import { getAllUsers } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Countdown from '../../_components/countdown';
import InviteCollaborators from '../../_components/invite-collaborators';
import OpenButton from './open-button';

interface CapsuleIdPageProps {
  params: {
    [key: string]: string;
  };
}

export default async function CapsuleIdPage({ params }: CapsuleIdPageProps) {
  const capsule = await getCapsuleById(params.capsuleId);

  if (!capsule) notFound();

  const user = await currentUser();

  if (capsule.private && user?.id !== capsule.userId) notFound();

  const isOwner = user?.id === capsule.userId;

  let users: User[] = [];

  if (isOwner) {
    users = (await getAllUsers(capsule.userId)) || [];
  }

  return (
    <div className='max-w-7xl px-4 py-8 sm:px-8 sm:py-12 space-y-8'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='space-y-4'>
          <h1 className='text-3xl sm:text-4xl font-bold text-slate-900'>
            {capsule.title}
          </h1>
          <p>{capsule.description}</p>
          <Countdown time={capsule.dateToOpen} />
          <OpenButton capsule={capsule} isOwner={isOwner} />
        </div>
        <div className='space-y-12'>
          <div className='relative pt-[56.25%] max-w-xl hidden lg:block'>
            <Image
              src={capsule.coverImage}
              alt={capsule.title}
              fill
              className='object-cover rounded-lg'
            />
          </div>
          <div className='relative p-6 rounded-lg bg-slate-100'>
            <div
              className='mr-14 -mt-8 top-0 right-0 absolute pointer-events-none'
              aria-hidden='true'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='70' height='50'>
                <path
                  fill='#FCD34D'
                  d='M.71 13.283A22.888 22.888 0 0 0 12.205.206c.125-.345 2.162 11.236 9.026 13.47 0 0-8.305 3.98-10.272 11.862.008.11-.47-6.26-10.249-12.255ZM48 36.768a24 24 0 0 0 12.06-13.76c.13-.36 2.26 11.8 9.5 14.14 0 0-8.71 4.18-10.78 12.45-.03.11-.53-6.57-10.78-12.83Z'
                ></path>
              </svg>
            </div>
            <div className='flex items-center justify-between'>
              <h4 className='text-slate-800 font-bold mb-4'>
                Creator & collaborators
              </h4>
              {isOwner && (
                <InviteCollaborators users={users} capsuleId={capsule.id} />
              )}
            </div>
            <ul className='space-y-2'>
              <li className='flex items-center gap-2'>
                <UserAvatar
                  className='w-12 h-12'
                  user={{
                    name: capsule.user.name || '',
                    image: capsule.user.image || '',
                  }}
                />
                <div className='space-y-0.5'>
                  <div className='text-slate-800 font-bold text-base'>
                    {capsule.user.name}
                  </div>
                  <div>
                    <Link
                      href={`/profile/${capsule.user.username}`}
                      className='text-primary hover:text-primary/80 font-medium text-xs block'
                    >
                      {`@${capsule.user.username}`}
                    </Link>
                  </div>
                </div>
              </li>
              {capsule.collaborators.map((collaborator) => (
                <li className='flex items-center gap-2' key={collaborator.id}>
                  <UserAvatar
                    className='w-12 h-12'
                    user={{
                      name: collaborator.user.name || '',
                      image: collaborator.user.image || '',
                    }}
                  />
                  <div className='space-y-0.5'>
                    <div className='text-slate-800 font-bold text-base'>
                      {collaborator.user.name}
                    </div>
                    <div>
                      <Link
                        href={`/profile/${collaborator.user.username}`}
                        className='text-primary hover:text-primary/80 font-medium text-xs block'
                      >
                        {`@${collaborator.user.username}`}
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {capsule.Status === 'OPEN' && (
        <UploadedFilesCard uploadedFiles={capsule.files} />
      )}
    </div>
  );
}
