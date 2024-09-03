import { Card, Col, Divider, Row, Typography } from 'antd';
import React from 'react';

import OrganizationMonitorAISearchStyled from './styled';

const { Text } = Typography;

const OrgMonitorAISearchCard = ({ contentInfo }) => {
  const { userId, userName, query, date, output } = contentInfo;

  const completion_tokens = output && output[0].usage.completion_tokens;
  const prompt_tokens = output && output[0].usage.prompt_tokens;
  const total_tokens = output && output[0].usage.total_tokens;
  const input_tokens_cost = output && output[1].input_tokens_cost;
  const output_tokens_cost = output && output[1].output_tokens_cost;
  const total_tokens_cost = output && output[1].total_tokens_cost;

  const outputText = output && output[0].text;
  const brContent = outputText.replaceAll('\n', '</br>');

  return (
    <OrganizationMonitorAISearchStyled>
      <Card style={{ minWidth: '100%' }} bodyStyle={{ paddingBottom: '10px' }}>
        <Row>
          <Col xs={24} sm={12}>
            <div className='feedback-text'>
              <Text className='user-search-title'>Date : </Text>
              {date}
            </div>
            <div className='feedback-text'>
              <Text className='user-search-title'>User Name : </Text>
              {userName}
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className='feedback-text'>
              <Text className='user-search-title'>User Id : </Text>
              {userId}
            </div>
          </Col>
        </Row>

        <div className='feedback-text'>
          <Text className='user-search-title'>Query : </Text>
          {query}
        </div>
        <div className='feedback-text'>
          <Text className='user-search-title'>Output : </Text>
          <div dangerouslySetInnerHTML={{ __html: brContent }} />
        </div>
        <Divider />

        <div className='feedback-text'>
          <Text className='user-search-title'>Usage : </Text>
          <Row>
            <Col xs={24} sm={12}>
              <b>Completion Token: </b>
              {completion_tokens} <br />
              <b>Total Tokens : </b>
              {total_tokens} <br />
              <b>Prompt Tokens : </b>
              {prompt_tokens} <br />
            </Col>
            <Col xs={24} sm={12}>
              <b>Input Token Cost: </b>${input_tokens_cost} <br />
              <b>Output Token Cost : </b>${output_tokens_cost} <br />
              <b>Total Input Cost : </b>${total_tokens_cost} <br />
            </Col>
          </Row>
          <br />
        </div>
      </Card>
    </OrganizationMonitorAISearchStyled>
  );
};

export default OrgMonitorAISearchCard;
