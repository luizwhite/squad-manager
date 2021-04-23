import styled, { css } from 'styled-components';
import { NamedProps } from 'react-select/src/Select';
import { SelectInput as Select } from '../Input/SelectInput';

interface FieldProps {
  layout: Array<{
    uid: string;
    formation: number;
  }> | null;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  text-transform: capitalize;
`;

export const FieldContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 147.5%;
  margin-top: 0.875rem;

  border-radius: 0.25rem;
  background-image: linear-gradient(
    to bottom right,
    var(--pink-300) 0%,
    var(--purple-400) 120%
  );
`;

export const CenterLine = styled.div`
  position: absolute;
  top: 50%;
  height: 1px;
  width: 100%;

  opacity: 0.2;
  transform: translateY(-50%);
  background-color: var(--border);
`;

export const CenterCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 8em;
  width: 8em;

  opacity: 0.2;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid var(--border);
`;

export const Field = styled.div<FieldProps>`
  position: absolute;
  display: grid;

  ${({ layout }) =>
    layout
      ? layout[0].formation > 4
        ? css`
            grid-template-rows: 0.11fr 0.39fr 0.195fr 0.195fr 0.11fr;
          `
        : layout[1].formation > 4
        ? css`
            grid-template-rows: 0.11fr 0.195fr 0.39fr 0.195fr 0.11fr;
          `
        : layout[2].formation > 4
        ? css`
            grid-template-rows: 0.11fr 0.195fr 0.195fr 0.39fr 0.11fr;
          `
        : css`
            grid-template-rows: 0.11fr 0.26fr 0.26fr 0.26fr 0.11fr;

            > div img {
              height: 52.5%;
            }
          `
      : css`
          grid-template-rows: 0.11fr 0.26fr 0.26fr 0.26fr 0.11fr;

          > div img {
            height: 52.5%;
          }
        `}

  width: 100%;
  height: 100%;
  padding: 5%;
`;

export const Area = styled.div<{ bigArea?: boolean }>`
  display: grid;
  place-items: center;
  grid-template-columns: 0.25fr 0.5fr 0.25fr;

  ${({ bigArea }) =>
    bigArea &&
    css`
      grid-template-rows: 1fr 1fr;
    `}

  &:not(:last-child) {
    ${({ bigArea }) =>
      !bigArea &&
      css`
        > div {
          margin-top: -40%;
          &:first-child,
          &:last-child {
            margin-top: 0;
          }
        }
      `}

    &:nth-child(2) > div {
      margin-top: -60%;
    }
  }

  &:last-child > div img {
    height: 124%;
  }
`;

export const SelectInput = styled(Select)`
  width: 9rem;
  margin-left: 2.25rem;
  font-size: 0.875rem;
  font-weight: bold;
`;

export const selectInputStyles: NamedProps['styles'] = {
  control: (styles, { isFocused }) => ({
    ...styles,
    borderColor: !isFocused ? 'var(--border-input)' : 'transparent',
    height: '1.875rem',
    minHeight: '1.875rem',
    boxShadow: isFocused ? '0 0 0 2px var(--purple-400)' : 'none',
    transition: 'box-shadow none',

    ':hover': {
      ...styles[':hover'],
      borderColor: !isFocused ? 'var(--purple-400)' : 'transparent',
    },
  }),

  menu: (styles) => ({
    ...styles,
    marginTop: 4,
    zIndex: 10,
  }),

  placeholder: (styles) => ({
    ...styles,
    fontWeight: 'normal',
  }),

  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isDisabled
      ? 'white'
      : isSelected
      ? 'var(--purple-400)'
      : isFocused
      ? 'rgba(var(--purple-400-rgb), 0.1)'
      : 'white',
  }),

  dropdownIndicator: (styles) => ({
    ...styles,
    color: 'inherit',

    ':hover': {
      ...styles[':hover'],
      color: 'var(--purple-400)',
    },
  }),

  container: (styles) => ({
    ...styles,
    height: '1.875rem',
  }),

  indicatorsContainer: (styles) => ({
    ...styles,
    height: '1.875rem',
  }),

  indicatorSeparator: (styles) => ({
    ...styles,
    marginTop: 0,
    marginBottom: 2,
  }),

  valueContainer: (styles) => ({
    ...styles,
    height: '1.875rem',
  }),
};
