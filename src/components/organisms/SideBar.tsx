import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
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
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import useElasticSearchEnabled from '../../hooks/useElasticSearchEnabled';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
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
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const drawer = useSelector((state: RootState) => state.drawer);
  const { elasticSearchEnabled } = useElasticSearchEnabled();

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
        <LinkListItem to="/company_news" title="Company News">
          <LocationCityIcon />
        </LinkListItem>
        <LinkListItem to="/market_news" title="Market News">
          <AttachMoneyIcon />
        </LinkListItem>
        <LinkListItem
          to="/favorite_news"
          title="Favorite News"
          disabled={!user?.isAuthenticated}
        >
          <FavoriteIcon />
        </LinkListItem>
        {elasticSearchEnabled && (
          <LinkListItem
            to="/es_news"
            title="News with ES"
            disabled={!elasticSearchEnabled}
          >
            <FindInPageIcon />
          </LinkListItem>
        )}
        <LinkListItem
          to="/portfolio"
          title="Portfolio"
          disabled={!user?.isAuthenticated}
        >
          <LabelIcon />
        </LinkListItem>
        <LinkListItem
          to="/setting"
          title="Setting"
          disabled={!user?.isAuthenticated}
        >
          <SettingsIcon />
        </LinkListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
