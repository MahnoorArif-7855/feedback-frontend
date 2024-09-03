import { Card, Typography } from 'antd';
import styled from 'styled-components';

export const SlackAutoIngestCard = styled(Card)`
  max-width: 1100px;
  margin-bottom: 40px;
  margin-top: 28px;
  margin-left: 20px;
  margin-right: 20px;

  > .ant-card-body {
    padding: 0;
  }
`;

export const CardHeader = styled.div``;

export const CardTitle = styled(Typography.Title)`
  margin: 0.5em 0 0;
`;

export const CardSubtitle = styled(Typography.Paragraph)`
  margin: 0.1em 0 0;
  font-weight: 300;
  line-height: 1;
`;

export const PageContainer = styled.div`
  margin-top: 58px;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: scroll;
`;

export const NavigationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
`;

export const InstructionPanel = styled.div`
  display: flex;
  min-height: 520px;

  > :first-child {
    flex: 1;
    border-right: 1px solid rgba(0, 0, 0, 0.07);
    box-sizing: border-box;
    > div {
      padding: 24px;
      max-width: 400px;
      margin: 0 auto;
    }
  }

  > * {
    flex: 1;
    flex-grow: 1;
    flex-basis: 0;

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .illustration-block {
    background-color: #f6f7fa;
    margin-top: 1px;
    padding: 40px;
  }
`;

export const InstructionButtonsContainer = styled.div`
  width: 50%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;

  > a {
    display: flex;
    width: 100%;
    align-items: center;

    > img {
      margin-right: 8px;
      height: 20px;
    }
  }

  .containerTitle {
    width: 90%;
  }
`;
