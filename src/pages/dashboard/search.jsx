'use client';

import { useRouter } from 'next/navigation';

export default function RedirectPage() {
  // Redirect to Home page
  const router = useRouter();
  router.push('/dashboard/library');

  return null;
}
