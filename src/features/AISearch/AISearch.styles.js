import { AI_CHAT_INPUT, AI_CHAT_OUTPUT } from '@/common/utils/constant';
import styled from 'styled-components';

const AICardStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-bottom: 1rem;
  margin-top: 1rem;
  flex-direction: column;
  background-color: white;

  .output-section {
    min-height: calc(100vh - 34rem);
    flex-direction: column;
    display: flex;
  }
  .input-title {
    display: flex;
    justify-content: center;
    color: #282b3f;

    font-size: 1rem;
    font-weight: 600;
    padding: 11px 0px 1px;
  }

  .input-section {
    background-color: white;
    display: flex;
    flex-direction: column;
    position: sticky;
    bottom: 0;
    margin: 1rem 10px;
    padding-bottom: 16xpx;
    padding-top: 16px;
    border-top: 1px solid #eeeeee;
    display: flex;
    flex-direction: row;
    gap: 1%;
    .input-textbox {
      border: 1px solid #eeeeee;
      width: 100%;
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
      border-color: #d9d9d9;
      border-radius: 6px;
      padding: 7px;

      &:hover {
        color: #ffb69e;
        border-color: #ffb69e;
      }
    }
    .send-button {
      height: auto;
      width: auto;
      padding: 10px;
    }
  }
  .search-header {
    padding: 2rem;
  }

  .search-limit {
    padding: 0px 12px;
    text-align: center;
    font-size: 12px;
    color: #777;
  }
`;

const SearchBoxStyled = styled.div`
  .ant-typography {
    margin: 3px;
  }
  display: flex;
  gap: 14px;
  padding: 1rem;
  flex-direction: row;
  flex-direction: ${(props) => props.displayType === AI_CHAT_INPUT && 'row-reverse'};
  &:first-child {
    margin-top: 0px;
  }
  .robot-avatar {
    height: 2rem;
  }
  .loading-box {
    border: 1px solid #eeeeee;
    border-radius: 12px;
    padding: 5px 1rem;
  }

  .text-box {
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: flex-start;
    padding: 9px 14px;
    background: #f28c6f33;
    background: ${(props) => props.displayType === AI_CHAT_INPUT && '#ffff'};
    border: ${(props) => props.displayType === AI_CHAT_INPUT && '1px solid #EEEEEE'};
    border-radius: 12px;
    max-width: 92%;
    font-size: 14px;

    .text-ai-search {
      padding-right: ${(props) => props.displayType === AI_CHAT_OUTPUT && '1rem'};
      overflow: auto;
    }

    .reference-link {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      .ant-collapse-header {
        padding: 0px;
      }
    }
  }
`;

const DefaultSearchViewStyled = styled.div`
  .heading-ai-search {
    text-align: center;

    .sub-heading-wrapper {
      margin-top: 2.5rem;
      .second-heading {
        margin-top: 1rem;
      }
      .sub-heading-text {
        color: #282b3f;

        font-size: 1rem;
        font-weight: 400;
      }
    }
  }
  .feature-section {
    max-width: 600px;
    margin: auto;
    .feature-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 1rem;

      .ai-search-features {
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
          color: ${({ theme }) => theme.token.colorPrimary};
          font-size: 1.2rem;
        }
        .description {
          font-size: 16px;

          font-weight: 400;
        }
      }
    }
  }
`;

export { AICardStyled, SearchBoxStyled, DefaultSearchViewStyled };
