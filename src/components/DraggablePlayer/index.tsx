import { useMemo } from 'react';
import { useDrag, DragPreviewImage } from 'react-dnd';

import { PlayerFound, InfoBlock } from './styles';

interface DraggablePlayerProps {
  player: {
    id: number;
    name: string;
    nationality: string;
    age: number;
  };
}

export const ItemTypes = {
  PLAYER: 'DraggablePlayer',
};

export const DraggablePlayer: React.FC<DraggablePlayerProps> = ({ player }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.PLAYER,
    item: {
      player,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const initials = useMemo(() => {
    const initialsArray = player.name.split(' ').map((str) => str.substr(0, 1));

    return [initialsArray.shift(), initialsArray.pop()].join('');
  }, [player.name]);

  // prettier-ignore
  // eslint-disable-next-line prefer-template
  const playerPreview = "data:image/svg+xml,%3csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' %3e%3ccircle cx='50%25' cy='50%25' r='40%25' stroke='gray' stroke-width='1' fill='white' /%3e%3ctext x='50%25' y='50%25' font-size='1.5rem' dominant-baseline='central' text-anchor='middle' stroke='%23333333' stroke-width='2px' %3e"
    + initials + "%3c/text%3e%3c/svg%3e";

  return (
    <>
      <DragPreviewImage connect={preview} src={playerPreview} />
      <PlayerFound
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        ref={drag}
      >
        <div>
          <InfoBlock>
            <div>
              <span>Name:&nbsp;</span>
              <span>{player.name}</span>
            </div>
            <div>
              <span>Nationality:&nbsp;</span>
              <span>{player.nationality}</span>
            </div>
          </InfoBlock>
          <InfoBlock>
            <div>
              <span>Age:&nbsp;</span>
              <span>{player.age}</span>
            </div>
          </InfoBlock>
        </div>
      </PlayerFound>
    </>
  );
};
