import { getInviteById } from '@/data/invites';
import { currentUser } from '@/lib/auth';
import { notFound } from 'next/navigation';
import InviteForm from '../../_components/invite-form';
export default async function InviteIdPage({
  params,
}: {
  params: { [key: string]: string };
}) {
  const user = await currentUser();

  const invite = await getInviteById(params.inviteId);

  if (invite?.userId !== user?.id) return notFound();
  if (invite?.status !== 'ACCEPTED') return notFound();

  return (
    <div>
      <InviteForm invite={invite} />
    </div>
  );
}
