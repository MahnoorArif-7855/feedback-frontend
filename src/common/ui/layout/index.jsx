import { DashboardV2Layout } from '@/common/components/DashboardV2Layout';
import AppFooter from '@/common/ui/Footer';
import { Header as LandingHeader } from '@/features/StaticPages/LandingPage/components/Header';
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import * as React from 'react';

import StyledComponentsRegistry from '../../../registry';

const { Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const router = useRouter();

  const { asPath } = router;
  const isDashboardPage = React.useMemo(() => asPath.includes('dashboard'), [asPath]);
  const isAuthPage = React.useMemo(() => asPath.startsWith('/signin') || asPath.startsWith('/auth'), [asPath]);

  if (isAuthPage) {
    return children;
  }

  if (isDashboardPage) {
    return (
      <DashboardV2Layout>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </DashboardV2Layout>
    );
  }

  return (
    <Layout id='outer-container'>
      <StyledComponentsRegistry>
        <LandingHeader />
        <Content
          id='page-wrap'
          style={{
            minHeight: '300px',
          }}
        >
          {children}
        </Content>
        <AppFooter />
      </StyledComponentsRegistry>
    </Layout>
  );
};

export default AppLayout;
