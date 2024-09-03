import { ERROR_TITLE, EXPIRE_MESSAGE } from '@/common/utils/constant';
import { getServerURL } from '@/common/utils/func';
import { notification } from 'antd';
import axios from 'axios';

import { billingDetails } from './billingSlice';

export async function billingDetailsAPI({ user, organizationId, dispatch }) {
  try {
    user &&
      user
        .getIdToken(/* forceRefresh */ true)
        .then(async (token) => {
          // Include the token in the request header

          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
          await axios
            .get(`${getServerURL()}/billing-plan?organizationId=${organizationId}`, {
              headers: headers,
            })
            .then(async (billing) => {
              const billingDetail = await billing.data;

              if (billingDetail && billingDetail.length > 0) {
                const billinginfo = billingDetail[0];
                dispatch(billingDetails(billinginfo));
              }
            })
            .catch((error) => {
              notification.error({
                message: ERROR_TITLE,
                description: error.message,
              });
            });
        })
        .catch((error) => {
          console.log('error in billingDetailsAPI', error);
        });
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
}

export async function billingPortalAPI({ user, customerId, dispatch }) {
  const requestBody = {
    customerId: customerId,
  };

  try {
    user &&
      (await user
        .getIdToken(/* forceRefresh */ true)
        .then(async (token) => {
          // Include the token in the request header
          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
          await axios
            .post(`${getServerURL()}/billing-portal`, requestBody, {
              headers: headers,
            })
            .then(async (response) => {
              const billingportal = await response.data;
              if (billingportal.url) {
                window.location.href = billingportal.url;
              }
            })
            .catch((err) => console.log(err.message));
        })
        .catch((error) => {
          console.log('error', error);
        }));
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
}

export async function cancellationSubscriptionAPI({ user, customerId, dispatch }) {
  const requestBody = {
    customerId: customerId,
  };

  try {
    user &&
      (await user
        .getIdToken(/* forceRefresh */ true)
        .then(async (token) => {
          // Include the token in the request header
          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
          await axios
            .post(`${getServerURL()}/subscription-cancel`, requestBody, {
              headers: headers,
            })
            .then(async (response) => {
              const status = response.data;
              if (status?.cancel_at_period_end === true) {
                notification.success({
                  message: EXPIRE_MESSAGE,
                });
              }
            })
            .catch((err) => console.log(err.message));
        })
        .catch((error) => {
          console.log('error', error);
        }));
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
}
