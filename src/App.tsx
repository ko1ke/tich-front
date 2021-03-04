import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PortfolioPage from './components/pages/PortfolioPage';
import HomePage from './components/pages/HomePage';
import LogInPage from './components/pages/LogInPage';
import SignUpPage from './components/pages/SignUpPage';
import SettingPage from './components/pages/SettingPage';
import { auth } from './firebase';
import { getIdToken } from './api/firebase';
import { fetchCurrentUser, removeCurrentUser } from './features/userSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();

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

  return (
    <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/login" component={LogInPage} exact />
      <Route path="/sign_up" component={SignUpPage} exact />
      <Route path="/portfolio" component={PortfolioPage} exact />
      <Route path="/setting" component={SettingPage} exact />
      <Route render={() => <h1>Not Found...</h1>} />
    </Switch>
  );
};

export default App;
