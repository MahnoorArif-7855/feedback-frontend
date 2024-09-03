import { NarrowContentWrapper, PageLayout } from '@/common/components/DashboardV2Layout';
import { SlackNotifications } from '@/features/SlackNotifications/SlackNotifications';
import * as React from 'react';

export default function Slack() {
  return (
    <PageLayout title='Slack Notifications'>
      <NarrowContentWrapper>
        <SlackNotifications />
      </NarrowContentWrapper>
    </PageLayout>
  );
}
