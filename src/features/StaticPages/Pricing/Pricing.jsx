import { ACTIVE_PLAN, PREMIUM_PLAN } from '@/common/utils/constant';
import { billingPortal } from '@/state/redux/billing/billingSlice';
import { Button, Col, Row, Typography } from 'antd';
import { usePageViews } from 'nextjs-google-analytics';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseAuth } from '../../../../firebase';
import BillingPlan from './BillingPlan';
import { BillingPortalCardStyled, PriceStyled } from './Pricing.styles';

const { Text } = Typography;

const Pricing = () => {
  const { billingPortalLoader, userBillingProfile } = useSelector((state) => state.billing);
  const { authDetails, searchLimitCounts } = useSelector((state) => state.auth);
  const [user] = useAuthState(firebaseAuth);

  const dispatch = useDispatch();

  const { organizationDetails } = authDetails || {
    organizationDetails: [],
  };

  const organizationInfo = organizationDetails && organizationDetails[0];
  const { customerId, plan } = organizationInfo || { customerId: null };

  const billingHistory = async () => {
    await dispatch(billingPortal({ user, customerId }));
  };
  const { uid } = user || { uid: null };

  const { status, userId } = userBillingProfile || {
    status: null,
    userId: null,
  };
  usePageViews();

  return (
    <PriceStyled className='container mx-auto border-b border-gray-100 pb-36'>
      <h1 className='my-20 text-center text-4xl text-orange'>Pricing</h1>

      {ACTIVE_PLAN.includes(status) && plan === PREMIUM_PLAN && userId === uid && (
        <BillingPortalCardStyled>
          <Row>
            <Col xs={24} sm={15} md={15} lg={20}>
              <Col>
                <Text className='plan-title'>Billing Portal</Text>
              </Col>
              <Col>
                <Text>View your payment history</Text>
              </Col>
            </Col>
            <Col xs={24} sm={4} md={9} lg={4}>
              <Button onClick={() => billingHistory()} loading={billingPortalLoader}>
                View billing Portal
              </Button>
            </Col>
          </Row>
        </BillingPortalCardStyled>
      )}
      {userId && userId !== uid && (
        <BillingPortalCardStyled>
          <Row>
            <Col xs={24} sm={15} md={15} lg={20}>
              <Col>
                <Text className='plan-title'>Billing Details</Text>
              </Col>
              <Col>
                <Text>Organization premium plan already active</Text>
              </Col>
            </Col>
          </Row>
        </BillingPortalCardStyled>
      )}
      <BillingPlan userId={userId} />
    </PriceStyled>
  );
};

export default Pricing;
