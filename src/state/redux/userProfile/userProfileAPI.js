import {
  ADMIN_SEARCH_COUNT_SUCCESS_MESSAGE,
  ADMIN_SUCCESS_MESSAGE,
  ERROR_MESSAGE_AUTHICATION,
  ERROR_TITLE,
  SIGN_IN_REDIRECT_LINK,
  WEB_LOGIN,
  WELCOME_LINK,
} from '@/common/utils/constant';
import { getServerURL } from '@/common/utils/func';
import { notification } from 'antd';
import axios from 'axios';
import { getAuth, onAuthStateChanged, signInWithCustomToken, signOut } from 'firebase/auth';

import { firebaseAuth } from '../../../../firebase';
import {
  SiginInWithSlack,
  SigninModalState,
  autoIngestChannelNamesRedux,
  getSlackChannels,
  intercomTeamNames,
  searchLimits,
  slackChannels,
  totalUsers,
  userProfileInfo,
  usersInfo,
} from './userProfileSlice';

export async function searchCountAPI({ user, dispatch }) {
  try {
    user &&
      user
        ?.getIdToken(/* forceRefresh */ true)
        .then(async (token) => {
          // Include the token in the request header

          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };

          return await axios
            .get(`${getServerURL()}/plan-price`, {
              method: 'GET',
              headers: headers,
            })
            .then(async (res) => {
              const searchLimit = await res.data;
              dispatch(searchLimits(searchLimit[0]));
            })
            .catch((error) => {});
        })
        .catch((error) => {
          console.log(error);
        });
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
}

export const allUsersInfo = async ({ user, dispatch }) => {
  try {
    const userToken = user;
    const headers = {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    };
    return await axios
      .get(`${getServerURL()}/usersList`, {
        headers: headers,
      })
      .then(async (res) => {
        const searchLimit = await res.data;
        dispatch(usersInfo(searchLimit));
      })
      .catch((error) => {
        console.log('error', error);
      });
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
};
export const adminDetailsAPI = async ({ user, dispatch }) => {
  try {
    const userToken = user;
    const headers = {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    };
    return await axios
      .get(`${getServerURL()}/users-details`, {
        headers: headers,
      })
      .then(async (res) => {
        const totalNoUsers = await res.data;
        dispatch(totalUsers(totalNoUsers));
      })
      .catch((error) => {
        console.log('error', error);
      });
  } catch (error) {
    notification.error({
      message: error.message,
    });
    return { error: error.message, UsersInfo: [] };
  }
};

export const userTypeUpdateAPI = async ({ user, type, uid }) => {
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
            .get(`${getServerURL()}/usertype?type=${type}&uid=${uid}`, {
              headers: headers,
            })
            .then(async (res) => {
              await notification.success({
                message: 'Success',
                description: ADMIN_SUCCESS_MESSAGE,
              });
            })
            .catch((error) => {});
        })
        .catch((error) => {
          console.log('error in userTypeUpdateAPI', error);
        });
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
};

export const searchLimitUpdateAPI = async ({ user, searchCount, searchType, dispatch }) => {
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
            .get(`${getServerURL()}/searchCountUpdate?searchCount=${searchCount}&type=${searchType}`, {
              headers: headers,
            })
            .then(async (res) => {
              await notification.success({
                message: 'Success',
                description: ADMIN_SEARCH_COUNT_SUCCESS_MESSAGE,
              });
            })
            .catch((error) => {});
        })
        .catch((error) => {});
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
};

export const siginWithSlackAPI = async ({ params, setSlackLoading, dispatch, router, webLogin }) => {
  try {
    const auth = getAuth();

    // (async () => {
    const response = await fetch(process.env.OAUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(params),
    });

    if (!response.ok) {
      console.log('Failed to exchange authorization code for access token');
    }

    const data = await response.json();

    if (data.ok) {
      await fetch(`${getServerURL()}/userInfo?accessToken=${data.access_token}&userId=${data.authed_user?.id}`, {
        method: 'POST',
        headers: {
          Authorization: `public`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          const info = await res.json();
          dispatch(SiginInWithSlack({ slackSign: info }));

          const token = info;
          signInWithCustomToken(auth, token)
            .then(async (userCredential) => {
              // Signed in
              const user = userCredential.user;

              await setSlackLoading(false);

              router.push(SIGN_IN_REDIRECT_LINK);
              dispatch(SigninModalState());
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log('errorMessagein tokeb', errorMessage);

              notification.error({
                message: 'ERROR',
                description: errorMessage,
              });
              setSlackLoading(false);
            });
        })
        .catch((error) => {
          notification.error({
            message: ERROR_TITLE,
            description: error.message,
          });
        });
    } else {
      notification.error({
        message: ERROR_TITLE,
        description: ERROR_MESSAGE_AUTHICATION,
      });
      setSlackLoading(false);
    }
    // })();
  } catch (error) {
    console.log('error in Slack Button', error.message);
  }
};

