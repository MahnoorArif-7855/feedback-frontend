'use client';

import { useRouter } from 'next/navigation';

const DashboardV2 = () => {
  // Redirect to Home page
  const router = useRouter();
  router.push('/dashboard/library');

  return null;
};

export default DashboardV2;
