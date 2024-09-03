import { firebaseAuth } from '@/../firebase';
import G2ReviewTab from '@/common/components/IntegrationPage/G2Tab';
import DiscourseTab from '@/common/components/IntegrationPage/discourseTab';
import ZendeskTab from '@/common/components/IntegrationPage/zendeskTab';
import IntegartionStyled from '@/common/styles/integartionStyled';
import IntercomWebhookTab from '@/common/ui/IntercomWebhook';
import { Tabs } from 'antd';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';

import { SlackAppInstall } from '../SlackAppInstall/SlackAppInstall';

export const Integrations = () => {
  const [user] = useAuthState(firebaseAuth);

  const { authDetails, selectedOrganizationId } = useSelector((state) => state.auth);

  const { uid } = user || { uid: null };

  const { organizationId } = authDetails || {
    organizationId: null,
  };

  const items = [
    {
      key: '1',
      label: `Slack App Integration`,
      children: <SlackAppInstall reinstallSlackApp={true} />,
    },
    {
      key: '2',
      label: `Zendesk Integration`,
      children: (
        <ZendeskTab userId={uid} organizationId={selectedOrganizationId ? selectedOrganizationId : organizationId} />
      ),
    },
    {
      key: '3',
      label: `G2 Integration`,
      children: (
        <G2ReviewTab
          userId={uid}
          selectedOrganizationId={selectedOrganizationId ? selectedOrganizationId : organizationId}
        />
      ),
    },
    {
      key: '4',
      label: `Discourse Integration`,
      children: (
        <DiscourseTab
          userId={uid}
          selectedOrganizationId={selectedOrganizationId ? selectedOrganizationId : organizationId}
        />
      ),
    },
    {
      key: '5',
      label: `Intercom Integration`,
      children: (
        <IntercomWebhookTab
          userId={uid}
          selectedOrganizationId={selectedOrganizationId ? selectedOrganizationId : organizationId}
        />
      ),
    },
  ];
  return (
    <IntegartionStyled>
      <Tabs defaultActiveKey='1' items={items} />
    </IntegartionStyled>
  );
};
