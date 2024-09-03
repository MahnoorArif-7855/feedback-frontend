import {
  CREATE_TICKET_SUCCESS_MESSAGE,
  ERROR_TITLE,
  G2_SUCCESS_MESSAGE,
  No_G2_DATA,
  No_G2_DATA_SUCCESS_MESSAGE,
  SUCCESSFULLY_SAVE_TICKETS_DESCRIPTION,
  SUCCESSFULLY_SAVE_TICKETS_TITLE,
} from '@/common/utils/constant';
import { getServerURL } from '@/common/utils/func';
import { notification } from 'antd';
import axios from 'axios';

import { G2Reviewsreducer } from './integrationSlice';

export async function zendeskAPI({ user, data, dispatch }) {
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
            .post(`${getServerURL()}/integrations/zendesk`, data, {
              headers: headers,
            })
            .then((response) => response)
            .then(async (data) => {
              if (data.error) {
                //error message
                let errorMessage = data.error;

                if (data.error.title) {
                  errorMessage = data.error.title;
                }

                notification.error({
                  title: ERROR_TITLE,
                  description: errorMessage,
                  type: 'error',
                });
              } else {
                notification.success({
                  title: SUCCESSFULLY_SAVE_TICKETS_TITLE,
                  description: SUCCESSFULLY_SAVE_TICKETS_DESCRIPTION,
                  type: 'success',
                });
              }
            })
            .catch((error) => {
              const errorMessage = error.code;
              if (errorMessage) {
                notification.error({
                  title: ERROR_TITLE,
                  description: errorMessage,
                  type: 'error',
                });
              }
            });
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

export async function G2ReviewsAPI({ user, slugValue, organizationId, setG2Loader, dispatch }) {
  const { uid } = user || { uid: undefined };

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
            .get(
              `${getServerURL()}/integrations/g2?slug=${slugValue}&limit=300&userId=${uid}&organizationId=${organizationId}`,
              {
                headers: headers,
              }
            )
            .then(async (searchResults) => {
              const searchArray = await searchResults.data;
              dispatch(G2Reviewsreducer(searchArray));
              let g2message = G2_SUCCESS_MESSAGE;
              if (searchArray.message) {
                g2message = searchArray.message;
              } else if (searchArray.insertedCount === 0 && searchArray.insertedDocs.length > 0) {
                g2message = No_G2_DATA_SUCCESS_MESSAGE;
              } else if (searchArray.insertedCount === 0 && searchArray.insertedDocs.length === 0) {
                g2message = No_G2_DATA;
              }

              await notification.info({
                // message: 'Success',
                description: g2message,
              });

              setG2Loader(false);
            })
            .catch((error) => {
              notification.error({
                message: ERROR_TITLE,
                description: error.message,
              });
              setG2Loader(false);
            });
        })
        .catch((error) => {
          console.log('error', error);
        });
  } catch (error) {
    notification.error({
      message: error.message,
    });
    setG2Loader(false);
  }
}
export async function discourseSecretAPI({ user, secretKey, organizationId, dispatch }) {
  const { uid } = user || { uid: undefined };
  const body = {
    uid,
    secretKey,
    organizationId,
  };

  try {
    await user
      .getIdToken(/* forceRefresh */ true)
      .then(async (token) => {
        // Include the token in the request header
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        await axios
          .post(`${getServerURL()}/secret-key`, body, {
            headers: headers,
          })
          .then(async (searchResults) => {})
          .catch((error) => {});
      })
      .catch((error) => {
        console.log('error', error);
      });
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
}
export async function zendeskSaveSecretKeyAPI({ user, secretKey, organizationId, dispatch }) {
  const { uid } = user || { uid: undefined };
  const body = {
    uid,
    secretKey,
    organizationId,
  };

  try {
    await user
      .getIdToken(/* forceRefresh */ true)
      .then(async (token) => {
        // Include the token in the request header
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        await axios
          .post(`${getServerURL()}/zendesk-secret-key`, body, {
            headers: headers,
          })
          .then(async (searchResults) => {})
          .catch((error) => {});
      })
      .catch((error) => {
        console.log('error', error);
      });
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
}

export async function intercomAPI({ user, appId, accessToken, organizationId, dispatch }) {
  const { uid } = user || { uid: undefined };
  const body = {
    uid,
    appId,
    accessToken,
    organizationId,
  };

  try {
    await user
      .getIdToken(/* forceRefresh */ true)
      .then(async (token) => {
        // Include the token in the request header
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        await axios
          .post(`${getServerURL()}/intercom-app-id`, body, {
            headers: headers,
          })
          .then(async (searchResults) => {})
          .catch((error) => {});
      })
      .catch((error) => {
        console.log('error', error);
      });
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
}
export async function zendeskDomainAPI({ user, zendeskInfo, organizationId, setZendeskDomainLoading }) {
  const { uid } = user || { uid: undefined };
  const body = {
    uid,
    zendeskInfo,
    organizationId,
  };

  try {
    await user
      .getIdToken(/* forceRefresh */ true)
      .then(async (token) => {
        // Include the token in the request header
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        await axios
          .post(`${getServerURL()}/set-zendesk-domain`, body, {
            headers: headers,
          })
          .then(async () => {
            setZendeskDomainLoading(false);
            notification.success({
              description: 'Zendesk info set successfully',
            });
          })
          .catch((error) => {
            setZendeskDomainLoading(false);
          });
      })
      .catch((error) => {
        console.log('error in zendeskDomainAPI', error);
        setZendeskDomainLoading(false);
      });
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
}

export async function createZendeskTicketAPI({ setContactLoader, name, message, email, dispatch }) {
  const data = { name, message, email };

  try {
    await axios
      .post(`${getServerURL()}/createTicket`, data, {
        headers: {
          authorization: 'public',
          'Content-Type': 'application/json',
        },
      })
      .then(async (searchResults) => {
        notification.success({
          message: 'SUCCESS',
          description: CREATE_TICKET_SUCCESS_MESSAGE,
        });
        setContactLoader(false);
      })
      .catch((error) => {
        notification.error({
          message: ERROR_TITLE,
          description: error.message,
        });
        setContactLoader(false);
      });
  } catch (error) {
    notification.error({
      message: error.message,
    });
    setContactLoader(false);
  }
}
