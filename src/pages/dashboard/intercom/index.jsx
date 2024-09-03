import { IntercomPage } from '@/features/Intercom/Intercom';
import Intercom from '@intercom/messenger-js-sdk';
import React, { useEffect } from 'react';

export default function IntercomMainPage() {
  useEffect(() => {
    Intercom({
      app_id: process.env.INTERCOM_APP_ID, ///process.env.INTERCOM_APP_ID,
    });
  }, []);
  return <IntercomPage />;
}
