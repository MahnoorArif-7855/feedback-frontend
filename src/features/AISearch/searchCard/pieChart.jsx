import { Empty, Skeleton, Typography } from 'antd';
import React, { PureComponent } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';

import { PieChartStyled } from './styled';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const { Text } = Typography;

const PieChartCard = ({
  pieChatSentiments,
  feedbacksDetailInfo,
  hasGptOutputProperty,
  exploreDummyData,
  isDataFetching,
}) => {
  const sentimentData =
    pieChatSentiments &&
    pieChatSentiments.map((sentimentKey, index) => {
      const sentimentsID = Object.keys(sentimentKey);
      return {
        name: sentimentsID,
        value: sentimentKey[sentimentsID].percentage,
      };
    });

  const dummySentimentData =
    exploreDummyData.sentiments &&
    exploreDummyData.sentiments.map((sentimentKey, index) => {
      const sentimentsID = Object.keys(sentimentKey);
      return {
        name: sentimentsID,
        value: sentimentKey[sentimentsID].percentage,
      };
    });

  if (isDataFetching) {
    return <Skeleton active />;
  }

  return (
    <PieChartStyled>
      {feedbacksDetailInfo?.length < 5 && (
        <div className='blur-sentiment-dummy-data'>
          <ResponsiveContainer>
            <PieChart legends>
              <Legend verticalAlign='bottom' align='left' />
              <Pie dataKey='value' data={dummySentimentData} fill='#8884d8' label>
                {dummySentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      {!sentimentData && feedbacksDetailInfo?.length > 5 && hasGptOutputProperty && (
        <Empty description='Please click on Refresh Feedback to generate graph' />
      )}
      {sentimentData && (
        <ResponsiveContainer>
          <PieChart legends>
            <Legend verticalAlign='bottom' align='left' />
            <Pie dataKey='value' data={sentimentData} fill='#8884d8' label>
              {sentimentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </PieChartStyled>
  );
};

export default PieChartCard;
