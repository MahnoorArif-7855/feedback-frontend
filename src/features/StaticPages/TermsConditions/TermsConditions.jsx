import PageTitle from '@/common/components/PageTitle';
import React from 'react';

const TermsConditions = () => {
  return (
    <div>
      <PageTitle pageTitle='Terms & Conditions' />
      <iframe
        src='https://app.termly.io/document/terms-of-service/4c367b6e-0172-4c8f-b6da-20b90a9af005'
        width='100%'
        style={{ border: 'none', minHeight: '100vh' }}
        frameBorder='0'
      />
    </div>
  );
};

export default TermsConditions;
