'use client';

import zendeskSubDomainImage from '@/../public/images/zendesk-guides/Subdomain.png';
import ZendeskPayloadImage from '@/../public/images/zendesk-guides/ZendeskPayload.png';
import zendeskActionsImage from '@/../public/images/zendesk-guides/actions.png';
import zendeskConditionImage from '@/../public/images/zendesk-guides/conditions.png';
import zendeskMeetAnyImage from '@/../public/images/zendesk-guides/meetAny.png';
import zendeskTriggerImage from '@/../public/images/zendesk-guides/trigger.png';
import { generateUUID } from '@/common/utils/func';
import Link from '@/common/utils/link';
import { FIND_ORGANIZATION } from '@/state/graphQL/Mutation';
import {
  zendeskButtonReducer,
  zendeskSaveDomainSlice,
  zendeskSaveSecretKeySlice,
  zendeskSecretKeyReducer,
  zendeskURLGeneratorReducer,
} from '@/state/redux/integration/integrationSlice';
import { organizationDetails as setOrgDetails } from '@/state/redux/userProfile/userProfileSlice';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Button, Collapse, Divider, Form, Input, Space, Timeline, Typography } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseAuth } from '../../../../firebase';
import { ZendeskWeebhookStyled } from './styled';

const { Panel } = Collapse;

const { Text, Paragraph, Title } = Typography;

