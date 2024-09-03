import { Card } from 'antd';
import styled from 'styled-components';

const IntercomWeebhookStyled = styled(Card)`
  .ant-card-body {
    display: flex;
    flex-direction: column;
    row-gap: 14px;
  }
  .intercom-url-text {
    display: 'flex';
    align-items: 'center';
    margin: 0;
  }

  .save-intercom-domain {
    display: 'flex';
    align-items: 'center';
    gap: '10px';
    .domian-container {
      display: flex;
      flex-direction: column;
    }
    .domain-space {
      align-items: baseline;
    }
  }
  .access-token-space-container {
    align-items: flex-start;
    .access-token-container {
      display: grid;
    }
  }
  .app-id-input {
    padding: 5px 18px;
    flex-grow: 1;
    width: 500px;
    max-width: 500px;
    box-sizing: border-box;
  }
  @media (max-width: 767px) {
    .app-id-input {
      width: 100%;
      max-width: 100%; /* Full width on smaller screens */
    }
  }
  .steps-points {
    padding-top: 2rem;
    padding-bottom: 10px;
    .point-text {
      font-size: 1rem;
      padding-left: 0.5rem;
    }
  }

  .image {
    border: 1px solid black;
  }
`;

export { IntercomWeebhookStyled };
