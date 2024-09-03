import { SOURCES } from '@/common/utils/constant';
import { capitalizeFirstLetter } from '@/common/utils/func';
import { CheckCircleOutlined, DeleteFilled, EyeOutlined } from '@ant-design/icons';
import { Card, Space, Tag, Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

import dateIcon from '../../../../public/images/date-icon.png';
import slackIcon from '../../../../public/images/slack-circle.png';
import FeedbackCardStyled from './styled';

const { Text } = Typography;

const FeedbackCard = ({
  onClickModal,
  highlightedFeedback,
  feedbacks: {
    feedback,
    discourseFeedback,
    category,
    date,
    score,
    source,
    tags,
    channelId,
    organizationId,
    objectID,
    weaviate,
    weaviateId,
    _id,
  },
  categoryOptions,
  handleDeleteFeedback,
  slackChannelsInfo,
}) => {
  const dateFormate = new Date(Number(date)).toDateString();
  const categories = categoryOptions?.find(({ value }) => value === category);
  const channelName = slackChannelsInfo?.find(({ id }) => channelId === id);

  const objId = _id || objectID;

  feedback = source === SOURCES.DISCOURSE ? discourseFeedback || '' : feedback;

  return (
    <>
      <FeedbackCardStyled>
        <Card
          style={{
            width: '100%',
            height: date || score ? 320 : 250,
          }}
          bodyStyle={{ paddingBottom: '10px' }}
          // onClick={onClickModal}
        >
          {weaviate && weaviateId && <CheckCircleOutlined className='verified-icon' />}
          {/* <Button type="primary" className='modal-icon' shape="circle" icon={<EyeOutlined
                  className='modal-icon'
                  onClick={() => handleDele()}
                />} /> */}
          {/* {categories && ( */}
          <div className='feedback-heading'>
            <div className='feedback-category'>
              <Image alt='search-image' className='edit-user' height={30} width={30} src={slackIcon} />
              {categories?.label}
            </div>
            <div className='icons-content'>
              <EyeOutlined className='modal-icon' onClick={onClickModal} />
              <DeleteFilled className='delete-icon' onClick={() => handleDeleteFeedback(objId, organizationId)} />
            </div>
          </div>
          {/* // )} */}
          <div onClick={onClickModal}>
            <div className='feedback-text'>
              <span>
                {highlightedFeedback && highlightedFeedback?.feedback ? (
                  <div dangerouslySetInnerHTML={{ __html: highlightedFeedback?.feedback?.value }} />
                ) : (
                  <span>{feedback}</span>
                )}
              </span>
            </div>
            {date && (
              <>
                <div className='feedback-source'>
                  <div className='feedback-source-text'>
                    <Tag color={'#ff764f'}>Source: {capitalizeFirstLetter(source)} </Tag>
                  </div>
                  {channelId && (
                    <div className='feedback-source-text'>
                      <Tag color={'#ff764f'}>Channel: {channelName?.name} </Tag>
                    </div>
                  )}

                  <div>
                    {source === SOURCES.ZENDESK ? (
                      <Tag key={'view-comment'} closable={false}>
                        view comment
                      </Tag>
                    ) : (
                      tags &&
                      Array.isArray(tags) &&
                      tags?.length > 0 &&
                      tags?.map((tag) => {
                        return (
                          <div key={tag}>
                            Tags: <Tag closable={false}>{tag}</Tag>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
                <div className='feedback-date'>
                  <Image alt='search-image' className='edit-user' height={20} width={20} src={dateIcon} />
                  {dateFormate === 'Invalid Date' ? new Date(date).toDateString() : dateFormate}
                </div>
              </>
            )}
          </div>
          {score && (
            <div className='score-certainty'>
              <Text type='danger' strong>
                Similarity: {(score.certainty * 100).toFixed(1)} %{' '}
              </Text>
            </div>
          )}
        </Card>
      </FeedbackCardStyled>
    </>
  );
};

export default FeedbackCard;
