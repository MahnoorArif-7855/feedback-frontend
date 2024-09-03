import { ContentWrapper } from '@/common/components/DashboardV2Layout';
import { PageLayout } from '@/common/components/DashboardV2Layout';
import { exploreSlice } from '@/state/redux/searchAI/searchSlice';
import { Button, Space } from 'antd';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseAuth } from '../../../firebase';
import TrendingTopicCard from '../AISearch/searchCard/trendingTopic';
import { DiscoverPageLayout, HeaderWrapper } from './styled';

export const DashboardAnalysis = () => {
  const [user] = useAuthState(firebaseAuth);
  const { exploreLoader, exploreResponse, exploreDummyData } = useSelector((state) => state.search);
  const { feedbacksDetailInfo, hasGptOutputProperty } = useSelector((state) => state.settings);
  const { authDetails, selectedOrganizationId } = useSelector((state) => state.auth);
  const analysisSection = useSearchParams();

  const analysisSectionID = analysisSection.get('section');
  const dateFormat = 'YYYY-MM-DD';
  const currentDateTo = dayjs().format(dateFormat);
  const currentDateFrom = dayjs().subtract(7, 'd').format(dateFormat);

  // const [dateFilter, setDateFilterData] = useState([currentDateFrom, currentDateTo]);

  const [analysisResponse, setAnalysisResponse] = useState({
    filter: null,
    overall: null,
    overallLoading: false,
    sentiments: null,
  });

  const dispatch = useDispatch();

  const { organizationId, email } = authDetails || {
    organizationId: null,
    organizationDetails: [],
    search_limit_user_only: false,
    userSearchCount: null,
    email: '',
  };

  const analysisDate = exploreResponse?.filter;
  const analysedFeedback = exploreResponse.sentiments;

  const startDate = analysisDate && analysisDate?.start;
  const endDate = analysisDate && analysisDate?.end;

  useEffect(() => {
    const keyImprovements =
      exploreResponse?.overall &&
      exploreResponse?.overall?.filter((section) => section?.data[0].heading === analysisSectionID);

    setAnalysisResponse({ ...exploreResponse, overall: keyImprovements });
  }, [exploreResponse, analysisSectionID]);

  useEffect(() => {
    // feedbacksDetailInfo >= 5 &&
    //   hasGptOutputProperty &&
    dispatch(
      exploreSlice({
        organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
        user,
        analyseType: 'overall',
        pageType: 'analysis',
        days: 7,
        cacheData: false,
        feedbackSource: '',
        categories: '',
        searchFeedbackTags: [],
        dateFilter: [currentDateFrom, currentDateTo],
      })
    );
  }, [dispatch, feedbacksDetailInfo, hasGptOutputProperty, organizationId, selectedOrganizationId, user]);

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

  return (
    <PageLayout
      title={
        <HeaderWrapper>
          <Space size='middle'>
            <h1>Analysis</h1>
          </Space>
        </HeaderWrapper>
      }
    >
      <DiscoverPageLayout>
        <ContentWrapper style={{ flex: 1 }}>
          {exploreLoader ? (
            <div>Loading...</div>
          ) : (
            <div>
              Analysis based on {totalSentiments || '...'} feedback data points from {filterDate(startDate)} to{' '}
              {filterDate(endDate)}.
            </div>
          )}
          <br />
          <TrendingTopicCard
            hasGptOutputProperty={hasGptOutputProperty}
            feedbacksDetailInfo={feedbacksDetailInfo}
            isDataFetching={exploreLoader}
            trendingTopics={analysisResponse}
            exploreDummyData={exploreDummyData}
          />
        </ContentWrapper>
      </DiscoverPageLayout>
    </PageLayout>
  );
};
