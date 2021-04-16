import React, { useState, useEffect, useMemo } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, resetAuthenticationError } from '../../features/userSlice';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UserSnack: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.isAuthenticationError === true && user.isAuthenticated === false) {
      setOpen(true);
      dispatch(resetAuthenticationError());
    }
    if (user.isAuthenticationError === false && user.isAuthenticated === true) {
      setOpen(true);
      dispatch(resetAuthenticationError());
    }
  }, [user, dispatch]);

  const handleClose = (_e?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const alertMessage = useMemo(() => {
    if (user.isAuthenticated === false && user.error) {
      return user.error?.message || 'Error occurred';
    }
    if (user.isAuthenticated === true && user.success) {
      return user.success?.message || 'Success';
    }
  }, [user]);

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={user.isAuthenticated ? 'success' : 'error'}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default UserSnack;
