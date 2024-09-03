import styled from 'styled-components';

const BillingStyled = styled.div`
  .plan-title {
    color: #f28c6f;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
  .plan {
    padding: 12px 0px;
  }
  .plan-card {
    margin: 20px 6px;
  }
  .plan-des-container {
    padding: 13px 0px;
  }
  .plan-desc {
    color: gray;
    font-size: 14px;
    font-weight: 400;
  }
  .upgrade-plan {
    display: flex;
    justify-content: end;
    padding: 1px 13px 1px;
  }
  .progress-bar {
    padding-top: 20px;
  }
  .monthly-plan {
    border: 1px solid #fff6f3;
    border-radius: 24px;
    width: 6rem;
    display: flex;
    justify-content: center;
    background: #fff6f3;
    font-size: 15px;

    color: #f28c6f;
  }
  .basic-plan {
    display: flex;
    align-items: center;
    gap: 3%;
  }
`;
export default BillingStyled;
