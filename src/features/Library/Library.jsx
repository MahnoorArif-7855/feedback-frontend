import { firebaseAuth } from '@/../firebase';
import { ContentWrapper, PageLayout } from '@/common/components/DashboardV2Layout';
import DateDropDown from '@/common/ui/DropDowns/dateDropdown';
import FeedbackModal from '@/common/ui/Modal';
import { SOURCES, feedbackSources } from '@/common/utils/constant';
import categoryOptions from '@/common/utils/content/categoryOption.json';
import AISearch from '@/features/AISearch';
import AddFeedback from '@/features/AddFeedback';
import {
  FeedbackDeleteSlice,
  feedbackSummary,
  getSummarySlice,
  searchModalSlice,
} from '@/state/redux/searchAI/searchSlice';
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Drawer, Empty, Input, Modal, Pagination, Select, Skeleton, Space, notification } from 'antd';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { FeedbackCard } from './components/FeedbackCard';
import { useLibrary } from './hooks/useLibrary';
import {
  FeedbackStatsWrapper,
  FilterDropdowns,
  FilterDropdownsForCategory,
  FiltersWrapper,
  HeaderWrapper,
  PageWrapper,
} from './styled';

const confirmDeletion = (onOk) => {
  Modal.confirm({
    className: 'confirm',
    title: 'Delete feedback',
    icon: <ExclamationCircleOutlined />,
    content: 'Are you sure you want to delete the feedback?',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk,
  });
};

