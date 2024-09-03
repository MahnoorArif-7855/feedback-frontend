import { getServerURL } from '@/common/utils/func';
import { notification } from 'antd';
import axios from 'axios';

export async function createSessionAPI({ email, organizations, customerId, freeTrail, user }) {
  const { uid } = user || { uid: undefined };

  try {
    user &&
      (await user.getIdToken(/* forceRefresh */ true).then(async (token) => {
        // Include the token in the request header
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        const sessionInfo = { uid, email, organizations, customerId, freeTrailEnable: freeTrail, authToken: token };
        axios
          .post(`${getServerURL()}/stripe/create-checkout-session`, sessionInfo, {
            method: 'POST',
            headers: headers,
          })
          .then(async (response) => {
            const res = await response.data;
            if (res.url) {
              window.location.href = res.url;
            }
          })
          .catch((err) => console.log(err.message));
      }));
  } catch (error) {
    console.log('error', error);
    notification.error({
      message: error.message,
    });
  }
}
