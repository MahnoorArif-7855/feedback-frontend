import { useRouter } from 'next/router';
import React from 'react';

const SlackAutoIngestRoot = () => {
  // Redirect to the first onboarding step
  const router = useRouter();
  router.push('/dashboard/integrations/slack-auto-ingest/intro');

  return null;
};

export default SlackAutoIngestRoot;
