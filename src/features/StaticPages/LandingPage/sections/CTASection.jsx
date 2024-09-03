import { BookDemoButton } from '@/features/StaticPages/LandingPage/components/BookDemoButton';
import { ContinueWithSlackButton } from '@/features/StaticPages/LandingPage/components/ContinueWithSlackButton';
import Link from 'next/link';

export const CTASection = () => {
  return (
    <div className='m-12 rounded-3xl bg-[#FBF0EC] py-24 max-sm:m-2 max-sm:py-12'>
      <div className='container mx-auto flex flex-col items-center justify-center gap-12 px-10 text-center max-sm:gap-4 max-sm:px-4'>
        <h2 className='text-4xl font-bold max-sm:text-2xl'>Get started</h2>
        <div className='flex flex-row items-center justify-center gap-8 max-sm:flex-col max-sm:gap-4'>
          <ContinueWithSlackButton />
          <BookDemoButton />
        </div>
        <div className='text-xs text-[#00000090]'>
          By installing or using Feedback Sync you agree to the <Link href='/terms-conditions'>Terms of Service</Link>{' '}
          and <Link href='/privacy-policy'>Privacy Policy</Link>.<br />
          When using any LLM there is a small degree of risk for insights to be inaccurate.
        </div>
      </div>
    </div>
  );
};
