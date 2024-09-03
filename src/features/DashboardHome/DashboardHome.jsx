import { ContentWrapper } from '@/common/components/DashboardV2Layout';
import { PageLayout } from '@/common/components/DashboardV2Layout';
import DateDropDown from '@/common/ui/DropDowns/dateDropdown';
import { BACKEND_DATE_FORMAT } from '@/common/utils/constant';
import { feedbackSources } from '@/common/utils/constant';
import categoryOptions from '@/common/utils/content/categoryOption.json';
import AISearch from '@/features/AISearch';
import { GET_FEEDBACK_TAGS } from '@/state/graphQL/Queries';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Button, Select, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { TrendingTopics } from '../AISearch/TrendingTopics';
import { DateRangeDropdown } from './components';
import { AIChatContainer, DiscoverPageLayout, HeaderWrapper, HomeFilterDropdowns, HomeFiltersWrapper } from './styled';

export const DashboardHome = () => {
  const [isAIChatVisible, setIsAIChatVisible] = useState(false);
  const [dateRange, setDateRange] = useState('week'); // 'week' | 'month'
  const [categories, setCategories] = useState('');
  const [feedbackSource, setFeedbackSource] = useState('');
  const [searchFeedbackTags, setSearchFeedbackTags] = useState([]);
  const { authDetails, selectedOrganizationId, intercomTeams } = useSelector((state) => state.auth);
  const { organizationId } = authDetails || {
    organizationId: null,
  };
  const currentDateTo = dayjs().format(BACKEND_DATE_FORMAT);
  const currentDateFrom = dayjs().subtract(7, 'd').format(BACKEND_DATE_FORMAT);

  const [dateFilter, setDateFilterData] = useState([currentDateFrom, currentDateTo]);
  const [feedbackSearchText, setFeedbackSearchText] = useState('');
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

  return (
    <PageLayout
      title={
        <HeaderWrapper>
          <Space size='middle'>
            <h1>Discover</h1>
            {/* <DateRangeDropdown value={dateRange} onChange={setDateRange} /> */}
          </Space>
          <Button onClick={() => setIsAIChatVisible((prev) => !prev)}>
            ✨&nbsp;&nbsp; {isAIChatVisible ? 'Hide' : 'Show'} AI Chat
          </Button>
        </HeaderWrapper>
      }
    >
      <HomeFiltersWrapper>
        <HomeFilterDropdowns>
          <Select
            // currently we support only filtering by text (via algolia)
            // OR by categories, tags, sources, and date
            disabled={!!feedbackSearchText}
            // mode='multiple'
            // value={categories}
            maxTagCount='responsive'
            allowClear
            style={{
              flex: 0.5,
            }}
            placeholder='All categories'
            onChange={setCategories}
            options={categoryOptions}
          />
          <Select
            disabled={!!feedbackSearchText}
            mode='multiple'
            loading={feedbackTagsLoading}
            value={searchFeedbackTags}
            maxTagCount='responsive'
            allowClear
            style={{ flex: 0.5 }}
            placeholder='All tags'
            onChange={setSearchFeedbackTags}
            options={tagOptions}
          />
          <Select
            disabled={!!feedbackSearchText}
            // mode='multiple'
            // value={feedbackSource}
            maxTagCount='responsive'
            allowClear
            style={{ flex: 0.5 }}
            placeholder='All sources'
            onChange={setFeedbackSource}
            options={feedbackSources}
          />
        </HomeFilterDropdowns>
        <DateDropDown
          disabled={!!feedbackSearchText}
          currentDateFrom={dateFilter[0]}
          currentDateTo={dateFilter[1]}
          setDateFilterData={setDateFilterData}
          oneMonth={false}
          style={{ width: '320px' }}
        />
      </HomeFiltersWrapper>
      <DiscoverPageLayout>
        <ContentWrapper style={{ flex: 1 }}>
          <TrendingTopics
            dateRange={dateRange}
            dateFilter={dateFilter}
            searchFeedbackTags={searchFeedbackTags}
            categories={categories}
            feedbackSource={feedbackSource}
          />
        </ContentWrapper>

        <AIChatContainer isVisible={isAIChatVisible}>
          <AISearch />
        </AIChatContainer>
      </DiscoverPageLayout>
    </PageLayout>
  );
};
