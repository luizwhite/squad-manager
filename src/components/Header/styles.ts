import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: var(--header-height);

  --padding-y: 0.5rem;
  --padding-x: 40px;
  padding: var(--padding-y)
    calc(calc(calc(100% - calc(1280px + ${2.5 * 2}rem)) / 2) + var(--padding-x));

  background-image: linear-gradient(
    to right,
    var(--red-300) 0%,
    var(--violet) 100%
  );

  filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.6));

  > div {
    height: 100%;
    display: flex;
    align-items: center;

    color: white;
    font-weight: bold;
    font-size: 1.125rem;

    & + div {
      font-size: 1rem;
      font-weight: normal;

      > div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: calc(var(--header-height) - calc(2 * var(--padding-y)));
        margin-left: 0.3125rem;

        border-radius: 50%;
        background-color: var(--white);
        color: var(--text);
        font-weight: 900;
        font-size: 1.125rem;
      }
    }

    svg {
      height: 100%;
      width: auto;
      margin-right: 1rem;
    }
  }

  @media (max-width: calc(1280px + ${2.5 * 2}rem)) {
    padding: var(--padding-y) var(--padding-x);
  }
`;
