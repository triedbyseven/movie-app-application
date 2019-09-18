import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/ui/screens/Dashboard';
import Welcome from './components/ui/screens/Welcome';
import PrivateRoute from './components/ui/routes/PrivateRoute';

interface AppState {
  isAuthenticated: boolean;
}

const App: React.FC = () => {
  const [globalValues, setGlobalValues] = useState<AppState>({
    isAuthenticated: false
  });

  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/register" component={Welcome} />
        <PrivateRoute
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={globalValues.isAuthenticated}
        />
      </Switch>
    </React.Fragment>
  );
};

export default App;