const ZendeskWebhookCard = () => {
  const [user] = useAuthState(firebaseAuth);
  const { authDetails, organizationInfo, selectedOrganizationId, allUsers } = useSelector((state) => state.auth);
  const { zendeskButtonVisible, zendeskSecretKey, zendeskURL } = useSelector((state) => state.integration);
  const { organizationId } = authDetails || { organizationId: null };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [zendeskSecretLoading, setZendeskSecretLoading] = useState(false);
  const [zendeskDomainLoading, setZendeskDomainLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [collapseVisible, setCollapseVisible] = useState(false);
  const [zendeskDomain, setZendeskDomain] = useState('');
  const [zendeskEmailState, setZendeskEmailState] = useState(null);
  const [zendeskAPITokenState, setZendeskAPITokenState] = useState(null);
  const [form] = Form.useForm();

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const handleCollapseToggle = () => {
    setCollapseVisible(!collapseVisible); // Toggle the collapse visibility
  };
  const handleCollapseOnText = () => {
    setCollapseVisible(true); // Toggle the collapse visibility
  };

  const selectedOrg = allUsers.find(({ _id }) => _id === selectedOrganizationId);
  const { zendeskSecretKey: selectedOrgZendeskSecretKey } = selectedOrg || {
    selectedOrgZendeskSecretKey: null,
  };
  const zendeskSecretKeyValue = selectedOrg ? selectedOrgZendeskSecretKey : zendeskSecretKey;
  const [findOrganizationInfo] = useMutation(FIND_ORGANIZATION, {
    onCompleted: (data) => {
      dispatch(setOrgDetails(data?.findOrganizationInfo[0]));
    },
    onError: (error) => {
      console.error('Error during mutation:', error);
    },
  });

  useEffect(() => {
    if (zendeskDomainLoading === false) {
      findOrganizationInfo({
        variables: {
          organizationId: organizationId,
        },
      });
    }
  }, [zendeskDomainLoading]);

  useEffect(() => {
    const selectedOrg = allUsers.find(({ _id }) => _id === selectedOrganizationId);
    const {
      zendeskSecretKey: selectedOrgZendeskSecretKey,
      zendeskSubDomain: selectedOrgZendeskSubDomain,
      zendeskEmail: selectedOrgZendeskEmail,
      zendeskAPIToken: selectedOrgZendeskAPIToken,
    } = selectedOrg || {
      selectedOrgZendeskSubDomain: null,
      selectedOrgZendeskEmail: null,
      selectedOrgZendeskAPIToken: null,
    };
    const { zendeskSecretKey, zendeskSubDomain, zendeskEmail, zendeskAPIToken } = organizationInfo || {
      zendeskSecretKey: null,
      zendeskSubDomain: null,
    };
    const zendeskKeyValue = selectedOrganizationId ? selectedOrgZendeskSecretKey : zendeskSecretKey;
    if (zendeskKeyValue) {
      dispatch(
        zendeskURLGeneratorReducer(
          `${process.env.ZENDESK_WEBHOOK_URL}/${selectedOrganizationId ? selectedOrganizationId : organizationId}`
        )
      );
      dispatch(zendeskSecretKeyReducer(zendeskSecretKey));
      dispatch(zendeskButtonReducer(false));
    } else {
      dispatch(zendeskURLGeneratorReducer(null));
      dispatch(zendeskSecretKeyReducer(null));
      dispatch(zendeskButtonReducer(true));
    }
    const zendeskDomainValue = selectedOrg ? selectedOrgZendeskSubDomain : zendeskSubDomain;
    const zendeskEmailValue = selectedOrg ? selectedOrgZendeskEmail : zendeskEmail;
    const zendeskAPITokenValue = selectedOrg ? selectedOrgZendeskAPIToken : zendeskAPIToken;

    if (zendeskDomainValue) {
      setZendeskDomain(zendeskDomainValue);
    }
    if (zendeskEmailValue) {
      setZendeskEmailState(zendeskEmailValue);
    }
    if (zendeskAPITokenValue) {
      setZendeskAPITokenState(zendeskAPITokenValue);
    }
    form.setFieldsValue({
      domain: zendeskDomainValue,
      email: zendeskEmailValue,
      APIToken: zendeskAPITokenValue,
    });
  }, [organizationInfo, selectedOrganizationId]);

  const generateKey = () => {
    const secretKey = generateUUID();
    dispatch(
      zendeskSaveSecretKeySlice({
        user,
        secretKey,
        organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
      })
    );
    dispatch(zendeskSecretKeyReducer(secretKey));
    setVisible(false);
  };

  const generateWebhookZendesk = () => {
    setLoading(true);
    dispatch(zendeskURLGeneratorReducer());
    dispatch(zendeskSecretKeyReducer(null));
    setTimeout(() => {
      setLoading(false);
      dispatch(
        zendeskURLGeneratorReducer(
          `${process.env.ZENDESK_WEBHOOK_URL}/${selectedOrganizationId ? selectedOrganizationId : organizationId}`
        )
      );
      generateKey();
      dispatch(zendeskButtonReducer(false));
    }, 2000); // 2-second delay
  };

  const generateSecretzendeskKey = () => {
    setZendeskSecretLoading(true);
    dispatch(zendeskSecretKeyReducer(null));
    setTimeout(() => {
      setZendeskSecretLoading(false);
      generateKey();
    }, 2000); // 2-second delay
  };

  const onFinish = (values) => {
    setZendeskDomainLoading(true);
    dispatch(
      zendeskSaveDomainSlice({
        user,
        zendeskInfo: values,
        organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
        setZendeskDomainLoading,
      })
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const testURL = `${zendeskDomain}.zendesk.com/api/v2/tickets/123455678.json`;

  return (
    <ZendeskWeebhookStyled>
      <Title level={5}>
        {`Sync Zendesk tickets automatically when there is a change in the ticket's status or new tickets created.`}{' '}
        <br />
        Please follow the instructions inorder to implement Zendesk Webhooks and Automtic Triggers.
      </Title>

      <Collapse style={{ marginBottom: '10px' }} activeKey={collapseVisible ? '1' : ''} onChange={handleCollapseToggle}>
        {
          <Panel header='Guide: How to Integrate a Webhook in Zendesk' key='1'>
            {(!zendeskDomain || !zendeskEmailState || !zendeskAPITokenState) && (
              <>
                <Title level={5}>
                  In order to integrate webhook in Zendesk, first need to save your zendesk domain in the input field
                  down below
                </Title>
                <Title level={5}>Where can I find my Zendesk subdomain?</Title>

                <Paragraph>
                  Your subdomain is a unique identifier of your Zendesk account, which appears before{' '}
                  <code>.zendesk.com</code> in your account URL. There are a few ways to find it:
                </Paragraph>
                <Paragraph>
                  <strong>Support Admin home page</strong>
                  <br />
                  You can find the subdomain of your account on the Support Admin home page.
                  <br />
                  <Image
                    className='image'
                    alt='subdomain-image'
                    src={zendeskSubDomainImage}
                    style={{ margin: '10px 0' }}
                  />
                </Paragraph>
                <Paragraph>
                  <strong>Check your URL</strong>
                  <br />
                  If you didn&apos;t enable the host-mapping feature in Zendesk, your subdomain is in your account URL,
                  after <code>https://</code> and before <code>.zendesk.com</code>. For example, in this URL:{' '}
                  <code>https://yoursubdomain.zendesk.com</code>, the subdomain is{' '}
                  <strong>
                    <code>yoursubdomain</code>
                  </strong>
                  .
                </Paragraph>
                <br />
                <Text className='point-text' type='danger' strong>
                  <Link
                    target='_blank'
                    href='https://support.zendesk.com/hc/en-us/articles/4409381383578-Where-can-I-find-my-Zendesk-subdomain'
                  >
                    Refrence
                  </Link>
                </Text>
              </>
            )}
            {zendeskDomain && (
              <>
                <Title level={3}>Adding FeedbackSync Webhook to interact with Zendesk systems.</Title>
                <Title level={5}>
                  Quick Look: Admin Center {'>'} Apps and integrations {'>'} Webhooks {'>'} Webhooks
                </Title>
                <Text className='point-text' type='danger' strong>
                  <Link
                    target='_blank'
                    href={`https://${zendeskDomain}.zendesk.com/admin/apps-integrations/webhooks/webhooks`}
                  >
                    {`https://${zendeskDomain}.zendesk.com/admin/apps-integrations/webhooks/webhooks`}
                  </Link>
                </Text>
                <br />
                <br />
                <Title level={5}>
                  {`For example, you can configure a webhook to send requests when there is a change in ticket's status  or a new ticket is created.`}
                </Title>
                <Title level={5}>
                  {`Let's try to direct the user to specifically capturing the Zendesk threads in the same way we do with
                  historical feedback.`}
                </Title>
                <Title level={3}>Creating a webhook in Zendesk</Title>
                <br />

                <Timeline
                  items={[
                    {
                      children: (
                        <Text>
                          In Admin Center, click Apps and integrations in the sidebar, then select <code>Webhooks</code>{' '}
                          {'>'}
                          <code>Webhooks</code>.
                        </Text>
                      ),
                    },
                    {
                      children: (
                        <div>
                          <Text strong>Click Create webhook.</Text>
                          <br />
                          <Text style={{ marginLeft: 20 }}>
                            • To connect the webhook to a trigger or automation, select{' '}
                            <Text strong>Trigger or Automation. </Text>
                          </Text>
                        </div>
                      ),
                    },

                    {
                      children: 'Click Next.',
                    },
                    {
                      children: (
                        <Text>
                          Enter a Name: <br />
                          <Text strong> FeedbackSync Webhook </Text>
                        </Text>
                      ),
                    },
                    {
                      children: (
                        <Text>
                          Enter a Description: <br />
                          <Text strong> Sync automatic tickets to FeedbackSync systems </Text>
                        </Text>
                      ),
                    },
                    {
                      children: (
                        <Text>
                          Enter the Endpoint URL : <Paragraph copyable>{zendeskURL}</Paragraph>
                        </Text>
                      ),
                    },
                    {
                      children: (
                        <Text>
                          Select <Text strong> POST</Text> in Request method
                        </Text>
                      ),
                    },

                    {
                      children: (
                        <Text>
                          Select <Text strong> JSON</Text> in Request format
                        </Text>
                      ),
                    },

                    {
                      children: (
                        <Text>
                          Select <Text strong> API Key</Text> in Authentication
                        </Text>
                      ),
                    },
                    {
                      children: (
                        <Text>
                          Add <code>zendesk-webhook-secret-key</code> in Header name
                        </Text>
                      ),
                    },
                    {
                      children: (
                        <Text>
                          Add <code>{zendeskSecretKeyValue}</code> in value
                        </Text>
                      ),
                    },
                    {
                      children: (
                        <Text>
                          Click<Text strong> Test Webhook</Text>
                        </Text>
                      ),
                    },
                    {
                      children: (
                        <Space align='start'>
                          <div>
                            <Title level={5} className='point-text'>
                              Change Payload
                            </Title>
                            <Image
                              className='image'
                              alt='subdomain-image'
                              src={ZendeskPayloadImage}
                              style={{ margin: '10px 0' }}
                            />
                          </div>

                          <div style={{ marginTop: '1rem' }}>
                            <Text className='point-text' strong>
                              Copy Paste this code to JSON block
                            </Text>
                            <pre
                              style={{
                                background: 'rgba(150, 150, 150, .1)',
                                border: '1px solid rgba(100, 100, 100, .2)',
                                borderRadius: '3px',
                              }}
                            >
                              {`{
  "id":123455678,
  "priority": "high",
  "status": "open",
  "subject": "Ticket Subject: Help, my printer is on fire!",
  "description": "Ticket Description: The fire is very colorful.",
  "comments":"Ticket Comment: We are resolving the issue ASAP.",
  "assign_name": "user",
  "url": "${testURL}",
  "due_date": "2024-05-28T16:18:23Z",
  "type": "task",
  "testWebhook":"true",
  "tags": [
      "enterprise",
      "other_tag"
  ]
}`}
                            </pre>
                            <br />
                          </div>
                        </Space>
                      ),
                    },
                    {
                      children: (
                        <>
                          <Title level={5} strong>
                            {` Click "Send test" Button`}
                          </Title>

                          <Text className='point-text' strong>
                            Expected Response
                          </Text>
                          <pre
                            style={{
                              background: 'rgba(150, 150, 150, .1)',
                              border: '1px solid rgba(100, 100, 100, .2)',
                              borderRadius: '3px',
                              width: '20%',
                            }}
                          >
                            {`{"status":"success"}`}
                          </pre>
                        </>
                      ),
                    },
                    {
                      children: (
                        <>
                          <Title level={5}>On the success status, Click on Create Webhook</Title>
                        </>
                      ),
                    },
                  ]}
                />

                <br />

                <br />
                <Title level={2}> Next Step is to create Triggers</Title>
                <Image className='image' alt='subdomain-image' src={zendeskTriggerImage} style={{ margin: '10px 0' }} />
                <Title level={2}> Creating triggers for automatic ticket updates and notifications</Title>

                <Title level={5}>
                  Quick Look: Admin Center {'>'} Objects and rules {'>'} Business rules {'>'} Triggers
                </Title>
                <Text className='point-text' type='danger' strong>
                  <Link
                    target='_blank'
                    href={`https://${zendeskDomain}.zendesk.com/admin/objects-rules/rules/triggers`}
                  >
                    {`https://${zendeskDomain}.zendesk.com/admin/objects-rules/rules/triggers`}
                  </Link>
                </Text>
                <br />
                <br />
                <Timeline
                  items={[
                    {
                      children: (
                        <Text>
                          Click<Text strong> Create trigger</Text>
                        </Text>
                      ),
                    },

                    {
                      children: (
                        <Text>
                          Enter a Trigger Name: <br />
                          <Text strong> FeedbackSync Ticket Trigger </Text>
                        </Text>
                      ),
                    },
                    {
                      children: (
                        <Text>
                          Enter a Description: <br />
                          <Text strong> FeedbackSync Triggers to check the new or any change in the tickets </Text>
                        </Text>
                      ),
                    },
                    {
                      children: (
                        <Text>
                          Select
                          <Text strong> Notification </Text> in Category
                        </Text>
                      ),
                    },

                    {
                      children: (
                        <div>
                          <Text strong>Conditions</Text>
                          <br />
                          <Text>Select the Meet ALL </Text>
                          <Image
                            className='image'
                            alt='subdomain-image'
                            src={zendeskConditionImage}
                            style={{ margin: '10px 0' }}
                          />
                        </div>
                      ),
                    },
                    {
                      children: (
                        <div>
                          <Text> Select the following Meet Any</Text>
                          <Image
                            className='image'
                            alt='subdomain-image'
                            src={zendeskMeetAnyImage}
                            style={{ margin: '10px 0' }}
                          />
                        </div>
                      ),
                    },
                    {
                      children: (
                        <Space align='start'>
                          <div>
                            <Text> Select the following Actions </Text>
                            <Image
                              className='image'
                              alt='subdomain-image'
                              src={zendeskActionsImage}
                              style={{ margin: '10px 0' }}
                            />
                          </div>
                        </Space>
                      ),
                    },

                    {
                      children: (
                        <div style={{ marginTop: '1rem' }}>
                          <Text className='point-text' strong>
                            Copy Paste this code to JSON body
                          </Text>
                          <pre
                            style={{
                              background: 'rgba(150, 150, 150, .1)',
                              border: '1px solid rgba(100, 100, 100, .2)',
                              borderRadius: '3px',
                            }}
                          >
                            {` {
  "status": "{{ticket.status}}",
  "comments": "{{ticket.latest_comment_html}}",
  "title": "{{ticket.title}}",
  "url": "{{ticket.url}}",
  "current_comment": "{{satisfaction.current_comment}}",
  "assign_name": "{{ticket.assignee.name}}",
  "description": "{{ticket.description}}",
  "due_date": "{{ticket.due_date}}",
  "ticket_id": "{{ticket.id}}",
  "priority": "{{ticket.priority}}",
  "requester_name": "{{ticket.requester.first_name}}",
  "tags": "{{ticket.tags}}",
  "type": "{{ticket.ticket_type}}"
}`}
                          </pre>
                        </div>
                      ),
                    },
                    {
                      children: (
                        <Text>
                          Click
                          <Text strong> Create </Text> Button
                        </Text>
                      ),
                    },
                  ]}
                />
              </>
            )}
          </Panel>
        }
      </Collapse>

      {zendeskButtonVisible && (
        <Button
          onClick={() => generateWebhookZendesk()}
          loading={loading}
          type='primary'
          htmlType='submit'
          size='large'
        >
          Generate Zendesk webhook
        </Button>
      )}
      {zendeskButtonVisible && <Divider />}
      {zendeskURL && (
        <Paragraph
          copyable={{
            text: zendeskURL,
          }}
          className='zendesk-url-text'
        >
          <Text strong>Zendesk Webhook URL:</Text>
          {` ${zendeskURL}`}
        </Paragraph>
      )}
      <div className='save-zendesk-domain'>
        <Space direction='horizontal'>
          {zendeskSecretKeyValue && (
            <Paragraph
              copyable={{
                text: zendeskSecretKeyValue,
              }}
              className='zendesk-url-text'
            >
              <span style={{ flex: 1 }}>
                <Text strong>Zendesk Secret Key : </Text>
                {visible ? zendeskSecretKeyValue : '•'.repeat(zendeskSecretKeyValue.length)}
              </span>

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

          {zendeskURL && (
            <Button
              onClick={() => generateSecretzendeskKey()}
              disabled={selectedOrganizationId ? true : false}
              loading={zendeskSecretLoading}
              htmlType='submit'
            >
              {zendeskSecretKeyValue ? 'Regenerate Secret Key' : 'Generate secret key'}
            </Button>
          )}
        </Space>
      </div>
      <div className='save-zendesk-domain'>
        <Form
          form={form}
          name='zendesk-info'
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
            label='Zendesk Domain :'
            name='domain'
            rules={[
              {
                required: true,
                message: 'Please enter your Zendesk domain!',
              },
            ]}
          >
            <Input className='domain-input' size='small' placeholder='Enter your Zendesk domain' />
          </Form.Item>
          <Form.Item
            label='Zendesk E-mail :'
            name='email'
            rules={[
              {
                required: true,
                message: 'Please enter your Zendesk Email!',
              },
            ]}
          >
            <Input className='domain-input' size='small' placeholder='Enter your E-mail' />
          </Form.Item>
          <Form.Item
            label='Zendesk API Token :'
            name='APIToken'
            rules={[
              {
                required: true,
                message: 'Please enter your Zendesk API Token!',
              },
            ]}
          >
            <Input className='domain-input' size='small' placeholder='Enter your Zendesk API token' />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={selectedOrganizationId ? true : false}
              loading={zendeskDomainLoading}
              type='primary'
              htmlType='submit'
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      {!zendeskDomain && (
        <Text strong onClick={handleCollapseOnText} type='link' style={{ cursor: 'pointer' }}>
          Where can I find my Zendesk subdomain?
        </Text>
      )}
    </ZendeskWeebhookStyled>
  );
};

export default ZendeskWebhookCard;
