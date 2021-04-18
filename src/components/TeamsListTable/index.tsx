import { useCallback, useEffect, useRef } from 'react';
import { Container } from './styles';

interface TeamsListTableProps {
  sorted: string | null;
  selectedRow: number | null;
  setSelectedRow: React.Dispatch<React.SetStateAction<number | null>>;
}

export const TeamsListTable: React.FC<TeamsListTableProps> = ({
  children,
  sorted,
  selectedRow,
  setSelectedRow,
}) => {
  const tableRef = useRef<HTMLTableElement>(null);

  const cleanUp = useCallback(
    (rows) => {
      Array.prototype.forEach.call(
        rows,
        (row: HTMLTableRowElement, i: number) => {
          row.removeEventListener('click', () => setSelectedRow(i + 1));
        },
      );
    },
    [setSelectedRow],
  );

  useEffect(() => {
    const rows = tableRef.current?.querySelectorAll('tbody tr');
    Array.prototype.forEach.call(
      rows,
      (row: HTMLTableRowElement, i: number) => {
        row.addEventListener('click', () => setSelectedRow(i + 1));
      },
    );

    return () => cleanUp(rows);
  }, [cleanUp, setSelectedRow, sorted]);

  return (
    <Container selectedRow={selectedRow} ref={tableRef}>
      {children}
    </Container>
  );
};
