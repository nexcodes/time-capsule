'use client';

import { updateCapsuleStatus } from '@/actions/capsule';
import { Button } from '@/components/ui/button';
import { Capsule, User } from '@prisma/client';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

interface OpenButtonProps {
  capsule: Capsule & {
    user: User;
  };
  isOwner: boolean;
}

const triggerConfetti = () => {
  const end = Date.now() + 3 * 1000; // 3 seconds
  const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];

  const frame = () => {
    if (Date.now() > end) return;

    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors: colors,
    });

    requestAnimationFrame(frame);
  };

  frame();
};

const OpenButton = ({ capsule, isOwner }: OpenButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [isDateToOpen, setIsDateToOpen] = useState(false);

  const router = useRouter();

  const handleUpdateCapsuleStatus = () => {
    startTransition(async () => {
      const result = await updateCapsuleStatus(capsule.id, 'OPEN');

      if ('error' in result) {
        toast.error(result.error);
      }

      toast.success(result.success);
      triggerConfetti();
      router.refresh();
    });
  };

  useEffect(() => {
    const calculateDateToOpen = setInterval(() => {
      setIsDateToOpen(new Date(capsule.dateToOpen) < new Date());
    }, 1000);

    return () => clearInterval(calculateDateToOpen);
  });

  return (
    <>
      {capsule.Status === 'SEALED' && isDateToOpen && isOwner && (
        <Button
          disabled={isPending}
          className='w-full'
          onClick={handleUpdateCapsuleStatus}
        >
          Reveal Content
        </Button>
      )}
    </>
  );
};

export default OpenButton;
