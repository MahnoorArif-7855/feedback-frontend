import { PageLayout } from '@/common/components/DashboardV2Layout';
import { userProfileInfo } from '@/state/redux/userProfile/userProfileSlice';
import { Button, Space } from 'antd';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseAuth } from '../../../firebase';
import BillingPlan from '../StaticPages/Pricing/BillingPlan';
import { HeaderWrapper } from './styled';

export const DashboardBilling = () => {
  const { billingPortalLoader, userBillingProfile } = useSelector((state) => state.billing);

  const { userId } = userBillingProfile || {
    userId: null,
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const signout = () => {
    signOut(firebaseAuth);
    firebaseAuth.signOut();
    dispatch(userProfileInfo(null));
    localStorage.setItem('token', 'null');
    router.push('/signin');
  };

  return (
    <PageLayout
      title={
        <HeaderWrapper>
          {/* <Space size='middle'> */}
          <h1>Billing</h1>
          <div className='signout-container'>
            <Button type='primary' onClick={signout}>
              Signout
            </Button>
          </div>
          {/* </Space> */}
        </HeaderWrapper>
      }
    >
      <BillingPlan userId={userId} component={true} />
    </PageLayout>
  );
};
