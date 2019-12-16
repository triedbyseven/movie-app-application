import React from 'react';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export interface MovieListPreviewProps {
  movies: Movies[];
}

export interface Movies {
  poster_path: string;
  title: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)'
    },
    title: {
      color: theme.palette.primary.light
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
    }
  })
);

const MovieListPreview: React.SFC<MovieListPreviewProps> = ({ movies }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3>Preview List</h3>
      <GridList className={classes.gridList} cols={2.5}>
        {movies
          .sort((a, b) => (b.poster_path ? -1 : 1))
          .map(({ poster_path, title }, i): any => (
            <GridListTile key={i} style={{ height: 300, maxWidth: 200 }}>
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w200${poster_path}`
                    : 'https://images.unsplash.com/photo-1542204637-e67bc7d41e48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
                }
                alt={title}
              />
              <GridListTileBar
                title={title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title
                }}
                actionIcon={
                  <IconButton aria-label={`star ${title}`}>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
};

export default MovieListPreview;
