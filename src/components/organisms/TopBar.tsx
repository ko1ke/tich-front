import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from '../../features/drawerSlice';
import { RootState } from '../../store';
import clsx from 'clsx';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AuthButtonGroup from '../molecules/AuthButtonGroup';
import Logo from '../../images/logo.png';
import BuyMeCoffeeButton from '../atoms/BuyMeCoffeeButton';
import { createTip } from '../../api/tip';
declare const Stripe;

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      paddingRight: 24,
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.secondary,
    },
  })
);
const TopBar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const drawer = useSelector((state: RootState) => state.drawer);
  const handleTip = () => {
    createTip()
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

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, drawer.open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(openDrawer())}
          className={clsx(
            classes.menuButton,
            drawer.open && classes.menuButtonHidden
          )}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          <img src={Logo} alt="TiCh Logo" height="auto" width="55" />
        </Typography>
        <AuthButtonGroup />
        <BuyMeCoffeeButton handleTip={handleTip} />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
