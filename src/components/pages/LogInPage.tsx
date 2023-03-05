import React from 'react';
import Grid from '@mui/material/Grid';
import GenericTemplate from '../templates/GenericTemplate';
import EmailLoginForm from '../molecules/EmailLoginForm';
import GoogleLoginForm from '../molecules/GoogleLoginForm';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const LogInPage: React.FC = () => {
  const theme = useTheme();

  return (
    <GenericTemplate title="Log In">
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
          <EmailLoginForm />
          <Link to="/sign_up">Are you new? Please sign up</Link>
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

export default LogInPage;
