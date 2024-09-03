import { BookDemoButton } from '@/features/StaticPages/LandingPage/components/BookDemoButton';
import { ContinueWithSlackButton } from '@/features/StaticPages/LandingPage/components/ContinueWithSlackButton';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <>
      <div className='pb-20 pt-20 sm:pt-28'>
        <div className='container mx-auto px-10 text-center max-sm:px-6'>
          <h1 className='mx-auto max-w-5xl font-semibold text-orange max-sm:text-3xl sm:text-[68px] sm:leading-[1.1]'>
            Centralize customer feedback. Build a better product.
          </h1>
          <p className='mx-auto mt-6 max-w-3xl text-[16px] font-light text-[#4A4A4A] sm:text-[23px]'>
            Turn scattered customer feedback into strategic insights for the entire organization with Feedback Sync, an
            AI-driven app for Slack.
          </p>
          <div className='mt-10 flex items-center justify-center gap-8 max-sm:flex-col max-sm:gap-4'>
            <ContinueWithSlackButton />
            <BookDemoButton />
          </div>
          <div className='mt-4 text-xs text-[#00000090]'>
            By installing or using Feedback Sync you agree to the <Link href='/terms-conditions'>Terms of Service</Link>{' '}
            and <Link href='/privacy-policy'>Privacy Policy</Link>.<br />
            When using any LLM there is a small degree of risk for insights to be inaccurate.
          </div>
        </div>
      </div>
    </>
  );
};
