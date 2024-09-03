import logo from '@/../public/images/logo-color.svg';
import { CurrentUser } from '@/common/components/DashboardV2Layout';
import { Divider, Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

import { Content, Header, Wrapper } from './Container.styles';

const Container = ({ title, footer, children }) => (
  <Wrapper>
    <Header>
      <Image alt='Feedback Sync' src={logo} />
      <CurrentUser />
    </Header>
    <Content>
      <Typography.Title level={3}>{title}</Typography.Title>
      {children}
    </Content>
    <Divider style={{ margin: 0 }} />
    {footer}
  </Wrapper>
);

export default Container;
