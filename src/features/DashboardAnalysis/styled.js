import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DiscoverPageLayout = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;

  .recharts-legend-item-text {
    text-transform: capitalize;
  }

  .ant-card-head-title {
    text-transform: capitalize;
  }
`;

export const AIChatContainer = styled.div`
  background: #fff;
  width: 500px;
  padding: 18px;
  border-left: 1px solid #eee;
  transition: margin-right 0.3s;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  margin-right: ${({ isVisible }) => (isVisible ? 0 : '-500px')};
`;

export const CardsWrapper = styled.div`
  column-count: 3;
  column-gap: 12px;

  @media (max-width: 1450px) {
    column-count: 2;
  }

  > div {
    break-inside: avoid;
    margin-bottom: 12px;
  }
`;

export const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -6px;
  margin-bottom: 12px;
  color: #666;
  font-size: 12px;

  button {
    color: #666;
  }
`;

export const FeedbackItemWrapper = styled.div`
  display: flex;
  align-items: normal;
  border-bottom: 1px solid #f0f0f0;
  margin: 0 -24px;
  padding: 0 24px;
  padding-bottom: 16px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const FeedbackItemCount = styled.div`
  margin-top: 1.5px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: #f3f3f3;
  color: #888;
  font-size: 11px;
  font-weight: 600;
  margin-right: 10px;
`;

export const FeedbackItemText = styled.div`
  color: #363636;
  font-size: 14px;
  line-height: 1.55;
`;

export const FeedbackItemBadge = styled.div`
  display: inline-flex;
  margin-left: 3px;
  font-size: 10px;
  padding: 0px 6px;
  background: #f3f3f3;
  border: 1px solid #d9d9d9;
  border-radius: 100px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

export const FeedbacksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: -4px 0;
`;
