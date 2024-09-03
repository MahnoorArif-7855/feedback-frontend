import { SLACK_BUTTON_INTEGRATION } from '@/common/utils/constant';
import { Button } from 'antd';
import styled, { css } from 'styled-components';

const ButtonStyled = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;
  margin-top: 1rem;

  &&.ant-btn.ant-btn-lg {
    padding: 1.7rem 2.2rem;
  }
  ${(props) =>
    props.variety === SLACK_BUTTON_INTEGRATION &&
    css`
      background-color: black !important;
      color: white !important;
      border: none;
      &:hover {
        background-color: #000000a3 !important;
      }
    `}
`;

export { ButtonStyled };
