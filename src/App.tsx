import React from 'react';
import { useStore } from './Store';
import { Switch } from 'react-router-dom';
import Dashboard from './components/ui/screens/Dashboard';
import Welcome from './components/ui/screens/Welcome';
import PublicRoute from './components/ui/routes/PublicRoute';
import PrivateRoute from './components/ui/routes/PrivateRoute';

const App: React.FC = () => {
  const { state }: any = useStore();
  console.log(state);

  return (
    <React.Fragment>
      <Switch>
        <PublicRoute
          path="/"
          exact
          component={Welcome}
          isAuthenticated={state.user.loggedIn}
        />
        <PublicRoute
          path="/register"
          component={Welcome}
          isAuthenticated={state.user.loggedIn}
        />
        <PrivateRoute
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={state.user.loggedIn}
        />
      </Switch>
    </React.Fragment>
  );
};

export default App;
