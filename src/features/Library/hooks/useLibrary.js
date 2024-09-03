import { firebaseAuth } from '@/../firebase';
import { BACKEND_DATE_FORMAT, ERROR_TITLE } from '@/common/utils/constant';
import customEvent from '@/common/utils/customEvent';
import { FIND_FILTER_FEEDBACKS, FIND_FILTER_FEEDBACKS_BY_ORGANIZATION_ID, FIND_USER } from '@/state/graphQL/Mutation';
import { GET_FEEDBACKS_BY_USER, GET_FEEDBACK_TAGS, GET_TOTAL_FEEDBACKS } from '@/state/graphQL/Queries';
import {
  fetchUserSlacksChannelsSlice,
  intercomTeamsNameSlice,
  slackAutoIngestChannelSlice,
  slackFeedbackInfo,
} from '@/state/redux/userProfile/userProfileSlice';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import algoliasearch from 'algoliasearch/lite';
import { notification } from 'antd';
import dayjs from 'dayjs';
import { signOut } from 'firebase/auth';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';

const defaultCheckedList = [
  'churn',
  'bugs',
  'feature_request',
  'feature_feedback_positive',
  'feature_feedback_negative',
  'na',
  'how_tos',
  'others',
];
// TODO: Refactor

export const useLibrary = () => {
  const dispatch = useDispatch();

  const { authDetails, selectedOrganizationId, authUser, autoIngestChannelNames, intercomTeams } = useSelector(
    (state) => state.auth
  );
  const { organizationId, organizationDetails } = authDetails || {
    organizationId: null,
    organizationDetails: null,
  };

  const { intercomAppId, intercomAccessToken } = organizationDetails[0] || {
    intercomAppId: null,
    intercomAccessToken: null,
  };

  const { user } = authUser || {
    user: null,
  };

  const [categories, setCategories] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [totalFeedbackData, setTotalFeedbackData] = useState([]);
  const [searchFeedbackTags, setSearchFeedbackTags] = useState([]);
  const [feedbackSource, setFeedbackSource] = useState([]);
  const [feedbackSearchText, setFeedbackSearchText] = useState('');
  const [isFeedQueryLoading, setIsFeedQueryLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationLimit, setTotalPaginationLimit] = useState(5);
  const [paginationPageLimit, setPaginationPageLimit] = useState(10); // Default page size

  const currentDateTo = dayjs().format(BACKEND_DATE_FORMAT);
  const currentDateFrom = dayjs().subtract(7, 'd').format(BACKEND_DATE_FORMAT);

  const [dateFilter, setDateFilterData] = useState([currentDateFrom, currentDateTo]);
  const [deleteFeedback, setDeleteFeedback] = useState(false);

  const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY, { protocol: 'https:' });
  const index = searchClient.initIndex(process.env.ALGOLIA_INDEX_NAME);

  const {
    data: feedbackTagsData,
    error: feedbackTagsError,
    loading: feedbackTagsLoading,
  } = useQuery(GET_FEEDBACK_TAGS, {
    variables: {
      organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
      skip: !organizationId,
    },
  });

  const [fetchFeedbacks, { loading: fetchFeedbacksLoading }] = useLazyQuery(GET_FEEDBACKS_BY_USER);
  const [fetchTotalFeedbacks, { loading: fetchTotalFeedbacksLoading }] = useLazyQuery(GET_TOTAL_FEEDBACKS);

  const [findFilterFeedbacks, { loading, error }] = useMutation(FIND_FILTER_FEEDBACKS, {
    onCompleted: (data) => {
      dispatch(slackFeedbackInfo(data.findFilterFeedbacks));
      if (data.findFilterFeedbacks.length > 0) {
        const channelsId = [];
        data?.findFilterFeedbacks.filter(({ channelId }) => {
          if (channelId) {
            channelsId.push(channelId);
          }
        });
        dispatch(
          fetchUserSlacksChannelsSlice({
            user,
            channelsIds: channelsId,
            organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
          })
        );
        setFeedbackData(data.findFilterFeedbacks);
      } else {
        console.warn('No data found');
        setFeedbackData([]);
      }
    },
    onError: (error) => {
      console.error('Error during mutation:', error);
      // Handle the error, such as displaying an error message to the user

      if (error?.message === 'Unauthorized') {
        notification.error({
          title: ERROR_TITLE,
          description: 'Your session has been expired, please signin again',
        });
        signOut(firebaseAuth);
        window.location.href = '/signin';
      } else {
        notification.error({
          title: ERROR_TITLE,
          description: 'Failed to fetch data',
        });
      }
    },
  });
  const [filterFeedbacksByOrganizationId] = useMutation(FIND_FILTER_FEEDBACKS_BY_ORGANIZATION_ID, {
    onCompleted: (data) => {
      setTotalFeedbackData(data?.filterFeedbacksByOrganizationId || []);
    },
    onError: (error) => {
      console.error('[Error occured fetching filter Feedbacks By OrganizationId:]', error);
    },
  });

  useEffect(() => {
    customEvent('visit_library', {});
  }, []);

  const findFeedbacks = async () => {
    const shouldUseAlgolia = feedbackSearchText.length > 0;

    if (shouldUseAlgolia) {
      setIsFeedQueryLoading(true);
      setFeedbackData([]);
      const orgId = selectedOrganizationId || organizationId;
      const filters = `organizationId:"${orgId}"`;
      const { hits } = await index.search(feedbackSearchText, {
        filters: filters,
        restrictHighlightAndSnippetArrays: true,
        similarQuery: feedbackSearchText,
      });
      setFeedbackData(hits);
      setIsFeedQueryLoading(false);

      await customEvent('algolia_search', {
        keyword: feedbackSearchText,
        organizationId: orgId,
      });
    } else {
      setFeedbackData([]);

      if (deleteFeedback) {
        findFilterFeedbacks({
          variables: {
            organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
            categories: categories.length > 0 ? categories : defaultCheckedList,
            from: dateFilter[0],
            to: dateFilter[1],
            tags: searchFeedbackTags,
            sources: feedbackSource,
            page: currentPage,
            perPage: paginationPageLimit,
          },
        });
        filterFeedbacksByOrganizationId({
          variables: {
            organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
            categories: categories.length > 0 ? categories : defaultCheckedList,
            from: dateFilter[0],
            to: dateFilter[1],
            tags: searchFeedbackTags,
            sources: feedbackSource,
          },
        });
        setDeleteFeedback(false);
      }
      const isFiltersEmpty =
        categories.length === 0 &&
        feedbackSource.length === 0 &&
        searchFeedbackTags.length === 0 &&
        dateFilter[0] === currentDateFrom &&
        dateFilter[1] === currentDateTo;
      const totalFeedbacks = await fetchTotalFeedbacks({
        variables: {
          organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
          categories: categories.length > 0 ? categories : defaultCheckedList,
          from: dateFilter[0],
          to: dateFilter[1],
          tags: searchFeedbackTags,
          sources: feedbackSource,
        },
      });
      if (totalFeedbacks?.data?.findTotalFeedbackByUser) {
        setTotalPaginationLimit(totalFeedbacks?.data?.findTotalFeedbackByUser);
      }

      if (isFiltersEmpty) {
        const data = await fetchFeedbacks({
          variables: {
            organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
            categories: categories.length > 0 ? categories : defaultCheckedList,
            from: dateFilter[0],
            to: dateFilter[1],
            tags: searchFeedbackTags,
            sources: feedbackSource,
            page: currentPage,
            perPage: paginationPageLimit,
          },
        });
        filterFeedbacksByOrganizationId({
          variables: {
            organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
            categories: categories.length > 0 ? categories : defaultCheckedList,
            from: dateFilter[0],
            to: dateFilter[1],
            tags: searchFeedbackTags,
            sources: feedbackSource,
          },
        });

        if (data?.data?.findFeedbackByUser) {
          setFeedbackData(data.data.findFeedbackByUser);
        }
      } else {
        findFilterFeedbacks({
          variables: {
            organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
            categories: categories.length > 0 ? categories : defaultCheckedList,
            from: dateFilter[0],
            to: dateFilter[1],
            tags: searchFeedbackTags,
            sources: feedbackSource,
            page: currentPage,
            perPage: paginationPageLimit,
          },
        });
        filterFeedbacksByOrganizationId({
          variables: {
            organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
            categories: categories.length > 0 ? categories : defaultCheckedList,
            from: dateFilter[0],
            to: dateFilter[1],
            tags: searchFeedbackTags,
            sources: feedbackSource,
          },
        });
      }
    }
  };

  const handleSearchChange = useCallback(
    (event) => {
      setFeedbackSearchText(event?.target?.value);
    },
    [setFeedbackSearchText]
  );

  const tagOptions = React.useMemo(() => {
    const tags = feedbackTagsData?.getFeedbackTags.length > 0 ? feedbackTagsData?.getFeedbackTags[0]?.tags : [];

    // Create a lookup map from intercomarray
    const teamMap = intercomTeams.reduce((acc, team) => {
      acc[team.id] = team.name;
      return acc;
    }, {});

    return tags?.map((tag) => {
      return {
        value: tag,
        label: teamMap[tag] || tag, // Replace the tag with team name if exists in teamMap, else keep the tag as is
      };
    });
  }, [feedbackTagsData, intercomTeams]);

  const handleFindFeedbacks = useDebouncedCallback(findFeedbacks, 500);

  // TODO: Refactor this...
  React.useEffect(() => {
    handleFindFeedbacks();
  }, [
    categories,
    dateFilter,
    searchFeedbackTags,
    feedbackSource,
    feedbackSearchText,
    handleFindFeedbacks,
    currentPage,
    paginationPageLimit,
    selectedOrganizationId,
    organizationId,
  ]);

  React.useEffect(() => {
    if (intercomAppId && intercomAccessToken) {
      dispatch(
        intercomTeamsNameSlice({
          organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
          user,
        })
      );
    }
  }, [organizationId, selectedOrganizationId, user, intercomAppId, intercomAccessToken]);

  // [fetch channel name for slack auto ingest feedback]

  const slackChannelForAutoIngest = (channelId) => {
    dispatch(
      slackAutoIngestChannelSlice({
        channelId,
        organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
        user,
      })
    );
  };

  return {
    dateFilter,
    setDateFilterData,
    tagOptions,
    findFeedbacks,
    handleSearchChange,
    feedbackSearchText,
    loading: loading || isFeedQueryLoading || fetchFeedbacksLoading,
    feedbackData,
    feedbackSource,
    setFeedbackSource,
    categories,
    setCategories,
    refetchLibrary: handleFindFeedbacks,
    //tags
    searchFeedbackTags,
    setSearchFeedbackTags,
    feedbackTagsLoading,
    setDeleteFeedback,
    feedbacksTotalLength: totalFeedbackData?.length,
    setCurrentPage,
    currentPage,
    paginationLimit,
    paginationPageLimit,
    setPaginationPageLimit,
    slackChannelForAutoIngest,
    autoIngestChannelNames,
    intercomTeams,
  };
};
