import Marquee from '@/components/magicui/mariquee';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const reviews = [
  {
    name: 'Jack',
    username: '@jack',
    body: "It's amazing. I love capturing memories and keepsakes for the future with such ease!",
    img: 'https://avatar.vercel.sh/jack',
  },
  {
    name: 'Sarah Jones',
    username: '@s_jones123',
    body: 'Creating a time capsule online with Time Capsule was surprisingly easy! Perfect for organizing memories and choosing keepsakes.',
    img: 'https://avatar.vercel.sh/jill',
  },
  {
    name: 'David Lee',
    username: '@david_lee_78',
    body: 'Time Capsule is fantastic! It lets me connect with the future by preserving our family story for generations.',
    img: 'https://avatar.vercel.sh/john',
  },
  {
    name: 'Emma Rodriguez',
    username: '@emmarodriguez99',
    body: "Time Capsule is like a digital treasure chest! It's fun to capture moments with photos, videos, and voice recordings.",
    img: 'https://avatar.vercel.sh/jane',
  },
  {
    name: 'Mia Chen',
    username: '@miacreative',
    body: 'Time Capsule is a game-changer for creators! I can curate my best work and document the creative process for future inspiration.',
    img: 'https://avatar.vercel.sh/jenny',
  },
  {
    name: 'Michael Brown',
    username: '@michael.brown10',
    body: "Time Capsule captures all my baby's first moments – a beautiful way to preserve precious memories for them to cherish later.",
    img: 'https://avatar.vercel.sh/james',
  },
  {
    name: 'Alexia Garcia',
    username: '@alexiawanders',
    body: 'Time Capsule is my travel companion! It documents adventures, mishaps, and lets me relive journeys and share them with loved ones.',
    img: 'https://avatar.vercel.sh/jack',
  },
  {
    name: 'Daniel Kim',
    username: '@dj_kimberly',
    body: "Time Capsule captures the creative journey behind my music. It's a valuable archive of my musical evolution with drafts, lyrics, and early ideas.",
    img: 'https://avatar.vercel.sh/jill',
  },
  {
    name: 'Grandma Clara',
    username: '@grandmac',
    body: "Time Capsule lets me create personalized time capsules for my grandchildren! It's a wonderful way to connect across generations.",
    img: 'https://avatar.vercel.sh/john',
  },
  {
    name: 'Emily Sanchez',
    username: '@emilysfuture',
    body: "Time Capsule keeps me organized! It stores school projects, research, and milestones – a valuable resource to see how far I've come.",
    img: 'https://avatar.vercel.sh/jenny',
  },
  {
    name: 'Liam Walker',
    username: '@liam_walker',
    body: 'This app is perfect for documenting personal growth! It helps me reflect on past experiences and set future goals.',
    img: 'https://avatar.vercel.sh/james',
  },
  {
    name: 'Chloe Taylor',
    username: '@chloe_taylor_',
    body: "Time Capsule is a digital scrapbook for life's big moments! It's a joy to revisit memories and share them with friends and family.",
    img: 'https://avatar.vercel.sh/james',
  },
  {
    name: 'Noah Garcia',
    username: '@noah_garcia',
    body: "With Time Capsule, I can create collaborative time capsules with friends! It's a fun way to capture shared experiences and memories.",
    img: 'https://avatar.vercel.sh/jenny',
  },
  {
    name: 'Olivia Jones',
    username: '@olivia.jones',
    body: 'Time Capsule is a great conversation starter! I love using it to spark discussions about the past and future with loved ones.',
    img: 'https://avatar.vercel.sh/jenny',
  },
  {
    name: 'Ethan Miller',
    username: '@ethan_miller19',
    body: 'Never lose track of important documents again! Time Capsule securely stores certificates, awards, and other keepsakes for the future.',
    img: 'https://avatar.vercel.sh/jack',
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        'relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]'
      )}
    >
      <div className='flex flex-row items-center gap-2'>
        <Image
          className='rounded-full'
          width='32'
          height='32'
          alt=''
          src={img}
        />
        <div className='flex flex-col'>
          <figcaption className='text-sm font-medium '>{name}</figcaption>
          <p className='text-xs font-medium '>{username}</p>
        </div>
      </div>
      <blockquote className='mt-2 text-sm'>{body}</blockquote>
    </figure>
  );
};

const Testimonials = () => {
  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background py-20 max-w-7xl mx-auto'>
      <div className='max-w-xl sm:text-center md:mx-auto mb-4'>
        <h3 className='text-gray-700 text-3xl font-semibold sm:text-4xl lg:text-5xl font-geist tracking-tighter'>
          Hear from our customers
        </h3>
      </div>
      <Marquee pauseOnHover className='[--duration:20s]'>
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className='[--duration:20s]'>
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className='pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white'></div>
      <div className='pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white'></div>
    </div>
  );
};

export default Testimonials;
