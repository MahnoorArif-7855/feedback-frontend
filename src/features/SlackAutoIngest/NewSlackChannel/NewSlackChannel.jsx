import { Button, Divider, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

import CardTitle from '../CardTitle';
import Container from '../Container';
import { InstructionPanel, NavigationContainer } from '../SlackAutoIngest.styles';
import { ADD_APP_LINK, INTRO_LINK } from '../constants';
import illustration from '../images/create-a-channel.png';

const NewSlackChannel = () => (
  <Container title={<CardTitle title='Step 1' subtitle='Choose or create a Slack channel for user feedback' />}>
    <InstructionPanel>
      <div>
        <div>
          <Typography.Title level={4}>Choose or create a Slack channel for collecting user feedback</Typography.Title>
          <Typography.Paragraph>
            If you already have a Slack channel for collecting user feedback, you can use it with Feedback Sync.
          </Typography.Paragraph>
          <Typography.Paragraph>
            If you want to create a new Slack channel for collecting user feedback from 3rd party integrations, open
            your Slack workspace and create a new channel, for example,{' '}
            <Typography.Text code>#feedback-sync-integrations</Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph>
            3rd party integrations will post user feedback to this channel, which later will be monitored and ingested
            by Feedback Sync Slack app.
          </Typography.Paragraph>
        </div>
      </div>
      <div className='illustration-block'>
        <Image alt='Create a Slack channel' src={illustration} />
      </div>
    </InstructionPanel>

    <NavigationContainer>
      <Link href={INTRO_LINK} passHref>
        <Button size='large'>Back</Button>
      </Link>
      <Link href={ADD_APP_LINK} passHref>
        <Button type='primary' size='large'>
          Next
        </Button>
      </Link>
    </NavigationContainer>
  </Container>
);

export default NewSlackChannel;
