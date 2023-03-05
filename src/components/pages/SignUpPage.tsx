import React from 'react';
import GenericTemplate from '../templates/GenericTemplate';
import Grid from '@mui/material/Grid';
import EmailSignUpForm from '../molecules/EmailSignUpForm';
import GoogleLoginForm from '../molecules/GoogleLoginForm';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const SignUpPage: React.FC = () => {
  const theme = useTheme();

  return (
    <GenericTemplate title="Sign Up">
      <Grid
        container
        spacing={3}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing(2.5),
        }}
      >
        <Grid item xs sx={{ alignSelf: 'flex-start' }}>
          <EmailSignUpForm />
          <Link to="/login">Have you already registered? Please log in</Link>
        </Grid>
        <Grid item xs={1} sx={{ alignSelf: 'center' }}>
          OR
        </Grid>
        <Grid item xs sx={{ alignSelf: 'flex-start' }}>
          <GoogleLoginForm />
        </Grid>
      </Grid>
    </GenericTemplate>
  );
};

export default SignUpPage;
