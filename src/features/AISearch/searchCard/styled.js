import styled from 'styled-components';

const TrendingTopicStyled = styled.div`
  overflow: auto;

  .blur-dummy-data {
    filter: blur(2.4px);
    -webkit-filter: blur(2.4px);
  }

  .reference-link {
    margin-top: 0;
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;
    .ant-collapse-header {
      padding: 0px;
    }
  }
`;
const PieChartStyled = styled.div`
  min-height: 19.5rem;
  width: 100%;
  height: 285px;
  .blur-sentiment-dummy-data {
    filter: blur(2.4px);
    -webkit-filter: blur(2.4px);
    width: 100%;
    height: 285px;
  }
`;
export { TrendingTopicStyled, PieChartStyled };