export const searchLimitSpecificUserAPI = async ({ user, uid, userSearchCount, userLimitEnable }) => {
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
            .get(
              `${getServerURL()}/user-search-count?uid=${uid}&searchCount=${userSearchCount}&enable=${userLimitEnable}`,
              {
                headers: headers,
              }
            )
            .then(async (res) => {
              const searchLimit = await res.data;
              // console.log('searchLimit', searchLimit);
              // await notification.success({
              //   message: 'Success',
              //   description: ADMIN_SEARCH_COUNT_SUCCESS_MESSAGE,
              // });
            })
            .catch((error) => {});
        })
        .catch((error) => {
          console.log('error searchLimitSpecificUserAPI', error);
        });
  } catch (error) {
    console.log('error', error);
  }
};

export const AuthStateAPI = async ({ router, dispatch }) => {
  try {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      } else {
        // User is signed out
        signOut(firebaseAuth);
        firebaseAuth.signOut();
        dispatch(userProfileInfo(null));
        localStorage.setItem('token', 'null');
        router.push('/signin');
      }
    });
  } catch (error) {
    console.log('error', error);
  }
};

export async function fetchUserSlacksChannelsAPI({ user, channelsIds, organizationId, dispatch }) {
  const requestBody = {
    channelsIds: channelsIds,
    organizationId: organizationId,
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
            .post(`${getServerURL()}/slack-channels`, requestBody, {
              headers: headers,
            })
            .then(async (response) => {
              const status = response.data;
              dispatch(slackChannels(status));
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

export async function slackAutoIngestChannelAPI({ user, channelId, organizationId, dispatch }) {
  const requestBody = {
    channelId: channelId,
    organizationId: organizationId,
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
            .post(`${getServerURL()}/auto-ingest-channel`, requestBody, {
              headers: headers,
            })
            .then(async (response) => {
              const channel = response.data;

              dispatch(autoIngestChannelNamesRedux(channel));
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

export async function intercomTeamName({ user, organizationId, dispatch }) {
  const requestBody = {
    organizationId: organizationId,
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
            .post(`${getServerURL()}/intercom-team-name`, requestBody, {
              headers: headers,
            })
            .then(async (response) => {
              const intercomTeamName = response.data;

              dispatch(intercomTeamNames(intercomTeamName));
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

export async function fetchSlackChannelsAPI({ user, organizationId, SlackChannelPagination, dispatch, router }) {
  const requestBody = {
    organizationId: organizationId,
    cursor: SlackChannelPagination,
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
            'Access-Control-Allow-Origin': '*',
          };
          try {
            await axios
              .post(`${getServerURL()}/get-slack-channels`, requestBody, {
                headers: headers,
              })
              .then(async (response) => {
                if (response.status === 200) {
                  const status = response.data;
                  if (window.location.pathname === '/dashboard/slackapp') {
                    router.push('/dashboard');
                  }
                  dispatch(
                    getSlackChannels({
                      organizationChannels: status?.organizationChannels,
                      SlackChannelPagination: status?.channelsPagination,
                      getSlackChannelOrganizationId: organizationId,
                    })
                  );
                }
              })
              .catch((err) => {
                // Navigate to the Slack App Install page (unless we're already there)
                if (window.location.pathname !== '/dashboard/slackapp') {
                  router.push('/dashboard/slackapp');
                }
                dispatch(
                  getSlackChannels({
                    organizationChannels: [],
                    SlackChannelPagination: '',
                    getSlackChannelOrganizationId: organizationId,
                  })
                );
                console.log('error', err.message);
              });
          } catch (err) {
            console.log('ERROR', err);
          }
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

export async function sendSlackMessage({ user, organizationId }) {
  try {
    const requestBody = {
      organizationId: organizationId,
    };
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
            .post(`${getServerURL()}/send-slack-message`, requestBody, {
              headers: headers,
            })
            .then(async (response) => {
              const status = response.data;
              if (status.error) {
                notification.error({
                  message: status.error,
                });
              } else {
                notification.success({
                  message: 'Message sent',
                });
              }
            })
            .catch((err) => {
              notification.error({
                message: err?.response?.data?.message,
              });
              console.log(err);
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

export async function sendLastActivityAPI({ user, lastActivity }) {
  try {
    const requestBody = {
      userId: user?.uid,
      lastActivity: lastActivity,
      lastActivityDate: new Date(),
    };
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
            .post(`${getServerURL()}/last-activity`, requestBody, {
              headers: headers,
            })
            .then(async (response) => {
              const status = await response.data;
              if (status.error) {
                notification.error({
                  message: status.error,
                });
              } else {
                console.log('last activity send successfully');
              }
            })
            .catch((err) => {
              notification.error({
                message: err?.response?.data?.message,
              });
              console.log(err);
            });
        })
        .catch((error) => {
          console.log('error while last activity api call', error);
        }));
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
}
