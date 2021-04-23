import styled, { css } from 'styled-components';

interface LabelProps {
  $isFocused: boolean;
  $isErrored: boolean;
}

interface InputContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Label = styled.label<LabelProps>`
  display: block;
  font-weight: bold;
  margin-bottom: 0.75rem;

  ${({ $isFocused }) =>
    $isFocused &&
    css`
      color: var(--purple-400);
      font-weight: bold;
    `}

  ${({ $isErrored }) =>
    $isErrored &&
    css`
      color: var(--emphasis);
      font-weight: bold;
    `}
`;

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  align-items: center;
  width: 100%;

  background-color: transparent;
  border-radius: 0.375rem;
  border: 1px solid var(--border-input);

  ${({ isFilled }) =>
    isFilled &&
    css`
      border-color: var(--gray-800);
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: var(--purple-400);
      box-shadow: inset 0 0 0 1px var(--purple-400);
    `}

  ${({ isErrored, isFocused }) =>
    isErrored
      ? css`
          border-color: var(--border-error);
          box-shadow: inset 0 0 0 1px var(--border-error);

          ${!isFocused &&
          css`
            input,
            textarea {
              color: var(--emphasis);
            }
          `}
        `
      : css`
          &:hover {
            border-color: var(--purple-400);
          }
        `}

  input,
  textarea {
    flex: 1;
    padding: 0.625rem 0.75rem;
    border: 0;
    background-color: transparent;

    &::placeholder {
      color: var(--gray-150);
    }
  }

  button {
    color: var(--purple-400);
    margin-right: 1rem;
    font-size: 0;
    background-color: unset;

    &:hover svg {
      stroke-width: 1;
    }
  }
`;
