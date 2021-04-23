import { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdDelete, MdShare, MdModeEdit } from 'react-icons/md';
import { FaSort } from 'react-icons/fa';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { TeamsListTable } from '../../components/TeamsListTable';
import Tooltip from '../../components/Tooltip';
import { useTeams, Team } from '../../hooks/teams';

import { getTopAverageAge } from '../../utils/getTopAverageAge';
import { sortList } from '../../utils/sortList';

import { getTeam } from '../../services/apiSports';

import { allPlayers } from '../../allPlayers';

import {
  Container,
  TopRanking,
  TeamsList,
  TeamsListHeader,
  TopRankingHeader,
  TopRankingContent,
  PickedRank,
} from './styles';

interface TopList {
  highest: {
    id: number;
    team: string;
    avg: number;
  }[];
  lowest: {
    id: number;
    team: string;
    avg: number;
  }[];
}

const Home: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [sortState, setSortState] = useState<string | null>(null);
  const [topList, setTopList] = useState<TopList>({} as TopList);
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

  const handleCompleteTeam = useCallback(async (id: number) => {
    console.log(await getTeam(id));
  }, []);

  const handleSort = useCallback(
    (sortBy: string) => {
      sortList(teams, sortBy, sortState, setSortState);

      if (selectedTeam) setSelectedRow(teams.indexOf(selectedTeam) + 1);
    },
    [selectedTeam, sortState, teams],
  );

  useEffect(() => {
    if (selectedRow && teams) setSelectedTeam(teams[selectedRow - 1]);
  }, [selectedRow, teams]);

  useEffect(() => {
    setTopList(getTopAverageAge(allPlayers.players));
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
                {Object.keys(topList).length ? (
                  topList.highest.map(({ team, avg }) => (
                    <div key={team}>
                      {team}
                      <span>{avg}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                  </>
                )}
              </div>
            </div>
            <div>
              <h1>Lowest avg age</h1>
              <div>
                {Object.keys(topList).length ? (
                  topList.lowest.map(({ id: teamId, team, avg }, i) => (
                    <div
                      key={team}
                      onClick={() => handleCompleteTeam(teamId)}
                      role="button"
                      onKeyDown={() => {}}
                      tabIndex={i}
                    >
                      {team}
                      <span>{avg}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                  </>
                )}
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
