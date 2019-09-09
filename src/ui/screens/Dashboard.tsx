import React from 'react';
import Cookies from 'js-cookie';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { useQuery } from '@apollo/react-hooks';
import { QueryMoviesById } from '../../graphql';

import Header1 from '../headers/Header1';
import Table1 from '../tables/Table1';
import MovieForm from '../forms/MovieForm';

export interface DashboardProps {
  props: any;
  history: any;
  location: any;
  client: any;
}

const Dashboard: React.SFC<DashboardProps> = props => {
  const { loading: queryLoading, error: queryError, data } = useQuery(
    QueryMoviesById
  );

  function _logOut() {
    Cookies.remove('Authorization');
    props.history.push('/');
  }

  return (
    <React.Fragment>
      <Header1 />
      <Container maxWidth="lg">
        <div style={{ textAlign: 'right', marginTop: '1.5rem' }}>
          <Button onClick={_logOut} variant="outlined" color="secondary">
            Log Out
          </Button>
        </div>
        <Table1 data={data} loading={queryLoading} error={queryError} />
        <MovieForm userId={props.location.state.id} />
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
