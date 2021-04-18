import styled from 'styled-components';

interface ContainerProps {
  tooltipColor?: string;
  textColor: string;
}

export const Container = styled.div<ContainerProps>`
  position: relative;

  span {
    padding: 0.5rem 1rem;

    background-color: ${({ tooltipColor }) =>
      tooltipColor ?? 'var(--bg-tooltip)'};
    border-radius: 4px;
    color: ${({ textColor }) => textColor};
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s, visibility 0.4s;

    position: absolute;
    right: 50%;
    top: -12px;
    transform: translate(50%, -100%);

    &::before {
      content: '';
      border-style: solid;
      /* border-color: var(--border) transparent; */
      border-color: #2b2b2b transparent;
      border-width: 6px 6px 0 6px;
      position: absolute;
      right: 50%;
      transform: translateX(50%);
      bottom: calc(-12px + 6px);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
