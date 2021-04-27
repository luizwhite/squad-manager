import { useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';

import { useTeamFormation } from '../../hooks/teamFormation';

import { Container, DummyImg, Details } from './styles';

interface PlayerProps {
  $col: number;
  $area?: number;
  $position?: number;
  $row?: number;
  $twins?: number;
  notDroppable?: boolean;
}

interface PlayerInfo {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  nationality: string;
  age: number;
  height: string;
  photo: string;
}

interface PlayerItem {
  player: PlayerInfo;
}

export const Player: React.FC<PlayerProps> = ({
  $col,
  $area = 0,
  $position = 2,
  $row,
  $twins,
  notDroppable,
}) => {
  const [player, setPlayer] = useState<PlayerInfo>({} as PlayerInfo);
  const [playerName, setPlayerName] = useState('+');
  const { savePosition, teamFormation } = useTeamFormation();

  const area = $area === 1 ? 'offense' : $area === 2 ? 'middle' : 'defense';

  const getInitials = useCallback((pName: string) => {
    const initialsArray = pName.split(' ').map((str) => str.substr(0, 1));

    return [initialsArray.shift(), initialsArray.pop()].join('');
  }, []);

  const handleDrop = useCallback(
    (playerInfo: PlayerInfo) => {
      setPlayer(playerInfo);

      const initials = getInitials(playerInfo.name);

      savePosition(area, $position, playerInfo);

      setPlayerName(initials);
    },
    [$position, area, getInitials, savePosition],
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'DraggablePlayer',
    drop: (({ player: playerInfo }) =>
      !notDroppable ? handleDrop(playerInfo) : {}) as (
      player: PlayerItem,
    ) => void,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (!Object.keys(teamFormation).length) {
      setPlayerName('+');
      setPlayer({} as PlayerInfo);
    } else if (
      Object.keys(teamFormation).length >= 3 &&
      teamFormation[area][$position] &&
      !notDroppable
    )
      setPlayer(teamFormation[area][$position]);
    setPlayerName(getInitials(teamFormation[area][$position].name));
  }, [$position, area, getInitials, notDroppable, teamFormation]);

  return (
    <Container $col={$col} {...($twins && { $twins })} {...($row && { $row })}>
      <DummyImg
        noHover={!!notDroppable || !Object.keys(player).length}
        {...(!notDroppable && { ref: drop })}
      />
      <Details>
        <div>
          <img src={player.photo} alt="player-avatar" />
          <div>
            <span>{player.name}</span>
            <div>
              <span>
                age:&nbsp;<span>{player.age}</span>
              </span>
              <span>
                height:&nbsp;<span>{player.height}</span>
              </span>
              <span>
                nationality:&nbsp;<span>{player.nationality}</span>
              </span>
            </div>
          </div>
        </div>
      </Details>
      {!notDroppable && <span>{!isOver ? playerName : 'DROP'}</span>}
    </Container>
  );
};
