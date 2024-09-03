import styled from 'styled-components';

const AnalysisCardStyled = styled.div`
  .blur-dummy-data {
    filter: blur(2.4px);
    -webkit-filter: blur(2.4px);
  }

  .reference-link {
    margin-top: 0;
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;
    .ant-collapse-header {
      padding: 0px;
    }
  }
`;
export { AnalysisCardStyled };
