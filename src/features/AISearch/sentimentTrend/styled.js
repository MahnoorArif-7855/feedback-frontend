import styled from 'styled-components';

const SentimentTrendCard = styled.div`
  background: rgba(191, 118, 113, 0.5);
  border-radius: 5px;
  padding: 3em 2em 2em 3em;
  min-height: 22.5rem;

  .sentiment-heading {
    font-size: 18px;
    font-weight: 500;
  }

  .icon {
    text-align: center;
  }

  .icon-up {
    text-align: center;
    color: #3f8a41;
    font-size: 150px;
  }

  .icon-down {
    text-align: center;
    color: #bf2a19;
    font-size: 150px;
  }

  .sentiment-content {
    margin-top: 3em;
  }

  .sentiment-content-heading {
    font-size: 14px;
    font-weight: 400;
    margin-right: 2em;
  }

  .sentiment-content-container {
    margin-bottom: 1em;
  }

  .blur-sentiment-dummy-data {
    filter: blur(2.4px);
    -webkit-filter: blur(2.4px);
    width: 100%;
    height: 285px;
  }
`;
const SentimentCardStyled = styled.div`
  .sentiment-heading {
    font-size: 18px;
    font-weight: 500;
  }

  .blur-sentiment-dummy-data {
    filter: blur(2.4px);
    -webkit-filter: blur(2.4px);
    width: 100%;
    height: 285px;
  }
`;
export { SentimentTrendCard, SentimentCardStyled };
