import { WelcomeStyled } from '@/common/styles/welcomeStyled';
import SlackButton from '@/common/ui/SlackButton/SlackButton';
import { SIGN_IN_REDIRECT_LINK, SLACK_BUTTON_INTEGRATION } from '@/common/utils/constant';
import { Button, Space, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import slackIcon from '../../../../public/images/slack.png';
import welcomeImage from '../../../../public/images/welcome.png';

const { Text } = Typography;
const SLACK_APP_ID = process.env.SLACK_APP_ID;

const Welcome = () => {
  const { authDetails } = useSelector((state) => state.auth);

  const router = useRouter();
  const { organizationId } = authDetails || {
    organizationId: null,
  };

  const openSlackApp = () => {
    window.open(`slack://app?team=${organizationId}&id=${SLACK_APP_ID}`);
  };

  const openSlackBrowserApp = () => {
    window.open(`https://app.slack.com/client/${organizationId}`, '_blank');
  };

  const exploreWebApp = () => {
    router.push(SIGN_IN_REDIRECT_LINK);
  };

  return (
    <WelcomeStyled>
      <div className='welcome-image'>
        <Image alt='search-image' layout='responsive' src={welcomeImage} />
      </div>
      <Text className='welcome-message'>The Feedback Sync integration has been successfully installed!</Text>
      <div className='action-button'>
        <Space size={[8, 16]} wrap>
          <SlackButton
            slackIcon={slackIcon}
            onClick={openSlackApp}
            text={'Open Slack App'}
            variety={SLACK_BUTTON_INTEGRATION}
            autoResponsive
          />
          <SlackButton
            autoResponsive
            onClick={openSlackBrowserApp}
            slackIcon={slackIcon}
            text={'Open Slack Browser version'}
            variety={SLACK_BUTTON_INTEGRATION}
          />
          <SlackButton onClick={exploreWebApp} text={'Explore Web Application'} autoResponsive />
        </Space>
      </div>
    </WelcomeStyled>
  );
};

export default Welcome;
