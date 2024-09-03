import { Modal } from 'antd';
import styled from 'styled-components';

const UserDetailModalStyled = styled(Modal)`
  .ant-modal-header {
    margin-bottom: 0px;

    .ant-modal-title {
      font-size: 24px;
      color: #111827;
    }
  }
  .ant-input-number {
    width: 100%;
  }
  .delete-icon {
    font-size: 22px;
    cursor: pointer;
    display: flex;
    justify-content: center;
  }
  .description {
    font-size: 14px;
    color: #6b7280;
  }
  .ant-input-lg {
    border-radius: 6px;
    font-size: 16px;
    color: #6b7280;
    padding: 9px 13px;
  }
  .user-info {
    padding: 10px 0px;
  }
  .management-label {
    font-weight: 600;
    display: flex;
    padding: 0px 0px 9px;
    font-size: 16px;
  }
`;

export { UserDetailModalStyled };
