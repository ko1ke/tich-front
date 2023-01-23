import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeCurrentUser } from '../../features/userSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    chip: {
      backgroundColor: 'white',
    },
    user: {
      display: 'flex',
    },
  })
);

const AuthButtonGroup: React.FC = () => {
  const classes = useStyles();
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(removeCurrentUser());
  };

  return (
    <div className={classes.user}>
      {!currentUser.isAuthenticated && (
        <Link className={classes.link} to="/login">
          <Button color="inherit">Login</Button>
        </Link>
      )}
      {currentUser.isAuthenticated && (
        <>
          <Chip
            className={classes.chip}
            avatar={<Avatar alt="avatar" src={currentUser.photoURL || ''} />}
            label={currentUser.displayName}
            variant="outlined"
          />
          <Button color="inherit" onClick={() => signOut()}>
            Sign Out
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthButtonGroup;
