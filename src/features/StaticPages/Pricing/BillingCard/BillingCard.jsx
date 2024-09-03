import SlackButton from '@/common/ui/SlackButton';
import {
  ACTIVE_PLAN,
  BILLING_PORTAL,
  CONTACT_US,
  CURRENT_PLAN,
  CURRENT_PLAN_STATUS_ACTIVE,
  CURRENT_PLAN_STATUS_ACTIVE_FOR_BILLING_PAGE,
  EXPIRING_SOON,
  FREE_ID,
  MOST_POPULAR_PLAN,
  PLAN_ACTIVE,
  PLAN_TRIALING,
  PREMIUM_PLAN,
  UPGRADE_PLAN,
  UPGRADE_PLAN_STATUS_ACTIVE,
  UPGRADE_PLAN_STATUS_CANCELED,
  UPGRADE_PLAN_STATUS_EXPIRE,
  UPGRADE_PLAN_STATUS_FOR_BILLING_PAGE,
} from '@/common/utils/constant';
import { billingPortal, cancellationSubscription } from '@/state/redux/billing/billingSlice';
import { createSession } from '@/state/redux/pricing/pricingSlice';
import { CheckOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import { event } from 'nextjs-google-analytics';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseAuth } from '../../../../../firebase';
import { SubscriptionCardStyled } from '../Pricing.styles';

const { Text } = Typography;

const BillingCard = ({ SubscriptionPlan, price, featureList, id, userId, features, component }) => {
  const { authDetails } = useSelector((state) => state.auth);
  const { organizationDetails, email, organizationId } = authDetails || {
    organizationDetails: [],
  };
  const organizationData = organizationDetails && organizationDetails.length > 0 && organizationDetails[0];
  const { plan, customerId, status } = organizationData || {
    plan: FREE_ID,
    status: PLAN_ACTIVE,
  };
  const [user] = useAuthState(firebaseAuth);
  const dispatch = useDispatch();
  const router = useRouter();
  const { uid } = user || { uid: null };

  const priceButton = () => {
    let buttonText = 'loading....';
    if (id === FREE_ID) {
      if (ACTIVE_PLAN.includes(status)) {
        buttonText = CURRENT_PLAN_STATUS_ACTIVE_FOR_BILLING_PAGE;
      } else {
        buttonText = CURRENT_PLAN;
      }
    } else if (id === PREMIUM_PLAN) {
      if (plan !== PREMIUM_PLAN) {
        buttonText = UPGRADE_PLAN_STATUS_FOR_BILLING_PAGE;
      } else if (plan === PREMIUM_PLAN) {
        if (status === PLAN_ACTIVE || PLAN_TRIALING) {
          buttonText = UPGRADE_PLAN_STATUS_ACTIVE;
        } else if (status === EXPIRING_SOON) {
          buttonText = UPGRADE_PLAN_STATUS_EXPIRE;
        } else {
          buttonText = UPGRADE_PLAN_STATUS_CANCELED;
        }
      }
    } else {
      buttonText = CONTACT_US;
    }
    return buttonText;
  };

  const freePlanDisable = () => {
    let disableButton = true;

    if (id === FREE_ID) {
      if (plan === FREE_ID) {
        disableButton = component && status === PLAN_ACTIVE ? false : true;
      } else if (plan === PREMIUM_PLAN) {
        if (!ACTIVE_PLAN.includes(status)) {
          disableButton = false;
        } else {
          disableButton = true;
        }
      }
    } else if (id === PREMIUM_PLAN) {
      if (plan === PREMIUM_PLAN && !ACTIVE_PLAN.includes(status)) {
        disableButton = true;
      } else if (plan === FREE_ID) {
        disableButton = false;
      }
    } else {
      disableButton = false;
    }
    return disableButton;
  };

  const onBillingClick = async ({ buttonId }) => {
    event('subscription_plan', { email, organizationId, customerId, plan });

    console.log('buttonId', buttonId);

    if (plan !== PREMIUM_PLAN) {
      if (uid && email) {
        event('Upgrade plan', { email, organizationId, customerId, plan });
        await dispatch(
          createSession({
            user,
            email,
            organizations: organizationId,
            customerId,
            freeTrail: true,
          })
        );
      } else {
        router.push('/signin');
      }
    } else if (customerId && uid && plan === PREMIUM_PLAN) {
      if (uid && email) {
        await dispatch(billingPortal({ user, customerId }));
      } else {
        router.push('/signin');
      }
    }
  };

  return (
    <SubscriptionCardStyled bodyStyle={{ padding: '0px' }} cardPlan={id}>
      <Text className={'subscribe-plan-status'}>{SubscriptionPlan}</Text>
      <Text className='billing-price'>{price}</Text>
      <div className='features'>
        <Text className='feature-text'>{features}</Text>
      </div>

      <div className='plan-feature'>
        {featureList &&
          featureList.map((feature, key) => (
            <div className='plan-feature-list' key={key}>
              <CheckOutlined className='check-icon' width={22} color={'#f28c6f'} />
              <p className='plan-feature-lable'>{feature}</p>
            </div>
          ))}
      </div>
      <div className='card-plan-button'>
        <SlackButton
          text={priceButton()}
          id={id}
          disabled={freePlanDisable()}
          onClick={() => onBillingClick({ buttonId: id })}
        />
      </div>
    </SubscriptionCardStyled>
  );
};

export default BillingCard;