export const Library = () => {
  const {
    dateFilter,
    setDateFilterData,
    tagOptions,
    feedbackTagsLoading,
    searchFeedbackTags,
    setSearchFeedbackTags,
    handleSearchChange,
    loading,
    feedbackData,
    feedbackSource,
    setFeedbackSource,
    categories,
    setCategories,
    feedbackSearchText,
    refetchLibrary,
    setDeleteFeedback,
    feedbacksTotalLength,
    setCurrentPage,
    currentPage,
    paginationLimit,
    paginationPageLimit,
    setPaginationPageLimit,
    slackChannelForAutoIngest,
    autoIngestChannelNames,
    intercomTeams,
  } = useLibrary();

  const [user] = useAuthState(firebaseAuth);
  const [api] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState();
  const { searchFeedback, summaryResponse } = useSelector((state) => state.search);

  const { organizationInfo, selectedOrganizationId } = useSelector((state) => state.auth);

  const { organizationId } = organizationInfo || { organizationId: null };

  const dispatch = useDispatch();

  // TODO: I am not touching the slice for the backwards compatibility.
  // But probably in the future feedback_id should be enough - all the other data
  // can be retrieved on the lower levels
  const handleDeleteFeedback = ({ feedbackId, orgId }) => {
    confirmDeletion(async () => {
      try {
        await dispatch(FeedbackDeleteSlice({ feedbackId, orgId, user }));
        setDeleteFeedback(true);
        refetchLibrary();
        api.info({
          message: 'The feedback has been successfully deleted',
          placement: 'bottomRight',
        });
      } catch (error) {
        api.error({
          message: 'Something went wrong while deleting the feedback',
          placement: 'bottomRight',
        });
      }
    });
  };

  const handleAddFeedbackModalOpen = () => {
    setFeedbackModalOpen(true);
  };

  const handleAddFeedbackModalClose = () => {
    setFeedbackModalOpen(false);
    refetchLibrary();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // AI Chat
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const onShowSizeChange = (current, pageSize) => {
    setPaginationPageLimit(pageSize);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showReferenceDocData = async ({ mongoId }) => {
    await dispatch(
      getSummarySlice({
        user,
        organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
        mongoId,
      })
    );

    await dispatch(searchModalSlice({ mongoId }));
    showModal();
  };

  console.log('feedbackData', feedbackData);

  return (
    <PageLayout
      title={
        <HeaderWrapper>
          <Space size='middle'>
            <h1>Feedback Library</h1>
            <Button onClick={() => setIsAiChatOpen(true)}>✨&nbsp;&nbsp;Search with AI</Button>
          </Space>
          <Button type='primary' onClick={handleAddFeedbackModalOpen}>
            Add Feedback
          </Button>
        </HeaderWrapper>
      }
    >
      <PageWrapper>
        <FiltersWrapper>
          <FilterDropdowns>
            <Input
              value={feedbackSearchText}
              onChange={handleSearchChange}
              placeholder='Search by keywords'
              style={{ flex: 1 }}
              prefix={<SearchOutlined />}
              allowClear
            />
            <div
              style={{
                textTransform: 'uppercase',
                fontSize: '10px',
                color: '#999',
              }}
            >
              or
            </div>

            <Select
              disabled={!!feedbackSearchText}
              mode='multiple'
              value={feedbackSource}
              maxTagCount='responsive'
              allowClear
              style={{ flex: 0.5 }}
              placeholder='All sources'
              onChange={setFeedbackSource}
              options={feedbackSources}
            />
            <DateDropDown
              disabled={!!feedbackSearchText}
              currentDateFrom={dateFilter[0]}
              currentDateTo={dateFilter[1]}
              setDateFilterData={setDateFilterData}
              oneMonth={false}
              style={{ flex: 0.5 }}
            />
          </FilterDropdowns>
          <FilterDropdownsForCategory>
            <Select
              // currently we support only filtering by text (via algolia)
              // OR by categories, tags, sources, and date
              disabled={!!feedbackSearchText}
              mode='multiple'
              value={categories}
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
          </FilterDropdownsForCategory>
        </FiltersWrapper>

        <ContentWrapper>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {loading ? (
              <Skeleton.Input active size='large' block />
            ) : feedbackData?.length === 0 ? (
              <Empty style={{ marginTop: 30 }} />
            ) : (
              <>
                <FeedbackStatsWrapper>
                  Showing {feedbackData?.length || 0} of {feedbacksTotalLength}
                </FeedbackStatsWrapper>
                {feedbackData?.map(
                  ({
                    _id,
                    tags,
                    date,
                    zendeskComment,
                    _highlightResult,
                    category,
                    source,
                    weaviateId,
                    channelId,
                    feedback,
                    discourseCategoryName,
                    discourseFeedback,
                  }) => (
                    <FeedbackCard
                      key={_id}
                      discourseFeedback={discourseFeedback || ''}
                      tags={tags || []}
                      date={date}
                      discourseCategoryName={discourseCategoryName}
                      content={zendeskComment ? zendeskComment : feedback}
                      highlightedContent={_highlightResult}
                      category={category}
                      source={source}
                      processed={weaviateId}
                      channelId={channelId || ''}
                      onDelete={() => handleDeleteFeedback({ feedbackId: _id, orgId: organizationId })}
                      onAutoIngest={slackChannelForAutoIngest}
                      autoIngestChannelNames={autoIngestChannelNames}
                      intercomTeams={intercomTeams}
                      onClickFeedback={() =>
                        showReferenceDocData({
                          mongoId: _id,
                        })
                      }
                    />
                  )
                )}
              </>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'end', padding: '12px 0px' }}>
            {feedbackData?.length !== 0 && (
              <Pagination
                current={currentPage}
                onChange={handlePageChange}
                total={paginationLimit}
                onShowSizeChange={onShowSizeChange}
                pageSize={paginationPageLimit}
              />
            )}
          </div>
        </ContentWrapper>
      </PageWrapper>

      <Drawer open={isFeedbackModalOpen} onClose={handleAddFeedbackModalClose} width={600} title='Add Feedback'>
        <AddFeedback />
      </Drawer>

      <Drawer
        open={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        size='large'
        title='AI Search'
        bodyStyle={{ padding: 0 }}
      >
        <AISearch />
      </Drawer>
      {searchFeedback && (
        <FeedbackModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          contentInfo={searchFeedback}
          summaryResponse={summaryResponse}
          showSummary={true}
          intercomTeams={intercomTeams}
        />
      )}
    </PageLayout>
  );
};
