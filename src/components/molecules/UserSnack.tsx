import React, { useState, useEffect } from 'react';
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
  }, [user]);

  const handleClose = (_e?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {user.error ? user.error.message : 'Error occurred'}
      </Alert>
    </Snackbar>
  );
};

export default UserSnack;
