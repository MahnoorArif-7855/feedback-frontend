/* eslint-disable no-prototype-builtins */
import { ERROR_TITLE } from '@/common/utils/constant';
import { getServerURL } from '@/common/utils/func';
import { notification } from 'antd';
import axios from 'axios';

import { chatAIResponse, feedbackSummary, searchData, searchFeedbackInfo, userSearchInfo } from './searchSlice';

export async function searchDetailsAPI({ user, searchValue, myCategoryQry, setLoader, organizationId, dispatch }) {
  try {
    const { uid } = user;
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
              `${getServerURL()}/search?q=${searchValue}&category=${myCategoryQry}&organizationid=${organizationId}`,
              {
                headers: headers,
              }
            )
            .then(async (searchResults) => {
              const searchArray = await searchResults.data;
              await dispatch(searchData(searchArray));
              setLoader(false);
            })
            .catch((error) => {
              setLoader(false);
              notification.error({
                message: ERROR_TITLE,
                description: error.message,
              });
            });
        })
        .catch((error) => {
          console.log('error in searchDetailsAPI', error);
        });
  } catch (error) {
    notification.error({
      message: error.message,
    });
    setLoader(false);
  }
}

export async function searchAPIModal({ mongoId, dispatch }) {
  try {
    await axios
      .get(`${getServerURL()}/searchInfo?mongoId=${mongoId}`, {
        headers: {
          Authorization: `public`,
          'Content-Type': 'application/json',
        },
      })
      .then(async (response) => {
        const res = await response.data;
        dispatch(searchFeedbackInfo(res));
      })
      .catch((err) => {});
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
}
export async function getSummaryAPIModal({ user, organizationId, mongoId, dispatch }) {
  try {
    user &&
      user
        ?.getIdToken(/* forceRefresh */ true)
        .then(async (token) => {
          const requestData = {
            organization_id: organizationId,
            mongo_id: mongoId,
          };

          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
          axios
            .post(`${process.env.AI_API_BASE_URL}/get_summary`, requestData, headers)
            .then(async (response) => {
              if (response.data.error) {
                notification.error({
                  message: response.data.error,
                });
              } else {
                const summary = response?.data?.data || response?.data?.message;
                dispatch(feedbackSummary(summary));
              }
            })
            .catch((error) => {
              notification.error({
                message: error.message,
              });
              console.log('error in getSummaryAPIModal', error.message);
              return { error: error.message };
            });
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

export async function AIChatAPI({ q, organizationId, user, dispatch, userId, userName }) {
  user &&
    user
      ?.getIdToken(/* forceRefresh */ true)
      .then(async (token) => {
        const requestData = {
          organization_id: organizationId,
          user_query: q,
          user_id: userId,
          user_name: userName,
        };

        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        axios
          .post(`${process.env.AI_API_BASE_URL}/ai_search`, requestData)
          .then(async (response) => {
            if (response.data.error) {
              notification.error({
                message: response.data.error,
              });
            } else {
              const chatMessage = await response.data.data;
              const document_ids = await response.data.document_ids;
              dispatch(
                chatAIResponse({
                  text: chatMessage,
                  refMongoDocumentId: document_ids,
                })
              );
            }
          })
          .catch((error) => {
            notification.error({
              message: error.message,
            });
            console.log('error', error.message);
            return { error: error.message };
          });
      })
      .catch((error) => {
        console.log('error', error);
      });
}
export async function fetchExploreDataAPI({
  organizationId,
  user,
  analyseType,
  days,
  cacheData,
  feedbackSource,
  categories,
  searchFeedbackTags,
  dateFilter,
}) {
  const startDate = new Date(dateFilter[0]);
  const endDate = new Date(dateFilter[1]);

  endDate.setUTCHours(23, 59, 59, 999);

  const formattedStartDate = startDate.toISOString();
  const formattedEndDate = endDate.toISOString();

  console.log('organizationId', organizationId);

  return (
    user &&
    user
      ?.getIdToken(/* forceRefresh */ true)
      .then(async (token) => {
        const requestData = {
          organization_id: organizationId,
          analysis_type: analyseType,
          days: days,
          cache_data: cacheData,
          filters: {
            start_date: formattedStartDate,
            end_date: formattedEndDate,
            source: feedbackSource,
            category: categories,
            tags: searchFeedbackTags,
          },
        };
        return axios
          .post(`${process.env.AI_API_BASE_URL}/analysis`, requestData)
          .then((response) => {
            if (response.data.error) {
              notification.error({
                message: response.data.error,
              });
              return { error: response.data.error };
            } else {
              const responseData = response.data;
              return responseData;
            }
          })
          .catch((error) => {
            notification.error({
              message: error.message,
            });
            console.log('error', error.message);
            return { error: error.message };
          });
      })
      .catch((error) => {
        console.log('error', error);
      })
  );
}

export async function UserSearchAPI({ organizationId, dispatch }) {
  try {
    await axios
      .get(`${getServerURL()}/monitor-ai-search?organizationId=${organizationId}`, {
        headers: {
          Authorization: `public`,
          'Content-Type': 'application/json',
        },
      })
      .then(async (response) => {
        const res = await response.data;
        dispatch(userSearchInfo(res));
      })
      .catch((err) => {});
  } catch (error) {
    notification.error({
      message: error.message,
    });
  }
}

export async function insertFeedback(feedbackData) {
  const { user, authDetails } = feedbackData;
  const { userId, userName } = authDetails;

  const data = {
    feedback: feedbackData?.feedback,
    category: feedbackData?.category,
    organization: feedbackData?.customerId,
    userName: userName,
    userId: userId,
    organizationId: feedbackData.organizationId,
    source: feedbackData.source,
    tags: feedbackData?.tags,
    date: new Date().toISOString(),
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
          .post(`${getServerURL()}/feedback-insert-web`, data, {
            headers: headers,
          })
          .then(async (response) => {
            const responseData = JSON.parse(response.data);
            if (response?.status === 200) {
              const algoliaData = {
                ...responseData,
                objectID: responseData?._id,
              };
              if (algoliaData.hasOwnProperty('sourceData')) {
                delete algoliaData.sourceData;
              }

              await axios
                .post(
                  `${process.env.AI_API_BASE_URL}/insert_data `,
                  {
                    organization_id: data.organizationId,
                    source: 'web',
                    mongo_id: responseData?._id.toString(),
                  },
                  {
                    headers: {
                      'Content-type': 'application/json',
                    },
                  }
                )
                .then((response) => {
                  console.log('Final Step', document);
                })
                .catch((error) => {
                  console.error('Error sending message:', error);
                });

              await axios
                .post(`${getServerURL()}/insert-data-in-algolia`, algoliaData, {
                  headers: headers,
                })
                .then((response) => {
                  const res = JSON.parse(response.data);
                  if (res.success) {
                    notification.success({
                      message: 'Feedback submitted successfully',
                    });
                    return { success: true };
                  }
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
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
export async function deleteFeedback(feedbackData) {
  const { orgId, feedbackId, user } = feedbackData;

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
            .get(`${getServerURL()}/delete-feedback?orgId=${orgId}&feedbackId=${feedbackId}`, {
              headers,
            })
            .then(async (response) => {
              const res = JSON.parse(response.data);
              if (res.success) {
                notification.success({
                  message: 'Feedback deleted successfully',
                });
                return { success: true };
              }
            })
            .catch((err) => console.log(err));
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
