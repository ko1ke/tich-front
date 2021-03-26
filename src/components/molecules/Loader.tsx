import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    textAlign: 'center',
    margin: '45vh auto 0',
    transform: 'translateY(-50%)',
  },
}));

export default function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>Loading...</Typography>
      <LinearProgress />
    </div>
  );
}
