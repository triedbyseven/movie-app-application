import React from 'react';
import Dashboard from './components/ui/screens/Dashboard';
import Welcome from './components/ui/screens/Welcome';
import { Switch, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/register" component={Welcome} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
