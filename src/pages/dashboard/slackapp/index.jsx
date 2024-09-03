import { ContentWrapper, PageLayout } from '@/common/components/DashboardV2Layout';
import { SlackAppInstall } from '@/features/SlackAppInstall/SlackAppInstall';

const SlackAppPage = () => {
  return (
    <PageLayout title='Install Slack App'>
      <ContentWrapper>
        <SlackAppInstall />
      </ContentWrapper>
    </PageLayout>
  );
};

export default SlackAppPage;
