import { NarrowContentWrapper, PageLayout } from '@/common/components/DashboardV2Layout';
import UploadCSV from '@/features/UploadCSV';
import * as React from 'react';

export default function UploadCSVFile() {
  return (
    <PageLayout title='Upload CSV'>
      <NarrowContentWrapper>
        <UploadCSV />
      </NarrowContentWrapper>
    </PageLayout>
  );
}
