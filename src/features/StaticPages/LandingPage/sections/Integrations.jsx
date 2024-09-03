import g2Icon from '@/features/StaticPages/LandingPage/images/g2.svg';
import jiraIcon from '@/features/StaticPages/LandingPage/images/jira.svg';
import slackIcon from '@/features/StaticPages/LandingPage/images/slack.svg';
import zendeskIcon from '@/features/StaticPages/LandingPage/images/zendesk.svg';
import Image from 'next/image';

const IntegrationItem = ({ name, icon, description, isComingSoon }) => {
  return (
    <div className='w-full flex-1 flex-col items-start max-sm:flex'>
      <div>
        <div className='flex h-16 items-center max-sm:h-8 max-sm:pr-2'>
          <Image src={icon} alt={name} height={42} className='max-sm:h-5 max-sm:w-auto' />
        </div>
        <div className='flex items-center gap-3'>
          <h3 className='mt-1 text-[21px] font-semibold max-sm:text-md'>{name}</h3>
          {isComingSoon && (
            <p className='text-nowrap rounded-full border px-2 text-[10px] uppercase tracking-widest text-slate-500'>
              Coming soon
            </p>
          )}
        </div>
      </div>
      <p className='font-light opacity-70'>{description}</p>
    </div>
  );
};

export const Integrations = () => {
  return (
    <div className='bg-[#fbfafa] py-32 max-sm:py-12'>
      <div className='container mx-auto px-24'>
        <div className='text-center'>
          <h1 className='text-3xl font-semibold text-orange max-sm:text-xl'>Integrates into your workflow</h1>
          <p className='m-auto mt-4 max-w-2xl text-md font-light opacity-70 max-sm:text-sm'>
            Feedback Sync integrates with your favorite tools to help your entire team collect, manage, and act on user
            feedback more efficiently.
          </p>
        </div>
        <div className='mt-24 flex flex-row justify-center gap-12 max-sm:mt-12 max-sm:flex-col'>
          <IntegrationItem
            name='Slack'
            icon={slackIcon}
            description='Automatically ingest user feedback from Slack channels and receive concise weekly summaries.'
          />
          <IntegrationItem
            name='G2.com'
            icon={g2Icon}
            description='Import customer reviews from G2.com directly to your Feedback Library.'
          />
          <IntegrationItem
            name='Zendesk'
            icon={zendeskIcon}
            description='Import tickets from Zendesk directly to your Feedback Library.'
          />
          <IntegrationItem
            name='Jira'
            icon={jiraIcon}
            description='Automatically create issues in Jira from user feedback.'
          />
          {/* <IntegrationItem
            isComingSoon
            name='Linear'
            icon={linearIcon}
            description='Automatically create issues in Linear from user feedback.'
          /> */}
        </div>
      </div>
    </div>
  );
};
