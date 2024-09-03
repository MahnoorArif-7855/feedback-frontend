import PageTitle from '@/common/components/PageTitle';
import Script from 'next/script';
import React from 'react';

const CookiePolicy = () => {
  return (
    <div>
      <PageTitle pageTitle='Cookie Policy' />
      <iframe
        src='https://app.termly.io/document/cookie-policy/0484d5f9-1c28-4b9e-8f45-36315d8e16f7'
        width='100%'
        style={{ border: 'none', minHeight: '100vh' }}
        frameBorder='0'
      />
    </div>
  );
};

export default CookiePolicy;
