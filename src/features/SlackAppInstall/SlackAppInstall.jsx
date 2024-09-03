import slackIcon from '@/../public/images/slack.png';
import SlackButton from '@/common/ui/SlackButton/SlackButton';
import { SLACK_BUTTON_INTEGRATION } from '@/common/utils/constant';
import { Button } from 'antd';
import Link from 'next/link';
import { event } from 'nextjs-google-analytics';
import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  .install-text {
    font-size: 12px;
    margin-top: 30px;
    color: #555;
  }
  .reinstall-text {
    font-size: 14px;
    margin-top: 30px;
    color: #353232;
  }
`;

export const SlackAppInstall = ({ reinstallSlackApp }) => {
  const { authDetails } = useSelector((state) => state.auth);

  const slackInstallLink = process.env.ADD_TO_SLACK_URL;
  const { organizationDetails } = authDetails || { organizationDetails: [] };
  const organizatinInfo = organizationDetails && organizationDetails[0];

  const { appInstallation } = organizatinInfo;

  const handleSlackInstall = React.useCallback(() => {
    event('Add_to_slack');
    const slackAuthWindow = window.open(slackInstallLink, '_blank');

    // Reload the app once the slack auth window is closed
    setInterval(() => {
      if (slackAuthWindow?.closed) {
        window.location = '/dashboard';
      }
    }, 1000);
  }, [slackInstallLink]);

  const { userSlackChannels } = useSelector((state) => state.auth);
  const slackInstalled = userSlackChannels && userSlackChannels.length > 0;

  const reinstallText = 'Please upgrade Slack App integration to get the latest features.';
  const slackAppButton = appInstallation === true ? 'Upgrade the Slack App' : 'Add to Slack';

  if (slackInstalled && !reinstallSlackApp) {
    return <Wrapper>Slack app is already installed. Please contact support if you are facing any issues.</Wrapper>;
  }

  // TODO: Make sure backend checks installed slack app workspace to user's authed workspace

  return (
    <Wrapper>
      <SlackButton
        slackIcon={slackIcon}
        text={slackAppButton}
        onClick={handleSlackInstall}
        variety={SLACK_BUTTON_INTEGRATION}
      />

      <div className='reinstall-text'>
        {((appInstallation === true && !slackInstalled) || reinstallSlackApp) && reinstallText}
      </div>

      {!reinstallSlackApp && (
        <div className='install-text'>
          By installing or using Feedback Sync you agree to the
          <Link href='/terms-conditions'>Terms of Service</Link> and <Link href='/privacy-policy'>Privacy Policy</Link>.
        </div>
      )}

      {appInstallation && (
        <div
          style={{
            marginTop: '60px',
            paddingTop: '60px',
            borderTop: '1px solid #eee',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <p style={{ paddingBottom: 12, maxWidth: '40%', margin: '0 auto' }}>
            To automatically ingest all user feedback from your Slack workspace, invite Feedback Sync app to your
            channel with user feedback, then install 3rd party integrations to post user feedback to the channel.
          </p>
          <Link href='/dashboard/integrations/slack-auto-ingest'>
            <Button type='primary' size='large' style={{ marginTop: 16 }}>
              How to set up Slack auto-ingest?
            </Button>
          </Link>
        </div>
      )}
    </Wrapper>
  );
};
