import styled from 'styled-components';

const OrganizationListBox = styled.div`
  margin-top: 0rem;
  .ant-card-body {
    padding: 0px !important;
  }
  .tool-list-name {
    font-size: 14;
    padding: 2px;
    cursor: pointer;
    padding: 2px 10px;
    font-weight: 600;

    .active {
      font-size: 16px;
      color: #f28c6f;
    }
  }
`;
const OrganizationsBox = styled.div`
  .search-title {
    display: flex;
    justify-content: center;
    font-size: 18px;
    font-weight: bolder;
    color: #f28c6f;
    margin-bottom: 1rem;
  }
  .org-title {
    margin: 0 !important;
  }
`;

export { OrganizationListBox, OrganizationsBox };
