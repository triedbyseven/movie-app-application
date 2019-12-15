import React, { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { useQuery } from '@apollo/react-hooks';
import { QueryMoviesById } from '../../../graphql';
import { useStore } from '../../../Store';
import getMovies from '../../../services';

import Header1 from '../headers/Header1';
import Table1 from '../tables/Table1';
import MovieForm from '../forms/MovieForm';
import MoviePreview from '../previews/MoviePreview';
import MovieSearchForm from '../forms/MovieSearchForm';

const Dashboard: React.FC = () => {
  // Life cycle hook
  useEffect(() => {
    getMovies();
  }, []);

  // Apollo query by id
  const { loading: queryLoading, error: queryError, data } = useQuery(
    QueryMoviesById
  );

  // Global State
  const { state, dispatch } = useStore();

  // Local State
  const [movieState, setMovieState] = useState({
    movie: {
      id: '',
      name: '',
      genre: '',
      releaseDate: ''
    }
  });

  function _logOut() {
    dispatch({ type: 'logout' });
  }

  return (
    <React.Fragment>
      <Header1 />
      <Container maxWidth="lg" style={{ paddingBottom: '1.5rem' }}>
        <div style={{ textAlign: 'right', marginTop: '1.5rem' }}>
          <Button onClick={_logOut} variant="outlined" color="secondary">
            Log Out
          </Button>
        </div>
        <Table1 data={data} loading={queryLoading} error={queryError} />
        <MoviePreview
          data-test="component-movie-preview"
          movie={movieState.movie}
        />
        <MovieSearchForm movie={movieState.movie} />
        <MovieForm userId={state.user.userId} />
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
