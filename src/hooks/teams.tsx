import { createContext, useCallback, useContext, useState } from 'react';
import { TeamFormation } from './teamFormation';

export interface Team {
  id: number;
  name: string;
  type: string;
  description: string;
  website: string;
  formation: string;
  team: TeamFormation;
}

interface TeamsContextData {
  teams: Team[];
  addTeam: (team: Omit<Team, 'id'>) => void;
  deleteTeam: (id: number) => void;
  getTeam: (id: number) => Team | null;
}

const TeamsContext = createContext({} as TeamsContextData);

const TeamsProvider: React.FC = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  let id = 1;

  const addTeam = useCallback(
    (team: Omit<Team, 'id'>) => {
      teams.push({
        ...team,
        id,
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
      id += 1;
    },
    [id, teams],
  );

  const deleteTeam = useCallback(
    (teamId: number) => {
      setTeams(teams.filter(({ id: tId }) => tId !== teamId));
    },
    [teams],
  );

  const getTeam = useCallback(
    (teamId: number) => teams.find(({ id: tId }) => tId === teamId) || null,
    [teams],
  );

  return (
    <TeamsContext.Provider value={{ teams, addTeam, getTeam, deleteTeam }}>
      {children}
    </TeamsContext.Provider>
  );
};

function useTeams(): TeamsContextData {
  const context = useContext(TeamsContext);

  return context;
}

export { TeamsProvider, useTeams };
