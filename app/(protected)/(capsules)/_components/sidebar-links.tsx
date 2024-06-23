'use client';

import WavyText from '@/components/magicui/wavy-text';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Pill, Plus, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  {
    Icon: Pill,
    label: 'Capsules',
    href: '/capsules',
  },
  {
    Icon: Plus,
    label: 'Create Capsule',
    href: '/create-capsule',
  },
  {
    Icon: Users,
    label: 'Users',
    href: '/users',
  },
];

const SidebarLinks = () => {
  const pathname = usePathname();

  return (
    <nav className='flex-1 overflow-auto px-4 py-6'>
      <div className='grid gap-4'>
        {LINKS.map(({ Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className={buttonVariants({
              className: cn(
                'gap-3 !justify-start w-full h-12 overflow-hidden',
                pathname === href && 'bg-accent'
              ),
              variant: 'ghost',
            })}
          >
            <Icon className='h-5 w-5' />
            <WavyText
              word={label}
              parentClassName='translate-y-2.5'
              className='text-sm font-medium whitespace-nowrap hover:text-accent-foreground'
            />
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default SidebarLinks;
