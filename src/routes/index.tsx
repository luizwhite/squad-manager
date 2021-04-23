import { Switch, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Home from '../pages/Home';
import TeamManagement from '../pages/TeamManagement';

const Routes: React.FC = () => (
  <DndProvider backend={HTML5Backend}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/manager" exact component={TeamManagement} />
      <Route path="/manager/:id" component={TeamManagement} />
    </Switch>
  </DndProvider>
);

export default Routes;
