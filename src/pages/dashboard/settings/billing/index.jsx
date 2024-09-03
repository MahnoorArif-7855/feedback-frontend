import { firebaseAuth } from '@/../firebase';
import { ContentWrapper, PageLayout } from '@/common/components/DashboardV2Layout';
import { ACTIVE_PLAN, ERROR_TITLE, FREE_ID, PLAN_ACTIVE, PREMIUM_PLAN, percentage } from '@/common/utils/constant';
import { capitalizeFirstLetter, dateFormat, getServerURL } from '@/common/utils/func';
import { useEffectOnce } from '@/common/utils/useEffectOnce';
import { FIND_USER } from '@/state/graphQL/Mutation';
import { billingPortal } from '@/state/redux/billing/billingSlice';
import { userProfileInfo } from '@/state/redux/userProfile/userProfileSlice';
import { useMutation } from '@apollo/client';
import { Button, Card, Col, Progress, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

const { Text } = Typography;

const DashboardBilling = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [user] = useAuthState(firebaseAuth);
  const { uid } = user || { uid: null };
  const { authDetails, searchLimitCounts } = useSelector((state) => state.auth);
  const { userBillingProfile, billingPortalLoader } = useSelector((state) => state.billing);
  const { organizationDetails } = authDetails || { organizationDetails: [] };
  const organizatinInfo = organizationDetails && organizationDetails[0];
  const {
    searchCount,
    plan: userPlan,
    customerId,
  } = organizatinInfo || {
    searchCount: 0,
    userPlan: FREE_ID,
    customerId: null,
  };
  const { pricing } = searchLimitCounts || { pricing: null };

  let tokenvalue = null;
  if (typeof window !== 'undefined') {
    tokenvalue = localStorage.getItem('token');
  }

  const [findUserInfo] = useMutation(FIND_USER, {
    onCompleted: (data) => {
      dispatch(userProfileInfo(data.findUserInfo[0]));
    },
    onError: (error) => {
      console.error('Error during mutation:', error);
    },
  });

  useEffectOnce(() => {
    if (uid && tokenvalue) {
      findUserInfo({
        variables: {
          uid: uid,
        },
      });
    }
  });

  const totalSearchLimit = useCallback(() => {
    return userPlan !== PREMIUM_PLAN ? pricing?.freePlanWordsCount : pricing?.premiumPlanWordsCount;
  }, [userPlan, pricing]);

  const {
    plan,
    status,
    cancel_at_period_end,
    cancel_at,
    canceled_at,
    created,
    current_period_start,
    current_period_end,
    userId,
  } = userBillingProfile || {
    plan: null,
    status: null,
    userId: null,
  };

  const billingHistory = async () => {
    await dispatch(billingPortal({ user, customerId: customerId }));
  };

  const pricingPage = () => {
    router.push('/pricing');
  };

  return (
    <PageLayout title='Billing'>
      <ContentWrapper>
        <div className='credit'>
          {ACTIVE_PLAN.includes(status) && userId === uid && (
            <Card>
              <Row>
                <Col xs={24} sm={15} md={15} lg={20}>
                  <Col>
                    <Text className='plan-title'>Billing Portal</Text>
                  </Col>
                  <Col className='plan-des-container'>
                    <Text className='plan-desc'>View your payment history</Text>
                  </Col>
                </Col>
                <Col xs={24} sm={4} md={9} lg={4}>
                  <Button onClick={() => billingHistory()} loading={billingPortalLoader}>
                    View billing Portal
                  </Button>
                </Col>
              </Row>
            </Card>
          )}
          <Row>
            <Col xs={24} sm={12} lg={12}>
              <Card className='plan-card'>
                <Col className='basic-plan'>
                  <Text className='plan-title'>{capitalizeFirstLetter(userPlan)} Plan</Text>
                  {userPlan === PREMIUM_PLAN && <Text className='monthly-plan'>Monthly</Text>}
                </Col>
                <Col className='plan-des-container'>
                  <Text className='plan-desc'>Our most popular plan for small teams</Text>
                </Col>
                <Col>
                  <Text strong>
                    {searchCount} of {totalSearchLimit()} Searches
                  </Text>
                  <div>
                    <Progress
                      percent={percentage(searchCount, totalSearchLimit())}
                      showInfo={false}
                      strokeColor={{
                        '0%': '#f28c6f',
                        '100%': '#f28c6f',
                      }}
                    />
                  </div>
                </Col>

                <div className='upgrade-plan'>
                  <Button type='primary' onClick={() => pricingPage()}>
                    Upgrade Plan
                  </Button>
                </div>
              </Card>
            </Col>
            {status === 'active' && (
              <Col xs={24} sm={12} lg={12}>
                <Card className='plan-card'>
                  <Col>
                    <Text className='plan-title'>Billing Details</Text>
                  </Col>
                  <Col className='plan-des-container'>
                    <Text className='plan-desc'>Our most popular plan for small teams</Text>
                  </Col>
                  {cancel_at_period_end === 'false' && (
                    <Col>
                      <Col>
                        <Row wrap gutter={[8, 8]}>
                          <Col className='plan'>
                            <Text className='plan-desc' strong>
                              Start Invoice:
                            </Text>
                            <Text className=''> {` ${dateFormat(current_period_start)}`}</Text>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Row wrap gutter={[8, 8]}>
                          <Col className='plan'>
                            <Text className='plan-desc' strong>
                              End Invoice:
                            </Text>
                            <Text className=''> {` ${dateFormat(current_period_end)}`}</Text>
                          </Col>
                        </Row>
                      </Col>
                    </Col>
                  )}
                  {cancel_at_period_end === 'true' && (
                    <Col>
                      <Col className='plan'>
                        <Text className='plan-desc' strong>
                          Cancel At :
                        </Text>
                        <Text className='plan-desc'>{` ${dateFormat(canceled_at)}`}</Text>
                      </Col>
                      <Col className='plan'>
                        <Text className='plan-desc' strong>
                          Expired At :
                        </Text>
                        <Text className='plan-desc'>{`${dateFormat(cancel_at)}`}</Text>
                      </Col>
                    </Col>
                  )}
                </Card>
              </Col>
            )}
          </Row>
        </div>
      </ContentWrapper>
    </PageLayout>
  );
};

export default DashboardBilling;
