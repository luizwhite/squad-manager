interface Data {
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

interface Player {
  player: {
    [key: string]: unknown;
    age: number;
  };
  statistics: {
    [key: string]: unknown;
    team: {
      [key: string]: unknown;
      id: number;
      name: string;
    };
  }[];
}

export const getTopAverageAge = (players: Player[], top = 5): Data => {
  const data = players.reduce(
    (
      acc: {
        [key: string]: {
          id: number;
          sum: number;
          count: number;
          avg: number;
        };
      },
      { player, statistics },
    ) => {
      return {
        ...acc,
        [statistics[0].team.name]: {
          id: statistics[0].team.id,
          sum: player.age + (acc[statistics[0].team.name]?.sum || 0),
          count: 1 + (acc[statistics[0].team.name]?.count || 0),
          avg:
            (player.age + (acc[statistics[0].team.name]?.sum || 0)) /
            (1 + (acc[statistics[0].team.name]?.count || 0)),
        },
      };
    },
    {},
  );

  const results = Object.entries(data)
    .map(([team, { id, avg }]) => ({
      id,
      team,
      avg: Math.round(avg * 10) / 10,
    }))
    .sort(({ avg: aAvg }, { avg: bAvg }) => bAvg - aAvg);

  return {
    highest: results.slice(0, top),
    lowest: results.reverse().slice(0, top),
  };
};
