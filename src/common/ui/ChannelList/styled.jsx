import styled from 'styled-components';

export const SelectedChannelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    display: block;
    color: #777;
    margin-bottom: 4px;
  }

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;

    code {
      display: inline-block;
      background-color: #f5f5f5;
      color: #777;
      padding: 0px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 300;
    }
  }
`;
