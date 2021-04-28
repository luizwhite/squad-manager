import { createContext, useCallback, useContext, useState } from 'react';

interface Player {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  nationality: string;
  age: number;
  height: string;
  photo: string;
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
  players: Player[];
  savePosition: (area: Area, position: number, player: Player) => void;
  setupTeam: (team: TeamFormation) => void;
  clearFormation: () => void;
}

const TeamFormationContext = createContext({} as TeamFormationContextData);

const TeamFormationProvider: React.FC = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamFormation, setTeamFormation] = useState<TeamFormation>(() => {
    const formation = localStorage.getItem('@SquadTool:team');

    if (formation) {
      const newPlayers: Player[] = [];
      Object.entries(JSON.parse(formation) as TeamFormation).forEach(
        ([, pos]: [string, Position]) =>
          Object.entries(pos).forEach(([, p]: [string, Player]) => {
            newPlayers.push(p);
          }),
      );
      setPlayers(newPlayers);

      return JSON.parse(formation) as TeamFormation;
    }

    return {} as TeamFormation;
  });

  const setupTeam = useCallback((team: TeamFormation) => {
    setTeamFormation(team);

    const newPlayers: Player[] = [];
    Object.entries(team).forEach(([, position]: [string, Position]) =>
      Object.entries(position).forEach(([, player]: [string, Player]) => {
        newPlayers.push(player);
      }),
    );
    setPlayers(newPlayers);
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

      const newPlayers: Player[] = [];
      Object.entries(formation).forEach(([, pos]: [string, Position]) =>
        Object.entries(pos).forEach(([, p]: [string, Player]) => {
          newPlayers.push(p);
        }),
      );
      setPlayers(newPlayers);
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
      value={{
        teamFormation,
        players,
        setupTeam,
        savePosition,
        clearFormation,
      }}
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
