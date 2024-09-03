import PageTitle from '@/common/components/PageTitle';
import React, { useEffect, useState } from 'react';

const PrivacyPolicy = () => {
  return (
    <div>
      <PageTitle pageTitle='Privacy Policy' />
      <iframe
        src='https://app.termly.io/document/privacy-policy/4601b393-555f-4884-92bc-b16f2e98aba7'
        width='100%'
        style={{ border: 'none', minHeight: '100vh' }}
        frameBorder='0'
      />
    </div>
  );
};

export default PrivacyPolicy;
