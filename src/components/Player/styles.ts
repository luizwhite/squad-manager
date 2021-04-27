import styled, { css } from 'styled-components';

interface ContainerProps {
  $col: number;
  $row?: number;
  $twins?: number;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  height: 100%;
  width: 100%;

  > span,
  > img {
    position: absolute;
    top: 50%;
    left: 50%;

    font-size: 1.25rem;
    color: white;
    font-weight: bold;
    transform: translate(-50%, -50%);
  }

  grid-column: ${({ $col }) => $col} / span 1;

  ${({ $row }) =>
    $row &&
    css`
      grid-row: ${$row} / span 1;
    `}

  ${({ $twins }) =>
    $twins &&
    $twins > 0 &&
    css`
      > img,
      > span {
        left: ${$twins === 1 ? 50 - 35 : 50 + 35}%;
      }
    `}

  ${({ $twins }) =>
    $twins &&
    $twins < 0 &&
    css`
      > img,
      > span {
        left: ${$twins === -1 ? 50 - 25 : 50 + 25}%;
      }
    `}
`;

export const Img = styled.img<{ noHover?: boolean }>`
  height: 70%;
  width: auto;
  z-index: 2;

  ${({ noHover }) =>
    !noHover &&
    css`
      &:hover + span {
        opacity: 1;
        visibility: visible;
      }
    `}
`;

export const DummyImg = styled(Img).attrs({
  src:
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
})`
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%238C66A499' stroke-width='4' stroke-dasharray='5%25%2c 10%25' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"),
    radial-gradient(rgba(255, 255, 255, 0.4) 50%, rgba(0, 0, 0, 0) 51%);
  border-radius: 50%;
`;

export const Details = styled.span`
  position: absolute;
  display: flex;

  min-width: 20rem;
  min-height: 5rem;
  padding: 0.5rem 1rem;

  background-color: var(--bg-tooltip);
  border-radius: 0.25rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;

  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s, visibility 0.4s;
  z-index: 10;

  top: -1rem !important;

  &::before {
    content: '';
    border-style: solid;
    border-color: #2b2b2b transparent;
    border-width: 6px 6px 0 6px;
    position: absolute;
    transform: translateX(50%);
    right: 50%;
    bottom: -6px;
  }

  > div {
    display: flex;
    height: 100%;

    img {
      height: 5rem;
      border-radius: 50%;
      align-self: center;
    }

    > div {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      flex: 1;

      margin-left: 0.875rem;

      > span {
        font-weight: bold;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }

      > div {
        display: flex;
        flex-direction: column;

        > span {
          font-weight: normal;
          font-size: 0.75rem;
          color: white;

          > span {
            font-weight: bold;
          }
        }
      }
    }
  }
`;
