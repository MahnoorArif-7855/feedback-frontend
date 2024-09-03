import { firebaseAuth } from '@/../firebase';
import { SettingStyled } from '@/common/styles/settingStyled';
import OrgainzationChannelList from '@/common/ui/ChannelList';
import Loader from '@/common/ui/Spinner';
import { ADMIN_EMAIL, RESET_DATA, RESET_DATA_TEXT, SLACK_CHANNEL_ERROR_MESSAGE } from '@/common/utils/constant';
import { UPDATE_ORGANIZATION, UPDATE_ORGANIZATION_CHANNEL_ID } from '@/state/graphQL/Mutation';
import { GET_ORGANIZATIONS } from '@/state/graphQL/Queries';
import { resetOrgData } from '@/state/redux/settings/settingSlice';
import { sendSlackMessageSlice } from '@/state/redux/userProfile/userProfileSlice';
import {
  organizationDetails as orgDetails,
  selectedOrganizationDetails,
} from '@/state/redux/userProfile/userProfileSlice';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Alert, Button, Card, Col, Modal, Switch, Typography, notification } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import React from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

const { confirm } = Modal;

const { Text } = Typography;

export const SlackNotifications = () => {
  const [user] = useAuthState(firebaseAuth);
  const { authDetails, selectedOrganizationId, organizationInfo, selectedOrganizationInfo } = useSelector(
    (state) => state.auth
  );
  const { feedbacksDetailInfo, deletedUser } = useSelector((state) => state.settings);

  const { organizationId } = authDetails || {
    organizationId: null,
  };

  const [isDataDeleting, setIsDataDeleting] = useState(false);
  const [isChannelIdSaving, setIsChannelIdSaving] = useState(false);
  const [isMessageSending, setIsMessageSending] = useState(false);

  const dispatch = useDispatch();

  const [updateOrganizationChannelId] = useMutation(UPDATE_ORGANIZATION_CHANNEL_ID, {
    onCompleted: (data) => {
      if (selectedOrganizationId) {
        dispatch(selectedOrganizationDetails(data?.updateOrganizationChannelId[0]));
      } else {
        dispatch(orgDetails(data?.updateOrganizationChannelId[0]));
      }

      notification.success({
        message: 'Organization channel updated',
        type: 'success',
      });
      setIsChannelIdSaving(false);
      console.log('Successfully updated organization:', data);
    },
    onError: (error) => {
      if (error.message === SLACK_CHANNEL_ERROR_MESSAGE.MISSING_SCOPE) {
        notification.error({
          message: 'Please upgrade your Slack app',
          type: 'error',
        });
      } else {
        notification.error({
          message: 'Error updating organization channel',
          type: 'error',
        });
      }
      setIsChannelIdSaving(false);
      console.error('Error updating organization:', error);
    },
  });

  const handleSaveChannelId = useCallback(
    ({ newSelectedChannel, newSelectedChannelName }) => {
      if (newSelectedChannel && newSelectedChannelName) {
        setIsChannelIdSaving(true);
        updateOrganizationChannelId({
          variables: {
            organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
            channelId: newSelectedChannel,
            channelName: newSelectedChannelName,
          },
        });
      }
    },
    [organizationId, selectedOrganizationId, updateOrganizationChannelId]
  );

  const handleSendSlackMessage = useCallback(async () => {
    if (user) {
      setIsMessageSending(true);
      await dispatch(
        sendSlackMessageSlice({
          user,
          organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
        })
      );
      setIsMessageSending(false);
    }
  }, [dispatch, user, selectedOrganizationId, organizationId]);

  return (
    <>
      {isDataDeleting ? (
        <Loader />
      ) : (
        <>
          <Col lg={24}>
            <Card
              key='org-channels'
              title='Weekly Digest Channel'
              style={{
                marginBottom: '2em',
              }}
            >
              <OrgainzationChannelList
                selectedChannel={
                  selectedOrganizationId
                    ? selectedOrganizationInfo?.automatic_update_channel_Id
                    : organizationInfo?.automatic_update_channel_Id
                }
                selectedChannelName={
                  selectedOrganizationId
                    ? selectedOrganizationInfo?.automatic_update_channel_name
                    : organizationInfo?.automatic_update_channel_name
                }
                handleSaveChannelId={handleSaveChannelId}
                organizationId={selectedOrganizationId ? selectedOrganizationId : organizationId}
                user={user}
              />
            </Card>
          </Col>

          <Col sm={24} lg={24}>
            <Card title='Send a Test Message'>
              {!(selectedOrganizationId
                ? selectedOrganizationInfo?.automatic_update_channel_Id
                : organizationInfo?.automatic_update_channel_Id) && (
                <Alert
                  message='Please add automatic channel id to send message'
                  type='warning'
                  showIcon
                  style={{
                    marginBottom: '0.9em',
                  }}
                />
              )}
              {feedbacksDetailInfo?.length < 5 && (
                <Alert
                  message='Please add at least 5 feedbacks to send message'
                  type='warning'
                  showIcon
                  style={{
                    marginBottom: '2em',
                  }}
                />
              )}
              <Button
                loading={isMessageSending}
                onClick={handleSendSlackMessage}
                disabled={!organizationInfo?.automatic_update_channel_Id || feedbacksDetailInfo?.length < 5}
              >
                Send message
              </Button>
            </Card>
          </Col>
        </>
      )}
    </>
  );
};
