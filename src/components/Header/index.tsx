import { Link } from 'react-router-dom';

import { Container } from './styles';

import { ReactComponent as Logo } from '../../assets/logo.svg';

export const Header: React.FC = () => (
  <Container>
    <Link to="/">
      <div>
        <Logo viewBox="0 0 79.91 79.91" />
        Squad Management Tool
      </div>
    </Link>
    <div>
      John Doe
      <div>JD</div>
    </div>
  </Container>
);
