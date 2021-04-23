import styled from 'styled-components';

export const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 22rem auto 1fr;
  gap: 1.25rem 3rem;
  grid-template-areas:
    'my-teams top-ranking'
    'my-teams most-less-picked'
    'my-teams most-less-picked';
  align-content: center;

  --header-footer-height: calc(var(--footer-height) + var(--header-height));

  height: auto;
  min-height: calc(100vh - var(--header-footer-height));
  max-width: calc(1280px + ${2.5 * 2}rem);
  padding: 2.5rem;

  section {
    border-radius: 10px;
    background-color: white;
    filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.15));
  }
`;

export const TeamsList = styled.section`
  grid-area: my-teams;
`;

export const TeamsListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  padding-right: 1.25rem;
  padding-left: 2rem;
  border-bottom: 2px solid var(--border);

  h1 {
    font-weight: 900;
    color: var(--title);
    font-size: 1.5rem;
  }

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.25rem;
    width: 2.25rem;
    padding-bottom: 1px;

    border-radius: 0.625rem;
    background-image: linear-gradient(
      to bottom right,
      var(--pink-300) 0%,
      var(--purple-400) 150%
    );
    box-shadow: 0 0.6px 1.7px rgba(var(--pink-300-rgb), 0.112),
      0 1.3px 4px rgba(var(--pink-300-rgb), 0.162),
      0 2.5px 7.5px rgba(var(--pink-300-rgb), 0.2),
      0 4.5px 13.4px rgba(var(--pink-300-rgb), 0.238),
      0 8.4px 25.1px rgba(var(--pink-300-rgb), 0.288),
      0 20px 60px rgba(var(--pink-300-rgb), 0.4);

    color: white;
    font-weight: normal;
    font-size: 1.75rem;

    transition: box-shadow 0.2s, filter 0.2s;

    &:hover {
      box-shadow: 0 0.6px 1.7px rgba(var(--pink-300-rgb), 0.169),
        0 1.3px 4px rgba(var(--pink-300-rgb), 0.242),
        0 2.5px 7.5px rgba(var(--pink-300-rgb), 0.3),
        0 4.5px 13.4px rgba(var(--pink-300-rgb), 0.358),
        0 8.4px 25.1px rgba(var(--pink-300-rgb), 0.431),
        0 20px 60px rgba(var(--pink-300-rgb), 0.6);

      filter: brightness(1.1);
    }

    > div {
      white-space: nowrap;
      width: 100%;

      a {
        display: block;
        width: 100%;
      }
    }
  }
`;

export const TopRanking = styled.section`
  grid-area: top-ranking;
`;

export const TopRankingHeader = styled.div`
  display: flex;
  align-items: center;
  height: 5rem;
  padding-right: 1.25rem;
  padding-left: 2rem;
  border-bottom: 2px solid var(--border);

  h1 {
    font-weight: 900;
    color: var(--title);
    font-size: 1.5rem;
  }
`;

export const TopRankingContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.375rem;

  padding: 1.5625rem 1.375rem 1.375rem;
  height: calc(100% - 5rem);

  > div {
    display: flex;
    flex-direction: column;

    h1 {
      font-size: 1rem;
      margin-bottom: 0.625rem;
    }

    > div {
      display: grid;
      grid-template-rows: repeat(5, 1fr);
      gap: 0.25rem;

      padding: 0.25rem;
      flex: 1;

      background-color: var(--bg-gray);
      border-radius: 0.625rem;

      > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1.25rem;

        border-radius: 0.375rem;
        background-color: white;
        font-size: 0.875rem;

        transition: box-shadow 0.2s;
        cursor: pointer;
        z-index: 2;

        &:hover {
          box-shadow: inset 0 0 0 2px var(--purple-400) !important;
        }

        span {
          font-weight: bold;
        }
      }
    }
  }

  > div > div > div:first-child {
    box-shadow: inset 0 0 0 1px var(--emphasis);
  }
`;

export const PickedRank = styled.section`
  grid-area: most-less-picked;

  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;

  height: 18rem;

  background-image: linear-gradient(
    to bottom,
    var(--pink-300) 0%,
    var(--purple-400) 100%
  );

  > div {
    position: relative;

    height: 9rem;
    width: 9rem;
    margin-right: 3.5rem;
    margin-top: calc(1.375rem + 1.5rem);

    border-radius: 50%;
    background-color: white;
    font-size: 1.25rem;
    color: white;

    &:first-child {
      border: 3px solid var(--violet);
    }

    &:last-child {
      border: 2px solid var(--red-200);
    }

    h1,
    span {
      position: absolute;
      white-space: nowrap;
    }

    h1 {
      top: -1.375rem;
      transform: translateY(-100%);

      font-size: 1.5rem;
    }

    span {
      left: 100%;
      position: relative;

      &::after {
        content: '';

        display: block;
        height: 1px;
        width: 3.5rem;
        background-color: white;
      }
    }
  }
`;
