import { ContentWrapper, PageLayout } from '@/common/components/DashboardV2Layout';
import { PlanDetailsStyled } from '@/common/styles/searchCountPlanStyled';
import { searchLimitUpdateSlice, searchLimitsSlice } from '@/state/redux/userProfile/userProfileSlice';
import { Button, Card, Col, Form, InputNumber, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseAuth } from '../../../../firebase';

const { Text } = Typography;

const SearchCount = () => {
  const { searchLimitCounts } = useSelector((state) => state.auth);

  const [user] = useAuthState(firebaseAuth);

  const dispatch = useDispatch();

  const { pricing } = searchLimitCounts || { pricing: null };

  const { freePlanWordsCount, premiumPlanWordsCount } = pricing || {
    freePlanWordsCount: null,
    premiumPlanWordsCount: null,
  };

  const [form0] = Form.useForm();
  const [form1] = Form.useForm();

  const onFinish = (values) => {
    const { freeSearchCount, premiumSearchCount } = values;
    const searchCount = premiumSearchCount === undefined ? freeSearchCount : premiumSearchCount;

    const searchType = premiumSearchCount === undefined ? 'free' : 'premium';
    dispatch(searchLimitUpdateSlice({ searchCount, searchType, user }));
    user && dispatch(searchLimitsSlice({ user }));
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <PageLayout title='Plan'>
      <ContentWrapper>
        <PlanDetailsStyled>
          <div className='site-card-wrapper'>
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card title='Free'>
                  <Form
                    form={form0}
                    name='free'
                    initialValues={{
                      remember: true,
                      searchCount: freePlanWordsCount,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                  >
                    <Form.Item label='Total Searches' name='freePlanWordsCount'>
                      <Text>{freePlanWordsCount}</Text>
                    </Form.Item>
                    <Form.Item label='Search Limit' name='freeSearchCount'>
                      <InputNumber placeholder={freePlanWordsCount} />
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        offset: 21,
                        span: 20,
                      }}
                    >
                      <Button type='primary' htmlType='submit'>
                        Save
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card title='Premium'>
                  <Form
                    name='premium'
                    form={form1}
                    initialValues={{
                      searchCount: premiumPlanWordsCount,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                  >
                    <Form.Item label='Total Searches' name='premiumSearchCount'>
                      <Text>{premiumPlanWordsCount}</Text>
                    </Form.Item>
                    <Form.Item label='Search Limit' name='premiumSearchCount'>
                      <InputNumber placeholder={premiumPlanWordsCount} />
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        offset: 21,
                        span: 20,
                      }}
                    >
                      <Button type='primary' htmlType='submit'>
                        Save
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </Row>
          </div>
        </PlanDetailsStyled>
      </ContentWrapper>
    </PageLayout>
  );
};

export default SearchCount;
