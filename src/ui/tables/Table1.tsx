import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface Table1Props {
  data: any;
  loading: boolean;
  error: any;
}

const Table1: React.FC<Table1Props> = props => {
  const classes = useStyles();

  if (props.loading)
    return (
      <Paper className={classes.root}>
        <Toolbar>
          <Typography
            style={{ width: '100%' }}
            variant="h6"
            align="center"
            display="block"
          >
            <CircularProgress className={classes.progress} />
          </Typography>
        </Toolbar>
      </Paper>
    );
  if (props.error) return <p>Error :( Please try again</p>;
  if (props.data.getAllMovies.length === 0)
    return (
      <Paper className={classes.root}>
        <Toolbar>
          <Typography
            style={{ width: '100%' }}
            variant="h6"
            align="center"
            display="block"
          >
            You have no movies added yet.
          </Typography>
        </Toolbar>
      </Paper>
    );

  return (
    <Paper className={classes.root}>
      <Toolbar>
        <Typography variant="h6" id="tableTitle">
          My Movies
        </Typography>
      </Toolbar>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Genre</TableCell>
            <TableCell align="right">Release Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.getAllMovies.map((movie: any, i: number) => (
            <TableRow key={movie.id}>
              <TableCell component="th" scope="movie">
                {movie.title}
              </TableCell>
              <TableCell align="right">{movie.genre}</TableCell>
              <TableCell align="right">{movie.releaseDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto'
    },
    table: {
      minWidth: 650
    },
    progress: {
      margin: theme.spacing(2)
    }
  })
);

export default Table1;
