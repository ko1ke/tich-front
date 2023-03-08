import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { closeDrawer } from '../../features/drawerSlice';
import { RootState } from '../../store';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import LinkListItem from '../molecules/LinkListItem';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import LabelIcon from '@mui/icons-material/Label';
import SettingsIcon from '@mui/icons-material/Settings';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import useElasticSearchEnabled from '../../hooks/useElasticSearchEnabled';
import { useTheme, styled } from '@mui/material/styles';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const SideBar: React.FC = () => {
  const theme = useTheme();
  const drawer = useSelector((state: RootState) => state.drawer);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { elasticSearchEnabled } = useElasticSearchEnabled();

  const IconButtonWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  });

  return (
    <Drawer variant="permanent" open={drawer.open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButtonWrapper>
          <IconButton onClick={() => dispatch(closeDrawer())}>
            <ChevronLeftIcon />
          </IconButton>
        </IconButtonWrapper>
      </Toolbar>
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
        <LinkListItem to="/setting" title="Setting">
          <SettingsIcon />
        </LinkListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
