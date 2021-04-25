import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams, RouteProps } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { getPlayers } from '../../services/apiSports';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Radio } from '../../components/Input/RadioInput';
import { FootballField } from '../../components/FootballField';
import { DraggablePlayer } from '../../components/DraggablePlayer';

import { useTeams, Team } from '../../hooks/teams';
import { TeamFormation, useTeamFormation } from '../../hooks/teamFormation';

import {
  Container,
  ManagerHeader,
  TeamInfo,
  TeamConfiguration,
  SaveButton,
} from './styles';

interface FormData {
  'team-name': string;
  'team-website': string;
  description: string;
  'team-type': 'Real' | 'Fantasy';
  // tags: string[];
  formation: string;
  team: TeamFormation;
}

interface Data {
  [key: string]: unknown;
  response: Player[];
  paging: {
    current: number;
    total: number;
  };
}

interface Player {
  player: {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: {
      country: string;
    };
    nationality: string;
    height: string;
    weight: string;
  };
}

interface State {
  location: {
    state: {
      team: {
        team: {
          name: string;
        };
        venue: {
          name: string;
        };
      };
      teamPlayers: {
        player: Player['player'];
      }[];
    };
  };
}

const TeamManagement: React.FC<RouteProps & State> = ({ location }) => {
  const formRef = useRef<FormHandles>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [playersList, setPlayersList] = useState<Player[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [invalidSearch, setInvalidSearch] = useState(false);
  const [stateData] = useState<State['location']['state'] | null>(
    () => location.state || null,
  );
  const { addTeam, getMyTeam } = useTeams();
  const { clearFormation, setupTeam } = useTeamFormation();
  const history = useHistory();

  const { id } = useParams<{ id?: string }>();

  const radioOptions = [
    { id: 'real', value: 'real', label: 'Real' },
    { id: 'fantasy', value: 'fantasy', label: 'Fantasy' },
  ];

  const handleSearch = useCallback(() => {
    if (
      invalidSearch &&
      searchRef.current &&
      !searchRef.current.value.includes(searchFilter)
    )
      setInvalidSearch(false);
    else if (invalidSearch) return;

    if (searchRef.current && searchRef.current.value.length >= 4)
      setSearchFilter(searchRef.current.value);
  }, [invalidSearch, searchFilter]);

  const handleSearchEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch],
  );

  const handleSubmit = useCallback(
    (data: FormData) => {
      const { description, formation } = data;

      const team: Omit<Team, 'id' | 'team'> = {
        name: data['team-name'],
        description,
        type: data['team-type'],
        website: data['team-website'],
        formation,
      };

      const teamFormation = localStorage.getItem('@SquadTool:team');

      addTeam({
        ...team,
        team: teamFormation ? JSON.parse(teamFormation) : {},
      });

      clearFormation();
      history.push('/');
    },
    [addTeam, clearFormation, history],
  );

  useEffect(() => {
    const team = getMyTeam(Number(id));

    if (!team && location.pathname !== '/manager') {
      history.push('/manager');
      return;
    }
    if (!formRef.current) return;

    if (id && team) {
      const formData = {
        'team-name': team.name,
        description: team.description,
        'team-website': team.website,
        'team-type': team.type,
        formation: team.formation,
      };

      formRef.current.setData(formData);

      localStorage.setItem('@SquadTool:team', JSON.stringify(team.team));
      setupTeam(team.team);
    } else if (stateData && stateData?.team) {
      const formData = {
        'team-name': stateData?.team.team.name || '',
        description: stateData?.team.venue.name || '',
        'team-website': '',
        'team-type': 'real',
        formation: '3 - 4 - 3',
      };

      formRef.current.setData(formData);

      const realTeam = stateData.teamPlayers.reduce(
        (
          acc: TeamFormation,
          { player }: { player: Player['player'] },
          i: number,
        ) => ({
          ...acc,
          offense: {
            ...acc.offense,
            ...(i < 3
              ? {
                  [`${i + 1}`]: {
                    id: player.id,
                    name: player.firstname + player.lastname,
                    nationality: player.nationality,
                    age: player.age,
                  },
                }
              : {}),
          },
          middle: {
            ...acc.middle,
            ...(i < 7 && i >= 3
              ? {
                  [`${i + 1 - 3}`]: {
                    id: player.id,
                    name: player.firstname + player.lastname,
                    nationality: player.nationality,
                    age: player.age,
                  },
                }
              : {}),
          },
          defense: {
            ...acc.defense,
            ...(i < 10 && i >= 7
              ? {
                  [`${i + 1 - 7}`]: {
                    id: player.id,
                    name: player.firstname + player.lastname,
                    nationality: player.nationality,
                    age: player.age,
                  },
                }
              : {}),
          },
        }),
        {
          offense: {},
          middle: {},
          defense: {},
        },
      );

      localStorage.setItem('@SquadTool:team', JSON.stringify(realTeam));
      setupTeam(realTeam);
    }
  }, [
    formRef,
    getMyTeam,
    history,
    id,
    stateData,
    setupTeam,
    location.pathname,
  ]);

  useEffect(() => {
    const getData = async () => {
      const data = await (getPlayers(searchFilter) as Promise<Data>).catch(
        (err) => {
          console.error(`An error has occured: ${err as string}`);
        },
      );

      if (data) {
        const { response: players } = data;
        if (!players.length) setInvalidSearch(true);
        else setPlayersList(players);
      }
    };
    if (searchFilter.length >= 4)
      getData().catch((err) => {
        console.error(`An error has occured: ${err as string}`);
      });
  }, [searchFilter]);

  return (
    <>
      <Header />
      <Container>
        <ManagerHeader>
          <h1>{!id ? 'Create your team' : 'Update your team information'}</h1>
        </ManagerHeader>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <TeamInfo>
            <h2>Team Information</h2>
            <div>
              <div>
                <Input
                  label="Team name"
                  name="team-name"
                  placeholder="Insert team name"
                  pattern="^\s?([a-zA-Z\u00C0-\u017F]{2,})+(\s[a-zA-Z\u00C0-\u017F]{2,})*\s?$"
                  maxLength={25}
                  title="Type in the team name"
                  required
                />
                <Input
                  text-area
                  label="Description"
                  name="description"
                  maxLength={80}
                />
              </div>
              <div>
                <Input
                  label="Team website"
                  name="team-website"
                  placeholder="http://myteam.com"
                  pattern="^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\\d%_.~+=-]*)?(\#[-a-z\\d_]*)?$"
                  title="Type in the team website URL"
                  required
                />
                <Radio
                  name="team-type"
                  label="Team type"
                  options={radioOptions}
                  required
                />
              </div>
            </div>
          </TeamInfo>
          <TeamConfiguration>
            <h2>Configure Squad</h2>
            <div>
              <div>
                <FootballField title="formation" />
                <SaveButton type="submit">Save</SaveButton>
              </div>
              <div>
                <Input
                  label="Search players"
                  name="player-search"
                  placeholder="Ronaldo"
                  icon={MdSearch}
                  handleSearch={handleSearch}
                  onKeyDown={handleSearchEnter}
                  $ref={searchRef}
                  notFormField
                />
                {searchFilter && (
                  <ul>
                    {playersList.map(({ player }) => (
                      <DraggablePlayer
                        key={player.id}
                        player={player}
                        // onComplete={() => handleDropComplete(player.id)}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </TeamConfiguration>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default TeamManagement;
