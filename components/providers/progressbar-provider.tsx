'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarProvider = () => {
  return <ProgressBar height='3px' color='#7c3aed' shallowRouting />;
};

export default ProgressBarProvider;
