import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FiltersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 24px;
  border-bottom: 1px solid #e8e8e8;
  background-color: #fff;
  flex-direction: column;
  .ant-select-selection-placeholder,
  input::placeholder {
    color: #686872;
  }
`;

export const FilterDropdowns = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
export const FilterDropdownsForCategory = styled.div`
  display: flex;
  gap: 16px;
  width: 49%;
  border-block-end-style: none;
  align-items: center;
  align-self: flex-end;
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const FeedbackStatsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 12px;
  margin-left: 10px;
  button {
    color: #666;
  }
`;
