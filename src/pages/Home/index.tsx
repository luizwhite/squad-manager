import { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdDelete, MdShare, MdModeEdit } from 'react-icons/md';
import { FaSort } from 'react-icons/fa';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { TeamsListTable } from '../../components/TeamsListTable';
import Tooltip from '../../components/Tooltip';
import { useTeams, Team } from '../../hooks/teams';

import {
  Container,
  TopRanking,
  TeamsList,
  TeamsListHeader,
  TopRankingHeader,
  TopRankingContent,
  PickedRank,
} from './styles';

const Home: React.FC = () => {
  // const [teams, setTeams] = useState([
  //   {
  //     id: 1,
  //     name: 'Barcelona',
  //     description: 'Barcelona Squad',
  //   },
  //   {
  //     id: 2,
  //     name: 'Real Madrid',
  //     description: 'Real Madrid Squad',
  //   },
  //   {
  //     id: 3,
  //     name: 'Milan',
  //     description: 'Milan Squad',
  //   },
  //   {
  //     id: 4,
  //     name: 'Liverpool',
  //     description: 'Liverpool Squad',
  //   },
  //   {
  //     id: 5,
  //     name: 'Bayern Munich',
  //     description: 'Bayern Munich Squad',
  //   },
  //   {
  //     id: 6,
  //     name: 'Lazio',
  //     description: 'Lazio Squad',
  //   },
  // ]);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [sortState, setSortState] = useState<string | null>(null);
  const { teams, deleteTeam } = useTeams();
  const history = useHistory();

  const handleDeleteTeam = useCallback(
    (id: number) => {
      deleteTeam(id);
      setSelectedRow(null);
    },
    [deleteTeam],
  );

  const handleEditTeam = useCallback(
    (id: number) => {
      history.push(`/manager/${id}`);
    },
    [history],
  );

  const handleSort = useCallback(
    (sortBy: string) => {
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

      if (selectedTeam) setSelectedRow(teams.indexOf(selectedTeam) + 1);
    },
    [selectedTeam, sortState, teams],
  );

  useEffect(() => {
    if (selectedRow && teams) setSelectedTeam(teams[selectedRow - 1]);
  }, [selectedRow, teams]);

  useEffect(() => {
    // const myHeaders = new Headers();
    // myHeaders.append('x-rapidapi-key', '8f3d9ad1a73cb976c052e6390d2f0de2');
    // myHeaders.append('x-rapidapi-host', 'v3.football.api-sports.io');
    // const requestOptions = {
    //   method: 'GET',
    //   headers: myHeaders,
    //   redirect: 'follow' as RequestRedirect,
    // };
    // fetch(
    //   'https://v3.football.api-sports.io/players?league=39&season=2020',
    //   requestOptions,
    // )
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log('error', error));
  }, []);

  return (
    <>
      <Header />
      <Container>
        <TeamsList>
          <TeamsListHeader>
            <h1>My teams</h1>
            <button type="button">
              <Tooltip title="Create new team">
                <Link to="/manager">+</Link>
              </Tooltip>
            </button>
          </TeamsListHeader>
          <TeamsListTable
            {...{ selectedRow, setSelectedRow, sorted: sortState }}
          >
            <thead>
              <tr>
                <th>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSort('by-name')}
                    onKeyDown={() => {}}
                  >
                    Name
                    <FaSort />
                  </div>
                </th>
                <th>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSort('by-description')}
                    onKeyDown={() => {}}
                  >
                    Description
                    <FaSort />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {teams.length ? (
                teams.map((team, i) => (
                  <tr key={team.id}>
                    <td>
                      <div>{team.name}</div>
                    </td>
                    <td>
                      <div>
                        <div>{team.description}</div>
                        {selectedRow === i + 1 && (
                          <div>
                            <Tooltip title="Delete">
                              <button
                                onClick={() => handleDeleteTeam(team.id)}
                                type="button"
                              >
                                <MdDelete />
                              </button>
                            </Tooltip>
                            <Tooltip title="Share">
                              <button type="button">
                                <MdShare />
                              </button>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <button
                                onClick={() => handleEditTeam(team.id)}
                                type="button"
                              >
                                <MdModeEdit />
                              </button>
                            </Tooltip>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td />
                  <td />
                </tr>
              )}
            </tbody>
          </TeamsListTable>
        </TeamsList>
        <TopRanking>
          <TopRankingHeader>
            <h1>Top 5</h1>
          </TopRankingHeader>
          <TopRankingContent>
            <div>
              <h1>Highest avg age</h1>
              <div>
                <div>
                  Inter Milan
                  <span>31.9</span>
                </div>
                <div>
                  APOEL Nicosia
                  <span>31.7</span>
                </div>
                <div>
                  IAC Milan
                  <span>31.6</span>
                </div>
                <div>
                  Besiktas JK
                  <span>31.4</span>
                </div>
                <div>
                  Olympiacos Piraeus
                  <span>31.3</span>
                </div>
              </div>
            </div>
            <div>
              <h1>Lowest avg age</h1>
              <div>
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          </TopRankingContent>
        </TopRanking>
        <PickedRank>
          <div>
            <h1>Most picked player</h1>
            <span>75%</span>
          </div>
          <div>
            <h1>Less picked player</h1>
            <span>25%</span>
          </div>
        </PickedRank>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
