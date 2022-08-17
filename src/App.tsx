import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './private-route/PrivateRoute';
import { useDispatch } from 'react-redux';

import PortfolioPage from './components/pages/PortfolioPage';
import HomePage from './components/pages/HomePage';
import LogInPage from './components/pages/LogInPage';
import SignUpPage from './components/pages/SignUpPage';
import SettingPage from './components/pages/SettingPage';
import CompanyNewsPage from './components/pages/CompanyNewsPage';
import MarketNewsPage from './components/pages/MarketNewsPage';
import FavoriteNewsPage from './components/pages/FavoriteNewsPage';
import { auth } from './firebase';
import { getIdToken } from './api/firebase';
import { fetchCurrentUser, removeCurrentUser } from './features/userSlice';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { openDrawer, closeDrawer } from './features/drawerSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        getIdToken()
          .then((idToken) => {
            dispatch(
              fetchCurrentUser({
                idToken: idToken,
                uid: authUser.uid,
                email: authUser.email,
                photoURL: authUser.photoURL,
                displayName: authUser.displayName,
              })
            );
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        dispatch(removeCurrentUser());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  useEffect(() => {
    if (downSm) {
      dispatch(closeDrawer());
    } else {
      dispatch(openDrawer());
    }
  }, [dispatch, downSm]);

  return (
    <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/login" component={LogInPage} exact />
      <Route path="/sign_up" component={SignUpPage} exact />
      <Route path="/company_news" component={CompanyNewsPage} exact />
      <Route path="/market_news" component={MarketNewsPage} exact />
      <PrivateRoute path="/favorite_news" component={FavoriteNewsPage} exact />
      <PrivateRoute path="/portfolio" component={PortfolioPage} exact />
      <PrivateRoute path="/setting" component={SettingPage} exact />
      <Route render={() => <h1>Not Found...</h1>} />
    </Switch>
  );
};

export default App;
