import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import { Switch, Route } from 'react-router-dom';

import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';

export interface WelcomeProps {}

const Welcome: React.FC<WelcomeProps> = () => {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
        style={{ height: '100vh' }}
      >
        <Grid item xs={12} md={6}>
          <Card style={{ textAlign: 'center' }}>
            <CardContent style={{ maxWidth: '400px', display: 'inline-block' }}>
              <Switch>
                <Route path="/" exact component={LoginForm} />
                <Route path="/register" component={RegisterForm} />
              </Switch>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Welcome;
