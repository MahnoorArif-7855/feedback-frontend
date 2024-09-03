import { NarrowContentWrapper, PageLayout } from '@/common/components/DashboardV2Layout';
import { AccountSettings } from '@/features/AccountSettings/AccountSettings';
import * as React from 'react';

export default function Settings() {
  return (
    <PageLayout title='Settings'>
      <NarrowContentWrapper>
        <AccountSettings />
      </NarrowContentWrapper>
    </PageLayout>
  );
}
