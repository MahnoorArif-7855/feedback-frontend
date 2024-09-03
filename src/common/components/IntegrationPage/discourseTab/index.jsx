import { DiscourseWebhookStyled } from '@/common/styles/DiscourseTabStyled';
import { generateUUID } from '@/common/utils/func';
import {
  discourseButtonReducer,
  discourseSecretKeyReducer,
  discourseSecretSlice,
  discourseURLGeneratorReducer,
} from '@/state/redux/integration/integrationSlice';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, Collapse, Divider, Timeline, Typography } from 'antd';
import React, { use, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseAuth } from '../../../../../firebase';

const { Text, Title, Paragraph, Link } = Typography;
const { Panel } = Collapse;

const DiscourseTab = () => {
  const [user] = useAuthState(firebaseAuth);
  const { authDetails, selectedOrganizationId, allUsers } = useSelector((state) => state.auth);
  const { discourseButtonVisible, discourseSecretKey, DiscourseURL } = useSelector((state) => state.integration);
  const { organizationId, organizationDetails } = authDetails || {
    organizationId: null,
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [discourseSecretLoading, setDiscourseSecretLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    const selectedOrg = allUsers.find(({ _id }) => _id === selectedOrganizationId);
    const { discourseSecretKey: selectedOrgDiscourseSecretKey } = selectedOrg || {};
    const organizationInfo = organizationDetails[0];
    const { discourseSecretKey } = organizationInfo || { discourseSecretKey: null };
    const discourseKeyValue = selectedOrganizationId ? selectedOrgDiscourseSecretKey : discourseSecretKey;
    if (discourseKeyValue) {
      dispatch(
        discourseURLGeneratorReducer(
          `${process.env.DISCOURSE_WEBHOOK_URL}/${selectedOrganizationId ? selectedOrganizationId : organizationId}`
        )
      );
      dispatch(discourseSecretKeyReducer(discourseKeyValue));
      dispatch(discourseButtonReducer(false));
    } else {
      dispatch(discourseURLGeneratorReducer(null));
      dispatch(discourseSecretKeyReducer(null));
      dispatch(discourseButtonReducer(true));
    }
  }, [organizationDetails, selectedOrganizationId]);

  const generateKey = () => {
    const secretKey = generateUUID();
    dispatch(
      discourseSecretSlice({
        user,
        secretKey,
        organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
      })
    );
    dispatch(discourseSecretKeyReducer(secretKey));

    setVisible(false);
  };

  const generateWebhookDiscourse = () => {
    setLoading(true);
    dispatch(discourseURLGeneratorReducer());
    dispatch(discourseSecretKeyReducer(null));
    setTimeout(() => {
      setLoading(false);
      dispatch(
        discourseURLGeneratorReducer(
          `${process.env.DISCOURSE_WEBHOOK_URL}/${selectedOrganizationId ? selectedOrganizationId : organizationId}`
        )
      );
      generateKey();
      dispatch(discourseButtonReducer(false));
    }, 2000); // 2-second delay
  };
  const generateSecretDiscourseKey = () => {
    setDiscourseSecretLoading(true);
    dispatch(discourseSecretKeyReducer(null));
    setTimeout(() => {
      setDiscourseSecretLoading(false);
      generateKey();
    }, 2000); // 2-second delay
  };

  return (
    <DiscourseWebhookStyled>
      <Collapse style={{ marginTop: '10px' }}>
        {
          <Panel header='Guide: How to Integrate a Webhook in Discourse' key='1'>
            {
              <>
                <Title level={4}>Adding FeedbackSync Webhook to interact with Discourse systems.</Title>
                <Title level={5}>
                  Quick Look: Admin {'>'} Webhooks {'>'} Webhooks
                </Title>

                <Title level={5}>
                  A webhook sends an HTTP request to a specified URL in response to activity in Discourse Support. For
                  example, you can configure a webhook to send requests when a user is create topic or post in that
                  topic.
                </Title>
                <Title level={3}>Creating a webhook in Discourse</Title>
                <br />

                <Timeline
                  items={[
                    {
                      children: (
                        <Text>
                          In Admin, click <code>Webhooks</code> ,then select
                          <code>Webhooks</code>.
                        </Text>
                      ),
                    },
                    {
                      children: (
                        <Text>
                          Click <Text strong>+ New Webhook</Text>.
                        </Text>
                      ),
                    },

                    {
                      children: (
                        <Text>
                          Enter the Endpoint URL -{' '}
                          <Link target='_blank' href={DiscourseURL}>
                            {DiscourseURL}
                          </Link>
                        </Text>
                      ),
                    },
                    {
                      children: (
                        <Text>
                          Add <code>{discourseSecretKey || 'Discourse Key'}</code> in Secret key
                        </Text>
                      ),
                    },

                    {
                      children: (
                        <Text>
                          Check <Text strong>Topic is created</Text> Option in Topic Events
                        </Text>
                      ),
                    },
                    {
                      children: (
                        <Text>
                          Check <Text strong> Post is created </Text>in Post Events
                        </Text>
                      ),
                    },
                    {
                      children: (
                        <Text>
                          Check <Text strong> Active</Text>
                        </Text>
                      ),
                    },
                    {
                      children: (
                        <Text>
                          Click <Text strong> Create</Text>
                        </Text>
                      ),
                    },
                  ]}
                />
              </>
            }
          </Panel>
        }
      </Collapse>
      {discourseButtonVisible && (
        <Button
          onClick={() => generateWebhookDiscourse()}
          loading={loading}
          type='primary'
          htmlType='submit'
          size='large'
        >
          Generate discourse webhook
        </Button>
      )}
      {discourseButtonVisible && <Divider />}
      {DiscourseURL && (
        <Paragraph
          copyable={{
            text: DiscourseURL,
          }}
          style={{ display: 'flex', alignItems: 'center', margin: 0 }}
        >
          <Text strong style={{ marginRight: 10 }}>
            Discourse Webhook URL:{' '}
          </Text>
          {` ${DiscourseURL}`}
        </Paragraph>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {discourseSecretKey && (
          <Paragraph
            copyable={{
              text: discourseSecretKey,
            }}
            style={{ display: 'flex', alignItems: 'center', margin: 0 }}
          >
            <span style={{ flex: 1 }}>
              <Text strong style={{ marginRight: 10 }}>
                Discourse Secret Key :{' '}
              </Text>
              {visible ? discourseSecretKey : '•'.repeat(discourseSecretKey.length)}
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

        {DiscourseURL && (
          <Button
            disabled={selectedOrganizationId ? true : false}
            onClick={() => generateSecretDiscourseKey()}
            loading={discourseSecretLoading}
            htmlType='submit'
          >
            {discourseSecretKey ? 'Regenerate Secret Key' : 'Generate secret key'}
          </Button>
        )}
      </div>
    </DiscourseWebhookStyled>
  );
};

export default DiscourseTab;
