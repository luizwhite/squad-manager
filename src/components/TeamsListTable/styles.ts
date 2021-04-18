import styled, { css } from 'styled-components';

export const Container = styled.table<{ selectedRow: number | null }>`
  width: 100%;
  padding: 0 0.5rem;
  margin-top: 1.875rem;
  text-align: left;
  border-spacing: 0;

  thead {
    th {
      padding: 0.625rem 0.875rem 0.625rem 1.625rem;
      font-weight: bold;

      & + th {
        border-left: 1px solid var(--border);
      }

      > div {
        display: flex;

        > svg {
          margin-left: auto;
        }
      }
    }
  }

  tbody {
    &::before {
      content: '';
      display: block;
      height: 1rem;
    }

    tr {
      cursor: pointer;

      td {
        padding: 1.25rem 1.625rem;
        border-bottom: 1px solid var(--border);
        font-weight: bold;
        vertical-align: middle;

        &:first-child {
          width: 10.625rem;
        }

        &:last-child {
          display: flex;
          align-items: center;
        }

        > div {
          display: inline;
          margin-left: auto;

          > div {
            display: inline-block;

            & + div {
              margin-left: 0.625rem;
            }
          }

          button {
            line-height: 0;

            &:first-child {
              margin-right: -2px;
            }
          }
        }
      }
    }
  }

  ${({ selectedRow }) =>
    selectedRow &&
    css`
      tbody tr:nth-child(${selectedRow - 1}) td {
        border-bottom: 1px solid transparent;
      }

      tbody tr:nth-child(${selectedRow}) td {
        background-color: var(--pink-000);
        color: var(--pink-300);
        border-bottom: 1px solid transparent;

        &:first-child {
          border-radius: 0.5rem 0 0 0.5rem;
        }

        &:last-child {
          border-radius: 0 0.5rem 0.5rem 0;
        }
      }
    `}
`;
