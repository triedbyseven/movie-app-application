import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export interface MovieSearchProps {
  movie: object;
}

const MovieSearchForm: React.FC<MovieSearchProps> = () => {
  return (
    <Paper>
      <div style={{ padding: 20 }}>
        <Typography variant="h6" display="block">
          Search Movies
        </Typography>
        <TextField
          label="Search By Title"
          placeholder="Search By Title"
          margin="dense"
          variant="outlined"
        />
      </div>
    </Paper>
  );
};

export default MovieSearchForm;
