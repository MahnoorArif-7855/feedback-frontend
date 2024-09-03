import { getServerURL } from '@/common/utils/func';
import { notification } from 'antd';
import axios from 'axios';

import { deleteAccountInfo, deleteFeedbacksFromDB } from './settingSlice';

export const deleteUserAccountAPI = async ({ user, uid, customerId, organizationId, dispatch }) => {
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

          return await axios
            .get(`${getServerURL()}/delete-user?uid=${uid}&customerId=${customerId}&organizationId=${organizationId}`, {
              headers: headers,
            })
            .then(async (res) => {
              const userInfo = await res.data;
              console.log('userInfo', userInfo);
              dispatch(deleteAccountInfo(userInfo?.delete));
            })
            .catch((error) => {
              console.log('error', error);
            });
        })
        .catch((error) => {
          console.log('error in deleteUserAccountAPI', error);
        });
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
};
export const disconnectSlackAppAPI = async ({ user, uid, organizationId, dispatch }) => {
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

          return await axios
            .get(`${getServerURL()}/auth-revoke?uid=${uid}&organizationId=${organizationId}`, {
              headers: headers,
            })
            .then(async (res) => {
              const userInfo = await res.data;
              if (userInfo.disconnect) {
                notification.success({
                  message: 'your Slack app disconnect successfully',
                });
                window.location.href = `${window.location.origin}/dashboard/slackapp`;
                console.log('userInfo', userInfo);
              }
            })
            .catch((error) => {
              console.log('error', error);
              notification.error({
                message: 'app already disconnected',
              });
              window.location.href = `${window.location.origin}/dashboard/slackapp`;
            });
        })
        .catch((error) => {
          console.log('error in disconnect Slack app', error);
        });
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
};
export const uninstallSlackAppAPI = async ({ user, uid, organizationId, setIsDataDeleting, dispatch }) => {
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

          return await axios
            .get(`${getServerURL()}/app-uninstall?uid=${uid}&organizationId=${organizationId}`, {
              headers: headers,
            })
            .then(async (res) => {
              const userInfo = await res.data;

              if (userInfo.uninstall) {
                await resetData({ organizationId, user, setIsDataDeleting });
                notification.success({
                  message: 'your Slack app uninstall successfully',
                });
              }
            })
            .catch((error) => {
              console.log('error', error);
              notification.error({
                message: 'your app is already disconnected',
              });
              window.location.href = `${window.location.origin}/dashboard/slackapp`;
            });
        })
        .catch((error) => {
          console.log('error in disconnect Slack app', error);
        });
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
};

export const resetData = async ({ organizationId, user, setIsDataDeleting }) => {
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
            .get(`${getServerURL()}/delete-data?organizationId=${organizationId}`, {
              headers: headers,
            })
            .then(async (res) => {
              notification.success({
                message: 'Data reset successfully',
              });
              setIsDataDeleting(false);
              window.location.reload(false);
            })
            .catch((error) => {
              notification.error({
                message: 'Error resetting data',
              });
              console.log('error deleting data', error);
            });
        })
        .catch((error) => {
          console.log('error in resetData', error);
        });
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
};
