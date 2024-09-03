import slackDigest from '@/features/StaticPages/LandingPage/images/slack-digest.png';
import Image from 'next/image';

export const SlackDigest = () => {
  return (
    <div className='bg-white pt-28 max-sm:py-12'>
      <div className='container mx-auto px-10 max-sm:p-4'>
        <div className='text-center'>
          <h1 className='text-3xl font-semibold text-orange max-sm:text-xl'>Receive a weekly summary in Slack</h1>
          <p className='m-auto mt-4 max-w-2xl text-md font-light opacity-70 max-sm:text-sm'>
            Aggregate across tools, distill, deliver in Slack. Become empowered with a more holistic view of your
            customer, delivered where your workflows already exist.
          </p>
          <div className='mx-auto mt-12 w-[1137px] max-w-full max-sm:mb-0 max-sm:w-auto'>
            <Image src={slackDigest} alt='Slack digest demo' />
          </div>
        </div>
      </div>
    </div>
  );
};
