import { ContentWrapper, PageLayout } from '@/common/components/DashboardV2Layout';
import ReferralFeedbackStyled from '@/common/styles/referralFeedbackStyled';
import { SOURCES } from '@/common/utils/constant';
import { capitalizeFirstLetter } from '@/common/utils/func';
import Link from '@/common/utils/link';
import { markdownify, slackMarkdownify } from '@/common/utils/markdownify';
import { searchModalSlice } from '@/state/redux/searchAI/searchSlice';
import { Card, Col, Divider, Empty, Input, Row, Tag, Typography } from 'antd';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import categoryOptions from '../../../common/utils/content/categoryOption.json';

const { Text, Title } = Typography;

const ReferralFeedback = () => {
  const { searchFeedback } = useSelector((state) => state.search);
  const monogodbIDParam = useSearchParams();

  const monogodbID = monogodbIDParam.get('feedback_id');

  const dispatch = useDispatch();

  useEffect(() => {
    if (monogodbID) {
      dispatch(searchModalSlice({ mongoId: monogodbID }));
    }
  }, [monogodbID]);
  const { feedback, category, source, organization, _id, sourceData, tags, zendeskComment, zendeskTags, date } =
    searchFeedback || {
      feedback: null,
      category: null,
      source: null,
      organization: null,
      _id: null,
      sourceData: null,
      tags: null,
      zendeskComment: null,
      zendeskTags: null,
      date: null,
    };
  const categories = categoryOptions?.find(({ value }) => value === category)?.label;

  const comments = zendeskComment?.split('\n\n');
  const dateFormate = new Date(Number(date)).toDateString();

  const RefURL = source === SOURCES.G2 ? sourceData?.g2 : source === SOURCES.ZENDESK ? sourceData?.zendesk : null;

  return (
    <>
      <PageLayout title='Feedback Details'>
        <ContentWrapper>
          {searchFeedback ? (
            <ReferralFeedbackStyled>
              <Card style={{ width: '100%' }}>
                <Title className='referral-feedback-detail-title' level={3}>
                  Feedback Details
                </Title>
                <div className='referral-feedback-container'>
                  <Row>
                    <Col xs={8} lg={6}>
                      <Text className='referral-feedback-text'>{'Category'}</Text>
                    </Col>
                    <Col xs={16} lg={18}>
                      <Text className='referral-feedback-desc'>{categories}</Text>
                    </Col>
                  </Row>
                  {source && (
                    <Row>
                      <Col xs={8} lg={6}>
                        <Text className='referral-feedback-text'>{'Source'}</Text>
                      </Col>
                      <Col xs={16} lg={18}>
                        <Text className='referral-feedback-desc'>{capitalizeFirstLetter(source)}</Text>
                      </Col>
                    </Row>
                  )}
                  <Row>
                    <Col xs={8} lg={6}>
                      <Text className='referral-feedback-text'>{'Customer ID'}</Text>
                    </Col>
                    <Col xs={16} lg={18}>
                      <Text className='referral-feedback-desc'>{organization}</Text>
                    </Col>
                  </Row>
                  {RefURL && (
                    <>
                      <Row>
                        <Col xs={8} lg={6}>
                          <Text className='referral-feedback-text'>{'Document ID'}</Text>
                        </Col>
                        <Col xs={16} lg={18}>
                          <Text className='referral-feedback-desc'>{_id}</Text>
                        </Col>
                      </Row>
                      <Row gutter={[16, 16]}>
                        <Col xs={8} lg={6}>
                          <Text className='referral-feedback-text'>{'Reference'}</Text>
                        </Col>
                        <Col xs={16} lg={18}>
                          <Link className='referral-feedback-desc' href={RefURL ? RefURL?.url : '#'} target='_blank'>
                            {RefURL?.url}
                          </Link>
                        </Col>
                      </Row>
                    </>
                  )}
                  {source === SOURCES.ZENDESK && zendeskTags?.length ? (
                    <Row>
                      <Col xs={8} lg={6}>
                        <Text className='referral-feedback-text'>{'Tags'}</Text>
                      </Col>
                      <Col xs={16} lg={18}>
                        {zendeskTags?.map((tag) => (
                          <Tag key={tag} closable={false}>
                            {tag}
                          </Tag>
                        ))}
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col xs={8} lg={6}>
                        <Text className='referral-feedback-text'>{'Tags'}</Text>
                      </Col>
                      <Col xs={16} lg={18}>
                        {tags?.length > 0 &&
                          tags?.map((tag) => (
                            <Tag key={tag} closable={false}>
                              {tag}
                            </Tag>
                          ))}
                      </Col>
                    </Row>
                  )}
                  <Row>
                    <Col xs={8} lg={6}>
                      <Text className='referral-feedback-text'>{'Date'}</Text>
                    </Col>
                    <Col xs={16} lg={18}>
                      <Text className='referral-feedback-desc'>
                        {dateFormate === 'Invalid Date' ? new Date(date).toDateString() : dateFormate}
                      </Text>
                    </Col>
                  </Row>
                </div>
                <Divider />
                {source === SOURCES.ZENDESK ? (
                  <div className='referral-content'>
                    <Text className='referral-feedback-text'>{'Comments'}</Text>
                    {comments?.map((com, index) => (
                      <Text key={index} className='content__comment_text'>
                        {com.replace(/&nbsp;/g, '')}
                      </Text>
                    ))}
                  </div>
                ) : (
                  <div className='referral-content'>
                    <Text className='referral-feedback-text'>{'Feedback Text'}</Text>
                    {source === 'slack-auto-ingest' || source === 'slack' ? (
                      <Text className='content_text'>{slackMarkdownify(feedback)}</Text>
                    ) : (
                      <Text className='referral-content_text'>{markdownify(feedback)}</Text>
                    )}
                  </div>
                )}
              </Card>
            </ReferralFeedbackStyled>
          ) : (
            <Card>
              <Empty />
            </Card>
          )}
        </ContentWrapper>
      </PageLayout>
    </>
  );
};

export default ReferralFeedback;
