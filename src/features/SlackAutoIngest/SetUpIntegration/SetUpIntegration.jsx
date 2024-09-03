import { Button, Divider, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import CardTitle from '../CardTitle';
import Container from '../Container';
import { InstructionButtonsContainer, InstructionPanel, NavigationContainer } from '../SlackAutoIngest.styles';
import { ADD_APP_LINK } from '../constants';
import getfeedbackLogo from '../images/getfeedback.svg';
// logos
import googleLogo from '../images/google.svg';
import hubspotLogo from '../images/hubspot.svg';
import intercomLogo from '../images/intercom.svg';
import jiraLogo from '../images/jira.svg';
import linearLogo from '../images/linear.svg';
import nativeformsLogo from '../images/nativeforms.svg';
import pendoLogo from '../images/pendo.svg';
import salesforceLogo from '../images/salesforce.svg';
import trelloLogo from '../images/trello.svg';

const instructions = {
  zendesk: 'Zendesk instructions',
  g2: 'G2 instructions',
  hubspot: 'Hubspot instructions',
};

const SetUpIntegration = () => {
  const [selected, setSelected] = useState('zendesk');

  const handleSelectInstruction = (instruction) => setSelected(instruction);

  return (
    <Container title={<CardTitle title='Step 3' subtitle='Set up 3rd party integrations' />}>
      <InstructionButtonsContainer>
        <div className='containerTitle'>
          <Typography.Title level={4}>Add integrations to your Slack channel</Typography.Title>
          <Typography.Paragraph>
            Click on the integrations below to see the instructions on how to set them up in your Slack channel. When
            setting up the integrations, make sure to select the Slack channel you created or chose in the previous
            step.
          </Typography.Paragraph>
        </div>
        <Button
          target='_blank'
          href='https://slack.com/apps/A9RRCCG73-hubspot?tab=more_info'
          icon={<Image alt='HubSpot' src={hubspotLogo} />}
        >
          HubSpot
        </Button>
        <Button
          target='_blank'
          href='https://slack.com/apps/A01RDL2NJAH-service-cloud-for-slack?tab=more_info'
          icon={<Image alt='Salesforce' src={salesforceLogo} />}
        >
          Salesforce Service Cloud
        </Button>
        <Button
          target='_blank'
          href='https://slack.com/apps/A03PH70C5AS-intercom?tab=more_info'
          icon={<Image alt='Intercom' src={intercomLogo} />}
        >
          Intercom
        </Button>
        <Button
          target='_blank'
          href='https://slack.com/apps/AATCLQRN2-pendo?tab=more_info'
          icon={<Image alt='Pendo' src={pendoLogo} />}
        >
          Pendo
        </Button>
        <Button
          target='_blank'
          href='https://slack.com/apps/A2RPP3NFR-jira-cloud?tab=more_info'
          icon={<Image alt='Jira' src={jiraLogo} />}
        >
          Jira
        </Button>
        <Button
          target='_blank'
          href='https://slack.com/apps/A074YH40Z-trello?tab=more_info'
          icon={<Image alt='Trello' src={trelloLogo} />}
        >
          Trello
        </Button>
        <Button
          target='_blank'
          href='https://slack.com/apps/AEMQ3Q4F4-linear?tab=more_info'
          icon={<Image alt='Linear' src={linearLogo} />}
        >
          Linear
        </Button>
        <Button
          target='_blank'
          href='https://slack.com/apps/A6NL8MJ6Q-google-drive?tab=more_info'
          icon={<Image alt='Google Drive' src={googleLogo} />}
        >
          Google Drive
        </Button>
        <Button
          target='_blank'
          href='https://slack.com/apps/AQY3VMMD2-nativeforms?tab=more_info'
          icon={<Image alt='Native Forms' src={nativeformsLogo} />}
        >
          Native Forms
        </Button>
        <Button
          target='_blank'
          href='https://slack.com/apps/A02AL9LPUF6-getfeedback?tab=more_info'
          icon={<Image alt='GetFeedback' src={getfeedbackLogo} />}
        >
          GetFeedback
        </Button>
      </InstructionButtonsContainer>

      <NavigationContainer>
        <Link href={ADD_APP_LINK} passHref>
          <Button size='large'>Back</Button>
        </Link>
        <Link href='/dashboard/integrations' passHref>
          <Button type='primary' size='large'>
            Finish
          </Button>
        </Link>
      </NavigationContainer>
    </Container>
  );
};

export default SetUpIntegration;
