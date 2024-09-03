import { CardsWrapper, StatsWrapper } from '@/features/DashboardHome/styled';
import { ReloadOutlined } from '@ant-design/icons';
import { Alert, Button, Card } from 'antd';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import React, { useCallback, useEffect } from 'react';

import PieChartCard from '../searchCard/pieChart';
import TrendingTopicCard from '../searchCard/trendingTopic';

const TrendingTopicSentiments = ({
  feedbacksDetailInfo,
  hasGptOutputProperty,
  isDataFetching,
  getDiscoverDetails,
  exploreLoader,
  exploreResponse,
  exploreDummyData,
  dateRange,
  feedbackSource,
  categories,
  searchFeedbackTags,
  dateFilter,
  selectedOrganizationId,
  organizationId,
}) => {
  const showNoticeMessage = !exploreResponse['overall']?.data && feedbacksDetailInfo?.length < 5;

  const analysisDate = exploreResponse?.filter;
  const analysedFeedback = exploreResponse.sentiments;

  const startDate = analysisDate && analysisDate?.start;
  const endDate = analysisDate && analysisDate?.end;

  const checkFeedbackQuantity = feedbacksDetailInfo && feedbacksDetailInfo.length;

  const filterDate = (timestamp) => {
    const filterDateOnly = timestamp && timestamp.split('T')[0];
    if (!filterDateOnly) return '...';
    return format(filterDateOnly, 'MMMM d, yyyy');
  };

  const totalSentiments = React.useMemo(() => {
    let totalCount = 0;

    analysedFeedback?.forEach((item) => {
      const keys = Object.keys(item);
      if (keys.length > 0) {
        const key = keys[0]; // Get the first key dynamically
        totalCount += item[key].count;
      }
    });

    return totalCount;
  }, [analysedFeedback]);

  const handleFetchAnalysis = useCallback(() => {
    getDiscoverDetails({
      type: 'overall',
      days: dayjs(dateFilter[1]).diff(dayjs(dateFilter[0]), 'day') + 1,
      cacheData: false,
    });
  }, [dateFilter, feedbackSource, categories, searchFeedbackTags, selectedOrganizationId, organizationId]);

  useEffect(() => {
    checkFeedbackQuantity >= 5 &&
      hasGptOutputProperty &&
      getDiscoverDetails({
        type: 'overall',
        days: dayjs(dateFilter[1]).diff(dayjs(dateFilter[0]), 'day') + 1,
        cacheData: true,
      });
  }, [
    checkFeedbackQuantity,
    hasGptOutputProperty,
    feedbackSource,
    categories,
    searchFeedbackTags,
    dateFilter,
    selectedOrganizationId,
    organizationId,
  ]);

  return (
    <>
      <StatsWrapper>
        {isDataFetching ? (
          <div>Loading...</div>
        ) : (
          <>
            Analysis based on {totalSentiments || '...'} feedback data points from {filterDate(startDate)} to{' '}
            {filterDate(endDate)}.
          </>
        )}
        <Button
          type='text'
          icon={<ReloadOutlined />}
          size='small'
          disabled={checkFeedbackQuantity >= 5 && hasGptOutputProperty ? false : true}
          onClick={handleFetchAnalysis}
          loading={exploreLoader}
        >
          Refresh
        </Button>
      </StatsWrapper>

      {showNoticeMessage && (
        <Alert
          style={{ marginBottom: '12px' }}
          message='Minimum 5 pieces of feedbacks are required. Submit feedback in the Slack app or Upload Feedback tab to access insight.'
          type='warning'
        />
      )}

      <CardsWrapper>
        <Card title='Sentiment'>
          <PieChartCard
            hasGptOutputProperty={hasGptOutputProperty}
            feedbacksDetailInfo={feedbacksDetailInfo}
            isDataFetching={isDataFetching}
            pieChatSentiments={exploreResponse.sentiments}
            exploreDummyData={exploreDummyData}
          />
        </Card>

        <TrendingTopicCard
          hasGptOutputProperty={hasGptOutputProperty}
          feedbacksDetailInfo={feedbacksDetailInfo}
          isDataFetching={isDataFetching}
          trendingTopics={exploreResponse}
          exploreDummyData={exploreDummyData}
        />
      </CardsWrapper>
    </>
  );
};

export default TrendingTopicSentiments;
