import logo from '@/../public/images/logo-color.svg';
import { useUser } from '@/common/hooks/useUser';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu } from 'antd';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { SuperAdminPanel } from './components/SuperAdminPanel';
import { useMenuItems } from './hooks/useMenuItems';
import {
  ContentWrapper as ContentWrapperBase,
  CurrentUserWrapper,
  NarrowContainer,
  SiderFlexContainer,
  SiderHeader,
} from './styled';

const { Header, Content, Sider } = Layout;

export const CurrentUser = () => {
  const { authDetails, organizationInfo } = useSelector((state) => state.auth);

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: 'settings',
            label: <Link href='/dashboard/settings'>Settings</Link>,
          },
          {
            key: 'billing',
            label: <Link href='/dashboard/settings/billing'>Billing</Link>,
          },
          { type: 'divider' },
          {
            key: 'logout',
            label: <Link href='/auth/logout'>Logout</Link>,
          },
        ],
      }}
    >
      <CurrentUserWrapper>
        <Avatar size='small' icon={<UserOutlined />} />
        <div>
          <div style={{ fontWeight: 500, lineHeight: 1, textTransform: 'capitalize' }}>{authDetails?.userName}</div>
          <div style={{ color: '#686872' }}>{organizationInfo?.organizationName || 'Unknown'}</div>
        </div>
      </CurrentUserWrapper>
    </Dropdown>
  );
};

export const PageLayout = ({ title, children }) => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header
        style={{
          padding: '0 24px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #f1f2f3',
        }}
      >
        {typeof title === 'string' ? <h1>{title}</h1> : title}
      </Header>
      <Content
        style={{
          height: '100%',
        }}
      >
        {children}
      </Content>
    </div>
  );
};

const _DashboardV2Layouts = ({ children }) => {
  const router = useRouter();
  const { asPath } = router;
  const currentPath = React.useMemo(() => asPath.split('/')[2], [asPath]);

  const dashboardBillingPath = '/dashboard/billing-plan';

  const { menuItems } = useMenuItems();

  const { isAdmin } = useUser();
  const showSider = () => {
    if (asPath === dashboardBillingPath) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>Feedback Sync – Dashboard</title>
      </Head>
      {isAdmin && <SuperAdminPanel />}
      <Layout style={{ height: '100%' }}>
        {showSider() && (
          <Sider
            theme='light'
            style={{
              height: '100%',
              backgroundColor: '#fff',
              borderRight: '1px solid #f1f2f3',
            }}
          >
            <SiderFlexContainer>
              <div>
                <Link className='logo' href='/dashboard'>
                  <SiderHeader>
                    <Image alt='Feedback Sync' src={logo} />
                  </SiderHeader>
                </Link>
                <Menu
                  selectedKeys={[currentPath]}
                  mode='vertical'
                  items={menuItems}
                  style={{ borderRight: 0, marginTop: 12 }}
                />
              </div>
              <CurrentUser />
            </SiderFlexContainer>
          </Sider>
        )}
        <Layout>{children}</Layout>
      </Layout>
    </div>
  );
};

// TODO: Fix hydration errors to re-enable SSR
export const DashboardV2Layout = dynamic(() => Promise.resolve(_DashboardV2Layouts), {
  ssr: false,
});

export { ContentWrapper } from './styled';

export const NarrowContentWrapper = ({ children }) => {
  return (
    <ContentWrapperBase>
      <NarrowContainer>{children}</NarrowContainer>
    </ContentWrapperBase>
  );
};
