import styled from 'styled-components';

const GettingStartedStyled = styled.div`
  text-align: center;
  .started-main {
    grid-column-gap: 24px;
    .guide-nav {
      background-color: transparent;
      border: none;

      .nav-text {
        flex-direction: column;
        display: flex;
        text-align: start;
        cursor: pointer;
        .guide-nav-link {
          width: 100%;
          margin-bottom: 20px;
          font-size: 15px;
          font-weight: 700;
          color: #222;
          text-align: left;
          padding-left: 1rem;
          border-radius: 0;
        }
        .guide-nav-link:last-child {
          margin-bottom: 0px;
        }
      }
      .highlight {
        color: #000;
        background-color: #fff;
        border-left: 5px solid ${({ theme }) => theme.token.colorPrimary};
        border-radius: 12px;
        padding: 1rem;
      }
    }
    .feedback-keys {
      text-align: left;
      .image-container {
        text-align: center;
      }
    }
    .add-feedback {
      color: #000;
      font-size: 28px;
      font-weight: 700;
      line-height: 54px;
      .userSettings-image {
        width: 100%;
        height: 100%;
      }
    }
    .feedback-paragraph {
      color: #000;
      margin-bottom: 20px;
      font-size: 20px;
      line-height: 30px;
      .getting-started-points {
        margin-left: 1rem;
        padding-top: 5px;
      }
    }
  }
`;
export default GettingStartedStyled;
