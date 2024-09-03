/* eslint-disable react-hooks/exhaustive-deps */
import FeedbackModal from '@/common/ui/Modal';
import NoFeedbackModal from '@/common/ui/noFeedbackModal';
import { CardFeedbackItem } from '@/features/DashboardHome/components';
import { FeedbacksWrapper } from '@/features/DashboardHome/styled';
import { getSummarySlice, searchFeedbackInfo, searchModalSlice } from '@/state/redux/searchAI/searchSlice';
import { Card, Empty, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseAuth } from '../../../../firebase';

const TrendingTopicCard = ({
  isDataFetching,
  trendingTopics,
  feedbacksDetailInfo,
  hasGptOutputProperty,
  exploreDummyData,
}) => {
  const [user] = useAuthState(firebaseAuth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const { searchFeedback, summaryResponse } = useSelector((state) => state.search);
  const { organizationInfo, selectedOrganizationId, intercomTeams } = useSelector((state) => state.auth);

  const { organizationId } = organizationInfo || { organizationId: null };

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
    setIsFeedbackModalOpen(true);
  };

  const showReferenceDocData = async ({ mongoId }) => {
    await dispatch(searchModalSlice({ mongoId }));
    showModal();
  };
  useEffect(() => {
    dispatch(searchFeedbackInfo(null));
  }, []);

  useEffect(() => {
    if (searchFeedback?.feedback) {
      dispatch(
        getSummarySlice({
          user,
          organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
          mongoId: searchFeedback?._id,
        })
      );
    }
  }, [searchFeedback]);

  if (isDataFetching) {
    return (
      <Card title='Trending Topics'>
        <Skeleton active />
      </Card>
    );
  }

  const extractReferences = (keyword) => {
    const matches = keyword.match(/\[\d+(,\s*\d+)*\]/g);
    if (!matches) return [];
    const references = matches.map((match) => {
      const stringArray = match.substring(1, match.length - 1);
      return stringArray.split(',').map((ref) => parseInt(ref.trim())); // Extracting and converting the numbers inside the brackets
    });

    return references.flat(); // Flatten the array and return
  };

  const countReferences = (keyword) => {
    const references = extractReferences(keyword);
    return references.length;
  };

  const sortKeywordsByReferences = (data) => {
    return data.map((item) => {
      return {
        ...item,
        data: item.data.map((entry) => {
          const sortedKeywords = [...entry.keywords].sort((a, b) => {
            return countReferences(b) - countReferences(a);
          });

          return {
            ...entry,
            keywords: sortedKeywords,
          };
        }),
      };
    });
  };

  const sortedTrendingTopics = trendingTopics['overall'] && sortKeywordsByReferences(trendingTopics['overall']);

  return (
    <>
      {!trendingTopics['overall'] && (
        <>
          {!trendingTopics['overall'] && feedbacksDetailInfo?.length < 5 && (
            <>
              {exploreDummyData?.overAll &&
                exploreDummyData?.overAll.map(({ heading, keywords }, index) => {
                  return (
                    <>
                      <Card
                        key={`${index}-key`}
                        title={heading}
                        style={{
                          width: '100%',
                        }}
                      >
                        <FeedbacksWrapper style={{ filter: 'blur(3px)' }}>
                          {keywords?.map((keyword, index) => (
                            <CardFeedbackItem key={index} index={index} onClickReference={() => {}} keyword={keyword} />
                          ))}
                        </FeedbacksWrapper>
                      </Card>
                    </>
                  );
                })}
            </>
          )}
          {!trendingTopics['overall'] && feedbacksDetailInfo?.length > 5 && hasGptOutputProperty && (
            <Empty description='Please click on Refresh Feedback to populate data' />
          )}
        </>
      )}
      {sortedTrendingTopics &&
        sortedTrendingTopics?.map(({ data, document_ids }, index) => {
          return (
            <React.Fragment key={`${index}-overall-key`}>
              {data?.map(({ heading, keywords }) => {
                return (
                  <Card key={heading} title={heading}>
                    <FeedbacksWrapper>
                      {keywords?.map((keyword, index) => (
                        <CardFeedbackItem
                          key={index}
                          index={index}
                          onClickReference={(refIdx) =>
                            showReferenceDocData({
                              mongoId: document_ids[refIdx - 1],
                            })
                          }
                          keyword={keyword}
                        />
                      ))}
                    </FeedbacksWrapper>
                  </Card>
                );
              })}
            </React.Fragment>
          );
        })}
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
      {!searchFeedback && <NoFeedbackModal isModalOpen={isFeedbackModalOpen} setIsModalOpen={setIsFeedbackModalOpen} />}
    </>
  );
};

export default TrendingTopicCard;
