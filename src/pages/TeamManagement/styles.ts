import styled from 'styled-components';

export const Container = styled.main`
  margin: 2.5rem auto;
  padding-bottom: 5.25rem;
  border-radius: 10px;
  background-color: white;
  filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.15));

  --header-footer-height: calc(var(--footer-height) + var(--header-height));
  min-height: calc(100vh - calc(var(--header-footer-height) + ${2 * 2.5}rem));
  max-width: 1280px;

  div + label,
  div + p {
    margin-top: 1.75rem;
  }
`;

export const ManagerHeader = styled.div`
  display: flex;
  align-items: center;
  height: 5rem;
  padding: 0 2rem;
  border-bottom: 2px solid var(--border);

  h1 {
    font-weight: 900;
    color: var(--title);
    font-size: 1.5rem;
  }
`;

const ManagerInfoBlock = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  & + section {
    margin-top: 3.75rem;
  }

  input,
  textarea {
    outline: none;
  }

  h2 {
    margin-bottom: 2rem;
    text-transform: uppercase;
    text-align: center;
    font-size: 0.875rem;
    color: var(--subtitle);
  }

  > div {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 80%;

    > div {
      width: 45%;
    }
  }
`;

export const TeamInfo = styled(ManagerInfoBlock)``;

export const TeamConfiguration = styled(ManagerInfoBlock)``;

export const SaveButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  margin-top: 1.375rem;

  border-radius: 0.25rem;
  background-image: linear-gradient(
    to bottom,
    var(--violet) 0%,
    var(--purple-400) 100%
  );

  color: white;
  font-weight: bold;
`;
