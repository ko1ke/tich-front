import React from 'react';
import GenericTemplate from '../templates/GenericTemplate';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EmailSignUpForm from '../molecules/EmailSignUpForm';
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
    padding: 20,
  },
  item: {
    alignSelf: 'flex-start',
  },
  or: {
    alignSelf: 'center',
  },
}));

const SignUpPage = () => {
  const classes = useStyles();

  return (
    <GenericTemplate title="Sign Up">
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs className={classes.item}>
          <EmailSignUpForm />
          <Link to="/login">Have you already registered? Please log in</Link>
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

export default SignUpPage;
