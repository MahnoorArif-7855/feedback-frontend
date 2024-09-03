import { Affix, Card, Col, Row, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import GettingStartedStyled from './GettingStarted.styles';
import addToSlack from './images/add-to-slack.png';
import chatImage from './images/chat.png';
import commandImage from './images/command.png';
import g2Image from './images/g2.png';
import searchImage from './images/search.png';
import slackAppImage from './images/slack-app.png';
import writeFeedbackImage from './images/write-feedback.png';
import zendeskImage from './images/zendesk.png';

const { Title, Paragraph, Text } = Typography;

const GettingStarted = () => {
  const [tab, setTab] = useState(1);
  const navList = [
    { id: 1, text: 'Share your first piece of customer feedback in Slack.' },
    { id: 2, text: 'Automatically sync customer feedback from other tools' },
    { id: 3, text: 'Extract insights from your aggregated customer feedback' },
  ];

  return (
    <GettingStartedStyled tab={tab} navList={navList} className='container mx-auto border-b border-gray-100 pb-36'>
      <h1 className='my-20 text-center text-4xl text-orange'>Getting Started</h1>
      <Row className='started-main' gutter={[16, 16]}>
        <Col sm={24} lg={7}>
          <Affix offsetTop={100}>
            <Card className='guide-nav' bodyStyle={{ padidng: '15px' }}>
              <div className='nav-text'>
                {navList.map((data) => {
                  return (
                    <Text
                      className={`guide-nav-link ${tab === data.id && 'highlight'}`}
                      type='link'
                      key={data.id}
                      onClick={() => setTab(data.id)}
                    >
                      {data.text}
                    </Text>
                  );
                })}
              </div>
            </Card>
          </Affix>
        </Col>

        <Col sm={24} lg={15}>
          {tab === 1 && (
            <div className='feedback-keys'>
              <Title level={4} className='add-feedback'>
                Share your first piece of customer feedback in Slack.
              </Title>
              <Paragraph className='feedback-paragraph'>
                Download the Feedback Sync application for Slack by clicking ‘Add to Slack’ and follow the prompts.
              </Paragraph>
              <div className='image-container'>
                <Image
                  alt='user-image'
                  // height={150}
                  // width={900}
                  style={{ width: '100%', height: '100%', padding: '1rem 0px' }}
                  src={addToSlack}
                />
              </div>
              <Paragraph className='feedback-paragraph'>
                Once installed, go to Slack and click on the ‘Feedback Sync’ icon under your organization&apos;s Apps.
              </Paragraph>
              <div className='image-container'>
                <Image
                  alt='user-image'
                  // height={250}
                  // width={350}
                  style={{ width: '70%', height: '100%', padding: '1rem 0px' }}
                  src={slackAppImage}
                />
              </div>
              <Paragraph className='feedback-paragraph'>
                Click, ‘Write Feedback’ and choose the channels or users that would be interested in the feedback.
              </Paragraph>
              <div className='image-container'>
                <Image
                  alt='userSettings-image'
                  // height={200}
                  // width={750}
                  style={{ width: '100%', height: '100%', padding: '1rem 0px' }}
                  src={writeFeedbackImage}
                />
              </div>
              <Paragraph className='feedback-paragraph'>
                Additionally, you can simply type, /create-feedback into any Slack prompt, and submit your feedback this
                way.
              </Paragraph>
              <div className='image-container'>
                <Image
                  alt='userSettings-image'
                  style={{ width: '100%', height: '100%', padding: '1rem 0px' }}
                  src={commandImage}
                />
              </div>
              <Paragraph className='feedback-paragraph'>
                Et voila! Your first piece of feedback will have been shared within your organization. This feedback
                will be available for reference across other feedback sources and AI will automatically begin to analyze
                your submissions.
              </Paragraph>
            </div>
          )}
          {tab === 2 && (
            <div className='feedback-keys'>
              <Title level={4} className='add-feedback'>
                Automatically sync customer feedback from other tools.
              </Title>
              <Paragraph className='feedback-paragraph'>
                Feedback Sync’s current list of integrations can be found in your management portal. If there’s an
                integration you’d like to see developed, please let us know and message us at (
                <Link style={{ color: '#3366CC' }} href='mailto:support@feedbacksync.co'>
                  support@feedbacksync.co
                </Link>
                ).
              </Paragraph>
              <div className='image-container'>
                <Image
                  alt='userSettings-image'
                  style={{ width: '100%', height: '100%', padding: '1rem 0px' }}
                  src={zendeskImage}
                />
              </div>
              <Paragraph className='feedback-paragraph'>
                For Zendesk, you’ll simply need to add your email address, your Zendesk SubDomain and your API Token.
              </Paragraph>
              <Paragraph className='feedback-paragraph'>
                You can find your API Token within your Zendesk Admin Center. Click Apps and Integrations in the
                sidebar, then select APIs &gt; Zendesk API. · Click the Settings tab, and make sure Token Access is
                enabled.
              </Paragraph>
              <Paragraph className='feedback-paragraph'>
                Feedback Sync will automatically ingest Zendesk tickets from the last 30 days and categorizes customer
                engagements into the following buckets:
                <div className='getting-started-points'>
                  <li>Churn</li>
                  <li>Bugs</li>
                  <li>Feature request</li>
                  <li>Feature feedback, positive</li>
                  <li>Feature feedback, negative</li>
                  <li>Other</li>
                </div>
              </Paragraph>
              <Paragraph className='feedback-paragraph'>
                Feedback Sync will then share insights on those categories within your Dashboard.
              </Paragraph>
              <Paragraph className='feedback-paragraph'>
                For G2, simply insert your unique ‘G2 url’ within the Search field, then press ‘Search’.
                <div className='image-container'>
                  <Image
                    alt='userSettings-image'
                    style={{
                      width: '100%',
                      height: '100%',
                      padding: '1rem 0px',
                    }}
                    src={g2Image}
                  />
                  <Image
                    alt='userSettings-image'
                    style={{
                      width: '100%',
                      height: '100%',
                      padding: '1rem 0px',
                    }}
                    src={searchImage}
                  />
                </div>
              </Paragraph>
            </div>
          )}
          {tab === 3 && (
            <div className='feedback-keys'>
              <Title level={4} className='add-feedback'>
                Extract insights from your aggregated customer feedback.
              </Title>
              <Paragraph className='feedback-paragraph'>
                Insights are extracted from customer feedback through two methods.
              </Paragraph>
              <Paragraph className='feedback-paragraph'>
                <Text className='feedback-paragraph' strong>
                  AI Search.
                </Text>{' '}
                Feedback Sync allows users to leverage AI Search to ask questions about aggregated feedback. You can
                simply ask questions within Slack or within your web portal.
              </Paragraph>

              <Text className='feedback-paragraph' strong>
                Web Portal
              </Text>
              <div className='image-container'>
                <Image
                  alt='userSettings-image'
                  style={{ width: '100%', height: '100%', padding: '1rem 0px' }}
                  src={chatImage}
                />
              </div>
              <Text className='feedback-paragraph' strong>
                Slack
              </Text>

              <Paragraph className='feedback-paragraph'>
                Text Analysis. Feedback Sync will automatically analyze individual feedback submissions and will extract
                the most common keywords that appear. This analysis can be found within your ‘Dashboard’.
              </Paragraph>

              <Paragraph className='feedback-paragraph'>
                Explore these key words by using both the AI Search and Similarity Search within your web portal
              </Paragraph>
            </div>
          )}
        </Col>
      </Row>
    </GettingStartedStyled>
  );
};

export default GettingStarted;
