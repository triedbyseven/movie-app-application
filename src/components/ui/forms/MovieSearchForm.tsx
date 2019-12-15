import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export interface MovieSearchProps {
  searchedMovie: string;
  setSearchedMovie: any;
}

const MovieSearchForm: React.FC<MovieSearchProps> = props => {
  return (
    <Paper>
      <div style={{ padding: 20 }}>
        <Typography variant="h6" display="block">
          Search Movies
        </Typography>
        <TextField
          data-test="component-input-search-movie"
          label="Search By Title"
          placeholder="Search By Title"
          margin="dense"
          variant="outlined"
          onChange={e => props.setSearchedMovie(e)}
          value={props.searchedMovie}
        />
      </div>
    </Paper>
  );
};

export default MovieSearchForm;
