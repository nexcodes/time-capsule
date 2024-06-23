'use client';

import { useEffect, useState } from 'react';

function calculateRemainingTime(futureDate: Date) {
  // Get the current date and time
  let currentDate = new Date();

  // Calculate the time difference in milliseconds
  let timeDifference: number = futureDate.getTime() - currentDate.getTime();

  if (timeDifference < 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  // Calculate remaining days, hours, minutes, and seconds
  let remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  let remainingHours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let remainingMinutes = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );
  let remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return {
    days: remainingDays,
    hours: remainingHours,
    minutes: remainingMinutes,
    seconds: remainingSeconds,
  };
}

const Countdown = ({ time }: { time: Date }) => {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>(
    calculateRemainingTime(time)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateRemainingTime(time));
    }, 1000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  });

  return (
    <div className='flex gap-4'>
      {Object.keys(timeLeft).map((key, i) => (
        <div
          key={key + i}
          className='bg-gray-100 px-6 py-4 rounded-lg shadow-md flex flex-col items-center'
        >
          <div className='text-4xl font-bold'>{timeLeft[key]}</div>
          <div className='text-sm text-gray-500'>{key}</div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
