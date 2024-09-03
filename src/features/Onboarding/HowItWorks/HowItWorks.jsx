import { Button } from 'antd';
import Link from 'next/link';

import Container from '../Container';
import { ONBOARDING_PAGE_2 } from '../constants';
import InfoPanel, { InfoPanelContainer } from './InfoPanel';

const PANELS = [
  {
    title: 'Ingest',
    description: 'FeedbackSync continuously gathers feedback from various sources and builds a centralized library.',
    linkLabel: 'See sample Library',
    video: 'Yr1xeWuOQAc',
  },
  {
    title: 'Search Insights',
    description: 'FeedbackSync continuously gathers feedback from various sources and builds a centralized library.',
    linkLabel: 'See sample Dashboard',
    video: 'Yr1xeWuOQAc',
  },
  {
    title: 'Critical Insights Delivered',
    description: 'FeedbackSync continuously gathers feedback from various sources and builds a centralized library.',
    linkLabel: 'See sample Weekly Summary',
    video: 'Yr1xeWuOQAc',
  },
];

const HowItWorks = () => (
  <Container title='How it works?'>
    <InfoPanelContainer>
      {PANELS.map((panel) => (
        <InfoPanel {...panel} key={panel.title} />
      ))}
    </InfoPanelContainer>
    <Link href={ONBOARDING_PAGE_2} passHref>
      <Button type='primary' size='large'>
        {`Let's get started`}
      </Button>
    </Link>
  </Container>
);

export default HowItWorks;
