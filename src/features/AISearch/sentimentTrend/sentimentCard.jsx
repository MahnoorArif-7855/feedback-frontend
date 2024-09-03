import { Card, List, Typography } from 'antd';
import React from 'react';

import { SentimentCardStyled } from './styled';

const { Text } = Typography;

export const SentimentCard = ({ dataSource, blur, heading }) => {
  return (
    <SentimentCardStyled>
      <Card
        style={{ maxHeight: '14em', minHeight: '14em', overflowY: 'scroll' }}
        className={blur ? 'blur-sentiment-dummy-data' : ''}
      >
        <Text className='sentiment-heading'>{heading}</Text>
        <div>
          <List bordered dataSource={dataSource} renderItem={(item) => <List.Item>{item}</List.Item>} />
        </div>
      </Card>
    </SentimentCardStyled>
  );
};
