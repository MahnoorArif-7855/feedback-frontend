import { ContentWrapper, PageLayout } from '@/common/components/DashboardV2Layout';
import { Integrations } from '@/features/Integrations/Integrations';
import * as React from 'react';

export default function IntegrationsPage() {
  return (
    <PageLayout title='Integrations'>
      <ContentWrapper>
        <Integrations />
      </ContentWrapper>
    </PageLayout>
  );
}
