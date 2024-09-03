import { Card } from 'antd';
import styled from 'styled-components';

const DiscourseWebhookStyled = styled(Card)`
  .ant-card-body {
    display: flex;
    flex-direction: column;
    row-gap: 14px;
  }
  .steps-points {
    padding-top: 2rem;
    padding-bottom: 10px;
    .point-text {
      font-size: 1rem;
      /* padding-left: 0.5rem; */
    }
  }
`;

export { DiscourseWebhookStyled };
