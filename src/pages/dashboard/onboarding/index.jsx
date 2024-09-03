import { useRouter } from 'next/router';
import React from 'react';

const Onboarding = () => {
  // Redirect to the first onboarding step
  const router = useRouter();
  router.push('/dashboard/onboarding/how-it-works');

  return null;
};

export default Onboarding;
