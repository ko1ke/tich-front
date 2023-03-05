import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from '../../features/drawerSlice';
import { RootState } from '../../store';

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AuthButtonGroup from '../molecules/AuthButtonGroup';
import Logo from '../../images/logo.png';
import BuyMeCoffeeButton from '../atoms/BuyMeCoffeeButton';
import { createChip } from '../../api/chip';
import { styled } from '@mui/material/styles';

declare const Stripe;

const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const TopBar: React.FC = () => {
  const drawer = useSelector((state: RootState) => state.drawer);
  const dispatch = useDispatch();
  const handleChip = () => {
    createChip()
      .then((res) => {
        const stripe = new Stripe(`${process.env.REACT_APP_STRIPE_KEY}`);
        stripe.redirectToCheckout({
          sessionId: res.data.id,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const MenuButton = styled(IconButton)({
    marginRight: 36,
    marginLeft: drawer.open && drawerWidth,
    display: drawer.open && 'none',
  });

  return (
    <AppBar position="absolute" open={drawer.open}>
      <Toolbar sx={{ paddingRight: 24 }}>
        <MenuButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(openDrawer())}
        >
          <MenuIcon />
        </MenuButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 2 }}
        >
          <img src={Logo} alt="TiCh Logo" height="auto" width="55" />
        </Typography>
        <AuthButtonGroup />
        <BuyMeCoffeeButton handleChip={handleChip} />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
