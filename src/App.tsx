import React, { useContext } from 'react';
import { GlobalStateContext } from './Store';
import { Switch } from 'react-router-dom';
import Dashboard from './components/ui/screens/Dashboard';
import Welcome from './components/ui/screens/Welcome';
import PublicRoute from './components/ui/routes/PublicRoute';
import PrivateRoute from './components/ui/routes/PrivateRoute';

const App: React.FC = () => {
  const [{ isAuthenticated }]: any = useContext(GlobalStateContext);

  return (
    <React.Fragment>
      <Switch>
        <PublicRoute
          path="/"
          exact
          component={Welcome}
          isAuthenticated={isAuthenticated}
        />
        <PublicRoute
          path="/register"
          component={Welcome}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={isAuthenticated}
        />
      </Switch>
    </React.Fragment>
  );
};

export default App;
