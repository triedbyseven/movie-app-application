import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { useQuery } from '@apollo/react-hooks';
import { QueryMoviesById } from '../../../graphql';
import { useStore } from '../../../Store';

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

  async function getMovies() {
    const response = await axios.get(
      'https://api.themoviedb.org/3/search/movie?api_key=d5e0b36099a8d8c81c26b508774e8654&query=fight%20club'
    );
    console.log(response);
  }

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
