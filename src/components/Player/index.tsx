import { Container, DummyImg } from './styles';

interface PlayerProps {
  $col: number;
  $row?: number;
  $twins?: number;
}

export const Player: React.FC<PlayerProps> = ({ $col, $row, $twins }) => {
  return (
    <Container $col={$col} {...($twins && { $twins })} {...($row && { $row })}>
      <DummyImg />
      <span>+</span>
    </Container>
  );
};
