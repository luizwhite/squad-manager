import { createContext, useCallback, useContext, useState } from 'react';

interface Player {
  id: number;
  name: string;
  nationality: string;
  age: number;
}

interface Position {
  [key: string]: Player;
}

type Area = 'offense' | 'middle' | 'defense';

export interface TeamFormation {
  offense: Position;
  middle: Position;
  defense: Position;
}

interface TeamFormationContextData {
  teamFormation: TeamFormation;
  savePosition: (area: Area, position: number, player: Player) => void;
  setupTeam: (team: TeamFormation) => void;
  clearFormation: () => void;
}

const TeamFormationContext = createContext({} as TeamFormationContextData);

const TeamFormationProvider: React.FC = ({ children }) => {
  const [teamFormation, setTeamFormation] = useState<TeamFormation>(() => {
    const formation = localStorage.getItem('@SquadTool:team');

    if (formation) return JSON.parse(formation) as TeamFormation;

    return {} as TeamFormation;
  });

  const setupTeam = useCallback((team: TeamFormation) => {
    setTeamFormation(team);
  }, []);

  const savePosition = useCallback(
    (area: Area, position: number, player: Player) => {
      const myFormation = localStorage.getItem('@SquadTool:team');
      let parsedFormation: TeamFormation = {} as TeamFormation;
      if (myFormation) parsedFormation = JSON.parse(myFormation);

      const formation = {
        ...(parsedFormation || teamFormation),
        [area]: {
          ...(parsedFormation || teamFormation)[area],
          [String(position)]: player,
        },
      };

      setTeamFormation(formation);
      localStorage.setItem('@SquadTool:team', JSON.stringify(formation));
    },
    [teamFormation],
  );

  const clearFormation = useCallback(() => {
    localStorage.removeItem('@SquadTool:team');
    setTeamFormation({} as TeamFormation);
  }, []);

  // useEffect(() => {
  //   console.log(teamFormation);
  // }, [teamFormation]);

  return (
    <TeamFormationContext.Provider
      value={{ teamFormation, setupTeam, savePosition, clearFormation }}
    >
      {children}
    </TeamFormationContext.Provider>
  );
};

function useTeamFormation(): TeamFormationContextData {
  const context = useContext(TeamFormationContext);

  return context;
}

export { TeamFormationProvider, useTeamFormation };
