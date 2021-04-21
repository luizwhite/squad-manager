import styled from 'styled-components';

export const RadioMainLabel = styled.p`
  display: block;
  font-weight: bold;
  margin-bottom: 0.75rem;
`;

export const OptionsContainer = styled.div`
  > span {
    display: inline-grid;
    align-items: center;
    justify-content: start;
    grid-template-columns: min-content auto;
    grid-gap: 0.5em;
    vertical-align: middle;

    width: 5.625rem;
    font-size: 1rem;

    > span {
      display: grid;
      place-items: center;
      position: relative;
      width: 1em;
      height: 1em;

      border-radius: 50%;
      border: 0.1em solid var(--border-input);

      &::before {
        content: '';
        width: 0.6em;
        height: 0.6em;
        box-shadow: inset 0 0 0.6em #873582;
        border-radius: 50%;
        transition: 120ms transform ease-in-out;
        transform: scale(0);
      }
    }

    input[type='radio'] {
      opacity: 0;
      position: absolute;
      width: 1em;
      height: 1em;
      z-index: 1;

      &:active + span {
        background-color: rgba(135, 53, 130, 0.2);
      }

      &:focus + span {
        border-color: var(--purple-400);
        border-width: 0.2em;
      }

      &:checked {
        & + span + label {
          color: var(--purple-400);
        }

        & + span::before {
          transform: scale(1);
        }

        &:focus + span::before {
          transform: scale(0.6);
        }
      }

      &:hover + span {
        border-color: var(--purple-400);
      }
    }

    label {
      line-height: 1;
    }
  }
`;
