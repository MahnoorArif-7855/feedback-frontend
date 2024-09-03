import { Button, Divider, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

import CardTitle from '../CardTitle';
import Container from '../Container';
import { NavigationContainer } from '../SlackAutoIngest.styles';
import { InstructionPanel } from '../SlackAutoIngest.styles';
import { NEW_SLACK_CHANNEL_LINK, SET_UP_INTEGRATION_LINK } from '../constants';
import illustration from '../images/add-to-channel.png';

const AddApp = () => (
  <Container title={<CardTitle title='Step 2' subtitle='Add Feedback Sync app to the channel' />}>
    <InstructionPanel>
      <div>
        <div>
          <Typography.Title level={4}>Add Feedback Sync app to your Slack channel with user feedback</Typography.Title>
          <Typography.Paragraph>
            <ol>
              <li>Open your Slack workspace</li>
              <li>
                Go to the Slack channel with user feedback, then open channel settings by clicking on the channel name
              </li>
              <li>Go to “Integrations“ tab</li>
              <li>Click “Add an App” button</li>
              <li>Find “Feedback Sync App” and click “Add”</li>
            </ol>
          </Typography.Paragraph>
        </div>
      </div>
      <div className='illustration-block'>
        <Image alt='Create a channel' src={illustration} />
      </div>
    </InstructionPanel>

    <NavigationContainer>
      <Link href={NEW_SLACK_CHANNEL_LINK} passHref>
        <Button size='large'>Back</Button>
      </Link>
      <Link href={SET_UP_INTEGRATION_LINK} passHref>
        <Button type='primary' size='large'>
          Next
        </Button>
      </Link>
    </NavigationContainer>
  </Container>
);

export default AddApp;
