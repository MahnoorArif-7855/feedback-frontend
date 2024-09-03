import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;

  align-items: center;
  height: 100vh;
  flex-direction: row;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  height: 100%;
  padding: 24px 48px;
  flex: 0.45;
  max-width: 600px;

  a img:hover {
    opacity: 0.6;
  }
`;

export const ImageWrapper = styled.div`
  flex: 1;
  background-color: #f1ecea;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: #888;
  a:hover {
    color: #000;
  }
`;

export const LegalText = styled.p`
  font-size: 12px;
  line-height: 1.4;
  color: #888;
  margin-top: 12px;
  a {
    color: #000;
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  h1 {
    color: #777;
    font-size: 22px;
    margin-bottom: 24px;
    font-weight: 500;
  }
  img {
    user-drag: none;
    pointer-events: none;
  }
`;
