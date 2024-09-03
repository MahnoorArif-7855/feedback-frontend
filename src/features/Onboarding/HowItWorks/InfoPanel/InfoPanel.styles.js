import { Modal } from 'antd';
import styled from 'styled-components';

export const InfoPanelImagePlaceholder = styled.div`
  width: 100%;
  height: 168px;
  background: rgba(217, 217, 217, 0.3);
  border-radius: 20px;
  margin-bottom: 30px;
`;

export const InfoPanelContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 55px;
  margin-top: 55px;
  margin-bottom: 100px;
`;

export const VideoModal = styled(Modal)`
  .ant-modal-content {
    padding: 0;
    position: relative;
    overflow: hidden;
  }
`;
