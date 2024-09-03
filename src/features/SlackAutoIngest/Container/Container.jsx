import { Button, Card, Divider, Typography } from 'antd';
import React from 'react';

import { PageContainer, SlackAutoIngestCard } from '../SlackAutoIngest.styles';

const Container = ({ children, title, introButton }) => (
  <PageContainer>
    <Typography.Title level={3}>Set up Slack Auto-Ingest</Typography.Title>
    <SlackAutoIngestCard title={title}>{children}</SlackAutoIngestCard>
    {introButton}
  </PageContainer>
);

export default Container;
