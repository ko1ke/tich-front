import React from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeCurrentUser } from '../../features/userSlice';
import { useTheme, styled } from '@mui/material/styles';
import { selectDisplayMode } from '../../features/displayModeSlice';

const FlexDiv = styled('div')({
  display: 'flex',
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

const AuthButtonGroup: React.FC = () => {
  const theme = useTheme();
  const displayMode = useSelector(selectDisplayMode);
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(removeCurrentUser());
  };

  return (
    <FlexDiv>
      {!currentUser.isAuthenticated && (
        <StyledLink to="/login">
          <Button color="inherit">Login</Button>
        </StyledLink>
      )}
      {currentUser.isAuthenticated && (
        <>
          <Chip
            sx={{
              backgroundColor:
                displayMode.type === 'light'
                  ? theme.palette.grey[50]
                  : theme.palette.grey[800],
            }}
            avatar={<Avatar alt="avatar" src={currentUser.photoURL || ''} />}
            label={currentUser.displayName}
            variant="outlined"
          />
          <Button color="inherit" onClick={() => signOut()}>
            Sign Out
          </Button>
        </>
      )}
    </FlexDiv>
  );
};

export default AuthButtonGroup;
