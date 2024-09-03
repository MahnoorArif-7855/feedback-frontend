import { Button, Divider } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

import CardTitle from '../CardTitle';
import Container from '../Container';
import { NEW_SLACK_CHANNEL_LINK } from '../constants';
import introImage from '../images/intro.svg';

const Intro = () => (
  <Container
    introButton={
      <div className='align-center flex flex-col justify-center gap-6 text-center'>
        <div className='m-auto w-[50%]'>
          Slack Auto-Ingest will allow you to collect user feedback from various sources like Hubspot, Intercom and
          more. You can then monitor and ingest this feedback into your Slack channel.
        </div>
        <Link href={NEW_SLACK_CHANNEL_LINK} passHref>
          <Button type='primary' size='large'>
            Get started
          </Button>
        </Link>
      </div>
    }
  >
    <div className='align-center flex justify-center'>
      <Image src={introImage} alt='Slack Auto-Ingest' objectFit='contain' />
    </div>
  </Container>
);

export default Intro;
