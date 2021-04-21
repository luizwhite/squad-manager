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

  span,
  img {
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
      img,
      span {
        /* transform: ${$twins === 1
          ? 'translateX(-70%)'
          : 'translateX(70%)'}; */
        left: ${$twins === 1 ? 50 - 35 : 50 + 35}%;
      }
    `}

  ${({ $twins }) =>
    $twins &&
    $twins < 0 &&
    css`
      img,
      span {
        /* transform: ${$twins === -1
          ? 'translateX(-55%)'
          : 'translateX(55%)'}; */
        left: ${$twins === -1 ? 50 - 25 : 50 + 25}%;
      }
    `}
`;

export const Img = styled.img`
  height: 70%;
  width: auto;
`;

export const DummyImg = styled(Img).attrs({
  src:
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
})`
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%238C66A499' stroke-width='4' stroke-dasharray='5%25%2c 10%25' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"),
    radial-gradient(rgba(255, 255, 255, 0.4) 50%, rgba(0, 0, 0, 0) 51%);
  border-radius: 50%;
`;
