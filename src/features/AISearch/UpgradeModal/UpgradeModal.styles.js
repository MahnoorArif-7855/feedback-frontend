import { Modal } from 'antd';
import styled from 'styled-components';

const UpgradeModalStyled = styled(Modal)`
  .upgrade-plan {
    padding: 3rem;
  }
  .plan-title {
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #f28c6f;
    padding-bottom: 8px;
  }
  .plan-updates {
    font-size: 16px;
    display: flex;
    justify-content: center;

    align-items: center;
    font-weight: 600;
  }
`;
export default UpgradeModalStyled;
