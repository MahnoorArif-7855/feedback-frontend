import discoverScreenshot from '@/features/StaticPages/LandingPage/images/discover.jpg';
import integrationsScreenshot from '@/features/StaticPages/LandingPage/images/integrations.jpg';
import libraryScreenshot from '@/features/StaticPages/LandingPage/images/library.jpg';
import Image from 'next/image';
import React, { useState } from 'react';

const Tab = ({ header, description, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-1 cursor-pointer flex-col rounded-xl px-8 py-6 max-sm:py-3 sm:rounded-t-none ${isActive ? 'bg-[#FAF9F9]' : 'opacity-75 hover:bg-[#FAF9F9]'}`}
    >
      <h3 className='text-sm font-semibold text-orange'>{header}</h3>
      <p className='mt-1 text-sm font-light opacity-70'>{description}</p>
    </div>
  );
};

const screenshots = {
  library: libraryScreenshot,
  discover: discoverScreenshot,
  integrate: integrationsScreenshot,
};

export const DemoSlider = () => {
  const [activeTab, setActiveTab] = useState('library');

  return (
    <div className='container mx-auto mb-24 p-8 max-sm:my-0 max-sm:mb-0'>
      <div className='bg-gray relative z-10 mx-auto w-[1100px] max-w-full rounded-xl border border-gray-100 shadow-xl'>
        <Image src={screenshots[activeTab]} className='rounded-xl' alt='Feedback Sync' />
      </div>
      <div className='mx-auto flex w-[1060px] max-w-full items-start justify-center max-sm:mt-6 max-sm:flex-col max-sm:items-stretch sm:flex-nowrap sm:gap-8'>
        <Tab
          onClick={() => setActiveTab('library')}
          isActive={activeTab === 'library'}
          header='Feedback library'
          description='A central place for all your product feedback.'
        />
        <Tab
          onClick={() => setActiveTab('discover')}
          isActive={activeTab === 'discover'}
          header='Discover'
          description='Glance at customer trends or emerging bugs from the past week, or month.'
        />
        <Tab
          onClick={() => setActiveTab('integrate')}
          isActive={activeTab === 'integrate'}
          header='Integrations'
          description='Build your entire workflow using integrations'
        />
      </div>
    </div>
  );
};
