import React from 'react';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { useQuery } from '@apollo/react-hooks';
import { QueryMoviesById } from '../../../graphql';
import { useStore } from '../../../Store';

import Header1 from '../headers/Header1';
import Table1 from '../tables/Table1';
import MovieForm from '../forms/MovieForm';

const Dashboard: React.FC = () => {
  // Apollo query by id
  const { loading: queryLoading, error: queryError, data } = useQuery(
    QueryMoviesById
  );

  // Global State
  const { state, dispatch } = useStore();

  function _logOut() {
    dispatch({ type: 'logout' });
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
        <MovieForm userId={state.user.userId} />
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
