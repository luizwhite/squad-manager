import styled from 'styled-components';

export const PlayerFound = styled.li`
  padding: 1.25rem 1.5rem;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23D0D0D0FF' stroke-width='2' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"),
    linear-gradient(to bottom, transparent 2px, var(--gray-100) 100%);

  background-position: center;

  margin-top: 0.875rem;

  > div {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;

  > div {
    display: flex;

    > span {
      &:first-child {
        font-weight: bold;
      }

      &:last-child {
        color: var(--emphasis);
      }
    }
  }
`;
