'use client';

import { decrypt } from '@/common/utils/decrypt';
import { FIND_ORGANIZATION } from '@/state/graphQL/Mutation';
import {
  intercomButtonDisableReducer,
  intercomButtonReducer,
  intercomSlice,
  intercomURLGeneratorReducer,
} from '@/state/redux/integration/integrationSlice';
import { organizationDetails as setOrgDetails } from '@/state/redux/userProfile/userProfileSlice';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Button, Collapse, Form, Input, Space, Timeline, Typography } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseAuth } from '../../../../firebase';
import { IntercomWeebhookStyled } from './styled';

/* eslint-disable react-hooks/exhaustive-deps */
const { Panel } = Collapse;

const { Text, Paragraph, Title } = Typography;

const IntercomWebhookTab = () => {
  const [user] = useAuthState(firebaseAuth);
  const { authDetails, organizationInfo, selectedOrganizationId, allUsers } = useSelector((state) => state.auth);
  const { intercomURL, intercomLoader } = useSelector((state) => state.integration);
  const { organizationId } = authDetails || { organizationId: null };
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const [passwordDisabled, setPasswordDisabled] = useState(false);
  const [decryptedMessage, setDecryptedMessage] = useState('');

  const [form] = Form.useForm();

  const selectedOrg = allUsers.find(({ _id }) => _id === selectedOrganizationId);
  const { intercomAppId: selectedOrgintercomAppId, intercomAccessToken: selectedOrgintercomAccessToken } =
    selectedOrg || {
      selectedOrgintercomSubDomain: null,
      selectedOrgintercomAccessToken: null,
    };
  const { intercomAppId, intercomAccessToken } = organizationInfo || {
    intercomAppId: null,
    intercomAccessToken: null,
  };
  const intercomAppIdValue = selectedOrganizationId ? selectedOrgintercomAppId : intercomAppId;
  const intercomAccessTokenValue = selectedOrganizationId ? selectedOrgintercomAccessToken : intercomAccessToken;

  const [findOrganizationInfo] = useMutation(FIND_ORGANIZATION, {
    onCompleted: (data) => {
      dispatch(setOrgDetails(data?.findOrganizationInfo[0]));
    },
    onError: (error) => {
      console.error('Error during mutation:', error);
    },
  });

  useEffect(() => {
    if (intercomLoader === false) {
      findOrganizationInfo({
        variables: {
          organizationId: organizationId,
        },
      });
    }
  }, [intercomLoader]);

  useEffect(() => {
    if (intercomAppIdValue) {
      dispatch(
        intercomURLGeneratorReducer(
          `${process.env.INTERCOM_WEBHOOK_URL}/webhooks/intercom/${selectedOrganizationId ? selectedOrganizationId : organizationId}`
        )
      );
      dispatch(intercomButtonReducer(false));
    } else {
      dispatch(intercomURLGeneratorReducer(null));
      dispatch(intercomButtonReducer(true));
    }
    if (intercomAccessTokenValue) {
      const decrypted = decrypt(intercomAccessTokenValue);
      setDecryptedMessage(decrypted);
      setPasswordDisabled(false);
    }

    form.setFieldsValue({
      appId: intercomAppIdValue,
    });
  }, [intercomAccessTokenValue, intercomAppIdValue, organizationId, organizationInfo, selectedOrganizationId]);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const onFinish = async (values) => {
    const { appId, accessToken } = values;
    await dispatch(
      intercomSlice({
        user,
        appId,
        accessToken,
        organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
      })
    );
    await dispatch(intercomButtonDisableReducer(false));
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const displayToken = visible
    ? decryptedMessage
    : decryptedMessage
      ? decryptedMessage.slice(0, 7) + '•'.repeat(decryptedMessage.length - 7)
      : '';

  return (
    <IntercomWeebhookStyled>
      <Title level={5}>
        {`Sync intercom tickets automatically when there is a change in the ticket's status or new tickets created.`}{' '}
        <br />
        Please follow the instructions inorder to implement Intercom Webhooks and Automtic Triggers.
      </Title>

      <Collapse style={{ marginBottom: '10px' }}>
        {
          <Panel header='Guide: How to Integrate a Webhook in Intercom' key='1'>
            {(!intercomAppId || !intercomAccessToken) && (
              <>
                <Title level={5}>
                  In order to integrate webhook in Intercom, first need to save your App ID in the input field down
                  below
                </Title>
                <Title level={5}>Where can I find my App ID?</Title>

                <Paragraph>
                  Click on your profile picture or initials in the bottom left corner to open the menu, and then select
                  <code>Settings</code>.
                </Paragraph>
                <Paragraph>
                  In the settings menu, navigate to the <code>Workspace</code> section. Here, you&apos;ll find various
                  options for setting up Intercom on your website or app.
                  <br />
                </Paragraph>
                <Title level={5}>Where can I find my Access Token?</Title>

                <Paragraph>
                  <Text>
                    Click on your profile picture or initials in the bottom left corner to open the menu, and then
                    select <code>Settings</code> {'> '}
                    <code>Integration</code> {'> '}
                    <code>Developer Hub</code> {'> '}
                    <code>Your App</code> {'> '}
                    <code>Configure </code> {'> '}
                    <code>Authentication</code>.
                  </Text>
                  <br />
                </Paragraph>
                <Paragraph>
                  <strong>Check your URL</strong>
                  <br />
                  Sometimes, the App ID is included in the URL when you&apos;re logged into your Intercom dashboard.
                  Look for a string that looks like an App ID in the URL.
                </Paragraph>
              </>
            )}
            {intercomAppId && (
              <>
                <Title level={3}>Adding FeedbackSync Webhook to interact with Intercom systems.</Title>

                <Text className='point-text' type='danger' strong>
                  <Link
                    target='_blank'
                    href={`https://app.intercom.com/a/apps/${intercomAppId}/developer-hub/app-packages/118000/webhooks`}
                  >
                    {`https://app.intercom.com/a/apps/${intercomAppId}/developer-hub/app-packages/118000/webhooks`}
                  </Link>
                </Text>
                <br />
                <br />
                <Title level={5}>
                  {`For example, you can configure a webhook to send requests when there is a change in conversation's status  or a new conversation is created.`}
                </Title>

                <Title level={3}>Creating a webhook in Intercom</Title>
                <br />
                <Timeline
                  items={[
                    {
                      children: (
                        <Text>
                          Click on your profile picture or initials in the bottom left corner to open the menu, and then
                          select <code>Settings</code> {'> '}
                          <code>Integration</code> {'> '}
                          <code>Developer Hub</code> {'> '}
                          <code>Your App</code> {'> '}
                          <code>Webhooks</code>.
                        </Text>
                      ),
                    },

                    {
                      children: 'Click New Webhook.',
                    },
                    {
                      children: (
                        <Text>
                          Enter the Endpoint URL - <code>{intercomURL}</code> <br />
                        </Text>
                      ),
                    },
                    {
                      children: (
                        <Text>
                          Add Topics - <code>conversation.admin.replied</code>,<code>conversation.user.replied</code>,
                          <code>conversation.user.created</code>
                          <code>contact.user.created</code>.
                        </Text>
                      ),
                    },
                    {
                      children: <Text>Click Save</Text>,
                    },
                  ]}
                />
              </>
            )}
          </Panel>
        }
      </Collapse>

      {intercomURL && (
        <Paragraph
          copyable={{
            text: intercomURL,
          }}
          className='intercom-url-text'
        >
          <Text strong>Intercom Webhook URL:</Text>
          {` ${intercomURL}`}
        </Paragraph>
      )}

      <div className='save-intercom-domain'>
        <Form
          form={form}
          name='intercom-info'
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Intercom App Id :'
            name='appId'
            rules={[
              {
                required: true,
                message: 'Please enter your Intercom app Id!',
              },
            ]}
          >
            <Input className='app-id-input' size='small' placeholder='Enter your Intercom app Id' />
          </Form.Item>
          <Form.Item
            label='Intercom Access Token :'
            name='accessToken'
            rules={[
              {
                required: true,
                message: 'Please enter your Intercom Access Id!',
              },
            ]}
          >
            <Space direction='horizontal' className='access-token-space-container'>
              {(passwordDisabled || !intercomAccessTokenValue) && (
                <div className='access-token-container'>
                  <Input className='app-id-input' size='small' placeholder='Enter your Intercom access token' />
                  <Text>This is end-to-end encrypted</Text>
                </div>
              )}
              {!passwordDisabled && intercomAccessTokenValue && (
                <Space direction='horizontal'>
                  {intercomAccessTokenValue && (
                    <Paragraph
                      copyable={{
                        text: decryptedMessage,
                      }}
                      className='intercom-url-text'
                    >
                      <span style={{ flex: 1 }}>{displayToken}</span>

                      {visible ? (
                        <EyeInvisibleOutlined
                          onClick={toggleVisibility}
                          style={{ cursor: 'pointer', marginLeft: '5px', color: 'rgb(32 117 255)' }}
                        />
                      ) : (
                        <EyeOutlined
                          onClick={toggleVisibility}
                          style={{ cursor: 'pointer', marginLeft: '5px', color: 'rgb(32 117 255)' }}
                        />
                      )}
                    </Paragraph>
                  )}
                </Space>
              )}

              {intercomAccessTokenValue && (
                <Button
                  // style={{
                  //   width: "80%",
                  // }}
                  onClick={() => setPasswordDisabled((prevState) => !prevState)}
                >
                  {passwordDisabled ? 'Show token' : 'Edit'}
                </Button>
              )}
            </Space>
          </Form.Item>

          <Form.Item>
            <Button
              disabled={selectedOrganizationId ? true : false}
              loading={intercomLoader}
              type='primary'
              htmlType='submit'
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </IntercomWeebhookStyled>
  );
};

export default IntercomWebhookTab;
