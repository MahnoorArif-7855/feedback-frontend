import styled from 'styled-components';

const FeedbackStyled = styled.div`
  .feedback-dropdowns {
    padding: 2.3rem 0rem;
    display: flex;
    justify-content: flex-start;
    gap: 2%;
    align-items: center;
    @media (max-width: 800px) {
      display: inline-grid;
    }
  }
  .check-box {
    display: grid;
    gap: 6%;
  }
  .feedback-dropdown-text {
    color: black;
    display: flex;
    align-items: center;
    gap: 1rem;
    @media (max-width: 767px) {
      display: contents;
    }
  }
  .feedback-dropdown-text-data {
    font-size: 16px;
    font-weight: 700;
  }
  .feedback-card-container {
    padding: 1rem 0rem;
  }
`;
export default FeedbackStyled;
