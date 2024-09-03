import styled from 'styled-components';

export const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .upload-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .ant-upload-wrapper {
      text-align: end;
    }
    .ant-typography {
      margin-bottom: 4px;
    }
  }
  .upload-section:nth-child(2) {
    margin-top: 1rem;
  }
`;
