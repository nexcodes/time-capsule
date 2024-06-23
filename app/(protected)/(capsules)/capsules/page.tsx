import { EmptyCard } from '@/components/image-icon';
import TypingAnimation from '@/components/magicui/typing-animation';
import { getAllCapsule } from '@/data/capsules';
import { Pill } from 'lucide-react';
import CapsuleCard from '../_components/capsule-card';

export default async function DashboardPage() {
  const capsules = await getAllCapsule();
  
  return (
    <div className='px-8 py-12 space-y-8'>
      <TypingAnimation
        className='text-3xl sm:text-4xl font-bold text-slate-900'
        text='Latest Capsules'
      />

      <div>
        {!!capsules && capsules.length > 0 ? (
          capsules.map((capsule) => (
            <CapsuleCard key={capsule.id} capsule={capsule} />
          ))
        ) : (
          <EmptyCard
            title='No Capsule to display'
            className='border-none'
            icon={Pill}
          />
        )}
      </div>
    </div>
  );
}
