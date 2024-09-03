import { Modal } from 'antd';
import styled from 'styled-components';

const ChannelModalStyled = styled(Modal)`
  .title {
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #f28c6f;
    padding-bottom: 8px;
  }
  .updates {
    font-size: 16px;
    display: flex;
    justify-content: center;

    align-items: center;
    font-weight: 600;
  }

  .channelDropdown {
    margin-top: 2em;s
  }
`;
export default ChannelModalStyled;
