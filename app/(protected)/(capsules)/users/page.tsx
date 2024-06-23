import { EmptyCard } from '@/components/image-icon';
import { getAllUsers } from '@/data/user';
import { Users } from 'lucide-react';
import UserCard from '../_components/user-card';

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div className='px-8 py-12 space-y-8'>
      <h2 className='text-3xl sm:text-4xl font-bold text-slate-900'>Users</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {!!users &&
          users.length > 0 &&
          users.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
      {!users ||
        (users.length <= 0 && (
          <EmptyCard
            title='No Users to display'
            className='border-none'
            icon={Users}
          />
        ))}
    </div>
  );
}
