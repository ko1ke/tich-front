import React from 'react';
import Typography from '@material-ui/core/Typography';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { useDispatch } from 'react-redux';
import { createGoogleUser } from '../../features/userSlice';

const GoogleLoginForm: React.FC = () => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(createGoogleUser());
  };

  return (
    <>
      <Typography component="h3" variant="h6" color="inherit" noWrap>
        Google login
      </Typography>
      <GoogleLoginButton onClick={handleOnClick} />
    </>
  );
};

export default GoogleLoginForm;
