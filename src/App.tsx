import { BrowserRouter as Router } from 'react-router-dom';
import { TeamFormationProvider } from './hooks/teamFormation';

import { TeamsProvider } from './hooks/teams';
import Routes from './routes';

import GlobalStyle from './styles/globals';

const App: React.FC = () => (
  <Router>
    <TeamsProvider>
      <TeamFormationProvider>
        <Routes />
      </TeamFormationProvider>
    </TeamsProvider>
    <GlobalStyle />
  </Router>
);

export default App;
