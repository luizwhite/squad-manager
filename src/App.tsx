import { BrowserRouter as Router } from 'react-router-dom';

import { TeamsProvider } from './hooks/teams';
import Routes from './routes';

import GlobalStyle from './styles/globals';

const App: React.FC = () => (
  <Router>
    <TeamsProvider>
      <Routes />
    </TeamsProvider>
    <GlobalStyle />
  </Router>
);

export default App;
