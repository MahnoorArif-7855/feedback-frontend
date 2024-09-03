import styled from 'styled-components';

export const SiderHeader = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #f1f2f3;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 16px;
`;

export const SiderFlexContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CurrentUserWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #f1f2f3;
  margin: 12px;
  border-radius: 8px;
  padding: 8px 16px;
  gap: 8px;
  font-size: 12px;

  &:hover {
    background-color: #fbfbfb;
  }
`;

export const ContentWrapper = styled.div`
  padding: 20px 24px;
  height: 100%;
  overflow-y: scroll;
`;

export const NarrowContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
