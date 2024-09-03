import styled from 'styled-components';

const WelcomeStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  flex-direction: column;
  padding: 1.5rem;
  margin-top: 1rem;
  @media (max-width: 800px) {
    margin-top: 2rem;
  }
  .welcome-image {
    width: 25%;
    @media (max-width: 800px) {
      width: 60%;
    }
  }
  .welcome-message {
    font-size: 1.8rem;

    @media (max-width: 800px) {
      font-size: 1.5rem;
    }
  }
  .action-button {
    display: flex;
    gap: 10%;
    padding: 2rem;
    @media (max-width: 800px) {
      flex-direction: column;
      margin-top: 1rem;
    }
  }
`;

export { WelcomeStyled };
