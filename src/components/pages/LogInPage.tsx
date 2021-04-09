import React from 'react';
import Grid from '@material-ui/core/Grid';
import GenericTemplate from '../templates/GenericTemplate';
import { makeStyles } from '@material-ui/core/styles';
import EmailLoginForm from '../molecules/EmailLoginForm';
import GoogleLoginForm from '../molecules/GoogleLoginForm';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  fields: {
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2.5),
  },
  item: {
    alignSelf: 'flex-start',
  },
  or: {
    alignSelf: 'center',
  },
}));

const LogInPage = () => {
  const classes = useStyles();

  return (
    <GenericTemplate title="Log In">
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs className={classes.item}>
          <EmailLoginForm />
          <Link to="/sign_up">Are you new? Please sign up</Link>
        </Grid>
        <Grid item xs={1} className={classes.or}>
          OR
        </Grid>
        <Grid item xs className={classes.item}>
          <GoogleLoginForm />
        </Grid>
      </Grid>
    </GenericTemplate>
  );
};

export default LogInPage;
