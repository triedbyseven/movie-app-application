import React from 'react';
import img from '../../../images/card-holder.jpg';

import {
  createStyles,
  Theme,
  makeStyles,
  useTheme
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

export interface MoviePreviewProps {
  movie: object;
}

const MoviePreview: React.FC<MoviePreviewProps> = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Paper className={classes.root}>
      <div style={{ padding: theme.spacing(2) }}>
        <Typography variant="h6" display="block">
          Preview
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          View you movie here.
        </Typography>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4)
          }}
        >
          <Card className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  The Lion King
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  style={{ paddingBottom: theme.spacing(1.5) }}
                >
                  Drama/Adventure
                </Typography>
                <Divider />
                <Typography
                  gutterBottom
                  variant="body1"
                  style={{ paddingTop: theme.spacing(1.5) }}
                >
                  Release Date
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  2019
                </Typography>
              </CardContent>
            </div>
            <CardMedia
              className={classes.cover}
              image={img}
              title="Live from space album cover"
            />
          </Card>
        </div>
      </div>
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
    content: {
      flex: '1 0 auto'
    },
    card: {
      maxWidth: 362,
      display: 'flex'
    },
    details: {
      display: 'flex',
      flexDirection: 'column'
    },
    cover: {
      width: 151
    },
    playIcon: {
      height: 38,
      width: 38
    }
  })
);

export default MoviePreview;
