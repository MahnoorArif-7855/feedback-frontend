import customEvent from '@/common/utils/customEvent';
import { exploreSlice } from '@/state/redux/searchAI/searchSlice';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseAuth } from '../../../firebase';
import TrendingTopicSentiments from './overview/TrendingTopicSentiments';

export const TrendingTopics = ({ dateRange, feedbackSource, categories, searchFeedbackTags, dateFilter }) => {
  const [user] = useAuthState(firebaseAuth);
  const dispatch = useDispatch();
  const { exploreLoader, exploreResponse, exploreDummyData } = useSelector((state) => state.search);
  const { feedbacksDetailInfo, hasGptOutputProperty } = useSelector((state) => state.settings);
  const { authDetails, selectedOrganizationId } = useSelector((state) => state.auth);

  const { organizationId, email } = authDetails || {
    organizationId: null,
    organizationDetails: [],
    search_limit_user_only: false,
    userSearchCount: null,
    email: '',
  };

  const fetchDiscoverDetails = async ({ type, days, cacheData }) => {
    await customEvent('refresh_feedback', {});
    await dispatch(
      exploreSlice({
        organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
        user,
        analyseType: type,
        pageType: 'home',
        days,
        cacheData,
        feedbackSource,
        categories,
        searchFeedbackTags,
        dateFilter,
      })
    );
  };

  return (
    <TrendingTopicSentiments
      feedbacksDetailInfo={feedbacksDetailInfo}
      hasGptOutputProperty={hasGptOutputProperty}
      isDataFetching={exploreLoader}
      getDiscoverDetails={fetchDiscoverDetails}
      exploreResponse={exploreResponse}
      exploreLoader={exploreLoader}
      email={email}
      exploreDummyData={exploreDummyData}
      dateRange={dateRange}
      feedbackSource={feedbackSource}
      categories={categories}
      searchFeedbackTags={searchFeedbackTags}
      dateFilter={dateFilter}
      selectedOrganizationId={selectedOrganizationId}
      organizationId={organizationId}
    />
  );
};
