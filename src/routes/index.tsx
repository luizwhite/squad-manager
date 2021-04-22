import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import TeamManagement from '../pages/TeamManagement';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/manager" exact component={TeamManagement} />
    <Route path="/manager/:id" component={TeamManagement} />
  </Switch>
);

export default Routes;
