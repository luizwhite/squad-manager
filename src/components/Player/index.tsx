import { useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';

import { useTeamFormation } from '../../hooks/teamFormation';

import { Container, DummyImg } from './styles';

interface PlayerProps {
  $col: number;
  $area?: number;
  $position?: number;
  $row?: number;
  $twins?: number;
  notDroppable?: boolean;
}

interface PlayerItem {
  player: {
    id: number;
    name: string;
    nationality: string;
    age: number;
  };
}

export const Player: React.FC<PlayerProps> = ({
  $col,
  $area = 0,
  $position = 2,
  $row,
  $twins,
  notDroppable,
}) => {
  const [playerName, setPlayerName] = useState('+');
  const { savePosition, teamFormation } = useTeamFormation();

  const area = $area === 1 ? 'offense' : $area === 2 ? 'middle' : 'defense';

  const getInitials = useCallback((pName: string) => {
    const initialsArray = pName.split(' ').map((str) => str.substr(0, 1));

    return [initialsArray.shift(), initialsArray.pop()].join('');
  }, []);

  const handleDrop = useCallback(
    (player: PlayerItem['player']) => {
      const initials = getInitials(player.name);

      savePosition(area, $position, player);

      setPlayerName(initials);
    },
    [$position, area, getInitials, savePosition],
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'DraggablePlayer',
    drop: (({ player }) => (!notDroppable ? handleDrop(player) : {})) as (
      player: PlayerItem,
    ) => void,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (!Object.keys(teamFormation).length) setPlayerName('+');
    else if (
      Object.keys(teamFormation).length >= 3 &&
      teamFormation[area][$position] &&
      !notDroppable
    )
      setPlayerName(getInitials(teamFormation[area][$position].name));
  }, [$position, area, getInitials, notDroppable, teamFormation]);

  return (
    <Container $col={$col} {...($twins && { $twins })} {...($row && { $row })}>
      <DummyImg {...(!notDroppable && { ref: drop })} />
      <span>{!isOver ? playerName : 'DROP'}</span>
    </Container>
  );
};
