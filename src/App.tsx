import React, { useEffect, useReducer } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import TickerPage from './components/pages/PortfolioPage';
import HomePage from './components/pages/HomePage';
import LogInPage from './components/pages/LogInPage';
import SignUpPage from './components/pages/SignUpPage';
import SettingPage from './components/pages/SettingPage';
import { auth } from './firebase';
import { fetchCurrentUser, removeCurrentUser } from './features/userSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          fetchCurrentUser({
            uid: authUser.uid,
            email: authUser.email,
            photoURL: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(removeCurrentUser());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  return (
    <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/login" component={LogInPage} exact />
      <Route path="/sign_up" component={SignUpPage} exact />
      <Route path="/portfolio" component={TickerPage} exact />
      <Route path="/setting" component={SettingPage} exact />
      <Route render={() => <h1>Not Found...</h1>} />
    </Switch>
  );
};

export default App;
