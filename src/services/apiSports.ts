/* eslint-disable @typescript-eslint/no-explicit-any */
interface Data {
  [key: string]: unknown;
  response: any[];
  paging: {
    current: number;
    total: number;
  };
}

export const getTeam = async (teamId: number, league = 71): Promise<any> => {
  const response = await fetch(
    `https://v3.football.api-sports.io/teams?id=${teamId}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY || '',
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
      redirect: 'follow' as RequestRedirect,
    },
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const team = await response.json();

  const playersResponse = await fetch(
    `https://v3.football.api-sports.io/players?team=${teamId}&league=${league}&season=2019`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY || '',
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
      redirect: 'follow' as RequestRedirect,
    },
  );

  if (!playersResponse.ok) {
    const message = `An error has occured: ${playersResponse.status}`;
    throw new Error(message);
  }

  const teamPlayers = await playersResponse.json();

  return {
    team: team.response[0],
    teamPlayers: teamPlayers.response,
  };
};

/* eslint-disable @typescript-eslint/no-unsafe-return */
export const getPlayers = async (
  search: string,
  league = 71,
): Promise<Data> => {
  const myHeaders = new Headers();
  myHeaders.append('x-rapidapi-key', process.env.REACT_APP_RAPIDAPI_KEY || '');
  myHeaders.append('x-rapidapi-host', 'v3.football.api-sports.io');
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow' as RequestRedirect,
  };

  const response = await fetch(
    `https://v3.football.api-sports.io/players?league=${league}&season=2019&search=${search}`,
    requestOptions,
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const players: Data = await response.json();

  return players;
};

//
export const getAllPlayers = async (
  league: number,
  page = 1,
  playersAll: Record<string, unknown>[] = [],
): Promise<Record<string, unknown>[]> => {
  const response = await fetch(
    `https://v3.football.api-sports.io/players?league=${league}&season=2019&page=${page}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY || '',
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
      redirect: 'follow' as RequestRedirect,
    },
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const data: Data = await response.json();

  const { paging, response: players } = data;
  const playersAcc = playersAll.concat(players);

  if (!(paging.current === 1 && paging.current === paging.total))
    localStorage.setItem(
      `@SquadTool:players:${paging.current}`,
      JSON.stringify(players),
    );

  if (paging.current !== paging.total)
    return getAllPlayers(71, paging.current + 1, playersAcc);

  return players;
};
