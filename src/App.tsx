import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';

import GlobalStyle from './styles/globals';

const App: React.FC = () => (
  <Router>
    <Routes />
    <GlobalStyle />
  </Router>
);

export default App;
