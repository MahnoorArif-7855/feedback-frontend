import { PREMIUM_PLAN } from '@/common/utils/constant';
import { Card } from 'antd';
import styled, { css } from 'styled-components';

const PriceStyled = styled.div`
  .price-header {
    font-size: 41px;
    display: flex;
    justify-content: center;
    padding: 5rem;
    color: #000000;

    font-weight: 500;
  }
`;
const BillingPortalCardStyled = styled(Card)`
  margin: 0rem 5rem 3rem;
  .plan-title {
    font-size: 16px;
    font-weight: bold;
  }
`;

const SubscriptionCardStyled = styled(Card)`
  /* id!=='premium'? 600 : 650, */

  min-height: 700px;
  box-shadow: 5px 8px 12px 5px #00000006;
  border-top: 10px solid #f28c6f;

  .ant-card-head {
    /* background: ${({ theme }) => theme.token.colorPrimary}; */
    text-align: center;
    color: white;
  }
  /* ${(props) =>
    props.cardPlan === PREMIUM_PLAN &&
    css`
      border-top: none;
      margin-top: -3rem;
      min-height: 650px;
      @media screen and (max-width: 992px) {
        margin-top: 1rem;
      }
    `} */

  .subscribe-plan-status {
    display: flex;
    font-size: 24px;

    justify-content: center;
    font-weight: 700;
    padding-top: 9px;
  }
  .plan-detail {
    display: flex;
    font-size: 16px;

    color: black;
    padding-top: 24px;
  }
  .billing-price {
    font-size: 32px;

    display: flex;
    justify-content: center;
    font-weight: 600;
    color: #f28c6f;
    padding-top: 9px;
    align-items: center;
    gap: 2%;
  }

  .billing-status {
    font-size: 14px;
    color: #000000;
    opacity: 35%;
    display: inline-block;
    line-height: 19px;
  }
  .features {
    padding: 0rem 2rem;
    .feature-text {
      color: #000000;
      font-size: 16px;
      line-height: 22px;
      font-weight: 400;
    }
  }

  .plan-feature {
    margin-top: 3rem;
    padding: 0rem 2rem;
    .plan-feature-list {
      align-items: flex-start;
      margin-top: 18px;
      display: flex;
      .plan-feature-lable {
        color: #000000;
        font-size: 16px;
        line-height: 22px;
        font-weight: 400;
        padding-left: 9px;
      }
    }
  }

  .check-icon {
    min-inline-size: fit-content;
  }
  .card-plan-button {
    display: flex;
    justify-content: center;
    bottom: 3rem;
    position: absolute;
    width: 100%;
  }
`;

const CardStyled = styled.div`
  padding: 2rem 5rem;
  @media (max-width: 768px) {
    padding: 0rem 1rem;
  }
`;

export { PriceStyled, BillingPortalCardStyled, SubscriptionCardStyled, CardStyled };
