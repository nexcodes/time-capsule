'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Poppins } from 'next/font/google';
import { useMemo } from 'react';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

interface WavyTextProps {
  word: string;
  parentClassName?: string;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
}
const WavyText = ({
  word,
  parentClassName,
  className,
  variant,
  duration = 0.5,
  delay = 0.05,
}: WavyTextProps) => {
  const defaultVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: -10, opacity: 100 },
  };
  const combinedVariants = variant || defaultVariants;
  const characters = useMemo(() => word.split(''), [word]);
  return (
    <div
      className={cn(
        'flex justify-center items-center space-x-2 overflow-hidden p-3',
        parentClassName
      )}
    >
      <AnimatePresence>
        {characters.map((char, i) => (
          <motion.h1
            key={i}
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={combinedVariants}
            transition={{
              yoyo: Infinity,
              duration: duration,
              delay: i * delay,
            }}
            className={cn(
              className,
              poppins.className,
              'font-mono text-center tracking-[-0.3em]'
            )}
          >
            {char}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WavyText;
