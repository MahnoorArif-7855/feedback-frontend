import slide1 from '@/features/StaticPages/LandingPage/images/slide-1.png';
import slide2 from '@/features/StaticPages/LandingPage/images/slide-2.png';
import slide3 from '@/features/StaticPages/LandingPage/images/slide-3.png';
import Image from 'next/image';

const Feature = ({ title, description, image, alternativeLayout }) => {
  return (
    <div
      className={`flex items-center gap-20 max-sm:flex-col-reverse max-sm:gap-6 ${alternativeLayout ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className='flex-1'>
        <div className='mb-2 text-3xl font-semibold text-orange max-sm:text-xl'>{title}</div>
        <div className='max-w-lg text-base font-light opacity-70 max-sm:text-sm'>{description}</div>
      </div>
      <div className='flex-1 max-sm:w-full max-sm:flex-auto'>
        <Image
          src={image}
          alt={title}
          className='rounded-xl border border-slate-200'
          style={{
            filter: 'grayscale(0.5)',
          }}
        />
      </div>
    </div>
  );
};

export const Features = () => {
  return (
    <div className='border-slate-50 p-24 pb-40 max-sm:border-t max-sm:p-0 max-sm:py-20'>
      <div className='container mx-auto flex flex-col gap-16 px-10 max-sm:gap-12 xl:px-28'>
        <Feature
          title='Manually sifting through feedback?'
          image={slide1}
          description='Let AI search and analyze feedback for you. Receive concise weekly summaries of user trends across tools.'
        />

        <Feature
          title='Set it. Forget it.'
          image={slide3}
          description='Choose a integration for Slack. We do the rest. 
          Data automatically ingests into Feedback Sync, removing manual uploads.'
          alternativeLayout
        />

        <Feature
          title='Shorten the Feedback Loop'
          image={slide2}
          description='Better understand your customers. Build better product. Designed to co-exist with your workflows, directly within Slack.'
        />
      </div>
    </div>
  );
};
