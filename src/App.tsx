import React, { useContext } from 'react';
import { GlobalStateContext } from './Store';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/ui/screens/Dashboard';
import Welcome from './components/ui/screens/Welcome';
import PrivateRoute from './components/ui/routes/PrivateRoute';

const App: React.FC = () => {
  // const [globalValues, setGlobalValues] = useState<AppState>({
  //   isAuthenticated: false
  // });

  const [{ isAuthenticated }]: any = useContext(GlobalStateContext);

  // const isAuthenticated = false;

  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/register" component={Welcome} />
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
