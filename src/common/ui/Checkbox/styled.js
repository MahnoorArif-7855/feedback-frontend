import styled from 'styled-components';

const CheckBoxStyled = styled.div`
  .category-title {
    color: rgb(242, 140, 111);
  }
  .checkbox-group {
    padding: 1rem 0rem;
    @media (max-width: 1070px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    @media (max-width: 1070px) {
      margin-inline-start: 0px;
    }
  }
`;

export { CheckBoxStyled };
