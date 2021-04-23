import { Team } from '../hooks/teams';

export const sortList = (
  teams: Team[],
  sortBy: string,
  sortState: string | null,
  setSortState: React.Dispatch<React.SetStateAction<string | null>>,
): void => {
  teams.sort(
    (
      { name: aName, description: aDesc },
      { name: bName, description: bDesc },
    ) => {
      if (sortBy === 'by-name') {
        if (sortState === 'by-name-asc') {
          setSortState('by-name-desc');
          return aName > bName ? -1 : aName < bName ? 1 : 0;
        }
        setSortState('by-name-asc');
        return aName < bName ? -1 : aName > bName ? 1 : 0;
      }

      if (sortBy === 'by-description') {
        if (sortState === 'by-description-asc') {
          setSortState('by-description-desc');
          return aDesc > bDesc ? -1 : aDesc < bDesc ? 1 : 0;
        }
        setSortState('by-description-asc');
        return aDesc < bDesc ? -1 : aDesc > bDesc ? 1 : 0;
      }

      setSortState(null);
      return 0;
    },
  );
};
