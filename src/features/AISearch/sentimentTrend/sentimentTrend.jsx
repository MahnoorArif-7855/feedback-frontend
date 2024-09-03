import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Empty, Typography } from 'antd';
import React from 'react';

import { SentimentTrendCard } from './styled';

const { Text } = Typography;

const SentimentTrend = ({ sentiments, exploreDummyData, feedbacksDetailInfo, hasGptOutputProperty }) => {
  const sentimentData =
    sentiments &&
    sentiments.reduce((result, current) => {
      const key = Object.keys(current)[0];
      result[key] = current[key];
      return result;
    }, {});

  const dummySentimentData =
    exploreDummyData.sentiments &&
    exploreDummyData?.sentiments?.reduce((result, current) => {
      const key = Object.keys(current)[0];
      result[key] = current[key];
      return result;
    }, {});

  return (
    <SentimentTrendCard>
      {!sentimentData && feedbacksDetailInfo?.length > 5 && hasGptOutputProperty && (
        <Empty description='Please click on Refresh Feedback to generate graph' />
      )}
      {sentimentData && (
        <>
          <Text className='sentiment-heading'>Sentiments Trending</Text>
          <div className='icon'>
            {sentimentData?.positive?.percentage > sentimentData?.negative?.percentage ? (
              <CaretUpOutlined className='icon-up' />
            ) : (
              <CaretDownOutlined className='icon-down' />
            )}
          </div>
          <div className='sentiment-content'>
            <div className='sentiment-content-container'>
              <Text className='sentiment-content-heading'>Positive</Text>
              <Text className='sentiment-content-heading'>{sentimentData?.positive?.percentage}</Text>
            </div>
            <div className='sentiment-content-container'>
              <Text className='sentiment-content-heading'>Negative</Text>
              <Text className='sentiment-content-heading'>{sentimentData?.negative?.percentage}</Text>
            </div>
            <div className='sentiment-content-container'>
              <Text className='sentiment-content-heading'>Neutral</Text>
              <Text className='sentiment-content-heading'>{sentimentData?.neutral?.percentage}</Text>
            </div>
          </div>
        </>
      )}
      {feedbacksDetailInfo?.length < 5 && (
        <div className='blur-sentiment-dummy-data'>
          <Text className='sentiment-heading'>Sentiments Trending</Text>
          <div className='icon'>
            <CaretUpOutlined className='icon-up' />
          </div>
          <div className='sentiment-content'>
            <div className='sentiment-content-container'>
              <Text className='sentiment-content-heading'>Positive</Text>
              <Text className='sentiment-content-heading'>{dummySentimentData?.positive?.percentage}</Text>
            </div>
            <div className='sentiment-content-container'>
              <Text className='sentiment-content-heading'>Negative</Text>
              <Text className='sentiment-content-heading'>{dummySentimentData?.positive?.percentage}</Text>
            </div>
            <div className='sentiment-content-container'>
              <Text className='sentiment-content-heading'>Neutral</Text>
              <Text className='sentiment-content-heading'>{dummySentimentData?.positive?.percentage}</Text>
            </div>
          </div>
        </div>
      )}
    </SentimentTrendCard>
  );
};

export default SentimentTrend;
