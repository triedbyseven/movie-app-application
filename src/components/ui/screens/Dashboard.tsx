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

interface DashboardState {
  movie: object;
  searchedMovie: string;
  allMovies: Array<object>;
}

const Dashboard: React.FC = () => {
  // Apollo query by id
  const { loading: queryLoading, error: queryError, data } = useQuery(
    QueryMoviesById
  );

  // Global State
  const { state, dispatch } = useStore();

  // Local State
  const [movieState, setMovieState] = useState<DashboardState>({
    movie: {
      id: '',
      name: '',
      genre: '',
      releaseDate: ''
    },
    allMovies: [],
    searchedMovie: ''
  });

  // Life cycle hook
  useEffect(() => {
    async function getAllMovies() {
      const allMovies = await getMovies(movieState.searchedMovie);
      setMovieState((prevState): any => ({
        ...prevState,
        allMovies: allMovies
      }));
    }

    if (movieState.searchedMovie) {
      getAllMovies();
    }
  }, [movieState.searchedMovie]);

  async function setSearchedMovie(e: string) {
    const {
      target: { value }
    }: any = e;

    setMovieState(prevState => ({ ...prevState, searchedMovie: value }));
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
        <MovieSearchForm
          searchedMovie={movieState.searchedMovie}
          setSearchedMovie={setSearchedMovie}
        />
        <MovieForm userId={state.user.userId} />
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
