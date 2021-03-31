import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer } from '../../features/drawerSlice';
import { RootState } from '../../store';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import LinkListItem from '../molecules/LinkListItem';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import LabelIcon from '@material-ui/icons/Label';
import SettingsIcon from '@material-ui/icons/Settings';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import IconButton from '@material-ui/core/IconButton';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
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
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
  })
);

const SideBar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const drawer = useSelector((state: RootState) => state.drawer);

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !drawer.open && classes.drawerPaperClose
        ),
      }}
      open={drawer.open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={() => dispatch(closeDrawer())}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <LinkListItem to="/" title="TopPage">
          <HomeIcon />
        </LinkListItem>
        <LinkListItem to="/news" title="News">
          <AnnouncementIcon />
        </LinkListItem>
        <LinkListItem to="/portfolio" title="Portfolio">
          <LabelIcon />
        </LinkListItem>
        <LinkListItem to="/setting" title="Setting">
          <SettingsIcon />
        </LinkListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
