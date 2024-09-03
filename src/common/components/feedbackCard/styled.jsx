import styled from 'styled-components';

const FeedbackCardStyled = styled.div`
  display: flex;
  cursor: pointer;

  .feedback-text {
    color: #646464;
    font-weight: 400;
    display: flex;
    text-align: center;
    font-size: 16px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    .alg-highlight {
      color: #f28c6f;
    }
  }
  .feedback-date {
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    display: flex;
    justify-content: center;
    opacity: 70%;
    position: absolute;
    width: 85%;
    bottom: 15px;
    align-items: center;
    gap: 3%;
  }

  .feedback-source {
    font-weight: 400;
    font-size: 12px;
    color: #000000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: 70%;
    position: absolute;
    bottom: 45px;
    align-items: center;
    gap: 10%;
    width: 90%;

    .feedback-source-text {
      margin-bottom: 5px;
    }
  }

  .verified-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    color: green;
    font-size: 21px;
  }

  .feedback-category {
    color: #f28c6f;
    font-weight: 600;
    font-size: 16px;
    padding: 0px 0px 8px;
    gap: 3%;
    width: 100%;
    align-items: center;
    display: flex;
  }
  .modal-icon {
    &:hover {
      color: ${({ theme }) => theme.token.colorPrimary};
    }
  }

  .icons-content {
    display: flex;
  }

  .delete-icon {
    &:hover {
      color: ${({ theme }) => theme.token.colorPrimary};
    }
    margin-left: 6px;
  }
  .feedback-heading {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  .score-certainty {
    align-items: center;
    text-align: center;
    margin-top: 1rem;
  }
`;
export default FeedbackCardStyled;
