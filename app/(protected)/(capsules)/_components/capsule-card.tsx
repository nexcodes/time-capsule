import { AnimatedTooltip } from '@/components/aceternityui/animated-tooltip';
import { BorderBeam } from '@/components/magicui/border-beam';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Capsule, CapsuleCollaborator, User } from '@prisma/client';

import Image from 'next/image';
import Link from 'next/link';

interface CapsuleCardProps {
  capsule: Capsule & {
    user: User;
    collaborators: (CapsuleCollaborator & {
      user: User;
    })[];
  };
}

const CapsuleCard = ({ capsule }: CapsuleCardProps) => {
  const items = [
    {
      id: capsule.user.id,
      name: capsule.user.name || '',
      username: capsule.user.username || '',
      image: capsule.user.image,
    },
    ...capsule.collaborators.map((collaborator) => ({
      id: collaborator.user.id,
      name: collaborator.user.name || '',
      username: collaborator.user.username || '',
      image: collaborator.user.image,
    })),
  ];

  return (
    <Card
      className='lg:flex lg:items-center space-y-2 lg:space-y-0 lg:space-x-2 lg:p-4 relative z-20'
      key={capsule.id}
    >
      <BorderBeam />

      <Link
        href={`/capsules/${capsule.id}`}
        className='absolute inset-0 z-50'
      />
      <CardHeader className='relative p-0 pt-[56.25%] lg:pt-0'>
        <Image
          src={capsule.coverImage}
          alt={capsule.title}
          width={80}
          height={80}
          className='object-cover w-full h-full absolute inset-0 rounded-sm lg:relative lg:w-20 lg:h-20'
        />
      </CardHeader>
      <CardContent className='space-y-2 p-2'>
        <CardTitle>{capsule.title}</CardTitle>
        <CardDescription>{capsule.description}</CardDescription>
        {/* <div className='mt-2 flex flex-wrap items-center text-sm text-gray-600'>
          <div className='mr-4'>
            <span className='font-medium'>Creator:</span>{' '}
            {`@${capsule.user.username}`}
          </div>

          <div className='mr-4'>
            <span className='font-medium'>Open Time:</span>{' '}
            {format(capsule.dateToOpen, 'PPPP')}
          </div>

          <div className='mr-4'>
            <span className='font-medium'>Created:</span>{' '}
            {format(capsule.createdAt, 'PPPP')}
          </div>

          <div>
            <span className='font-medium'>Files:</span> {capsule.files.length}
          </div>
        </div> */}
        <div className='relative z-[60] flex items-center'>
          <AnimatedTooltip items={items} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CapsuleCard;
