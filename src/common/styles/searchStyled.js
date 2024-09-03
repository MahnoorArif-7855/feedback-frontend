import styled from 'styled-components';

const DashboardSearchStyled = styled.div`
  .dashboard-search {
    margin-bottom: 24px;
  }
  .enter-button {
    display: flex;
    justify-content: end;
  }
  .upgrade-plan {
    padding-bottom: 2rem;
  }

  .ant-radio-button-wrapper:last-child {
    width: 25%;
    justify-content: center;
    display: flex;
    @media (max-width: 800px) {
      width: 100%;
    }
  }
  .ant-radio-group {
    display: flex;
    justify-content: center;
  }
  .ant-radio-button-wrapper:first-child {
    width: 25%;
    justify-content: center;
    display: flex;
    @media (max-width: 800px) {
      width: 100%;
    }
  }
  .ant-radio-group {
    margin-bottom: 18px;
  }
  .steps-points {
    padding-top: 2rem;
    padding-bottom: 10px;
    .point-text {
      font-size: 1rem;
      padding-left: 0.5rem;
    }
  }
`;

export { DashboardSearchStyled };
