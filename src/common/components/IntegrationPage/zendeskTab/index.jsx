import zendeskSubDomainImage from '@/../public/images/zendesk-guides/Subdomain.png';
import IntegartionStyled from '@/common/styles/integartionStyled';
import DateDropDown from '@/common/ui/DropDowns/dateDropdown';
import ZendeskWebhookCard from '@/common/ui/ZendeskWebhook';
import { ZENDESK_TABS } from '@/common/utils/constant';
import { FIND_FEEDBACKS_BY_ORGANIZATION_ID } from '@/state/graphQL/Mutation';
import { zendeskSlice } from '@/state/redux/integration/integrationSlice';
import { feedbacksDetail } from '@/state/redux/settings/settingSlice';
import { selectOrganizationId } from '@/state/redux/userProfile/userProfileSlice';
import { useMutation } from '@apollo/client';
import { Button, Card, Collapse, Form, Input, Radio, Typography } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseAuth } from '../../../../../firebase';

const { Text, Title, Paragraph, Link } = Typography;
const { Panel } = Collapse;

const ZendeskTab = ({ userId, organizationId }) => {
  const [user] = useAuthState(firebaseAuth);
  const dispatch = useDispatch();
  const [mode, setMode] = useState(ZENDESK_TABS.TICKET);
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const [loading, setLoading] = useState(false);

  const dateFormat = 'YYYY-MM-DD';
  const currentDateTo = dayjs().format(dateFormat);
  const currentDateFrom = dayjs().subtract(7, 'd').format(dateFormat);

  const [dateFilter, setDateFilterData] = useState([currentDateFrom, currentDateTo]);

  const [findFeedbackByOrganizationId] = useMutation(FIND_FEEDBACKS_BY_ORGANIZATION_ID, {
    onCompleted: (data) => {
      dispatch(feedbacksDetail(data?.feedbacksByOrganizationId));
    },
    onError: (error) => {
      console.error('Error occured fetching feedbacks by org id:', error);
    },
  });

  const onFinish = async (values) => {
    setLoading(true);
    const { token, email, domain } = values;

    const stringToEncode = `${email}/token:${token}`;
    const base64EncodedString = btoa(stringToEncode);
    if (process.env.NODE_ENV !== 'development') {
      window.pendo.track('zendesk_integration', {
        user_id: userId,
        email: email,
        organization_id: organizationId,
      });
    }
    const data = {
      apiToken: token,
      email,
      zendeskSubDomain: domain,
      authToken: base64EncodedString,
      userId,
      organizationId,
      from: dateFilter[0],
      to: dateFilter[1],
    };
    await dispatch(zendeskSlice({ data, user }));
    await setLoading(false);
    await dispatch(selectOrganizationId(null));
    findFeedbackByOrganizationId({
      variables: { organizationId: organizationId },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Radio.Group
        buttonStyle='solid'
        onChange={handleModeChange}
        value={mode}
        style={{
          marginBottom: 8,
          marginTop: 10,
          display: 'flex',
          justifyContent: 'start',
        }}
      >
        <Radio.Button value={ZENDESK_TABS.TICKET}>Import Last 30 Days Tickets</Radio.Button>
        <Radio.Button value={ZENDESK_TABS.WEBHOOK}>Sync Tickets Automatically</Radio.Button>
      </Radio.Group>

      <br />
      {mode === ZENDESK_TABS.TICKET && (
        <IntegartionStyled>
          <Card>
            <Title level={5}>Import 30 Days tickets. </Title>
            <Collapse style={{ marginTop: '10px', marginBottom: '20px' }}>
              <Panel header='Where can I find my Zendesk subdomain?' key='1'>
                <>
                  <Title level={3}>Where can I find my Zendesk subdomain?</Title>

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
                    If you didn&apos;t enable the host-mapping feature in Zendesk, your subdomain is in your account
                    URL, after <code>https://</code> and before <code>.zendesk.com</code>. .
                  </Paragraph>
                  <Paragraph>
                    For example, in this URL: <code>https://yoursubdomain.zendesk.com</code>, the subdomain is{' '}
                    <strong>
                      <code>yoursubdomain</code>
                    </strong>
                  </Paragraph>
                  <br />
                  <Text className='point-text' type='danger' strong>
                    <Link
                      target='_blank'
                      href='https://support.zendesk.com/hc/en-us/articles/4409381383578-Where-can-I-find-my-Zendesk-subdomain'
                    >
                      Reference Zendesk Link
                    </Link>
                  </Text>
                </>
              </Panel>
            </Collapse>
            <Form
              name='zendesk-form'
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout={'vertical'}
              className='zendesk-form'
            >
              <Title level={5} strong>
                Date
              </Title>
              <DateDropDown
                dateFormat={dateFormat}
                currentDateFrom={currentDateFrom}
                currentDateTo={currentDateTo}
                setDateFilterData={setDateFilterData}
                oneMonth={true}
              />
              <Form.Item
                label='E-mail'
                name='email'
                rules={[
                  { required: true, message: 'Please Enter your E-mail!' },
                  {
                    type: 'email',
                    message: 'Please Enter Valid Email',
                  },
                ]}
              >
                <Input placeholder='Enter your Email' />
              </Form.Item>

              <Form.Item
                label={'Zendesk SubDomain'}
                name='domain'
                rules={[
                  {
                    required: true,
                    message: 'Please input your zendesk subdomain',
                  },
                ]}
              >
                <Input placeholder='Enter your Zendesk Sub-Domain' />
              </Form.Item>
              <Form.Item
                label={'Zendesk API Token'}
                name='token'
                rules={[{ required: true, message: 'Please input your Zendesk Token!' }]}
              >
                <Input placeholder='Enter your Token' />
              </Form.Item>

              <Form.Item className='integartion-button'>
                <Button loading={loading} type='primary' htmlType='submit' size='large'>
                  Import
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </IntegartionStyled>
      )}
      {mode === ZENDESK_TABS.WEBHOOK && <ZendeskWebhookCard />}
    </>
  );
};

export default ZendeskTab;
