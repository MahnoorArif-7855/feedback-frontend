import { Modal } from 'antd';
import styled from 'styled-components';

export const ModalHeaderStyled = styled(Modal)`
  .feedback-detail-title {
    color: #f28c6f;
  }
`;

const ModalStyled = styled.div`
  .feedback-text {
    display: flex;
    font-weight: bold;
    font-size: 16px;
    padding-bottom: 4px;
  }
  .content_text {
    font-size: 14px;
  }
  .content__comment_text {
    font-size: 14px;
    display: flex;
  }
  .alg-highlight {
    color: #f28c6f;
    font-weight: bold;
  }
`;
export default ModalStyled;
