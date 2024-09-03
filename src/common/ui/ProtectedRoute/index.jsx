import { ACTIVE_PLAN, AUTHORITY, FREE_ID, PREMIUM_PLAN } from '@/common/utils/constant';
import { isJwtValid } from '@/common/utils/isJwtValid';
import { FIND_FEEDBACKS_BY_ORGANIZATION_ID, FIND_ORGANIZATION, FIND_USER } from '@/state/graphQL/Mutation';
import { userBillingInfo } from '@/state/redux/billing/billingSlice';
import { feedbacksDetail } from '@/state/redux/settings/settingSlice';
import {
  AuthStateSlice,
  authUserInfo,
  getAllUsersInfoSlice,
  organizationDetails,
  searchLimitsSlice,
  selectedOrganizationDetails,
  userProfileInfo,
} from '@/state/redux/userProfile/userProfileSlice';
import { getSlackChannelsSlice } from '@/state/redux/userProfile/userProfileSlice';
import { useMutation } from '@apollo/client';
import { signOut } from 'firebase/auth';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseAuth } from '../../../../firebase';
import ChannelModal from '../ChannelModal';

const Loader = dynamic(() => import('../Spinner'), { ssr: false });

const ProtectedRoute = ({ children, props }) => {
  const router = useRouter();
  const { asPath } = router;

  const [user, loading, error] = useAuthState(firebaseAuth);
  const { chatResponse } = useSelector((state) => state.search);
  const { authDetails, organizationInfo, userSlackChannels, selectedOrganizationId, userSignInModal } = useSelector(
    (state) => state.auth
  );

  const { type, organizationId, userName, email } = authDetails || {
    type: null,
    organizationId: null,
  };

  const orgDetails = authDetails?.organizationDetails;

  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);

  const dashboardPath = '/dashboard';
  const dashboardBillingPath = '/dashboard/billing-plan';
  const signInPath = '/signin';
  const isDashboardPages = asPath.includes('dashboard');
  const isDashboardSlackPages = '/dashboard/slackapp';

  const { uid } = user || { uid: null };

  let tokenvalue = null;
  if (typeof window !== 'undefined') {
    tokenvalue = localStorage.getItem('token');
  }
  const dispatch = useDispatch();

  const [findUserInfo] = useMutation(FIND_USER, {
    onCompleted: (data) => {
      dispatch(userProfileInfo(data.findUserInfo[0]));
    },
    onError: (error) => {
      console.log('Error during mutation:', error);
    },
  });

  useEffect(() => {
    // Include Pendo script dynamically
    if (process.env.NODE_ENV !== 'development') {
      const script = document.createElement('script');
      script.src = 'https://cdn.pendo.io/agent/static/e1d7ad13-93e5-4626-49cb-c36fdc37d42f/pendo.js';
      script.async = true;
      script.onload = () => {
        if ((userName && uid && orgDetails && orgDetails[0]?.organizationName) || type || email) {
          window.pendo.initialize({
            visitor: {
              id: uid,
              email: email,
              full_name: userName,
              role: type,
            },
            account: {
              id: organizationId,
              name: orgDetails && orgDetails[0]?.organizationName,
              is_paying: orgDetails && orgDetails[0]?.plan === 'free' ? false : true,
            },
          });
        }
      };

      document.head.appendChild(script);
    }
  }, [orgDetails]);

  useEffect(() => {
    if (uid && tokenvalue !== null && user !== null) {
      dispatch(searchLimitsSlice({ user }));
      dispatch(authUserInfo({ user }));
      dispatch(AuthStateSlice({ user, router }));
      findUserInfo({
        variables: {
          uid: uid,
        },
      });
    }
  }, [chatResponse, findUserInfo, tokenvalue, uid, user]);

  useEffect(() => {
    if (uid && tokenvalue !== null && user !== null && organizationId) {
      dispatch(userBillingInfo({ user, organizationId }));
    }
  }, [organizationId, tokenvalue, uid, user]);

  useEffect(() => {
    const { type } = authDetails || {};
    user &&
      type === AUTHORITY.ADMIN &&
      user.getIdToken(/* forceRefresh */ true).then(async (token) => {
        await dispatch(getAllUsersInfoSlice({ user: token }));
      });
  }, [authDetails, user]);

  const [findOrganizationInfo] = useMutation(FIND_ORGANIZATION, {
    onCompleted: (data) => {
      if (selectedOrganizationId) {
        dispatch(selectedOrganizationDetails(data?.findOrganizationInfo[0]));
      } else {
        dispatch(organizationDetails(data?.findOrganizationInfo[0]));
      }
    },
    onError: (error) => {
      console.error('Error during mutation:', error);
    },
  });

  const [findFeedbackByOrganizationId] = useMutation(FIND_FEEDBACKS_BY_ORGANIZATION_ID, {
    onCompleted: (data) => {
      dispatch(feedbacksDetail(data?.feedbacksByOrganizationId));
    },
    onError: (error) => {
      console.error('Error occured fetching feedbacks by org id:', error);
    },
  });

  useEffect(() => {
    if ((selectedOrganizationId || organizationId) && user) {
      dispatch(
        getSlackChannelsSlice({
          router,
          user,
          SlackChannelPagination: '',
          organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
        })
      );
    }
  }, [selectedOrganizationId, organizationId, dispatch, user]);

  useEffect(() => {
    if (organizationInfo) {
      if (!organizationInfo?.automatic_update_channel_Id && userSignInModal) {
        setIsChannelModalOpen(true);
      }
    }
  }, [organizationInfo, userSignInModal]);

  useEffect(() => {
    if (organizationId || selectedOrganizationId) {
      findOrganizationInfo({
        variables: {
          organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
        },
      });
    }
  }, [organizationId, userSlackChannels, selectedOrganizationId]);

  useEffect(() => {
    if (organizationId) {
      findFeedbackByOrganizationId({
        variables: {
          organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
        },
      });
    }
  }, [organizationId, selectedOrganizationId]);

  useEffect(() => {
    if (!loading) {
      if (user) {
        const isValid = isJwtValid(user.accessToken);

        if (!isValid.valid) {
          signOut(firebaseAuth);
          router.push('/signin');
        }

        if (asPath === signInPath || asPath === dashboardPath) {
          router.push('/dashboard');
        }
      } else if (user === null) {
        if (asPath === dashboardPath || isDashboardPages) {
          signOut(firebaseAuth);
          router.push('/signin');
        }
      }
    }
  }, [asPath, user, loading]);
  useEffect(() => {
    if (window.Intercom) {
      window.Intercom('update', {
        app_id: process.env.INTERCOM_APP_ID, ///process.env.INTERCOM_APP_ID,
        hide_default_launcher: true,
      });
    }
  }, [asPath]);

  useEffect(() => {
    const { customerId, plan, status, newOrgBilling } = (orgDetails && orgDetails[0]) || {
      customerId: null,
      plan: null,
      status: null,
      newOrgBilling: false,
    };

    if ((!customerId || plan === FREE_ID || !ACTIVE_PLAN.includes(status)) && newOrgBilling) {
      if (asPath === dashboardPath || (isDashboardPages && asPath !== isDashboardSlackPages)) {
        router.push(dashboardBillingPath);
      }
    } else if (customerId && plan === PREMIUM_PLAN && asPath === dashboardBillingPath) {
      router.push('/dashboard');
    }
  }, [orgDetails, user, asPath]);

  if (loading) {
    return <Loader />;
  }

  // Wait until we have organizationId to render dashboard
  if (isDashboardPages && !organizationId) {
    return <Loader />;
  }

  if (isChannelModalOpen) {
    return (
      <ChannelModal
        userSlackChannels={userSlackChannels}
        isModalOpen={isChannelModalOpen}
        setIsModalOpen={setIsChannelModalOpen}
        organizationId={organizationId}
      />
    );
  }

  return React.cloneElement(children, { ...props });
};

export default ProtectedRoute;
