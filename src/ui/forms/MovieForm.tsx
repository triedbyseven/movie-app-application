import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
import { MutationMovie, QueryMoviesById } from '../../graphql';
import { v4 as uuid } from 'uuid';

import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export interface MovieFormProps {
  userId: string;
}

const MovieForm: React.SFC<MovieFormProps> = ({ userId }) => {
  const classes = useStyles();

  // Local State
  const [title, updateTitle] = useState('');
  const [genre, updateGenre] = useState('');
  const [releaseDate, updateReleaseDate] = useState('');

  // Apollo mutation
  const [
    addMovie,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(MutationMovie, {
    onError: error => console.log(error),
    onCompleted: movie => console.log(movie)
  });

  // Add movie
  function _addMovie() {
    addMovie({
      variables: {
        userId: userId,
        title: title,
        genre: genre,
        releaseDate: releaseDate
      },
      optimisticResponse: {
        __type: 'Mutation',
        addMovie: {
          id: uuid(),
          __typename: 'Movie',
          userId,
          title,
          genre,
          releaseDate
        }
      },
      update: (proxy: any, { data: { addMovie } }: any) => {
        const data: any = proxy.readQuery({ query: QueryMoviesById });

        proxy.writeQuery({
          query: QueryMoviesById,
          data: {
            ...data,
            getAllMovies: [...data.getAllMovies, addMovie]
          }
        });
      }
    });
  }

  return (
    <Paper className={classes.root}>
      <form className={classes.container}>
        <Toolbar>
          <Typography variant="h6" className={classes.textField}>
            Add a new movie
          </Typography>
        </Toolbar>
        <TextField
          label="Movie Title"
          placeholder="Movie Title"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          onChange={e => updateTitle(e.target.value)}
          value={title}
        />
        <TextField
          label="Genre"
          placeholder="Genre"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          onChange={e => updateGenre(e.target.value)}
          value={genre}
        />
        <TextField
          label="Release Date"
          placeholder="Release Date"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          onChange={e => updateReleaseDate(e.target.value)}
          value={releaseDate}
        />
        <Button
          onClick={_addMovie}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Add Movie
        </Button>
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error :( Please try again</p>}
      </form>
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto'
    },
    textField: {
      width: '100%',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

export default MovieForm;
