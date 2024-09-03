import styled from 'styled-components';

const DashboardPageTitleStyled = styled.div`
  font-size: 24px;
  color: #000000;
  font-weight: bold;
  padding: 0.4rem 2rem 0rem;

  .sub-header {
    display: flex;
    font-weight: 400;
    font-size: 14px;
    padding-top: 9px;
    color: grey;
  }
`;

const MainPageTitleStyled = styled.div`
  font-size: 41px;
  display: flex;
  justify-content: center;
  padding: 5rem;
  color: #f28c6f;
  font-weight: 700;
`;
export { DashboardPageTitleStyled, MainPageTitleStyled };
